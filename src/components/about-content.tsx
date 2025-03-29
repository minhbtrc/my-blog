'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Mail, Briefcase, GraduationCap, Book, Award, Terminal, Code, Database } from 'lucide-react'
import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons'
import { motion } from 'framer-motion'

export default function AboutContent() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Set mounted to true after component mounts to trigger animations
    const timer = setTimeout(() => {
      setMounted(true)
    }, 100) // Small delay for better effect
    
    return () => clearTimeout(timer)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150
      }
    }
  }

  const timelineItemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 120
      }
    }
  }

  return (
    <motion.div 
      className="w-full max-w-full relative z-10"
      initial="hidden"
      animate={mounted ? "show" : "hidden"}
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Header */}
        <motion.div 
          className="flex flex-col md:flex-row gap-8 items-center md:items-start"
          variants={itemVariants}
        >
          <motion.div 
            className="w-40 h-40 relative rounded-lg overflow-hidden shadow-md border border-slate-300 dark:border-blue-900/40 bg-white dark:bg-slate-800/60"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Image
              src="/new_profile.png"
              alt="Minh Bui Tran Cong"
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
            {/* Code-like overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-800/20 dark:to-[#0e1628]/70 pointer-events-none"></div>
          </motion.div>

          <motion.div className="flex-1 text-center md:text-left" variants={itemVariants}>
            <motion.h1 
              className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-700 dark:from-cyan-400 dark:to-blue-500 font-mono"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: mounted ? 0.2 : 0,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            >
              Minh Bui Tran Cong
            </motion.h1>
            <motion.p 
              className="text-xl text-slate-800 dark:text-slate-300 mb-4 flex items-center justify-center md:justify-start gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: mounted ? 0.3 : 0 }}
            >
              <Terminal className="w-5 h-5 text-blue-700/80 dark:text-cyan-400/70" />
              <span className="font-mono">AI.Engineer()</span>
              <motion.span 
                className="inline-flex items-center justify-center w-5 h-5 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-800 dark:text-white text-xs border border-slate-300 dark:border-blue-900/40"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ 
                  delay: mounted ? 0.5 : 0, 
                  duration: 0.5,
                  repeatDelay: 5,
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              >
                🇻🇳
              </motion.span>
            </motion.p>
            <motion.p 
              className="text-slate-700 dark:text-slate-400 max-w-2xl mb-6 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: mounted ? 0.4 : 0 }}
            >
              AI Engineer with expertise in machine learning and deep learning, specializing in natural language processing (NLP) and Transformer-based architectures. Passionate about optimizing LLM performance using advanced techniques and frameworks.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-3 justify-center md:justify-start"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  href="mailto:minh.btrc@gmail.com"
                  className="inline-flex items-center px-4 py-2 rounded-md bg-white dark:bg-slate-800/70 border border-slate-300 dark:border-blue-900/30 text-blue-700 dark:text-cyan-400 hover:text-blue-800 dark:hover:text-cyan-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-blue-700/40 dark:hover:border-blue-800/40 transition-all text-sm font-mono gap-2 shadow-sm" 
                >
                  <Mail className="w-4 h-4" />
                  contact.me()
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <a
                  href="https://github.com/minhbtrc"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-md bg-white dark:bg-slate-800/70 border border-slate-300 dark:border-blue-900/30 text-slate-800 dark:text-slate-300 hover:text-blue-700 dark:hover:text-cyan-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-blue-800/40 transition-all text-sm font-mono gap-2 shadow-sm" 
                >
                  <SiGithub className="w-4 h-4" />
                  github
                </a>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <a
                  href="https://www.linkedin.com/in/minhbtcm00/"
                  target="_blank"
                  rel="noreferrer" 
                  className="inline-flex items-center px-4 py-2 rounded-md bg-white dark:bg-slate-800/70 border border-slate-300 dark:border-blue-900/30 text-slate-800 dark:text-slate-300 hover:text-blue-700 dark:hover:text-cyan-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-blue-800/40 transition-all text-sm font-mono gap-2 shadow-sm" 
                >
                  <SiLinkedin className="w-4 h-4" />
                  linkedin
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bio Section */}
        <motion.section 
          className="bg-white dark:bg-slate-800/20 border border-slate-300 dark:border-blue-900/20 rounded-lg p-6 backdrop-blur-sm shadow-md mt-12"
          variants={itemVariants}
          whileHover={{ 
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            translateY: -2 
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <motion.h2 
            className="text-2xl font-bold mb-4 border-b border-slate-300 dark:border-blue-900/30 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-700 dark:from-cyan-400 dark:to-blue-400 font-mono flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: mounted ? 0.5 : 0 }}
          >
            <Code className="w-5 h-5 text-blue-800/80 dark:text-cyan-400/70" />
            about.me()
          </motion.h2>
          <motion.div 
            className="text-slate-700 dark:text-slate-300 space-y-4 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: mounted ? 0.6 : 0 }}
          >
            <p>
              AI Engineer by day, LLM whisperer by night. I work with Transformers (the model kind, not the robot kind) to build cool things like question generators, sentiment detectors, and data diggers. Big fan of LangChain, clever hacks, and shipping stuff that works.
            </p>
            <p>
              When I&apos;m not wrangling models, I&apos;m reading AI papers, pretending to be productive with a book, or chasing a football like it owes me money.
            </p>
          </motion.div>
        </motion.section>

        {/* Experience */}
        <motion.section 
          className="bg-white dark:bg-slate-800/20 border border-slate-300 dark:border-blue-900/20 rounded-lg p-6 backdrop-blur-sm shadow-md"
          variants={itemVariants}
          whileHover={{ 
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            translateY: -2 
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <motion.h2 
            className="text-2xl font-bold mb-6 border-b border-slate-300 dark:border-blue-900/30 pb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-700 dark:from-cyan-400 dark:to-blue-400 font-mono flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: mounted ? 0.7 : 0 }}
          >
            <Briefcase className="w-5 h-5 text-blue-800/80 dark:text-cyan-400/70" />
            work.experience()
          </motion.h2>
          
          {/* Timeline container */}
          <motion.div 
            className="relative pl-8 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-blue-600 before:via-cyan-500 before:to-indigo-500 dark:before:from-cyan-400 dark:before:via-blue-500 dark:before:to-indigo-400 space-y-8"
            variants={containerVariants}
          >
            
            <motion.div 
              className="relative hover:translate-x-1 transition-transform duration-300"
              variants={timelineItemVariants}
            >
              {/* Timeline dot */}
              <motion.div 
                className="absolute -left-8 top-0 w-6 h-6 bg-blue-600 dark:bg-cyan-500 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: mounted ? 0.8 : 0,
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }}
              >
                <Briefcase className="w-3 h-3 text-white" />
              </motion.div>
              
              {/* Content */}
              <motion.div 
                className="bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-blue-900/30 rounded-lg p-5 shadow-sm hover:shadow-md transition-all"
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
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
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative hover:translate-x-1 transition-transform duration-300"
              variants={timelineItemVariants}
            >
              {/* Timeline dot */}
              <motion.div 
                className="absolute -left-8 top-0 w-6 h-6 bg-cyan-500 dark:bg-blue-500 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: mounted ? 0.9 : 0,
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }}
              >
                <Briefcase className="w-3 h-3 text-white" />
              </motion.div>
              
              {/* Content */}
              <motion.div 
                className="bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-blue-900/30 rounded-lg p-5 shadow-sm hover:shadow-md transition-all"
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
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
                    {['LLM', 'Langchain', 'Python', 'FastAPI', 'ONNX'].map((tech, i) => (
                      <motion.span 
                        key={tech} 
                        className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-mono"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: mounted ? 1.0 + (i * 0.1) : 0 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative hover:translate-x-1 transition-transform duration-300"
              variants={timelineItemVariants}
            >
              {/* Timeline dot */}
              <motion.div 
                className="absolute -left-8 top-0 w-6 h-6 bg-indigo-500 dark:bg-indigo-400 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: mounted ? 1.0 : 0,
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }}
              >
                <Briefcase className="w-3 h-3 text-white" />
              </motion.div>
              
              {/* Content */}
              <motion.div 
                className="bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-blue-900/30 rounded-lg p-5 shadow-sm hover:shadow-md transition-all"
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
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
                      <motion.span 
                        key={tech} 
                        className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-mono"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: mounted ? 1.0 + (tech === 'PyTorch' ? 0.1 : tech === 'HuggingFace' ? 0.2 : tech === 'TorchScript' ? 0.3 : tech === 'ONNX' ? 0.4 : 0.5) : 0 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Education */}
        <motion.section 
          className="bg-white dark:bg-slate-800/20 border border-slate-300 dark:border-blue-900/20 rounded-lg p-6 backdrop-blur-sm shadow-md"
          variants={itemVariants}
          whileHover={{ 
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            translateY: -2 
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <motion.h2 
            className="text-2xl font-bold mb-6 border-b border-slate-300 dark:border-blue-900/30 pb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-700 dark:from-cyan-400 dark:to-blue-400 font-mono flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: mounted ? 1.1 : 0 }}
          >
            <GraduationCap className="w-5 h-5 text-blue-800/80 dark:text-cyan-400/70" />
            education.history()
          </motion.h2>
          
          {/* Timeline container */}
          <motion.div 
            className="relative pl-8 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:to-blue-600 dark:before:from-indigo-400 dark:before:to-blue-500 space-y-8"
            variants={containerVariants}
          >
            
            <motion.div 
              className="relative hover:translate-x-1 transition-transform duration-300"
              variants={timelineItemVariants}
            >
              {/* Timeline dot */}
              <motion.div 
                className="absolute -left-8 top-0 w-6 h-6 bg-indigo-500 dark:bg-indigo-400 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: mounted ? 1.2 : 0,
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }}
              >
                <GraduationCap className="w-3 h-3 text-white" />
              </motion.div>
              
              {/* Content */}
              <motion.div 
                className="bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-blue-900/30 rounded-lg p-5 shadow-sm hover:shadow-md transition-all"
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
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
                      <motion.span 
                        key={subject} 
                        className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-mono"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: mounted ? 1.3 + (subject === 'Machine Learning' ? 0.1 : subject === 'AI' ? 0.2 : subject === 'Data Structures' ? 0.3 : subject === 'Algorithms' ? 0.4 : 0.5) : 0 }}
                      >
                        {subject}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative hover:translate-x-1 transition-transform duration-300"
              variants={timelineItemVariants}
            >
              {/* Timeline dot */}
              <motion.div 
                className="absolute -left-8 top-0 w-6 h-6 bg-blue-600 dark:bg-blue-500 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: mounted ? 1.4 : 0,
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }}
              >
                <GraduationCap className="w-3 h-3 text-white" />
              </motion.div>
              
              {/* Content */}
              <motion.div 
                className="bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-blue-900/30 rounded-lg p-5 shadow-sm hover:shadow-md transition-all"
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
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
                      <motion.span 
                        key={subject} 
                        className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-mono"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: mounted ? 1.5 + (subject === 'Advanced Math' ? 0.1 : subject === 'Calculus' ? 0.2 : subject === 'Problem Solving' ? 0.3 : subject === 'Logic' ? 0.4 : 0.5) : 0 }}
                      >
                        {subject}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Projects */}
        <motion.section 
          className="bg-white dark:bg-slate-800/20 border border-slate-300 dark:border-blue-900/20 rounded-lg p-6 backdrop-blur-sm shadow-md"
          variants={itemVariants}
          whileHover={{ 
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            translateY: -2 
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <motion.h2 
            className="text-2xl font-bold mb-4 border-b border-slate-300 dark:border-blue-900/30 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-700 dark:from-cyan-400 dark:to-blue-400 font-mono flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: mounted ? 1.6 : 0 }}
          >
            <Database className="w-5 h-5 text-blue-800/80 dark:text-cyan-400/70" />
            projects.showcase()
          </motion.h2>
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: mounted ? 1.7 : 0 }}
          >
            <motion.div 
              className="flex gap-4"
              variants={itemVariants}
            >
              <motion.div 
                className="mt-1"
                variants={itemVariants}
              >
                <motion.div 
                  className="w-10 h-10 rounded-md bg-blue-50 dark:bg-slate-800/70 border border-blue-200 dark:border-blue-900/30 flex items-center justify-center text-blue-700 dark:text-cyan-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: mounted ? 1.8 : 0 }}
                >
                  <Book className="w-5 h-5" />
                </motion.div>
              </motion.div>
              <motion.div 
                className="flex-1"
                variants={itemVariants}
              >
                <motion.h3 
                  className="text-lg font-semibold text-slate-800 dark:text-slate-200 font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: mounted ? 1.9 : 0 }}
                >
                  Langchain.Chatbot()
                </motion.h3>
                <motion.div 
                  className="flex flex-wrap gap-2 my-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: mounted ? 2.0 : 0 }}
                >
                  {['AI', 'LLM', 'Chatbot'].map(tag => (
                    <motion.span 
                      key={tag} 
                      className="px-2 py-0.5 bg-blue-50 dark:bg-slate-800/70 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900/40 rounded-md text-xs font-mono"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: mounted ? 2.1 + (tag === 'AI' ? 0.1 : tag === 'LLM' ? 0.2 : 0.3) : 0 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.p 
                  className="text-slate-700 dark:text-slate-300 font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: mounted ? 2.2 : 0 }}
                >
                  Developed a chatbot using the Langchain framework, integrated with Vertex AI or OpenAI API. Implemented MongoDB for memory management, utilized Gradio and Langchain UI, and incorporated Microsoft Presidio for data anonymization.
                </motion.p>
                <motion.a 
                  href="https://github.com/minhbtrc/langchain-chatbot" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-blue-800 dark:text-cyan-400 inline-flex items-center mt-2 font-mono text-sm transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: mounted ? 2.3 : 0 }}
                >
                  view.project()
                  <motion.span 
                    className="w-4 h-4 ml-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: mounted ? 2.4 : 0 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </motion.a>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex gap-4"
              variants={itemVariants}
            >
              <motion.div 
                className="mt-1"
                variants={itemVariants}
              >
                <motion.div 
                  className="w-10 h-10 rounded-md bg-blue-50 dark:bg-slate-800/70 border border-blue-200 dark:border-blue-900/30 flex items-center justify-center text-blue-700 dark:text-cyan-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: mounted ? 2.5 : 0 }}
                >
                  <Book className="w-5 h-5" />
                </motion.div>
              </motion.div>
              <motion.div 
                className="flex-1"
                variants={itemVariants}
              >
                <motion.h3 
                  className="text-lg font-semibold text-slate-800 dark:text-slate-200 font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: mounted ? 2.6 : 0 }}
                >
                  Covid.Chatbot()
                </motion.h3>
                <motion.div 
                  className="flex flex-wrap gap-2 my-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: mounted ? 2.7 : 0 }}
                >
                  {['AI', 'NLP', 'Healthcare'].map(tag => (
                    <motion.span 
                      key={tag} 
                      className="px-2 py-0.5 bg-blue-50 dark:bg-slate-800/70 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900/40 rounded-md text-xs font-mono"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: mounted ? 2.8 + (tag === 'AI' ? 0.1 : tag === 'NLP' ? 0.2 : 0.3) : 0 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.p 
                  className="text-slate-700 dark:text-slate-300 font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: mounted ? 2.9 : 0 }}
                >
                  Led the development of a consultancy chatbot for SARS-COVID-2 patients, providing symptom assessment and self-care advice. Implemented machine learning models (KNN, SVM) for Intent Classification and developed a Named Entity Recognition system using PhoBERT and CRF.
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Skills */}
        <motion.section 
          className="bg-white dark:bg-slate-800/20 border border-slate-300 dark:border-blue-900/20 rounded-lg p-6 backdrop-blur-sm shadow-md"
          variants={itemVariants}
          whileHover={{ 
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            translateY: -2 
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <motion.h2 
            className="text-2xl font-bold mb-6 border-b border-slate-300 dark:border-blue-900/30 pb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-700 dark:from-cyan-400 dark:to-blue-400 font-mono flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: mounted ? 1.6 : 0 }}
          >
            <Code className="w-5 h-5 text-blue-800/80 dark:text-cyan-400/70" />
            skills.technologies()
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
          >
            <motion.div 
              className="bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-blue-900/30 rounded-lg p-5 shadow-sm hover:shadow-md transition-all group"
              variants={itemVariants}
            >
              <motion.h3 
                className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200 font-mono flex items-center gap-2 group-hover:text-blue-700 dark:group-hover:text-cyan-400 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: mounted ? 1.7 : 0 }}
              >
                <Code className="w-5 h-5 text-blue-800/80 dark:text-cyan-400/70" />
                frameworks.libraries()
              </motion.h3>
              
              <motion.div 
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: mounted ? 1.8 : 0 }}
              >
                {[
                  { name: 'PyTorch', level: 'Advanced' },
                  { name: 'Transformers', level: 'Advanced' },
                  { name: 'Langchain', level: 'Advanced' },
                  { name: 'TensorFlow', level: 'Intermediate' },
                  { name: 'HuggingFace', level: 'Advanced' },
                  { name: 'ONNX', level: 'Intermediate' },
                  { name: 'spaCy', level: 'Intermediate' },
                  { name: 'FastAPI', level: 'Advanced' }
                ].map((framework) => (
                  <motion.div 
                    key={framework.name} 
                    className="group/item px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-md text-sm font-mono relative overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: mounted ? 1.9 + (framework.name === 'PyTorch' ? 0.1 : framework.name === 'Transformers' ? 0.2 : framework.name === 'Langchain' ? 0.3 : framework.name === 'TensorFlow' ? 0.4 : framework.name === 'HuggingFace' ? 0.5 : framework.name === 'ONNX' ? 0.6 : 0.7) : 0 }}
                  >
                    {framework.name}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-400/10 dark:from-blue-600/20 dark:to-cyan-400/20 opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                    <span className="absolute top-0 right-0 bg-blue-600 text-white text-[8px] px-1 opacity-0 group-hover/item:opacity-100 transition-opacity">{framework.level}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-blue-900/30 rounded-lg p-5 shadow-sm hover:shadow-md transition-all group"
              variants={itemVariants}
            >
              <motion.h3 
                className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200 font-mono flex items-center gap-2 group-hover:text-blue-700 dark:group-hover:text-cyan-400 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: mounted ? 1.7 : 0 }}
              >
                <Database className="w-5 h-5 text-blue-800/80 dark:text-cyan-400/70" />
                databases.tools()
              </motion.h3>
              
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: mounted ? 1.8 : 0 }}
              >
                {[
                  { name: 'MongoDB', icon: '🍃' },
                  { name: 'PostgreSQL', icon: '🐘' },
                  { name: 'Redis', icon: '⚡' },
                  { name: 'Docker', icon: '🐳' },
                  { name: 'Git', icon: '📊' },
                  { name: 'AWS', icon: '☁️' },
                  { name: 'GCP', icon: '🌐' }
                ].map((tool) => (
                  <motion.div 
                    key={tool.name} 
                    className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-md text-sm hover:bg-gradient-to-r hover:from-slate-100 hover:to-blue-50 dark:hover:from-slate-800 dark:hover:to-slate-700 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: mounted ? 1.9 + (tool.name === 'MongoDB' ? 0.1 : tool.name === 'PostgreSQL' ? 0.2 : tool.name === 'Redis' ? 0.3 : tool.name === 'Docker' ? 0.4 : tool.name === 'Git' ? 0.5 : tool.name === 'AWS' ? 0.6 : 0.7) : 0 }}
                  >
                    <span className="text-lg">{tool.icon}</span>
                    <span className="font-mono text-sm">{tool.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-blue-900/30 rounded-lg p-5 shadow-sm hover:shadow-md transition-all group"
              variants={itemVariants}
            >
              <motion.h3 
                className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200 font-mono flex items-center gap-2 group-hover:text-blue-700 dark:group-hover:text-cyan-400 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: mounted ? 1.7 : 0 }}
              >
                <Award className="w-5 h-5 text-blue-800/80 dark:text-cyan-400/70" />
                certifications()
              </motion.h3>
              
              <motion.ul 
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: mounted ? 1.8 : 0 }}
              >
                {[
                  { 
                    name: 'AI Agent Fundamentals',
                    url: 'https://cdn-lfs-us-1.hf.co/repos/f2/34/f2344151f60f6027c436821dc61cf3f27a46435de57df8df50ad02b5acca7c07/ea6035c26ce22d5056a869f883823027473d3f7c823763d7e33666a36b2d2b9a?response-content-disposition=inline%3B+filename*%3DUTF-8%27%272025-03-02.png%3B+filename%3D%222025-03-02.png%22%3B&response-content-type=image%2Fpng&Expires=1743219142&Policy=eyJTdGF0ZW1lbnQiOlt7IkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc0MzIxOTE0Mn19LCJSZXNvdXJjZSI6Imh0dHBzOi8vY2RuLWxmcy11cy0xLmhmLmNvL3JlcG9zL2YyLzM0L2YyMzQ0MTUxZjYwZjYwMjdjNDM2ODIxZGM2MWNmM2YyN2E0NjQzNWRlNTdkZjhkZjUwYWQwMmI1YWNjYTdjMDcvZWE2MDM1YzI2Y2UyMmQ1MDU2YTg2OWY4ODM4MjMwMjc0NzNkM2Y3YzgyMzc2M2Q3ZTMzNjY2YTM2YjJkMmI5YT9yZXNwb25zZS1jb250ZW50LWRpc3Bvc2l0aW9uPSomcmVzcG9uc2UtY29udGVudC10eXBlPSoifV19&Signature=DE1Di2xaVrjZsYf%7EJsym-WF86n0fHXK68JOn4de%7EdXF4zAfqvIpvMdfO7dd8%7EkERAD2V6I%7EyLPWCat%7E57bGncUjnt9FHrWI0AT0dDwmkKF8aUqUqBFt4aZYNIFR9pD7n4blD-ijiq%7ECJfTAlUMB%7EXqsrz9Imu4VNfIdhehMoS6EkNzNGRNoMShy5brxocegzh-dz9YTFRgircjTDCfWG0iJqZRJig%7EFBYR2%7EalI%7E1um-j1HL02hxP39b483bHiMVq8fnTw9-aC4bbDoSFjOvA5xsJITk0ZUbpe31KrilV%7ESxhhLU5gZa5z9Ab%7Eg-9SVUpooD3tzqccxsWhkmXeZLAQ__&Key-Pair-Id=K24J24Z295AEI9'
                  },
                  { 
                    name: 'Develop Your AI Skills with Google Gemini and Google Cloud Platform',
                    url: 'https://www.linkedin.com/learning/certificates/786f207a8154d5e7d9e82497fa26826c46243ad0009bbb044c795cb0fad9aabf'
                  },
                  { 
                    name: 'Generative AI with Large Language Models',
                    url: 'https://www.coursera.org/account/accomplishments/certificate/M8QJYLYC9FCD'
                  },
                  {
                    name: 'Google Gemini for Developers',
                    url: 'https://www.linkedin.com/learning/certificates/184dd13911e12c507705d3b1a40d2ac7b843bf700454512fbf7a2034243accf9'
                  }
                ].map((cert) => (
                  <motion.li 
                    key={cert.name} 
                    className="flex items-center gap-2 font-mono text-sm text-slate-800 dark:text-slate-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: mounted ? 1.9 + (cert.name === 'TensorFlow Developer' ? 0.1 : cert.name === 'AWS Certified Cloud Practitioner' ? 0.2 : 0.3) : 0 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-cyan-400"></div>
                    <motion.a 
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: mounted ? 2.0 + (cert.name === 'TensorFlow Developer' ? 0.1 : cert.name === 'AWS Certified Cloud Practitioner' ? 0.2 : 0.3) : 0 }}
                    >
                      {cert.name}
                    </motion.a>
                    <div className="flex-grow border-b border-dashed border-slate-300 dark:border-slate-700 ml-2"></div>
                    <div className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded text-xs font-semibold">Verified</div>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        </motion.section>
      </div>
      
      {/* Page loading indicator */}
      <motion.div
        className="fixed inset-0 bg-white dark:bg-slate-900 z-50 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ pointerEvents: "none" }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0, 1, 0] }}
          transition={{ 
            duration: 1.2, 
            repeat: Infinity,
            repeatType: "loop" 
          }}
          className="w-16 h-16 rounded-full border-4 border-t-blue-500 border-r-blue-500 border-b-indigo-500 border-l-transparent"
        />
      </motion.div>
    </motion.div>
  );
} 