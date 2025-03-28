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
              AI Engineer by day, LLM whisperer by night. I work with Transformers (the model kind, not the robot kind) to build cool things like question generators, sentiment detectors, and data diggers. Big fan of LangChain, clever hacks, and shipping stuff that works.
            </p>
            <p>
              When I'm not wrangling models, I'm reading AI papers, pretending to be productive with a book, or chasing a football like it owes me money.
            </p>
          </div>
        </section>

        {/* Experience */}
        <section className="bg-white dark:bg-slate-800/20 border border-slate-300 dark:border-blue-900/20 rounded-lg p-6 backdrop-blur-sm shadow-md">
          <h2 className="text-2xl font-bold mb-6 border-b border-slate-300 dark:border-blue-900/30 pb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-700 dark:from-cyan-400 dark:to-blue-400 font-mono flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-800/80 dark:text-cyan-400/70" />
            work.experience()
          </h2>
          
          {/* Timeline container */}
          <div className="relative pl-8 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-blue-600 before:via-cyan-500 before:to-indigo-500 dark:before:from-cyan-400 dark:before:via-blue-500 dark:before:to-indigo-400 space-y-8">
            
            <div className="relative hover:translate-x-1 transition-transform duration-300">
              {/* Timeline dot */}
              <div className="absolute -left-8 top-0 w-6 h-6 bg-blue-600 dark:bg-cyan-500 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center animate-pulse">
                <Briefcase className="w-3 h-3 text-white" />
              </div>
              
              {/* Content */}
              <div className="bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-blue-900/30 rounded-lg p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 font-mono">AI.Engineer()</h3>
                    <p className="text-blue-700 dark:text-cyan-400 text-sm font-medium">FPT Software AI Center</p>
                  </div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-blue-900/30 font-mono">
                    09/2024 - Present <span className="ml-1.5 w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  </div>
                </div>
                <ul className="list-disc list-outside ml-5 text-slate-700 dark:text-slate-300 font-light space-y-1.5">
                  <li>Working with AI solutions and technologies</li>
                </ul>
              </div>
            </div>
            
            <div className="relative hover:translate-x-1 transition-transform duration-300">
              {/* Timeline dot */}
              <div className="absolute -left-8 top-0 w-6 h-6 bg-cyan-500 dark:bg-blue-500 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center">
                <Briefcase className="w-3 h-3 text-white" />
              </div>
              
              {/* Content */}
              <div className="bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-blue-900/30 rounded-lg p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 font-mono">AI.Engineer()</h3>
                    <p className="text-blue-700 dark:text-cyan-400 text-sm font-medium">SPARTAN</p>
                  </div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-blue-900/30 font-mono">
                    10/2023 - 11/2024
                  </div>
                </div>
                <ul className="list-disc list-outside ml-5 text-slate-700 dark:text-slate-300 font-light space-y-1.5">
                  <li>Led development of <span className="text-blue-700 dark:text-cyan-400 font-medium">PDF Parser</span> module, implementing advanced document parsing techniques</li>
                  <li>Leveraged <span className="text-blue-700 dark:text-cyan-400 font-medium">Large Language Models (LLMs)</span> to extract and format data from PDF files</li>
                  <li>Created a comprehensive pipeline for data mining services with seamless integration</li>
                  <li>Developed an application with <span className="text-blue-700 dark:text-cyan-400 font-medium">Langflow</span> for drag-and-drop PDF parsing flow creation</li>
                  <li>Implemented and improved APIs for robust and scalable backend services</li>
                </ul>
                
                {/* Technologies used */}
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/30">
                  <div className="flex flex-wrap gap-2">
                    {['LLM', 'Langchain', 'Python', 'FastAPI', 'ONNX'].map(tech => (
                      <span key={tech} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative hover:translate-x-1 transition-transform duration-300">
              {/* Timeline dot */}
              <div className="absolute -left-8 top-0 w-6 h-6 bg-indigo-500 dark:bg-indigo-400 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center">
                <Briefcase className="w-3 h-3 text-white" />
              </div>
              
              {/* Content */}
              <div className="bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-blue-900/30 rounded-lg p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 font-mono">AI.Engineer()</h3>
                    <p className="text-blue-700 dark:text-cyan-400 text-sm font-medium">TRUONG MINH THINH TECHNOLOGY JSC</p>
                  </div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-blue-900/30 font-mono">
                    07/2021 - 10/2023
                  </div>
                </div>
                <ul className="list-disc list-outside ml-5 text-slate-700 dark:text-slate-300 font-light space-y-1.5">
                  <li>Designed and implemented chatbot scenarios based on pre-defined scripts</li>
                  <li>Researched and implemented <span className="text-blue-700 dark:text-cyan-400 font-medium">state-of-the-art</span> techniques for specific AI tasks</li>
                  <li>Developed question generation models using <span className="text-blue-700 dark:text-cyan-400 font-medium">BARTPho</span> and <span className="text-blue-700 dark:text-cyan-400 font-medium">Marian</span> architectures</li>
                  <li>Built sentiment analysis models to classify user messages</li>
                  <li>Fine-tuned LLM pretrained models using <span className="text-blue-700 dark:text-cyan-400 font-medium">SFT Trainer</span> and <span className="text-blue-700 dark:text-cyan-400 font-medium">LoRA</span></li>
                  <li>Optimized models with <span className="text-blue-700 dark:text-cyan-400 font-medium">ONNX</span> and <span className="text-blue-700 dark:text-cyan-400 font-medium">TorchScript</span> for improved inference time</li>
                  <li>Applied prompt engineering techniques and integrated <span className="text-blue-700 dark:text-cyan-400 font-medium">Langchain</span> for dynamic interactions</li>
                </ul>
                
                {/* Technologies used */}
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/30">
                  <div className="flex flex-wrap gap-2">
                    {['PyTorch', 'HuggingFace', 'TorchScript', 'ONNX', 'Langchain'].map(tech => (
                      <span key={tech} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="bg-white dark:bg-slate-800/20 border border-slate-300 dark:border-blue-900/20 rounded-lg p-6 backdrop-blur-sm shadow-md">
          <h2 className="text-2xl font-bold mb-6 border-b border-slate-300 dark:border-blue-900/30 pb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-700 dark:from-cyan-400 dark:to-blue-400 font-mono flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-800/80 dark:text-cyan-400/70" />
            education.history()
          </h2>
          
          {/* Timeline container */}
          <div className="relative pl-8 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:to-blue-600 dark:before:from-indigo-400 dark:before:to-blue-500 space-y-8">
            
            <div className="relative hover:translate-x-1 transition-transform duration-300">
              {/* Timeline dot */}
              <div className="absolute -left-8 top-0 w-6 h-6 bg-indigo-500 dark:bg-indigo-400 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center">
                <GraduationCap className="w-3 h-3 text-white" />
              </div>
              
              {/* Content */}
              <div className="bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-blue-900/30 rounded-lg p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 font-mono">Bachelor.ComputerScience()</h3>
                    <p className="text-blue-700 dark:text-cyan-400 text-sm font-medium">Ho Chi Minh University of Technology</p>
                  </div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-blue-900/30 font-mono">
                    08/2018 - 04/2023
                  </div>
                </div>
                
                {/* Topics studied */}
                <div className="mt-3">
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Key Subjects:</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Machine Learning', 'AI', 'Data Structures', 'Algorithms', 'Deep Learning'].map(subject => (
                      <span key={subject} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-mono">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative hover:translate-x-1 transition-transform duration-300">
              {/* Timeline dot */}
              <div className="absolute -left-8 top-0 w-6 h-6 bg-blue-600 dark:bg-blue-500 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center">
                <GraduationCap className="w-3 h-3 text-white" />
              </div>
              
              {/* Content */}
              <div className="bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-blue-900/30 rounded-lg p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 font-mono">Mathematics.GiftedProgram()</h3>
                    <p className="text-blue-700 dark:text-cyan-400 text-sm font-medium">Hung Vuong High School for the Gifted</p>
                  </div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-blue-900/30 font-mono">
                    08/2015 - 08/2018
                  </div>
                </div>
                
                {/* Topics studied */}
                <div className="mt-3">
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Focus Areas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Advanced Math', 'Calculus', 'Problem Solving', 'Logic', 'Statistics'].map(subject => (
                      <span key={subject} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-mono">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
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
          <h2 className="text-2xl font-bold mb-6 border-b border-slate-300 dark:border-blue-900/30 pb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-700 dark:from-cyan-400 dark:to-blue-400 font-mono flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-800/80 dark:text-cyan-400/70" />
            skills.technologies()
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-blue-900/30 rounded-lg p-5 shadow-sm hover:shadow-md transition-all group">
              <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200 font-mono flex items-center gap-2 group-hover:text-blue-700 dark:group-hover:text-cyan-400 transition-colors">
                <Terminal className="w-5 h-5 text-blue-800/80 dark:text-cyan-400/70" />
                programming.languages()
              </h3>
              
              <div className="space-y-3">
                {[
                  { name: 'Python', level: 95 },
                  { name: 'JavaScript', level: 85 },
                  { name: 'TypeScript', level: 80 },
                  { name: 'Java', level: 70 },
                  { name: 'C++', level: 65 }
                ].map((lang) => (
                  <div key={lang.name} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-300">{lang.name}</span>
                      <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">{lang.level}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 dark:from-blue-500 dark:to-cyan-300" 
                        style={{ width: `${lang.level}%`, transition: 'width 1s ease-in-out' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-blue-900/30 rounded-lg p-5 shadow-sm hover:shadow-md transition-all group">
              <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200 font-mono flex items-center gap-2 group-hover:text-blue-700 dark:group-hover:text-cyan-400 transition-colors">
                <Code className="w-5 h-5 text-blue-800/80 dark:text-cyan-400/70" />
                frameworks.libraries()
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'PyTorch', level: 'Advanced' },
                  { name: 'Transformers', level: 'Advanced' },
                  { name: 'Langchain', level: 'Advanced' },
                  { name: 'TensorFlow', level: 'Intermediate' },
                  { name: 'FastAPI', level: 'Advanced' },
                  { name: 'React', level: 'Intermediate' },
                  { name: 'Next.js', level: 'Intermediate' },
                  { name: 'Tailwind CSS', level: 'Advanced' }
                ].map((framework) => (
                  <div 
                    key={framework.name} 
                    className="group/item px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-md text-sm font-mono relative overflow-hidden"
                  >
                    {framework.name}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-400/10 dark:from-blue-600/20 dark:to-cyan-400/20 opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                    <span className="absolute top-0 right-0 bg-blue-600 text-white text-[8px] px-1 opacity-0 group-hover/item:opacity-100 transition-opacity">{framework.level}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-blue-900/30 rounded-lg p-5 shadow-sm hover:shadow-md transition-all group">
              <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200 font-mono flex items-center gap-2 group-hover:text-blue-700 dark:group-hover:text-cyan-400 transition-colors">
                <Database className="w-5 h-5 text-blue-800/80 dark:text-cyan-400/70" />
                databases.tools()
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: 'MongoDB', icon: '🍃' },
                  { name: 'PostgreSQL', icon: '🐘' },
                  { name: 'Redis', icon: '⚡' },
                  { name: 'Docker', icon: '🐳' },
                  { name: 'Git', icon: '📊' },
                  { name: 'AWS', icon: '☁️' },
                  { name: 'GCP', icon: '🌐' }
                ].map((tool) => (
                  <div 
                    key={tool.name} 
                    className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-md text-sm hover:bg-gradient-to-r hover:from-slate-100 hover:to-blue-50 dark:hover:from-slate-800 dark:hover:to-slate-700 transition-colors"
                  >
                    <span className="text-lg">{tool.icon}</span>
                    <span className="font-mono text-sm">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-blue-900/30 rounded-lg p-5 shadow-sm hover:shadow-md transition-all group">
              <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200 font-mono flex items-center gap-2 group-hover:text-blue-700 dark:group-hover:text-cyan-400 transition-colors">
                <Award className="w-5 h-5 text-blue-800/80 dark:text-cyan-400/70" />
                certifications()
              </h3>
              
              <ul className="space-y-3">
                {[
                  'TensorFlow Developer',
                  'AWS Certified Cloud Practitioner',
                  'Google Cloud Professional Data Engineer'
                ].map((cert) => (
                  <li 
                    key={cert} 
                    className="flex items-center gap-2 font-mono text-sm text-slate-800 dark:text-slate-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-cyan-400"></div>
                    <span>{cert}</span>
                    <div className="flex-grow border-b border-dashed border-slate-300 dark:border-slate-700 ml-2"></div>
                    <div className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded text-xs font-semibold">Verified</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 