'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Mail, Briefcase, GraduationCap, Book, Award, Terminal, Code, Database } from 'lucide-react'
import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons'

export default function AboutContent() {
  return (
    <div className="w-full max-w-full relative z-10">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-40 h-40 relative rounded-lg overflow-hidden shadow-md border border-slate-300 dark:border-blue-900/40 bg-white dark:bg-slate-800/60">
            <Image
              src="/new_profile.png"
              alt="Minh Bui Tran Cong"
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
            {/* Code-like overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-800/20 dark:to-[#0e1628]/70 pointer-events-none"></div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-700 dark:from-cyan-400 dark:to-blue-500 font-mono">Minh Bui Tran Cong</h1>
            <p className="text-xl text-slate-800 dark:text-slate-300 mb-4 flex items-center justify-center md:justify-start gap-2">
              <Terminal className="w-5 h-5 text-blue-700/80 dark:text-cyan-400/70" />
              <span className="font-mono">AI.Engineer()</span>
              <span className="inline-flex items-center justify-center w-5 h-5 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-800 dark:text-white text-xs border border-slate-300 dark:border-blue-900/40">
                🇻🇳
              </span>
            </p>
            <p className="text-slate-700 dark:text-slate-400 max-w-2xl mb-6 font-light">
              AI Engineer with expertise in machine learning and deep learning, specializing in natural language processing (NLP) and Transformer-based architectures. Passionate about optimizing LLM performance using advanced techniques and frameworks.
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link 
                href="mailto:minh.btrc@gmail.com"
                className="inline-flex items-center px-4 py-2 rounded-md bg-white dark:bg-slate-800/70 border border-slate-300 dark:border-blue-900/30 text-blue-700 dark:text-cyan-400 hover:text-blue-800 dark:hover:text-cyan-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-blue-700/40 dark:hover:border-blue-800/40 transition-all text-sm font-mono gap-2 shadow-sm" 
              >
                <Mail className="w-4 h-4" />
                contact.me()
              </Link>
              <a
                href="https://github.com/minhbtrc"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-md bg-white dark:bg-slate-800/70 border border-slate-300 dark:border-blue-900/30 text-slate-800 dark:text-slate-300 hover:text-blue-700 dark:hover:text-cyan-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-blue-800/40 transition-all text-sm font-mono gap-2 shadow-sm" 
              >
                <SiGithub className="w-4 h-4" />
                github
              </a>
              <a
                href="https://www.linkedin.com/in/minhbtcm00/"
                target="_blank"
                rel="noreferrer" 
                className="inline-flex items-center px-4 py-2 rounded-md bg-white dark:bg-slate-800/70 border border-slate-300 dark:border-blue-900/30 text-slate-800 dark:text-slate-300 hover:text-blue-700 dark:hover:text-cyan-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-blue-800/40 transition-all text-sm font-mono gap-2 shadow-sm" 
              >
                <SiLinkedin className="w-4 h-4" />
                linkedin
              </a>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <section className="bg-white dark:bg-slate-800/20 border border-slate-300 dark:border-blue-900/20 rounded-lg p-6 backdrop-blur-sm shadow-md mt-12">
          <h2 className="text-2xl font-bold mb-4 border-b border-slate-300 dark:border-blue-900/30 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-700 dark:from-cyan-400 dark:to-blue-400 font-mono flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-800/80 dark:text-cyan-400/70" />
            about.me()
          </h2>
          <div className="text-slate-700 dark:text-slate-300 space-y-4 font-light">
            <p>
              I am an AI Engineer with extensive expertise in machine learning and deep learning, specializing in natural language processing (NLP) and Transformer-based architectures. My experience includes applying Large Language Models (LLMs) to diverse tasks such as question generation, sentiment analysis, and data extraction.
            </p>
            <p>
              I am passionate about optimizing LLM performance using advanced techniques and frameworks like Langchain. I am particularly eager to expand my skills in deploying LLMs to production environments and am enthusiastic about opportunities to learn and contribute in this area.
            </p>
            <p>
              In my free time, I enjoy reading books, researching AI papers, and playing football to maintain a healthy work-life balance.
            </p>
          </div>
        </section>

        {/* Experience */}
        <section className="bg-white dark:bg-slate-800/20 border border-slate-300 dark:border-blue-900/20 rounded-lg p-6 backdrop-blur-sm shadow-md">
          <h2 className="text-2xl font-bold mb-4 border-b border-slate-300 dark:border-blue-900/30 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-700 dark:from-cyan-400 dark:to-blue-400 font-mono flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-800/80 dark:text-cyan-400/70" />
            work.experience()
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="mt-1">
                <div className="w-10 h-10 rounded-md bg-blue-50 dark:bg-slate-800/70 border border-blue-200 dark:border-blue-900/30 flex items-center justify-center text-blue-700 dark:text-cyan-400">
                  <Briefcase className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 font-mono">AI.Engineer()</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-2 font-mono">FPT Software AI Center • 09/2024 - Present</p>
                <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 font-light pl-1">
                  <li>Working with AI solutions and technologies</li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="mt-1">
                <div className="w-10 h-10 rounded-md bg-blue-50 dark:bg-slate-800/70 border border-blue-200 dark:border-blue-900/30 flex items-center justify-center text-blue-700 dark:text-cyan-400">
                  <Briefcase className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 font-mono">AI.Engineer()</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-2 font-mono">SPARTAN • 10/2023 - 11/2024</p>
                <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 font-light pl-1">
                  <li>Led development of PDF Parser module, implementing advanced document parsing techniques</li>
                  <li>Leveraged Large Language Models (LLMs) to extract and format data from PDF files</li>
                  <li>Created a comprehensive pipeline for data mining services with seamless integration</li>
                  <li>Developed an application with Langflow for drag-and-drop PDF parsing flow creation</li>
                  <li>Implemented and improved APIs for robust and scalable backend services</li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="mt-1">
                <div className="w-10 h-10 rounded-md bg-blue-50 dark:bg-slate-800/70 border border-blue-200 dark:border-blue-900/30 flex items-center justify-center text-blue-700 dark:text-cyan-400">
                  <Briefcase className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 font-mono">AI.Engineer()</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-2 font-mono">TRUONG MINH THINH TECHNOLOGY JSC • 07/2021 - 10/2023</p>
                <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 font-light pl-1">
                  <li>Designed and implemented chatbot scenarios based on pre-defined scripts</li>
                  <li>Researched and implemented state-of-the-art techniques for specific AI tasks</li>
                  <li>Developed question generation models using BARTPho and Marian architectures</li>
                  <li>Built sentiment analysis models to classify user messages</li>
                  <li>Fine-tuned LLM pretrained models using SFT Trainer and LoRA</li>
                  <li>Optimized models with ONNX and TorchScript for improved inference time</li>
                  <li>Applied prompt engineering techniques and integrated Langchain for dynamic interactions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="bg-white dark:bg-slate-800/20 border border-slate-300 dark:border-blue-900/20 rounded-lg p-6 backdrop-blur-sm shadow-md">
          <h2 className="text-2xl font-bold mb-4 border-b border-slate-300 dark:border-blue-900/30 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-700 dark:from-cyan-400 dark:to-blue-400 font-mono flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-800/80 dark:text-cyan-400/70" />
            education.history()
          </h2>
          <div className="flex gap-4">
            <div className="mt-1">
              <div className="w-10 h-10 rounded-md bg-blue-50 dark:bg-slate-800/70 border border-blue-200 dark:border-blue-900/30 flex items-center justify-center text-blue-700 dark:text-cyan-400">
                <GraduationCap className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 font-mono">Bachelor.ComputerScience()</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-mono">Ho Chi Minh University of Technology • 08/2018 - 04/2023</p>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="mt-1">
              <div className="w-10 h-10 rounded-md bg-blue-50 dark:bg-slate-800/70 border border-blue-200 dark:border-blue-900/30 flex items-center justify-center text-blue-700 dark:text-cyan-400">
                <GraduationCap className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 font-mono">Mathematics.GiftedProgram()</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-mono">Hung Vuong High School for the Gifted • 08/2015 - 08/2018</p>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="bg-white dark:bg-slate-800/20 border border-slate-300 dark:border-blue-900/20 rounded-lg p-6 backdrop-blur-sm shadow-md">
          <h2 className="text-2xl font-bold mb-4 border-b border-slate-300 dark:border-blue-900/30 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-700 dark:from-cyan-400 dark:to-blue-400 font-mono flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-800/80 dark:text-cyan-400/70" />
            projects.showcase()
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="mt-1">
                <div className="w-10 h-10 rounded-md bg-blue-50 dark:bg-slate-800/70 border border-blue-200 dark:border-blue-900/30 flex items-center justify-center text-blue-700 dark:text-cyan-400">
                  <Book className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 font-mono">Langchain.Chatbot()</h3>
                <div className="flex flex-wrap gap-2 my-2">
                  {['AI', 'LLM', 'Chatbot'].map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-blue-50 dark:bg-slate-800/70 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900/40 rounded-md text-xs font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 font-light">
                  Developed a chatbot using the Langchain framework, integrated with Vertex AI or OpenAI API. Implemented MongoDB for memory management, utilized Gradio and Langchain UI, and incorporated Microsoft Presidio for data anonymization.
                </p>
                <a 
                  href="https://github.com/minhbtrc/langchain-chatbot" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-blue-800 dark:text-cyan-400 inline-flex items-center mt-2 font-mono text-sm transition-colors"
                >
                  view.project()
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="mt-1">
                <div className="w-10 h-10 rounded-md bg-blue-50 dark:bg-slate-800/70 border border-blue-200 dark:border-blue-900/30 flex items-center justify-center text-blue-700 dark:text-cyan-400">
                  <Book className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 font-mono">Covid.Chatbot()</h3>
                <div className="flex flex-wrap gap-2 my-2">
                  {['AI', 'NLP', 'Healthcare'].map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-blue-50 dark:bg-slate-800/70 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900/40 rounded-md text-xs font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 font-light">
                  Led the development of a consultancy chatbot for SARS-COVID-2 patients, providing symptom assessment and self-care advice. Implemented machine learning models (KNN, SVM) for Intent Classification and developed a Named Entity Recognition system using PhoBERT and CRF.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="bg-white dark:bg-slate-800/20 border border-slate-300 dark:border-blue-900/20 rounded-lg p-6 backdrop-blur-sm shadow-md">
          <h2 className="text-2xl font-bold mb-4 border-b border-slate-300 dark:border-blue-900/30 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-700 dark:from-cyan-400 dark:to-blue-400 font-mono flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-800/80 dark:text-cyan-400/70" />
            skills.technologies()
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200 font-mono flex items-center gap-2">
                <Terminal className="w-5 h-5 text-blue-800/80 dark:text-cyan-400/70" />
                programming.languages()
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'JavaScript', 'TypeScript', 'Java', 'C++'].map(lang => (
                  <span key={lang} className="px-2 py-0.5 bg-blue-50 dark:bg-slate-800/70 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900/40 rounded-md text-xs font-mono">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200 font-mono flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-800/80 dark:text-cyan-400/70" />
                frameworks.libraries()
              </h3>
              <div className="flex flex-wrap gap-2">
                {['PyTorch', 'TensorFlow', 'Transformers', 'Langchain', 'FastAPI', 'React', 'Next.js', 'Tailwind CSS'].map(framework => (
                  <span key={framework} className="px-2 py-0.5 bg-blue-50 dark:bg-slate-800/70 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900/40 rounded-md text-xs font-mono">
                    {framework}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200 font-mono flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-800/80 dark:text-cyan-400/70" />
                databases.tools()
              </h3>
              <div className="flex flex-wrap gap-2">
                {['MongoDB', 'PostgreSQL', 'Redis', 'Docker', 'Git', 'AWS', 'GCP'].map(tool => (
                  <span key={tool} className="px-2 py-0.5 bg-blue-50 dark:bg-slate-800/70 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900/40 rounded-md text-xs font-mono">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200 font-mono flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-800/80 dark:text-cyan-400/70" />
                certifications()
              </h3>
              <div className="flex flex-wrap gap-2">
                {['TensorFlow Developer', 'AWS Certified Cloud Practitioner', 'Google Cloud Professional Data Engineer'].map(cert => (
                  <span key={cert} className="px-2 py-0.5 bg-blue-50 dark:bg-slate-800/70 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900/40 rounded-md text-xs font-mono">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 