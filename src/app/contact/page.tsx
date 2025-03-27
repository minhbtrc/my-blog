'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Send } from 'lucide-react'
import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields')
      return
    }
    
    setFormStatus('submitting')
    
    // Simulate form submission - replace with actual API call
    try {
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(formData)
      // })
      
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setFormStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      // Reset form status after 3 seconds
      setTimeout(() => {
        setFormStatus('idle')
      }, 3000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setFormStatus('error')
      
      // Reset form status after 3 seconds
      setTimeout(() => {
        setFormStatus('idle')
      }, 3000)
    }
  }
  
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 text-slate-800 dark:text-slate-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Interested in discussing AI technologies, NLP solutions, or potential collaboration? I&apos;m always open to connecting with fellow AI enthusiasts and industry professionals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-slate-800/90 shadow-md border border-slate-200 dark:border-slate-700 p-6 rounded-xl"
          >
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                  Your Name
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none" 
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="form-control">
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none" 
                  placeholder="john@example.com" 
                  required
                />
              </div>
              
              <div className="form-control">
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                  Message
                </label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none h-32" 
                  placeholder="Your message here..." 
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className={`w-full px-4 py-2 rounded-lg font-medium shadow-sm ${
                  formStatus === 'submitting' 
                    ? 'bg-blue-500/70 text-white cursor-wait' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white transition-colors'
                }`}
                disabled={formStatus === 'submitting'}
              >
                {formStatus === 'idle' && (
                  <span className="flex items-center justify-center">
                    Send Message
                    <Send className="w-4 h-4 ml-2" />
                  </span>
                )}
                {formStatus === 'submitting' && 'Sending...'}
                {formStatus === 'success' && 'Message Sent!'}
                {formStatus === 'error' && 'Error - Try Again'}
              </button>
              
              {formStatus === 'success' && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg">
                  <p>Your message has been sent successfully! I&apos;ll get back to you soon.</p>
                </div>
              )}
              
              {formStatus === 'error' && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg">
                  <p>There was an error sending your message. Please try again later.</p>
                </div>
              )}
            </form>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 dark:text-white">Email</h3>
                    <a href="mailto:minh.btrc@gmail.com" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      minh.btrc@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                    <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 dark:text-white">Location</h3>
                    <p className="text-slate-600 dark:text-slate-300">Ho Chi Minh City, Vietnam</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Social Profiles</h2>
              
              <div className="space-y-4">
                <a 
                  href="https://github.com/minhbtrc" 
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
                    <SiGithub className="w-5 h-5 text-slate-800 dark:text-slate-200" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 dark:text-white">GitHub</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">@minhbtrc</p>
                  </div>
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/minhbtcm00/" 
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
                    <SiLinkedin className="w-5 h-5 text-blue-700 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 dark:text-white">LinkedIn</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">in/minhbtcm00</p>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="mt-8 bg-white dark:bg-slate-800/90 shadow-md border border-slate-200 dark:border-slate-700 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">Professional Focus</h3>
              <p className="text-slate-600 dark:text-slate-300">
                I specialize in natural language processing (NLP) and Transformer-based architectures. My expertise includes applying Large Language Models (LLMs) to tasks like question generation, sentiment analysis, and data extraction. I&apos;m particularly passionate about optimizing LLM performance using frameworks like Langchain.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
} 