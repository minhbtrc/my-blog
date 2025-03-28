'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MapPin, Send, Terminal, Code, MessageSquare, Sparkles, Coffee, Zap } from 'lucide-react'
import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [showEmoji, setShowEmoji] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  
  // Array of placeholder messages for the message field
  const messagePlaceholders = [
    "Let's build something amazing with AI...",
    "I have a project idea involving LLMs...",
    "Need help optimizing my transformer model...",
    "Looking for an AI engineer for my startup...",
    "Coffee chat about the latest ML research?",
    "Got any thoughts on [insert latest AI paper]?"
  ]
  
  // Array of "name" field placeholders
  const namePlaceholders = [
    "alan_turing",
    "ada_lovelace",
    "grace_hopper",
    "claude_shannon",
    "marvin_minsky"
  ]
  
  // Array of "email" field placeholders
  const emailPlaceholders = [
    "ai.enthusiast@example.com",
    "ml.engineer@example.com",
    "neural.networks@example.com",
    "transformer.fan@example.com",
    "future.of.ai@example.com"
  ]
  
  // Get random placeholder from array
  const getRandomPlaceholder = (array: string[]) => {
    return array[Math.floor(Math.random() * array.length)]
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName)
    setShowEmoji(true)
    setTimeout(() => setShowEmoji(false), 800)
  }
  
  const handleBlur = () => {
    setFocusedField(null)
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields')
      return
    }
    
    setFormStatus('submitting')
    
    // Show ripple animation effect on the form
    if (formRef.current) {
      formRef.current.classList.add('submitting-ripple')
      setTimeout(() => {
        if (formRef.current) {
          formRef.current.classList.remove('submitting-ripple')
        }
      }, 1000)
    }
    
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
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus('idle')
      }, 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setFormStatus('error')
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus('idle')
      }, 5000)
    }
  }
  
  // Add CSS for submitting ripple animation
  useEffect(() => {
    // Add style tag to head
    const style = document.createElement('style')
    style.innerHTML = `
      .submitting-ripple {
        position: relative;
        overflow: hidden;
      }
      .submitting-ripple::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 5px;
        height: 5px;
        background: rgba(59, 130, 246, 0.5);
        opacity: 1;
        border-radius: 50%;
        transform: scale(1);
        animation: ripple 1s ease-out;
      }
      @keyframes ripple {
        0% {
          transform: scale(1);
          opacity: 1;
        }
        100% {
          transform: scale(300);
          opacity: 0;
        }
      }
      
      .typing-cursor {
        display: inline-block;
        width: 2px;
        height: 1em;
        background-color: currentColor;
        margin-left: 2px;
        animation: blink 1s step-end infinite;
      }
      
      @keyframes blink {
        from, to { opacity: 1; }
        50% { opacity: 0; }
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])
  
  // Render emoji based on field focus
  const renderFieldEmoji = () => {
    if (!showEmoji) return null
    
    let emoji = "✨"
    if (focusedField === 'name') emoji = "👋"
    if (focusedField === 'email') emoji = "📧"
    if (focusedField === 'message') emoji = "💬"
    
    return (
      <motion.div
        initial={{ scale: 0, rotate: -20, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className="absolute text-2xl"
        style={{ 
          zIndex: 100,
          top: focusedField === 'message' ? '40%' : '0',
          right: focusedField === 'message' ? '10%' : '0'
        }}
      >
        {emoji}
      </motion.div>
    )
  }
  
  return (
    <div className="w-full h-full max-w-full mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8 max-w-4xl mx-auto px-4 py-12 sm:py-16"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-indigo-800 dark:from-cyan-400 dark:to-blue-500 font-mono flex items-center justify-center gap-2">
            <Terminal className="w-8 h-8 text-blue-800/80 dark:text-cyan-400/70" />
            <span>contact.connect()</span>
            <div className="typing-cursor"></div>
          </h1>
          <p className="text-slate-700 dark:text-slate-400 max-w-xl mx-auto font-light">
            Interested in discussing AI technologies, NLP solutions, or potential collaboration? I&apos;m always open to connecting with fellow AI enthusiasts and industry professionals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-slate-800/30 border border-slate-300 dark:border-blue-900/20 p-6 rounded-lg shadow-md backdrop-blur-sm h-full"
          >
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-700 dark:from-cyan-400 dark:to-blue-400 font-mono flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-800/80 dark:text-cyan-400/70" />
              message.send()
            </h2>
            
            {/* Terminal-inspired header decoration */}
            <div className="flex items-center gap-2 mb-4 border-b border-slate-300 dark:border-blue-900/30 pb-3">
              <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
              <code className="text-xs text-slate-700 dark:text-slate-500 font-mono ml-2">
                ~/contact_form $ <span className="text-green-600 dark:text-green-400">node</span> send_message.js
              </code>
            </div>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 relative">
              <AnimatePresence>
                {showEmoji && renderFieldEmoji()}
              </AnimatePresence>
              
              <div className="form-control relative">
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300 font-mono flex items-center">
                  <span>name:</span>
                  {focusedField === 'name' && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="ml-2 text-blue-500 dark:text-cyan-400 text-xs"
                    >
                      // coding identity
                    </motion.span>
                  )}
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 rounded-md bg-white dark:bg-slate-800/80 border border-slate-300 dark:border-blue-900/30 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-700 dark:focus:border-cyan-500/50 focus:ring-1 focus:ring-blue-700 dark:focus:ring-cyan-500/50 font-mono placeholder:text-slate-500 dark:placeholder:text-slate-600 placeholder:font-mono shadow-sm pl-8" 
                    placeholder={getRandomPlaceholder(namePlaceholders)}
                    required
                  />
                  <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-blue-500 dark:text-blue-400">
                    <Terminal className="w-4 h-4" />
                  </div>
                  
                  {formData.name && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500"
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                  )}
                </div>
              </div>
              
              <div className="form-control relative">
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300 font-mono flex items-center">
                  <span>email:</span>
                  {focusedField === 'email' && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="ml-2 text-blue-500 dark:text-cyan-400 text-xs"
                    >
                      // reach me @
                    </motion.span>
                  )}
                </label>
                <div className="relative">
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 rounded-md bg-white dark:bg-slate-800/80 border border-slate-300 dark:border-blue-900/30 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-700 dark:focus:border-cyan-500/50 focus:ring-1 focus:ring-blue-700 dark:focus:ring-cyan-500/50 font-mono placeholder:text-slate-500 dark:placeholder:text-slate-600 placeholder:font-mono shadow-sm pl-8" 
                    placeholder={getRandomPlaceholder(emailPlaceholders)}
                    required
                  />
                  <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-blue-500 dark:text-blue-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  
                  {formData.email && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500"
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                  )}
                </div>
              </div>
              
              <div className="form-control relative">
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300 font-mono flex items-center">
                  <span>message:</span>
                  {focusedField === 'message' && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="ml-2 text-blue-500 dark:text-cyan-400 text-xs"
                    >
                      // your query()
                    </motion.span>
                  )}
                </label>
                <div className="relative">
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 rounded-md bg-white dark:bg-slate-800/80 border border-slate-300 dark:border-blue-900/30 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-700 dark:focus:border-cyan-500/50 focus:ring-1 focus:ring-blue-700 dark:focus:ring-cyan-500/50 font-mono placeholder:text-slate-500 dark:placeholder:text-slate-600 placeholder:font-mono h-32 shadow-sm pl-8" 
                    placeholder={getRandomPlaceholder(messagePlaceholders)}
                    required
                  ></textarea>
                  <div className="absolute left-2.5 top-3 text-blue-500 dark:text-blue-400">
                    <Code className="w-4 h-4" />
                  </div>
                  
                  {formData.message && formData.message.length > 20 && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-2 top-3 text-green-500"
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                  )}
                </div>
                
                {/* Character counter */}
                {focusedField === 'message' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-right text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono"
                  >
                    {formData.message.length} chars
                  </motion.div>
                )}
              </div>
              
              <motion.button 
                type="submit" 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full px-4 py-2 rounded-md font-mono shadow-sm relative overflow-hidden ${
                  formStatus === 'submitting' 
                    ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-300 cursor-wait border border-slate-400 dark:border-blue-900/20' 
                    : 'bg-blue-700 hover:bg-blue-800 dark:bg-slate-800/80 dark:hover:bg-slate-800 border border-blue-800 dark:border-blue-900/30 text-white dark:text-cyan-400 dark:hover:text-cyan-300 hover:shadow dark:hover:border-blue-800/40 transition-all'
                }`}
                disabled={formStatus === 'submitting'}
              >
                {formStatus === 'idle' && (
                  <span className="flex items-center justify-center">
                    submit.form()
                    <Send className="w-4 h-4 ml-2" />
                  </span>
                )}
                
                {formStatus === 'submitting' && (
                  <span className="flex items-center justify-center">
                    processing
                    <span className="ml-1">
                      <span className="inline-block w-1 h-1 bg-current rounded-full mx-0.5 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="inline-block w-1 h-1 bg-current rounded-full mx-0.5 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="inline-block w-1 h-1 bg-current rounded-full mx-0.5 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </span>
                  </span>
                )}
                
                {formStatus === 'success' && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center"
                  >
                    message.sent()
                    <Zap className="w-4 h-4 ml-2 text-yellow-300 animate-pulse" />
                  </motion.span>
                )}
                
                {formStatus === 'error' && (
                  <span className="flex items-center justify-center">
                    error(retry)
                  </span>
                )}
              </motion.button>
              
              <AnimatePresence>
                {formStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-3 rounded-md bg-green-50 dark:bg-slate-800/80 border border-green-200 dark:border-green-900/30 text-green-800 dark:text-green-400 font-mono text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <p>// Success! Your message has been received.</p>
                    </div>
                    <p className="mt-1 text-xs text-green-600 dark:text-green-500">// I will get back to you soon!</p>
                  </motion.div>
                )}
                
                {formStatus === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-3 rounded-md bg-red-50 dark:bg-slate-800/80 border border-red-200 dark:border-red-900/30 text-red-800 dark:text-red-400 font-mono text-sm"
                  >
                    <p>// Error: Failed to send message. Please try again.</p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Playful CTA */}
              {formStatus === 'idle' && !focusedField && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-12 right-0 text-slate-500 dark:text-slate-400 text-xs font-mono flex items-center"
                >
                  <Coffee className="w-3 h-3 mr-1" />
                  <span>Let's connect over a virtual coffee chat!</span>
                </motion.div>
              )}
            </form>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col gap-8"
          >
            <div className="bg-white dark:bg-slate-800/30 border border-slate-300 dark:border-blue-900/20 p-6 rounded-lg shadow-md backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-700 dark:from-cyan-400 dark:to-blue-400 font-mono flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-800/80 dark:text-cyan-400/70" />
                contact.info()
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-blue-50 dark:bg-slate-800/80 border border-blue-200 dark:border-blue-900/30 flex items-center justify-center text-blue-700 dark:text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 dark:text-slate-200 font-mono">email</h3>
                    <a href="mailto:minh.btrc@gmail.com" className="text-slate-700 hover:text-blue-700 dark:text-slate-400 dark:hover:text-cyan-300 transition-colors font-light">
                      minh.btrc@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-blue-50 dark:bg-slate-800/80 border border-blue-200 dark:border-blue-900/30 flex items-center justify-center text-blue-700 dark:text-cyan-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 dark:text-slate-200 font-mono">location</h3>
                    <p className="text-slate-700 dark:text-slate-400 font-light">Ho Chi Minh City, Vietnam</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800/30 border border-slate-300 dark:border-blue-900/20 p-6 rounded-lg shadow-md backdrop-blur-sm flex-grow">
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-700 dark:from-cyan-400 dark:to-blue-400 font-mono flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-800/80 dark:text-cyan-400/70" />
                social.profiles()
              </h2>
              
              <div className="space-y-4">
                <a 
                  href="https://github.com/minhbtrc" 
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group border border-transparent hover:border-slate-300 dark:hover:border-blue-900/20"
                  style={{ position: 'relative', zIndex: 50 }}
                >
                  <div className="w-10 h-10 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-blue-900/30 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:text-blue-700 dark:group-hover:text-cyan-400 transition-colors">
                    <SiGithub className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 dark:text-slate-200 font-mono">github</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-mono group-hover:text-blue-700 dark:group-hover:text-slate-300 transition-colors">@minhbtrc</p>
                  </div>
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/minhbtcm00/" 
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group border border-transparent hover:border-slate-300 dark:hover:border-blue-900/20"
                  style={{ position: 'relative', zIndex: 50 }}
                >
                  <div className="w-10 h-10 rounded-md bg-blue-50 dark:bg-slate-800/80 border border-blue-200 dark:border-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-cyan-400 transition-colors">
                    <SiLinkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 dark:text-slate-200 font-mono">linkedin</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-mono group-hover:text-blue-700 dark:group-hover:text-slate-300 transition-colors">in/minhbtcm00</p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
} 