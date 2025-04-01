'use client'

import { useState, useRef, useEffect } from 'react'
import { useTheme } from 'next-themes'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Download, Briefcase, GraduationCap, Award, Code, Brain, Database, Mail, Calendar, MapPin } from 'lucide-react'
import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons'

export default function ResumePage() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const resumeRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // Handle PDF generation
  const generatePDF = async () => {
    if (!resumeRef.current) return
    
    try {
      setIsGenerating(true)
      
      // Force light theme for PDF
      document.documentElement.classList.remove('dark')
      document.documentElement.style.background = 'white'
      
      // Small delay to ensure styles are applied
      await new Promise(resolve => setTimeout(resolve, 100))
      
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      })
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })
      
      const imgWidth = 210
      const imgHeight = canvas.height * imgWidth / canvas.width
      
      // Potentially add multiple pages if content is very long
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      pdf.save('Minh_Bui_Resume.pdf')
      
      // Restore theme
      if (isDark) {
        document.documentElement.classList.add('dark')
      }
      document.documentElement.style.background = ''
      
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setIsGenerating(false)
    }
  }
  
  // Reset theme when navigating away
  useEffect(() => {
    return () => {
      document.documentElement.style.background = ''
    }
  }, [])

  return (
    <div className="min-h-screen py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button and download button */}
        <div className="flex justify-between items-center mb-4">
          <Link href="/about" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to About
          </Link>
          
          <button 
            onClick={generatePDF}
            disabled={isGenerating}
            className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-emerald-200 dark:hover:bg-emerald-800/60 transition-colors disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            {isGenerating ? 'Generating...' : 'Download PDF'}
          </button>
        </div>
        
        {/* Resume Content */}
        <div 
          ref={resumeRef}
          className="bg-white text-neutral-900 p-5 rounded-lg shadow-lg border border-neutral-200 max-w-4xl mx-auto text-sm"
        >
          {/* Resume Header - more compact */}
          <header className="mb-4 pb-3 border-b border-neutral-200">
            <div className="flex justify-between items-start gap-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 relative rounded-full overflow-hidden bg-emerald-50 border border-emerald-100">
                  <Image
                    src="/new_profile.png"
                    alt="Minh Bui Tran Cong"
                    width={64}
                    height={64}
                    className="object-cover"
                    unoptimized={true}
                  />
                </div>
                
                <div>
                  <h1 className="text-xl font-bold tracking-tight">MINH BUI TRAN CONG</h1>
                  <p className="text-emerald-700 font-medium text-sm">AI Engineer</p>
                  
                  <div className="flex flex-wrap gap-3 mt-1 text-xs text-neutral-700">
                    <span className="inline-flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      minhbtc@example.com
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      Ho Chi Minh City, Vietnam
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <a 
                  href={process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/minhbtc"} 
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
                >
                  <SiGithub className="h-4 w-4" />
                </a>
                <a 
                  href={process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/in/minhbtc"}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
                >
                  <SiLinkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div className="mt-3">
              <p className="text-neutral-700 max-w-3xl text-xs">
                Building real-world AI systems with a focus on large language models and their applications. 
                Passionate about creating tools that bridge the gap between cutting-edge research and practical solutions.
              </p>
            </div>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Left Column - Skills & Education - more compact */}
            <div className="space-y-5">
              {/* Skills Section */}
              <section>
                <h2 className="text-base font-bold mb-2 flex items-center gap-1.5 text-emerald-800">
                  <Brain className="h-4 w-4" />
                  <span>Skills</span>
                </h2>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium text-xs mb-1 text-neutral-800">AI & Machine Learning</h3>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded text-xs font-medium text-emerald-700">
                        PyTorch
                        <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                      </span>
                      <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded text-xs font-medium text-emerald-700">
                        LangChain
                        <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                      </span>
                      <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded text-xs font-medium text-emerald-700">
                        Transformers
                        <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                      </span>
                      <span className="inline-flex items-center gap-1 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded text-xs font-medium text-blue-700">
                        TensorFlow
                      </span>
                      <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded text-xs font-medium text-emerald-700">
                        RAG
                        <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                      </span>
                      <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded text-xs font-medium text-emerald-700">
                        LLMs
                        <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                      </span>
                      <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded text-xs font-medium text-emerald-700">
                        NLP
                        <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-xs mb-1 text-neutral-800">Languages & Frameworks</h3>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded text-xs font-medium text-emerald-700">
                        Python
                        <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                      </span>
                      <span className="inline-flex items-center gap-1 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded text-xs font-medium text-blue-700">
                        TypeScript
                      </span>
                      <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded text-xs font-medium text-emerald-700">
                        FastAPI
                        <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                      </span>
                      <span className="inline-flex items-center gap-1 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded text-xs font-medium text-blue-700">
                        JavaScript
                      </span>
                      <span className="inline-flex items-center gap-1 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded text-xs font-medium text-blue-700">
                        React
                      </span>
                      <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded text-xs font-medium text-emerald-700">
                        Scikit-learn
                        <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-xs mb-1 text-neutral-800">Tools & Infrastructure</h3>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded text-xs font-medium text-emerald-700">
                        Docker
                        <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                      </span>
                      <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded text-xs font-medium text-emerald-700">
                        MongoDB
                        <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                      </span>
                      <span className="inline-flex items-center gap-1 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded text-xs font-medium text-blue-700">
                        AWS
                      </span>
                      <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded text-xs font-medium text-emerald-700">
                        Git
                        <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                      </span>
                      <span className="inline-flex items-center gap-1 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded text-xs font-medium text-blue-700">
                        GCP
                      </span>
                      <span className="inline-flex items-center gap-1 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded text-xs font-medium text-blue-700">
                        Kubernetes
                      </span>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Education Section */}
              <section>
                <h2 className="text-base font-bold mb-2 flex items-center gap-1.5 text-emerald-800">
                  <GraduationCap className="h-4 w-4" />
                  <span>Education</span>
                </h2>
                
                <div className="space-y-2.5">
                  <div>
                    <h3 className="font-medium text-xs text-neutral-800">Bachelor of Computer Science</h3>
                    <p className="text-xs text-neutral-700">Ho Chi Minh University of Technology</p>
                    <p className="text-[10px] text-neutral-500">Aug 2018 – Apr 2023</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-xs text-neutral-800">Mathematics Gifted Program</h3>
                    <p className="text-xs text-neutral-700">Hung Vuong High School for the Gifted</p>
                    <p className="text-[10px] text-neutral-500">Aug 2015 – Aug 2018</p>
                  </div>
                </div>
              </section>
              
              {/* Certifications Section - only show most important ones */}
              <section>
                <h2 className="text-base font-bold mb-2 flex items-center gap-1.5 text-emerald-800">
                  <Award className="h-4 w-4" />
                  <span>Certifications</span>
                </h2>
                
                <div className="space-y-1.5">
                  <div>
                    <h3 className="font-medium text-xs text-neutral-800">AI Agents Fundamentals</h3>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-700">Hugging Face</span>
                      <span className="text-neutral-500">Mar 2025</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-xs text-neutral-800">Google Gemini for Developers</h3>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-700">LinkedIn</span>
                      <span className="text-neutral-500">Dec 2024</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-xs text-neutral-800">Generative AI with LLMs</h3>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-700">Coursera</span>
                      <span className="text-neutral-500">Aug 2023</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-xs text-neutral-800">LangChain & Vector DBs</h3>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-700">Activeloop</span>
                      <span className="text-neutral-500">Aug 2023</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            
            {/* Right Column - Experience & Projects - more compact */}
            <div className="md:col-span-2 space-y-5">
              {/* Work Experience */}
              <section>
                <h2 className="text-base font-bold mb-2 flex items-center gap-1.5 text-emerald-800">
                  <Briefcase className="h-4 w-4" />
                  <span>Work Experience</span>
                </h2>
                
                <div className="space-y-4">
                  <div className="relative pl-3 border-l border-emerald-200">
                    <div className="absolute -left-[3px] top-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-xs text-neutral-800">AI Engineer – FPT Software AI Center</h3>
                          <p className="text-[10px] text-neutral-700">Building AI solutions for enterprise clients</p>
                        </div>
                        <div className="flex items-center text-[10px] text-neutral-500">
                          <span>Sep 2024 – Present</span>
                        </div>
                      </div>
                      
                      <ul className="mt-1 text-[10px] text-neutral-700 list-disc list-outside ml-3 space-y-0.5">
                        <li>Research and implement techniques for document extraction and analysis</li>
                        <li>Develop RAG chatbots using latest LLM technologies</li>
                        <li>Lead implementation of AI solutions for enterprise clients</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="relative pl-3 border-l border-neutral-200">
                    <div className="absolute -left-[3px] top-1.5 w-1.5 h-1.5 rounded-full bg-neutral-400"></div>
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-xs text-neutral-800">AI Engineer – SPARTAN</h3>
                          <p className="text-[10px] text-neutral-700">Led development of PDF parsing solutions with LLMs</p>
                        </div>
                        <div className="flex items-center text-[10px] text-neutral-500">
                          <span>Mar 2023 – Aug 2024</span>
                        </div>
                      </div>
                      
                      <ul className="mt-1 text-[10px] text-neutral-700 list-disc list-outside ml-3 space-y-0.5">
                        <li>Implemented advanced document parsing using large language models</li>
                        <li>Created comprehensive pipeline for data mining with seamless integration</li>
                        <li>Developed Langflow application for drag-and-drop PDF parsing</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="relative pl-3 border-l border-neutral-200">
                    <div className="absolute -left-[3px] top-1.5 w-1.5 h-1.5 rounded-full bg-neutral-400"></div>
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-xs text-neutral-800">AI Consultant – J. D. Power</h3>
                          <p className="text-[10px] text-neutral-700">Developed AI solutions for PDF processing and RAG workflows</p>
                        </div>
                        <div className="flex items-center text-[10px] text-neutral-500">
                          <span>Oct 2023 – May 2024</span>
                        </div>
                      </div>
                      
                      <ul className="mt-1 text-[10px] text-neutral-700 list-disc list-outside ml-3 space-y-0.5">
                        <li>Built reusable pipelines for PDF parsing using Azure Document Intelligence</li>
                        <li>Applied LLMs (GPT-4, Llama2) to solve domain-specific tasks</li>
                        <li>Integrated LangChain and LlamaIndex to improve RAG performance</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="relative pl-3 border-l border-neutral-200">
                    <div className="absolute -left-[3px] top-1.5 w-1.5 h-1.5 rounded-full bg-neutral-400"></div>
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-xs text-neutral-800">NLP Engineer – Vingroup Big Data Institute</h3>
                          <p className="text-[10px] text-neutral-700">Developed NLP solutions for healthcare applications</p>
                        </div>
                        <div className="flex items-center text-[10px] text-neutral-500">
                          <span>Jun 2022 – Feb 2023</span>
                        </div>
                      </div>
                      
                      <ul className="mt-1 text-[10px] text-neutral-700 list-disc list-outside ml-3 space-y-0.5">
                        <li>Led the development of a consultancy chatbot for SARS-COVID-2 patients</li>
                        <li>Implemented ML models (KNN, SVM) for Intent Classification</li>
                        <li>Developed a Named Entity Recognition system using PhoBERT and CRF</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Projects Section */}
              <section>
                <h2 className="text-base font-bold mb-2 flex items-center gap-1.5 text-emerald-800">
                  <Code className="h-4 w-4" />
                  <span>Projects</span>
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="border border-neutral-200 rounded-md p-2">
                    <div>
                      <h3 className="font-semibold text-xs text-neutral-800">The AI-Driven Blog</h3>
                      <div className="flex gap-1 mt-0.5">
                        <span className="px-1 py-0.5 bg-neutral-100 rounded text-[10px] text-neutral-600">llm</span>
                        <span className="px-1 py-0.5 bg-neutral-100 rounded text-[10px] text-neutral-600">cursor</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-neutral-700 mt-1">
                      Blog project using ChatGPT and Cursor. As a back-end enthusiast, I relied on these AI tools to help shape both design and content.
                    </p>
                  </div>
                  
                  <div className="border border-neutral-200 rounded-md p-2">
                    <div>
                      <h3 className="font-semibold text-xs text-neutral-800">Langchain Chatbot</h3>
                      <div className="flex gap-1 mt-0.5">
                        <span className="px-1 py-0.5 bg-neutral-100 rounded text-[10px] text-neutral-600">ai</span>
                        <span className="px-1 py-0.5 bg-neutral-100 rounded text-[10px] text-neutral-600">llm</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-neutral-700 mt-1">
                      Chatbot using Langchain framework with Vertex AI/OpenAI. Implemented MongoDB for memory management and Microsoft Presidio for data anonymization.
                    </p>
                  </div>
                  
                  <div className="border border-neutral-200 rounded-md p-2">
                    <div>
                      <h3 className="font-semibold text-xs text-neutral-800">PDF Processing Pipeline</h3>
                      <div className="flex gap-1 mt-0.5">
                        <span className="px-1 py-0.5 bg-neutral-100 rounded text-[10px] text-neutral-600">pdf</span>
                        <span className="px-1 py-0.5 bg-neutral-100 rounded text-[10px] text-neutral-600">python</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-neutral-700 mt-1">
                      Comprehensive PDF processing pipeline extracting structured data from documents using deep learning models to classify document types.
                    </p>
                  </div>
                  
                  <div className="border border-neutral-200 rounded-md p-2">
                    <div>
                      <h3 className="font-semibold text-xs text-neutral-800">COVID-19 Consultation Chatbot</h3>
                      <div className="flex gap-1 mt-0.5">
                        <span className="px-1 py-0.5 bg-neutral-100 rounded text-[10px] text-neutral-600">healthcare</span>
                        <span className="px-1 py-0.5 bg-neutral-100 rounded text-[10px] text-neutral-600">ml</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-neutral-700 mt-1">
                      Chatbot providing symptom assessment and self-care advice for SARS-COVID-2 patients. Used intent classification with KNN/SVM, and NER.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}