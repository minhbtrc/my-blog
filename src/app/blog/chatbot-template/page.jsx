import {
    BlogPostStyle,
    CodeSnippet,
    InfoBox,
    ImageWithCaption,
    FeatureGrid,
    QuoteBlock,
    StorySection,
    PersonalNote,
    TLDR
} from '@/components/BlogPostStyle'
import { Code, Zap, Database, Lock, Globe, Terminal, Layers, Cpu, ArrowRight, Shield, Box, GitBranch } from 'lucide-react'

export const metadata = {
    title: 'Introducing Chatbot Template: The Framework I Wish I Had Sooner',
    description: 'Why I built a modular, privacy-first backend framework for AI apps, and how it saves me from boilerplate hell.'
}

export default function ChatbotTemplatePage() {
    return (
        <BlogPostStyle
            title="Introducing Chatbot Template"
            subtitle="The Framework I Wish I Had Sooner"
            date="2025-11-22"
            readingTime="6 min read"
            tags={["ai", "fastapi", "python", "template", "opensource"]}
            coverImage={{
                src: "/images/blog/chatbot-template-cover.png",
                alt: "Abstract visualization of the Chatbot Template architecture",
                caption: "Modular architecture meeting privacy-first design"
            }}
            author={{
                name: "MinhBTC",
                avatar: "/images/avatar.jpg"
            }}
        >
            <TLDR>
                I got tired of rewriting the same boilerplate for every AI project. So I built <strong>Chatbot Template</strong>: a production-ready, privacy-first FastAPI framework with modular "Experts" for RAG, Research, and Q&A. It's open-source, Docker-ready, and saves me hours of setup time.
            </TLDR>

            <StorySection>
                If you've built one AI chatbot, you've built them all. Or at least, that's how it felt to me about six months ago.
            </StorySection>

            <p>
                I found myself in a loop: <code>mkdir new-bot</code>, <code>pip install fastapi langchain</code>, copy-paste the same database connection code, rewrite the same streaming logic, and re-implement the same half-baked memory system. It was tedious, error-prone, and frankly, boring.
            </p>

            <PersonalNote>
                The breaking point? When I realized I had implemented 4 different versions of "chat history" across 4 different repos, and none of them were compatible. I felt like a digital hoarder of bad code.
            </PersonalNote>

            <p>
                I needed a foundation. Something solid enough for production but flexible enough for my weekend experiments. I wanted <strong>FastAPI</strong> speed, <strong>LangChain</strong> power, and a <strong>privacy-first</strong> mindset baked in from day one.
            </p>

            <p>
                So, I built <span className="font-semibold text-blue-600 dark:text-blue-400">Chatbot Template</span>.
            </p>

            <h2>Core Philosophy: Modular Experts</h2>

            <p>
                The central idea is simple: Your bot shouldn't just be one giant prompt. It should be a collection of <strong>Experts</strong>.
            </p>

            <FeatureGrid
                features={[
                    {
                        title: "The Expert Pattern",
                        description: "Instead of a monolithic chain, the system routes requests to specialized classes. Need RAG? Call the RAGExpert. Need web search? DeepResearchExpert is your friend.",
                        icon: <Layers className="w-5 h-5 text-blue-500" />,
                        color: "border-blue-500"
                    },
                    {
                        title: "Dependency Injection",
                        description: "Everything is injected. Database connections, LLM providers, memory stores. This makes testing a breeze and swapping OpenAI for Azure (or local Llama) a one-line config change.",
                        icon: <GitBranch className="w-5 h-5 text-purple-500" />,
                        color: "border-purple-500"
                    }
                ]}
            />

            <CodeSnippet
                language="python"
                title="src/experts/base.py"
                caption="The core contract. Every expert must know how to stream a response."
            >
                {`class BaseExpert(ABC):
    @abstractmethod
    async def generate_response(
        self, 
        message: str, 
        history: List[Message], 
        **kwargs
    ) -> AsyncGenerator[str, None]:
        """
        The core contract. 
        Every expert must know how to stream a response.
        """
        pass`}
            </CodeSnippet>

            <h2>Paranoid by Default</h2>

            <p>
                In 2025, sending raw user data to an LLM API is... risky. That's why I integrated <strong>Microsoft Presidio</strong> directly into the pipeline.
            </p>

            <InfoBox type="warning" title="The Anonymization Layer">
                <p>
                    Before any text leaves your server, it passes through an anonymizer. Names, emails, phone numbers—they all get replaced with placeholders like <code>[PERSON_1]</code> or <code>[EMAIL_ADDRESS]</code>.
                </p>
                <div className="mt-4 flex flex-col md:flex-row gap-4 items-center justify-center">
                    <div className="bg-white dark:bg-neutral-900 p-4 rounded border border-neutral-200 dark:border-neutral-700 w-full">
                        <div className="text-xs text-neutral-500 mb-1">Input</div>
                        <div className="font-mono text-sm">"Call Minh at 555-0199"</div>
                    </div>
                    <ArrowRight className="text-neutral-400 hidden md:block" />
                    <div className="bg-white dark:bg-neutral-900 p-4 rounded border border-neutral-200 dark:border-neutral-700 w-full">
                        <div className="text-xs text-neutral-500 mb-1">LLM Sees</div>
                        <div className="font-mono text-sm">"Call [PERSON] at [PHONE]"</div>
                    </div>
                </div>
            </InfoBox>

            <h2>What's in the Box?</h2>

            <FeatureGrid
                features={[
                    {
                        title: "FastAPI Backend",
                        description: "Async by default, auto-generated OpenAPI docs, and Pydantic validation everywhere.",
                        icon: <Zap className="w-5 h-5 text-green-500" />,
                        color: "border-green-500"
                    },
                    {
                        title: "MongoDB Memory",
                        description: "Persistent sessions that actually remember context. No more 'I forgot what we were talking about.'",
                        icon: <Database className="w-5 h-5 text-amber-500" />,
                        color: "border-amber-500"
                    },
                    {
                        title: "Docker Ready",
                        description: "`docker-compose up` and you're done. Includes Mongo, the API, and a Streamlit UI for testing.",
                        icon: <Box className="w-5 h-5 text-blue-500" />,
                        color: "border-blue-500"
                    },
                    {
                        title: "Model Agnostic",
                        description: "Switch between OpenAI, Azure, Vertex AI, or local LlamaCpp models via environment variables.",
                        icon: <Cpu className="w-5 h-5 text-purple-500" />,
                        color: "border-purple-500"
                    }
                ]}
            />

            <h2>Start Building</h2>

            <StorySection>
                I built this template to save myself time, but I'm open-sourcing it because I think we all need better starting points than "Hello World."
            </StorySection>

            <div className="flex justify-center my-8">
                <a
                    href="https://github.com/minhbtrc/chatbot-template"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all transform hover:scale-105 font-bold text-lg shadow-lg"
                >
                    <Globe className="w-5 h-5" />
                    Clone the Repo
                </a>
            </div>

            <p className="italic text-center">
                Go forth and build something smarter than a regex bot.
            </p>
        </BlogPostStyle>
    )
}
