'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, FileText, Mail, Briefcase, GraduationCap } from 'lucide-react'
import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-40 h-40 relative rounded-xl overflow-hidden">
            <Image
              src="/profile.jpeg"
              alt="Minh BTC"
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">Minh BTC</h1>
            <p className="text-xl text-base-content/80 mb-4 flex items-center justify-center md:justify-start gap-2">
              AI Engineer
              <span className="inline-flex items-center justify-center w-5 h-5 bg-orange-500 rounded-full text-white text-xs">
                🇻🇳
              </span>
            </p>
            <p className="text-base-content/70 max-w-2xl mb-6">
              Building intelligent systems with a focus on privacy and efficiency. Passionate about pushing the boundaries of what&apos;s possible with AI and machine learning.
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link 
                href="mailto:contact@minhbtc.blog"
                className="btn btn-sm btn-outline rounded-full gap-2" 
              >
                <Mail className="w-4 h-4" />
                Contact Me
              </Link>
              <Link 
                href="/resume"
                className="btn btn-sm btn-outline rounded-full gap-2"
              >
                <FileText className="w-4 h-4" />
                Resume
              </Link>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">About Me</h2>
          <div className="prose max-w-none text-base-content/80">
            <p>
              Hello! I&apos;m a passionate AI Engineer with expertise in developing intelligent systems that respect user privacy while delivering efficient results. My journey in technology started with a curiosity about how computers could learn and make decisions like humans.
            </p>
            <p>
              What drives me is the potential of AI to solve complex problems across various domains - from healthcare to finance to everyday consumer applications. I believe in building AI systems that are not only powerful but also transparent and ethical.
            </p>
            <p>
              When I&apos;m not coding or diving into research papers, you can find me exploring new hiking trails, experimenting with cooking recipes, or engaging in thoughtful discussions about the future of technology and its impact on society.
            </p>
          </div>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Experience</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="mt-1">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">AI Research Engineer</h3>
                <p className="text-base-content/70 text-sm">TechInnovate AI • 2021 - Present</p>
                <ul className="list-disc list-inside mt-2 text-base-content/80">
                  <li>Developing LLM-based applications with a focus on privacy and efficiency</li>
                  <li>Leading a team of engineers in building retrieval-augmented generation systems</li>
                  <li>Optimizing AI models for production environments</li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="mt-1">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Machine Learning Engineer</h3>
                <p className="text-base-content/70 text-sm">DataVision Labs • 2019 - 2021</p>
                <ul className="list-disc list-inside mt-2 text-base-content/80">
                  <li>Implemented NLP solutions for text classification and sentiment analysis</li>
                  <li>Designed and deployed recommendation systems for e-commerce platforms</li>
                  <li>Collaborated with cross-functional teams to integrate ML models into products</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Education</h2>
          <div className="flex gap-4">
            <div className="mt-1">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">M.S. in Computer Science, AI Specialization</h3>
              <p className="text-base-content/70 text-sm">Stanford University • 2017 - 2019</p>
              <p className="mt-2 text-base-content/80">
                Thesis: &quot;Privacy-Preserving Techniques in Federated Learning Systems&quot;
              </p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Skills & Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">AI & Machine Learning</h3>
              <div className="flex flex-wrap gap-2">
                {['PyTorch', 'TensorFlow', 'LangChain', 'Hugging Face', 'LLMs', 'NLP', 'Computer Vision', 'RAG'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Engineering & Development</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'FastAPI', 'Docker', 'AWS', 'GCP'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Connect */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Let&apos;s Connect</h2>
          <div className="flex gap-4 items-center">
            <Link
              href="https://github.com/minhbtrc"
              target="_blank"
              className="bg-base-200 hover:bg-base-300 p-3 rounded-full transition-colors"
            >
              <SiGithub className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/minhbtcm00/"
              target="_blank"
              className="bg-base-200 hover:bg-base-300 p-3 rounded-full transition-colors"
            >
              <SiLinkedin className="w-5 h-5" />
            </Link>
            <Link
              href="mailto:contact@minhbtc.blog"
              className="bg-base-200 hover:bg-base-300 p-3 rounded-full transition-colors"
            >
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </motion.div>
    </div>
  )
} 