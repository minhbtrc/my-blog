'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Mail, Briefcase, GraduationCap, Book, Award } from 'lucide-react'
import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-slate-900 dark:text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-40 h-40 relative rounded-xl overflow-hidden shadow-md">
            <Image
              src="/profile.jpeg"
              alt="Minh Bui Tran Cong"
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">Minh Bui Tran Cong</h1>
            <p className="text-xl text-slate-700 dark:text-slate-300 mb-4 flex items-center justify-center md:justify-start gap-2">
              AI Engineer
              <span className="inline-flex items-center justify-center w-5 h-5 bg-orange-500 rounded-full text-white text-xs">
                🇻🇳
              </span>
            </p>
            <p className="text-slate-700 dark:text-slate-300 max-w-2xl mb-6">
              AI Engineer with expertise in machine learning and deep learning, specializing in natural language processing (NLP) and Transformer-based architectures. Passionate about optimizing LLM performance using advanced techniques and frameworks.
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link 
                href="mailto:minh.btrc@gmail.com"
                className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/40 transition-colors text-sm font-medium gap-2" 
              >
                <Mail className="w-4 h-4" />
                Contact Me
              </Link>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">About Me</h2>
          <div className="text-slate-700 dark:text-slate-300 space-y-4">
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
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Experience</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="mt-1">
                <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">AI Engineer</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">FPT Software AI Center • 09/2024 - Present</p>
                <ul className="list-disc list-inside mt-2 text-slate-700 dark:text-slate-300">
                  <li>Working with AI solutions and technologies</li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="mt-1">
                <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">AI Engineer</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">SPARTAN • 10/2023 - 11/2024</p>
                <ul className="list-disc list-inside mt-2 text-slate-700 dark:text-slate-300">
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
                <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">AI Engineer</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">TRUONG MINH THINH TECHNOLOGY JSC • 07/2021 - 10/2023</p>
                <ul className="list-disc list-inside mt-2 text-slate-700 dark:text-slate-300">
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
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Education</h2>
          <div className="flex gap-4">
            <div className="mt-1">
              <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Bachelor in Computer Science</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Ho Chi Minh University of Technology • 08/2018 - 04/2023</p>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="mt-1">
              <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Mathematics</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Hung Vuong High School for the Gifted • 08/2015 - 08/2018</p>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Key Projects</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="mt-1">
                <Book className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Langchain Chatbot</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">AI • LLM • Chatbot</p>
                <p className="mt-2 text-slate-700 dark:text-slate-300">
                  Developed a chatbot using the Langchain framework, integrated with Vertex AI or OpenAI API. Implemented MongoDB for memory management, utilized Gradio and Langchain UI, and incorporated Microsoft Presidio for data anonymization.
                </p>
                <a 
                  href="https://github.com/minhbtrc/langchain-chatbot" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center mt-2"
                >
                  View Project
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="mt-1">
                <Book className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Covid Chatbot</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">AI • NLP • Healthcare</p>
                <p className="mt-2 text-slate-700 dark:text-slate-300">
                  Led the development of a consultancy chatbot for SARS-COVID-2 patients, providing symptom assessment and self-care advice. Implemented machine learning models (KNN, SVM) for Intent Classification and developed a Named Entity Recognition system using PhoBERT and CRF.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Skills & Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">NLP & LLM</h3>
              <div className="flex flex-wrap gap-2">
                {['LangChain', 'Transformers', 'HuggingFace', 'LLMs', 'BERT', 'Question Generation', 'Sentiment Analysis', 'Fine-tuning', 'RAG', 'NER'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Programming & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'PyTorch', 'Docker', 'Kubernetes', 'MongoDB', 'ONNX', 'TorchScript', 'DVC', 'GCP', 'REST APIs'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Certificates */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Certificates</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="mt-1">
                <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">LangChain & Vector Databases in Production</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Activeloop • 08/2023</p>
                <a href="https://learn.activeloop.ai/certificates/snnl0bjoa4" target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm">View Certificate</a>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="mt-1">
                <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Generative AI with Large Language Models</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Coursera • 08/2023</p>
                <a href="https://www.coursera.org/account/accomplishments/certificate/M8Q,JYLYC9FCD" target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm">View Certificate</a>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="mt-1">
                <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Natural Language Processing Specialization</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Coursera • 03/2022</p>
                <a href="https://www.coursera.org/account/accomplishments/specialization/certificate/8JVX3M2H36T2" target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm">View Certificate</a>
              </div>
            </div>
          </div>
        </section>

        {/* Connect */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Connect</h2>
          <div className="flex gap-4">
            <Link
              href="https://github.com/minhbtrc"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 transition-colors"
            >
              <SiGithub className="w-5 h-5" />
              <span>GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/minhbtcm00/"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 transition-colors"
            >
              <SiLinkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </Link>
            <Link
              href="mailto:contact@minhbtc.blog"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </Link>
          </div>
        </section>
      </motion.div>
    </div>
  )
} 