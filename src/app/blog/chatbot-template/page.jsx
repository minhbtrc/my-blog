import { Article, Callout, CodeBlock, Definitions, Lead, PostBody, PostFooter, PostHeader, References } from '@/components/post'

export const metadata = {
  title: 'Introducing Chatbot Template: A Production-Ready AI Framework',
  description: 'A modular, privacy-first backend framework for AI chat applications built with FastAPI, LangChain and MongoDB.'
}

export default function ChatbotTemplatePage() {
  return (
    <Article>
      <PostHeader
        title="Introducing Chatbot Template"
        subtitle="A modular, privacy-first FastAPI backend for AI chat applications."
        author="Minh Bui"
        date="2025-11-22"
        readingTime="5 min read"
        tags={['ai', 'fastapi', 'python', 'template', 'opensource']}
      />
      <PostBody>
        <Lead>
          <p>
            Chatbot Template is an open-source backend that packages the parts every chat application ends up needing: streaming responses, conversation memory, retrieval, model configuration and personal-data anonymization. It is organized around small specialist classes called experts, so new workflows can be added without touching shared infrastructure.
          </p>
        </Lead>

        <h2>Why I built it</h2>
        <p>
          Each new AI prototype started the same way: create a project, install FastAPI and LangChain, copy over database code, rewrite the streaming logic and reimplement conversation memory. After a while I had four incompatible versions of chat history spread across four repositories.
        </p>
        <p>
          I wanted one foundation that was solid enough for production use and flexible enough for experiments, with privacy handled from the start.
        </p>

        <h2>Design: modular experts</h2>
        <p>
          Instead of a single large prompt or chain, requests are routed to specialized classes. Each expert implements the same contract, so the rest of the application does not need to know how a response is produced.
        </p>
        <Definitions
          items={[
            { term: 'Expert pattern', text: 'A request is routed to a specialist: RAGExpert for document questions, DeepResearchExpert for web research, and so on.' },
            { term: 'Dependency injection', text: 'Database connections, model providers and memory stores are injected. Tests can substitute fakes, and moving from OpenAI to Azure or a local model is a configuration change.' },
          ]}
        />
        <CodeBlock title="src/experts/base.py" language="python">
{`class BaseExpert(ABC):
    @abstractmethod
    async def generate_response(
        self,
        message: str,
        history: List[Message],
        **kwargs,
    ) -> AsyncGenerator[str, None]:
        """Every expert must know how to stream a response."""
        ...`}
        </CodeBlock>

        <h2>Privacy by default</h2>
        <p>
          Sending raw user data to a third-party model API creates risk, so Microsoft Presidio is part of the request pipeline. Before text leaves the server, names, emails and phone numbers are replaced with placeholders.
        </p>
        <Callout label="Example">
          <p>
            Input: <code>Call Minh at 555-0199</code>
          </p>
          <p>
            Sent to the model: <code>Call [PERSON] at [PHONE]</code>
          </p>
        </Callout>

        <h2>What is included</h2>
        <Definitions
          items={[
            { term: 'FastAPI backend', text: 'Async by default, with generated OpenAPI documentation and Pydantic validation.' },
            { term: 'MongoDB memory', text: 'Persistent sessions so a conversation keeps its context across requests.' },
            { term: 'Docker setup', text: 'docker-compose starts MongoDB, the API and a Streamlit interface for testing.' },
            { term: 'Model flexibility', text: 'OpenAI, Azure, Vertex AI or a local LlamaCpp model, selected through environment variables.' },
          ]}
        />

        <h2>Getting it</h2>
        <p>
          The project is open source. It is meant as a starting point that is more useful than a blank repository, and contributions are welcome.
        </p>

        <References
          items={[
            { label: 'chatbot-template on GitHub', url: 'https://github.com/minhbtrc/chatbot-template' },
            { label: 'Microsoft Presidio', url: 'https://microsoft.github.io/presidio/', note: 'PII detection and anonymization' },
          ]}
        />
      </PostBody>
      <PostFooter />
    </Article>
  )
}
