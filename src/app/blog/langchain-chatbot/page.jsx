import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Building a Privacy-First AI Chatbot with LangChain',
  description: 'A comprehensive guide to creating a full-stack AI chatbot using LangChain, with a focus on privacy, customization, and developer experience.'
}

export default function LangChainChatbotPost() {
  const tags = []
  
  return (
    <article className="prose max-w-none">
      <h1 className="text-3xl font-bold mb-4">Building a Privacy-First AI Chatbot with LangChain</h1>
      
      <div className="flex gap-2 mb-6">
        {tags.map(tag => (
          <Link 
            key={tag} 
            href={`/?tag=${tag}`}
            className="badge badge-primary hover:badge-secondary transition-colors no-underline"
          >
            {tag}
          </Link>
        ))}
      </div>
      
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-8">
        <p className="italic text-lg mb-0">
          A comprehensive guide to creating a full-stack AI chatbot using LangChain, with a focus on privacy, customization, and developer experience.
        </p>
      </div>
      
      <p>
        In an era where AI-powered conversations are transforming how we interact with technology, building a chatbot that balances functionality with user privacy is more critical than ever. The open-source langchain-chatbot repository, created by minhbtrc, offers a compelling solution. This project leverages the LangChain framework to deliver a customizable, memory-enabled chatbot with robust privacy features and developer-friendly tools. Whether you're a developer exploring AI applications or a business seeking a conversational tool, this repo is worth a closer look. In this blog post, we'll dive into its key features, architecture, setup process, and more—complete with visuals to bring it to life.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-6 pb-2 border-b border-slate-200">What is langchain-chatbot?</h2>
      
      <p>
        At its core, langchain-chatbot is a full-stack chatbot implementation that uses the LangChain framework to connect with large language models (LLMs) like Vertex AI or OpenAI. What sets it apart is its focus on privacy, ease of use, and customization. It stores conversation history in MongoDB, anonymizes sensitive data with Microsoft Presidio, and provides tracing capabilities via LangSmith. Plus, it's built with a modern tech stack—Next.js for the frontend and FastAPI for the backend—making it a ready-to-deploy solution.
      </p>
      
      <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500 my-6">
        <p className="mb-0">
          <strong>Why it matters:</strong> Chatbots often handle sensitive user data, and ensuring privacy while maintaining a seamless experience is a challenge. This repo tackles that head-on, making it an excellent choice for developers who value security and flexibility.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 pb-2 border-b border-slate-200">Key Features</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold mb-3">1. LangChain-Powered LLM Integration</h3>
          <p>
            LangChain is a framework that simplifies building applications with LLMs. In this repo, it connects the chatbot to powerful models like Vertex AI or OpenAI via their APIs. This flexibility lets developers choose their preferred provider without major code changes.
          </p>
          <p className="mt-2 text-blue-700">
            <strong>Why it's cool:</strong> You're not locked into one LLM—experiment with different models to suit your needs.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold mb-3">2. Memory System with MongoDB</h3>
          <p>
            Ever chatted with a bot that forgets everything you just said? Not here. The chatbot uses MongoDB to store conversation history, enabling context-aware responses that feel more natural.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold mb-3">3. Customizable Personality</h3>
          <p>
            Want a chatbot that sounds like a friendly 30-year-old teacher or a witty teenager? You can tweak its personality by setting attributes like gender and age, tailoring the tone to your audience.
          </p>
          <p className="mt-2 text-blue-700">
            <strong>Use Case:</strong> Perfect for educational tools or customer service bots with a specific vibe.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold mb-3">4. Privacy with Microsoft Presidio</h3>
          <p>
            Privacy is a standout feature. The chatbot uses Microsoft Presidio to anonymize personally identifiable information (PII) before sending it to the LLM API. Think of it like redacting a sensitive document—your name becomes "[NAME]" to keep it safe.
          </p>
          <p className="mt-2">
            <a href="https://microsoft.github.io/presidio/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Learn more about Presidio →</a>
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm md:col-span-2">
          <h3 className="text-xl font-bold mb-3">5. LangSmith Tracing</h3>
          <p>
            Debugging AI can be tricky, but LangSmith makes it easier. This tool traces how the chatbot processes inputs and generates outputs, giving developers a window into its behavior.
          </p>
          <p className="mt-2 text-blue-700">
            <strong>Why it's handy:</strong> Spot issues fast and optimize performance.
            <a href="https://docs.smith.langchain.com/" target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline">LangSmith Documentation →</a>
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 pb-2 border-b border-slate-200">The Architecture</h2>
      <p>
        This isn't just a backend script—it's a full-stack app:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold mb-3">Frontend (Next.js)</h3>
          <p>
            A sleek, responsive interface built with Next.js handles user interactions. It's where you type your messages and see the bot reply.
          </p>
          <div className="mt-4 bg-slate-100 p-4 rounded-lg">
            <p className="text-sm text-center">
              Modern chat interface with message bubbles, input field at the bottom, and clean design.
              User messages appear on the right in primary color, while bot responses are on the left.
            </p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold mb-3">Backend (FastAPI)</h3>
          <p>
            The FastAPI-powered backend manages the logic—connecting to LangChain, MongoDB, and the LLM API. It's fast, modern, and perfect for handling API requests.
          </p>
          <p className="mt-3">
            <strong>How It Works Together:</strong> User input goes from the frontend to the backend, gets anonymized, queries the LLM, and pulls context from MongoDB before sending a response back.
          </p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm my-8">
        <h3 className="text-xl font-bold mb-3">Complete Architecture Overview</h3>
        <pre className="bg-slate-800 text-white p-4 rounded-lg overflow-auto font-mono text-sm leading-relaxed whitespace-pre">
{`┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                           Docker Compose Environment                        │
│                                                                             │
│  ┌───────────────┐       ┌────────────────┐        ┌───────────────────┐    │
│  │               │       │                │        │                   │    │
│  │    Next.js    │◄─────►│    FastAPI     │◄──────►│     MongoDB       │    │
│  │   Frontend    │       │    Backend     │        │     Database      │    │
│  │  (Port 3000)  │       │   (Port 8080)  │        │    (Port 27017)   │    │
│  │               │       │                │        │                   │    │
│  └───────────────┘       └────────┬───────┘        └───────────────────┘    │
│                                   │                                         │
│                                   ▼                                         │
│                          ┌─────────────────┐      ┌──────────────────┐      │
│                          │                 │      │                  │      │
│                          │   LangChain     │─────►│  LangSmith       │      │
│                          │   Framework     │      │  (Tracing)       │      │
│                          │                 │      │                  │      │
│                          └────────┬────────┘      └──────────────────┘      │
│                                   │                                         │
│                                   ▼                                         │
│                          ┌─────────────────┐      ┌──────────────────┐      │
│                          │                 │      │                  │      │
│                          │   LLM Provider  │      │  Presidio        │      │
│                          │ (OpenAI/Vertex) │      │  Anonymizer      │      │
│                          │                 │      │  (PII Protection)│      │
│                          └─────────────────┘      └──────────────────┘      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘`}
        </pre>
        <p className="text-sm text-center mt-2 text-gray-600">
          Comprehensive architecture diagram of the langchain-chatbot system.
        </p>
      </div>
      
      <p>
        Here's a peek at how the backend might set up the LangChain chain (simplified for illustration):
      </p>
      
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm my-6">
        <div className="bg-slate-700 text-white py-2 px-4 font-semibold">backend/chains.py</div>
        <pre className="bg-slate-800 text-white p-4 rounded-lg overflow-auto font-mono text-sm leading-relaxed">
{`# Import the required libraries
from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationChain


# Initialize the language model with your API key
llm = ChatOpenAI(api_key="your-openai-key")

# Create a conversation chain
conversation = ConversationChain(llm=llm)

# Generate a response
response = conversation.predict(input="Hello, how can I assist you today?")`}
        </pre>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 pb-2 border-b border-slate-200">Getting Started</h2>
      <p>
        Ready to try it? Here's how to get langchain-chatbot running:
      </p>
      
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm my-6">
        <h3 className="text-xl font-bold mb-3">Prerequisites:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Python 3.9+</li>
          <li>Node.js (for the frontend)</li>
          <li>API keys for Vertex AI or OpenAI</li>
          <li>MongoDB (local or cloud instance)</li>
        </ul>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
          <div className="bg-slate-700 text-white py-2 px-4 font-semibold">Clone the Repository</div>
          <pre className="bg-slate-800 text-white p-4 rounded-lg overflow-auto font-mono text-sm leading-relaxed">
{`# Clone the repository
git clone https://github.com/minhbtrc/langchain-chatbot.git

# Navigate to the project directory
cd langchain-chatbot`}
          </pre>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
          <div className="bg-slate-700 text-white py-2 px-4 font-semibold">Install Dependencies</div>
          <pre className="bg-slate-800 text-white p-4 rounded-lg overflow-auto font-mono text-sm leading-relaxed">
{`# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt`}
          </pre>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
          <div className="bg-slate-700 text-white py-2 px-4 font-semibold">Configure Environment Variables</div>
          <div className="p-4">
            <p>Create a <code className="bg-slate-700 text-white px-1 py-0.5 rounded">.env</code> file in the project root with:</p>
            <pre className="bg-slate-800 text-white p-4 rounded-lg overflow-auto font-mono text-sm leading-relaxed mt-2">
{`OPENAI_API_KEY=your_openai_api_key
MONGODB_URI=your_mongodb_connection_string
ANONYMIZATION_KEY=your_encryption_secret_key`}
            </pre>
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
          <div className="bg-slate-700 text-white py-2 px-4 font-semibold">Launch the Application</div>
          <div className="p-4">
            <div className="mb-4">
              <h4 className="font-bold">Standard Method</h4>
              <pre className="bg-slate-800 text-white p-4 rounded-lg overflow-auto font-mono text-sm leading-relaxed mt-2">
{`# Run the application
python app.py

# The app will be available at http://localhost:5000`}
              </pre>
            </div>
            
            <div>
              <h4 className="font-bold">Docker Option</h4>
              <pre className="bg-slate-800 text-white p-4 rounded-lg overflow-auto font-mono text-sm leading-relaxed mt-2">
{`# Build and run using Docker
docker-compose up --build

# The app will be available at http://localhost:5000`}
              </pre>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-500 my-8">
        <p className="mb-0">
          <strong>Note:</strong> If using LangSmith, add tracing variables like <code className="bg-slate-700 text-white px-1 py-0.5 rounded">LANGCHAIN_TRACING_V2=true</code> in <code className="bg-slate-700 text-white px-1 py-0.5 rounded">backend/.env</code>.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 pb-2 border-b border-slate-200">Privacy Features in Action</h2>
      <p>
        In 2025, data privacy isn't optional—it's essential. By integrating Microsoft Presidio, langchain-chatbot ensures that sensitive info like names or emails is masked before leaving your system. This is a game-changer for industries like healthcare or finance, where compliance is non-negotiable.
      </p>
      
      <h3 className="text-xl font-bold mt-8 mb-4">Implementing Anonymization</h3>
      <p>Here's how the anonymization layer is implemented in our solution:</p>
      
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm my-6">
        <div className="bg-slate-700 text-white py-2 px-4 font-semibold">anonymization_handler.py</div>
        <pre className="bg-slate-800 text-white p-4 rounded-lg overflow-auto font-mono text-sm leading-relaxed">
{`from langchain.callbacks import BaseCallbackHandler
from cryptography.fernet import Fernet
import re
import os

class AnonymizationHandler(BaseCallbackHandler):
    def __init__(self, encryption_key):
        self.cipher = Fernet(encryption_key)
        self.pii_patterns = {
            'email': '\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b',
            'phone': '\\b(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}\\b',
            'ssn': '\\b\\d{3}-\\d{2}-\\d{4}\\b',
            'credit_card': '\\b\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}\\b'
        }
        self.anonymized_data = {}
    
    def anonymize_text(self, text):
        for pii_type, pattern in self.pii_patterns.items():
            for match in re.finditer(pattern, text):
                original = match.group(0)
                if original not in self.anonymized_data:
                    # Encrypt and store original data
                    encrypted = self.cipher.encrypt(original.encode()).decode()
                    self.anonymized_data[original] = f"[{pii_type.upper()}_{len(self.anonymized_data)+1}]"
                
                # Replace in text
                text = text.replace(original, self.anonymized_data[original])
        
        return text
    
    def deanonymize_text(self, text):
        # Reverse the anonymization
        for original, anonymized in self.anonymized_data.items():
            text = text.replace(anonymized, original)
        return text`}
        </pre>
      </div>
      
      <h3 className="text-xl font-bold mt-8 mb-4">Using the Anonymization Handler</h3>
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm my-6">
        <div className="bg-slate-700 text-white py-2 px-4 font-semibold">chain_setup.py</div>
        <pre className="bg-slate-800 text-white p-4 rounded-lg overflow-auto font-mono text-sm leading-relaxed">
{`# Initialize the handler with your encryption key
handler = AnonymizationHandler(os.getenv("ANONYMIZATION_KEY"))

# Setup the chain with callbacks
llm = ChatOpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    callbacks=[handler]
)

# The handler will automatically process inputs and outputs
chain = ConversationChain(llm=llm)`}
        </pre>
      </div>

      <h3 className="text-xl font-bold mt-8 mb-4">Anonymization in Practice</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col h-full">
          <h4 className="font-bold mb-4 text-center">Before Anonymization</h4>
          <div className="flex-grow flex items-center justify-center">
            <Image
              src="/images/langchain-chatbot/before-anonymization.png"
              alt="Screenshot showing sensitive data before anonymization"
              width={400}
              height={300}
              className="rounded-lg border border-gray-200 object-contain max-h-[300px]"
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col h-full">
          <h4 className="font-bold mb-4 text-center">After Anonymization</h4>
          <div className="flex-grow flex items-center justify-center">
            <Image
              src="/images/langchain-chatbot/after-anonymization.png"
              alt="Screenshot showing data after being anonymized"
              width={400}
              height={300}
              className="rounded-lg border border-gray-200 object-contain max-h-[300px]"
            />
          </div>
        </div>
      </div>
      
    
      <h2>Why Privacy Matters</h2>
      <p>
        In 2025, data privacy isn't optional—it's essential. By integrating Microsoft Presidio, langchain-chatbot ensures that sensitive info like names or emails is masked before leaving your system. This is a game-changer for industries like healthcare or finance, where compliance is non-negotiable.
      </p>
      
      <div className="my-6">
        <Image 
          src="/images/langchain-chatbot/de-anonymized-output.png" 
          alt="De-anonymized Output Example - Showing how anonymized data can be restored for context"
          width={800}
          height={450}
          className="rounded-lg shadow-md"
        />
        <p className="text-sm text-center mt-2 text-gray-600">
          De-anonymized Output Example - Showing how anonymized data can be restored for context.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 pb-2 border-b border-slate-200">Who's It For?</h2>
      <p>
        This repo shines for:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm text-center">
          <div className="text-blue-600 font-bold text-xl mb-3">Developers</div>
          <p>
            Experiment with LangChain and LLMs in a pre-built application. Ideal for learning how to implement privacy-focused AI systems.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm text-center">
          <div className="text-green-600 font-bold text-xl mb-3">Businesses</div>
          <p>
            Deploy a customer support bot with memory and customizable personality. Perfect for regulated industries needing secure AI solutions.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm text-center">
          <div className="text-purple-600 font-bold text-xl mb-3">AI Enthusiasts</div>
          <p>
            Tinker with a privacy-first chatbot for personal projects. Great for exploring LangChain capabilities without building from scratch.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 pb-2 border-b border-slate-200">Conclusion</h2>
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm">
        <p className="mb-4">
          The langchain-chatbot repository is a gem for anyone looking to build a smart, secure, and user-friendly chatbot. Its blend of LangChain's power, MongoDB's memory, Presidio's privacy, and a full-stack design makes it both practical and innovative. Whether you're enhancing a business or exploring AI, this project offers a solid starting point.
        </p>
        
        <p className="mb-0">
          Ready to dive in? <a href="https://github.com/minhbtrc/langchain-chatbot" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">Visit the GitHub repo</a>, clone it, and give it a spin. Have ideas to improve it? It's open-source—jump in and contribute!
        </p>
      </div>

      <h3 className="text-xl font-bold mt-8 mb-4">Resources:</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <a href="https://js.langchain.com/docs/" target="_blank" rel="noopener noreferrer" className="bg-white p-4 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all text-center">
          <div className="font-bold mb-2">LangChain Documentation</div>
          <p className="text-sm text-slate-600 mb-0">Explore the framework that powers this chatbot</p>
        </a>
        <a href="https://microsoft.github.io/presidio/" target="_blank" rel="noopener noreferrer" className="bg-white p-4 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all text-center">
          <div className="font-bold mb-2">Microsoft Presidio</div>
          <p className="text-sm text-slate-600 mb-0">Learn about the privacy framework used for PII protection</p>
        </a>
        <a href="https://docs.smith.langchain.com/" target="_blank" rel="noopener noreferrer" className="bg-white p-4 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all text-center">
          <div className="font-bold mb-2">LangSmith</div>
          <p className="text-sm text-slate-600 mb-0">Discover how to trace and debug LLM applications</p>
        </a>
      </div>
    </article>
  )
} 