import dynamic from 'next/dynamic'
import { Article, Callout, CodeBlock, Definitions, Figure, FigurePair, Lead, PostBody, PostFooter, PostHeader, References, Steps } from '@/components/post'

const Mermaid = dynamic(() => import('@/components/Mermaid'))

export const metadata = {
  title: 'Building a Privacy-First AI Chatbot with LangChain',
  description: 'How the langchain-chatbot project combines LangChain, MongoDB memory, Microsoft Presidio anonymization and LangSmith tracing.'
}

const architecture = `
graph TD
    subgraph compose["Docker Compose environment"]
        web["Next.js frontend<br/>port 3000"] <--> api["FastAPI backend<br/>port 8080"]
        api <--> db[("MongoDB<br/>port 27017")]
        api --> chain["LangChain agent"]
        chain --> presidio["Presidio anonymizer<br/>optional"]
        chain --> llm["LLM provider<br/>OpenAI or Vertex AI"]
        chain --> trace["LangSmith tracing"]
    end
`

export default function LangchainChatbotPage() {
  return (
    <Article>
      <PostHeader
        title="Building a Privacy-First AI Chatbot with LangChain"
        subtitle="A walkthrough of langchain-chatbot: conversation memory, optional anonymization before the model call, and tracing."
        author="Minh Bui"
        date="2025-03-26"
        readingTime="6 min read"
        tags={['ai', 'langchain', 'privacy', 'development']}
      />
      <PostBody>
        <Lead>
          <p>
            langchain-chatbot is an open-source chatbot that keeps conversation history in MongoDB, can anonymize personal data before it reaches the language model, and traces each request with LangSmith. This post covers what it does, how the pieces fit together, and how to run it.
          </p>
        </Lead>

        <h2>What it is</h2>
        <p>
          The project is a full-stack chatbot built on LangChain. It talks to a hosted model (OpenAI or Vertex AI), stores per-conversation memory in MongoDB, and exposes the bot through a FastAPI backend with a Next.js frontend. The first version, released as v1.0, used a Gradio interface; the Next.js frontend and the FastAPI service came later.
        </p>
        <p>
          Chatbots often receive names, phone numbers and emails. The design goal was to keep that data out of third-party model APIs without losing context-aware answers.
        </p>

        <h2>Key features</h2>
        <Definitions
          items={[
            { term: 'Provider-agnostic models', text: 'LangChain sits between the application and the model API, so switching between OpenAI and Vertex AI is a configuration change.' },
            { term: 'Conversation memory', text: 'History is stored in MongoDB and loaded into each request, so the bot can answer follow-up questions in context.' },
            { term: 'Configurable personality', text: 'Attributes such as age and gender change the tone of the assistant, which is useful for education or support scenarios.' },
            { term: 'PII anonymization', text: <>An optional layer built on Microsoft Presidio replaces personal data before the prompt is sent and restores it in the reply. See the <a href="https://microsoft.github.io/presidio/" target="_blank" rel="noopener noreferrer">Presidio documentation</a>.</> },
            { term: 'Tracing', text: <>LangSmith records each step of a request, which makes it possible to inspect prompts and intermediate values. See the <a href="https://docs.smith.langchain.com/" target="_blank" rel="noopener noreferrer">LangSmith documentation</a>.</> },
          ]}
        />

        <h2>Architecture</h2>
        <p>
          The frontend sends a message to the backend. The backend loads the conversation history from MongoDB, optionally anonymizes the input and the history, runs the LangChain agent against the configured model, restores the original values in the answer, and stores the exchange.
        </p>
        <Mermaid chart={architecture} caption="Services in the Docker Compose environment and how a request moves between them." />
        <p>
          In code, the request is a chain of runnables. When the anonymizer is enabled it sits directly before the model call, and the de-anonymizer sits directly after it:
        </p>
        <CodeBlock title="backend/bot.py" language="python">
{`if self.config.enable_anonymizer:
    anonymizer_runnable = self.anonymizer.get_runnable_anonymizer().with_config(run_name="AnonymizeSentence")
    de_anonymizer = RunnableLambda(self.anonymizer.anonymizer.deanonymize).with_config(run_name="DeAnonymizeResponse")

    agent = (history_loader
             | anonymizer_runnable
             | self.chain.chain
             | de_anonymizer
             | ReActSingleInputOutputParser())
else:
    agent = history_loader | self.chain.chain | ReActSingleInputOutputParser()`}
        </CodeBlock>

        <h2>Getting started</h2>
        <p>You need Python 3.9 or later, Docker with Docker Compose, an API key for OpenAI (or Vertex AI credentials), and, for local development without Docker, a MongoDB instance and Node.js.</p>
        <Steps
          title="Run with Docker Compose"
          items={[
            { title: 'Clone the repository', text: 'git clone https://github.com/minhbtrc/langchain-chatbot' },
            { title: 'Copy the environment files', text: 'cp backend/.env.example backend/.env and cp frontend/.env.example frontend/.env' },
            { title: 'Add your model key', text: 'Set OPENAI_API_KEY in backend/.env' },
            { title: 'Start the services', text: 'docker-compose up -d' },
            { title: 'Open the app', text: 'Frontend at http://localhost:3000, API docs at http://localhost:8080/docs' },
          ]}
        />
        <p>
          A <code>setup.sh</code> script (and <code>setup.bat</code> on Windows) does the same steps interactively. The settings you are most likely to change are:
        </p>
        <CodeBlock title="backend/.env" language="shell">
{`OPENAI_API_KEY=your_openai_api_key
ENABLE_ANONYMIZER=true

# Optional: LangSmith tracing
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=your_langsmith_api_key
LANGCHAIN_PROJECT=chatbot-with-langchain`}
        </CodeBlock>
        <Callout label="Note">
          <p>
            The anonymizer is off by default. For local runs without Docker, download the spaCy model first with <code>python -m spacy download en_core_web_md</code>.
          </p>
        </Callout>

        <h2>Anonymization in practice</h2>
        <p>
          Before a prompt leaves the system, personal data is replaced with a substitute value. After the model responds, the substitute is mapped back to the original, so the user sees a natural answer while the provider never receives the real data.
        </p>
        <p>
          The project wraps LangChain's <code>PresidioReversibleAnonymizer</code>. It first detects the language (Vietnamese or English), then anonymizes the user input, the conversation history and the agent scratchpad:
        </p>
        <CodeBlock title="backend/utils/anonymizer.py" language="python">
{`class BotAnonymizer(BaseObject):
    def __init__(self, config: Config = None):
        super().__init__()
        self.config = config if config is not None else Config()
        self._anonymizer = PresidioReversibleAnonymizer(languages_config=NLP_CONFIG)
        self._anonymizer.add_recognizer_for_entities(ANONYMIZED_FIELDS)

    def anonymize_func(self, input_dict):
        language = input_dict.get("language")
        anonymized_input = self.anonymizer.anonymize(input_dict["input"], language)
        history = input_dict.get("history", "")
        anonymized_history = self.anonymizer.anonymize(history, language) if history else ""
        ...

    def get_runnable_anonymizer(self):
        return RunnableLambda(self._detect_lang) | RunnableLambda(self.anonymize_func)`}
        </CodeBlock>
        <p>
          The abridged listing leaves out the agent scratchpad handling and error paths.
        </p>

        <h3>What the traces show</h3>
        <p>
          The LangSmith traces below come from a Vietnamese conversation in which the user gives a phone number. The first trace shows the anonymize step turning the real number into a different, realistic-looking one. The second shows that the model only ever receives the substitute. The last shows the original restored in the reply.
        </p>
        <FigurePair
          items={[
            { src: '/images/langchain-chatbot/before-anonymization.png', alt: 'LangSmith trace of the anonymize step: the input contains the real phone number and the output contains a substitute number', caption: 'The anonymize step: real number in, substitute number out.', width: 943, height: 770 },
            { src: '/images/langchain-chatbot/after-anonymization.png', alt: 'LangSmith trace of the model call: the user message and the model reply both contain only the substitute number', caption: 'The model call sees only the substitute value.', width: 940, height: 874 },
          ]}
        />
        <Figure
          src="/images/langchain-chatbot/de-anonymized-output.png"
          alt="LangSmith trace of the deanonymize step restoring the original phone number in the response"
          caption="The deanonymize step maps the substitute back to the original number in the reply."
          width={948}
          height={410}
        />

        <h2>Who it is for</h2>
        <ul>
          <li><strong>Developers</strong> learning how to build privacy-aware LLM applications on a working reference.</li>
          <li><strong>Teams in regulated settings</strong> that need memory and customization but cannot send raw personal data to a provider.</li>
          <li><strong>Hobbyists</strong> who want a starting point for a personal assistant without building the plumbing first.</li>
        </ul>

        <h2>Conclusion</h2>
        <p>
          The project combines four ideas that are usually built separately: model-agnostic access, persistent memory, optional anonymization around the model call, and request tracing. The source is on GitHub, and contributions are welcome.
        </p>

        <References
          items={[
            { label: 'langchain-chatbot on GitHub', url: 'https://github.com/minhbtrc/langchain-chatbot' },
            { label: 'LangChain documentation', url: 'https://python.langchain.com/docs/', note: 'framework used for model access and chains' },
            { label: 'Presidio data anonymization in LangChain', url: 'https://python.langchain.com/docs/guides/privacy/presidio_data_anonymization/', note: 'the reversible anonymizer the project builds on' },
            { label: 'Microsoft Presidio', url: 'https://microsoft.github.io/presidio/', note: 'PII detection and anonymization' },
            { label: 'LangSmith documentation', url: 'https://docs.smith.langchain.com/', note: 'tracing and debugging' },
          ]}
        />
      </PostBody>
      <PostFooter />
    </Article>
  )
}
