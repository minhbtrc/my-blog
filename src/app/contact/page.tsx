'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Send, Terminal, Code, MessageSquare } from 'lucide-react'
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
    <div className="max-w-5xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-mono flex items-center justify-center gap-2">
            <Terminal className="w-8 h-8 text-cyan-400/70" />
            <span>contact.connect()</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto font-light">
            Interested in discussing AI technologies, NLP solutions, or potential collaboration? I&apos;m always open to connecting with fellow AI enthusiasts and industry professionals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-800/20 border border-blue-900/20 p-6 rounded-lg shadow-md backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-400/70" />
              message.send()
            </h2>
            
            {/* Terminal-inspired header decoration */}
            <div className="flex items-center gap-2 mb-4 border-b border-blue-900/30 pb-3">
              <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/40"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
              <code className="text-xs text-slate-500 font-mono ml-2">~/contact_form</code>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="block text-sm font-medium mb-1 text-slate-300 font-mono">
                  name:
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md bg-slate-800/70 border border-blue-900/30 text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 font-mono placeholder:text-slate-600 placeholder:font-mono" 
                  placeholder="john_doe"
                  required
                />
              </div>
              
              <div className="form-control">
                <label className="block text-sm font-medium mb-1 text-slate-300 font-mono">
                  email:
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md bg-slate-800/70 border border-blue-900/30 text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 font-mono placeholder:text-slate-600 placeholder:font-mono" 
                  placeholder="john@example.com" 
                  required
                />
              </div>
              
              <div className="form-control">
                <label className="block text-sm font-medium mb-1 text-slate-300 font-mono">
                  message:
                </label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md bg-slate-800/70 border border-blue-900/30 text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 font-mono placeholder:text-slate-600 placeholder:font-mono h-32" 
                  placeholder="Enter your message here..." 
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className={`w-full px-4 py-2 rounded-md font-mono shadow-sm ${
                  formStatus === 'submitting' 
                    ? 'bg-slate-700 text-slate-300 cursor-wait border border-blue-900/20' 
                    : 'bg-slate-800/70 hover:bg-slate-800 border border-blue-900/30 text-cyan-400 hover:text-cyan-300 hover:border-blue-800/40 transition-all'
                }`}
                disabled={formStatus === 'submitting'}
              >
                {formStatus === 'idle' && (
                  <span className="flex items-center justify-center">
                    submit.form()
                    <Send className="w-4 h-4 ml-2" />
                  </span>
                )}
                {formStatus === 'submitting' && 'processing...'}
                {formStatus === 'success' && 'message.sent()'}
                {formStatus === 'error' && 'error(retry)'}
              </button>
              
              {formStatus === 'success' && (
                <div className="mt-4 p-3 rounded-md bg-slate-800/70 border border-green-900/30 text-green-400 font-mono text-sm">
                  <p>{/* Success! Your message has been received. */}// Success! Your message has been received.</p>
                </div>
              )}
              
              {formStatus === 'error' && (
                <div className="mt-4 p-3 rounded-md bg-slate-800/70 border border-red-900/30 text-red-400 font-mono text-sm">
                  <p>{/* Error: Failed to send message. Please try again. */}// Error: Failed to send message. Please try again.</p>
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
            <div className="bg-slate-800/20 border border-blue-900/20 p-6 rounded-lg shadow-md backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono flex items-center gap-2">
                <Code className="w-5 h-5 text-cyan-400/70" />
                contact.info()
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-slate-800/70 border border-blue-900/30 flex items-center justify-center text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-200 font-mono">email</h3>
                    <a href="mailto:minh.btrc@gmail.com" className="text-slate-400 hover:text-cyan-300 transition-colors font-light">
                      minh.btrc@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-slate-800/70 border border-blue-900/30 flex items-center justify-center text-cyan-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-200 font-mono">location</h3>
                    <p className="text-slate-400 font-light">Ho Chi Minh City, Vietnam</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800/20 border border-blue-900/20 p-6 rounded-lg shadow-md backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono flex items-center gap-2">
                <Code className="w-5 h-5 text-cyan-400/70" />
                social.profiles()
              </h2>
              
              <div className="space-y-4">
                <a 
                  href="https://github.com/minhbtrc" 
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-3 rounded-md hover:bg-slate-800/50 transition-colors group border border-transparent hover:border-blue-900/20"
                >
                  <div className="w-10 h-10 rounded-md bg-slate-800/70 border border-blue-900/30 flex items-center justify-center text-slate-300 group-hover:text-cyan-400 transition-colors">
                    <SiGithub className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-200 font-mono">github</h3>
                    <p className="text-sm text-slate-400 font-mono group-hover:text-slate-300 transition-colors">@minhbtrc</p>
                  </div>
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/minhbtcm00/" 
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-3 rounded-md hover:bg-slate-800/50 transition-colors group border border-transparent hover:border-blue-900/20"
                >
                  <div className="w-10 h-10 rounded-md bg-slate-800/70 border border-blue-900/30 flex items-center justify-center text-blue-400 group-hover:text-cyan-400 transition-colors">
                    <SiLinkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-200 font-mono">linkedin</h3>
                    <p className="text-sm text-slate-400 font-mono group-hover:text-slate-300 transition-colors">in/minhbtcm00</p>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="bg-slate-800/20 border border-blue-900/20 p-6 rounded-lg shadow-md backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono">professional.focus()</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                I specialize in natural language processing (NLP) and Transformer-based architectures. My expertise includes applying Large Language Models (LLMs) to tasks like question generation, sentiment analysis, and data extraction. I&apos;m particularly passionate about optimizing LLM performance using frameworks like Langchain.
              </p>
              
              {/* Code snippet decoration */}
              <div className="mt-4 p-3 bg-slate-900/50 border border-blue-900/30 rounded-md font-mono text-xs">
                <pre className="text-slate-300">
                  <span className="text-cyan-400">const</span> <span className="text-blue-400">contactResponse</span> = <span className="text-cyan-400">async</span> (<span className="text-blue-400">message</span>) =&gt; {'{'}
                  <br />&nbsp;&nbsp;<span className="text-slate-500">{/* I'll respond to your message ASAP */}// I&apos;ll respond to your message ASAP</span>
                  <br />&nbsp;&nbsp;<span className="text-cyan-400">const</span> <span className="text-blue-400">response</span> = <span className="text-cyan-400">await</span> <span className="text-blue-400">generateThoughtfulReply</span>(message);
                  <br />&nbsp;&nbsp;<span className="text-cyan-400">return</span> response;
                  <br />{'}'}
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
} 