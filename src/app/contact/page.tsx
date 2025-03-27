'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Send } from 'lucide-react'
import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons'
import Link from 'next/link'

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
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-base-content/70 max-w-xl mx-auto">
            Interested in discussing AI technologies, NLP solutions, or potential collaboration? I'm always open to connecting with fellow AI enthusiasts and industry professionals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-base-200/30 backdrop-blur-sm border border-base-300/30 p-6 rounded-xl"
          >
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input input-bordered w-full" 
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input input-bordered w-full" 
                  placeholder="john@example.com" 
                  required
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Message</span>
                </label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered h-32" 
                  placeholder="Your message here..." 
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className={`btn btn-primary w-full ${formStatus === 'submitting' ? 'loading' : ''}`}
                disabled={formStatus === 'submitting'}
              >
                {formStatus === 'idle' && (
                  <>
                    Send Message
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
                {formStatus === 'submitting' && 'Sending...'}
                {formStatus === 'success' && 'Message Sent!'}
                {formStatus === 'error' && 'Error - Try Again'}
              </button>
              
              {formStatus === 'success' && (
                <div className="alert alert-success mt-4">
                  <p>Your message has been sent successfully! I'll get back to you soon.</p>
                </div>
              )}
              
              {formStatus === 'error' && (
                <div className="alert alert-error mt-4">
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
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <a href="mailto:minh.btrc@gmail.com" className="text-base-content/70 hover:text-primary">
                      minh.btrc@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-base-content/70">Ho Chi Minh City, Vietnam</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Social Profiles</h2>
              
              <div className="space-y-4">
                <a 
                  href="https://github.com/minhbtrc" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-base-200/50 transition-colors"
                >
                  <div className="bg-base-200 p-2 rounded-full">
                    <SiGithub className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">GitHub</h3>
                    <p className="text-sm text-base-content/70">@minhbtrc</p>
                  </div>
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/minhbtcm00/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-base-200/50 transition-colors"
                >
                  <div className="bg-base-200 p-2 rounded-full">
                    <SiLinkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">LinkedIn</h3>
                    <p className="text-sm text-base-content/70">in/minhbtcm00</p>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="mt-8 bg-base-200/30 backdrop-blur-sm border border-base-300/30 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2">Professional Focus</h3>
              <p className="text-base-content/70">
                I specialize in natural language processing (NLP) and Transformer-based architectures. My expertise includes applying Large Language Models (LLMs) to tasks like question generation, sentiment analysis, and data extraction. I'm particularly passionate about optimizing LLM performance using frameworks like Langchain.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
} 