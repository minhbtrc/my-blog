'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Mail, MapPin, Send, Terminal, Code, MessageSquare, Sparkles, Coffee, Play } from 'lucide-react'
import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons'
import { Button } from '@/components/ui/button'
import Head from 'next/head'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [showEmoji, setShowEmoji] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const formRef = useRef<HTMLFormElement>(null)
  
  // Check if screen is mobile size
  const isMobile = useMediaQuery('(max-width: 768px)')
  
  // Array of placeholder messages for the message field
  const messagePlaceholders = [
    "I have a project idea involving LLMs...",
    "Need help optimizing my transformer model...",
    "Looking for an AI engineer for my startup...",
    "Coffee chat about the latest ML research?",
    "Got any thoughts on multimodal transformers?",
    "Let's build something amazing with AI..."
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
    setFormData(prev => ({ ...prev, [name]: value }))
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
  
  // Add CSS for animations and Python styling
  useEffect(() => {
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
        background: rgba(16, 185, 129, 0.3);
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
      
      .python-cursor {
        display: inline-block;
        opacity: 1;
        animation: blink 1s step-end infinite;
      }
      
      @keyframes blink {
        from, to { opacity: 1; }
        50% { opacity: 0; }
      }
      
      .python-string {
        color: #ECCC87; /* Yellow for string literals */
      }
      
      .python-keyword {
        color: #4B5563; /* Darker gray for keywords in light mode */
      }
      
      @media (prefers-color-scheme: dark) {
        .python-keyword {
          color: #B77EE0; /* Purple for keywords in dark mode */
        }
      }
      
      .python-function {
        color: #065F46; /* Emerald for function names in light mode */
      }
      
      @media (prefers-color-scheme: dark) {
        .python-function {
          color: #62AEEF; /* Blue for function names in dark mode */
        }
      }
      
      .python-comment {
        color: #047857; /* Emerald for comments in light mode */
        font-style: italic;
      }
      
      @media (prefers-color-scheme: dark) {
        .python-comment {
          color: #98C379; /* Green for comments in dark mode */
        }
      }
      
      .python-param {
        color: #0F766E; /* Teal for parameter names in light mode */
      }
      
      @media (prefers-color-scheme: dark) {
        .python-param {
          color: #E06B74; /* Red for parameter names in dark mode */
        }
      }
      
      .python-bracket {
        color: #6B7280; /* Gray for brackets in light mode */
      }
      
      @media (prefers-color-scheme: dark) {
        .python-bracket {
          color: #ABB2BF; /* Light gray for brackets in dark mode */
        }
      }
      
      input:focus::placeholder, textarea:focus::placeholder {
        color: transparent;
      }
      
      .terminal-glow {
        box-shadow: 0 0 15px rgba(5, 150, 105, 0.1);
        border: 1px solid rgba(5, 150, 105, 0.2);
      }
      
      .docstring {
        border-left: 2px solid rgba(5, 150, 105, 0.3);
        padding-left: 1rem;
      }

      @media (prefers-color-scheme: light) {
        .terminal-background {
          background-color: rgba(240, 253, 250, 0.8);
        }
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])
  
  useEffect(() => {
    // Set a random cursor blink interval
    const interval = setInterval(() => {
      if (focusedField || formStatus !== 'idle') return;
      setShowCursor(prev => !prev);
    }, 530);
    
    return () => clearInterval(interval);
  }, [focusedField, formStatus]);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 100,
        damping: 10
      } 
    }
  };
  
  return (
    <motion.div 
      className="w-full max-w-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <main className={`max-w-4xl mx-auto py-8 md:py-16 px-4 font-mono text-${isMobile ? '14' : '15'}px leading-relaxed`}>
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Python Script Section (left side) */}
          <motion.div className="lg:col-span-3 space-y-4 md:space-y-5 p-4 md:p-6 rounded-md terminal-glow terminal-background">
            <motion.div variants={item}>
              <span className="python-comment"># Get in touch with MinhBTC</span>
            </motion.div>
            
            <motion.div variants={item}>
              <span className="python-keyword">from</span> <span className="python-function">minh_lab</span> <span className="python-keyword">import</span> <span className="python-function">send_message</span>
            </motion.div>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 mt-4">
              <motion.div variants={item} className="space-y-2">
                <div>
                  <span className="python-function">send_message</span>
                  <span className="python-bracket">(</span>
                </div>
                
                <div className="ml-4 space-y-5">
                  <div className="flex items-start">
                    <label className={`python-param ${isMobile ? 'w-14' : 'w-16'} pt-2 flex-shrink-0`}>name</label>
                    <span className="mr-2 pt-2">=</span>
                    <div className="relative flex-1">
                      <span className="python-string absolute left-0 top-0 pointer-events-none">"</span>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('name')}
                        onBlur={handleBlur}
                        className="w-full pl-3 pr-3 py-1 bg-transparent border-b border-muted/30 focus:border-emerald-500 focus:outline-none dark:text-yellow-300 text-emerald-900"
                        placeholder={getRandomPlaceholder(namePlaceholders)}
                        required
                      />
                      <span className="python-string absolute right-0 top-0 pointer-events-none">"</span>
                      {focusedField === 'name' && (
                        <span className="absolute right-3 top-1 python-cursor">█</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <label className={`python-param ${isMobile ? 'w-14' : 'w-16'} pt-2 flex-shrink-0`}>email</label>
                    <span className="mr-2 pt-2">=</span>
                    <div className="relative flex-1">
                      <span className="python-string absolute left-0 top-0 pointer-events-none">"</span>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('email')}
                        onBlur={handleBlur}
                        className="w-full pl-3 pr-3 py-1 bg-transparent border-b border-muted/30 focus:border-emerald-500 focus:outline-none dark:text-yellow-300 text-emerald-900"
                        placeholder={getRandomPlaceholder(emailPlaceholders)}
                        required
                      />
                      <span className="python-string absolute right-0 top-0 pointer-events-none">"</span>
                      {focusedField === 'email' && (
                        <span className="absolute right-3 top-1 python-cursor">█</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <label className={`python-param ${isMobile ? 'w-14' : 'w-16'} pt-2 flex-shrink-0`}>message</label>
                    <span className="mr-2 pt-2">=</span>
                    <div className="relative flex-1">
                      <span className="python-string absolute left-0 top-0 pointer-events-none">"</span>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('message')}
                        onBlur={handleBlur}
                        className="w-full pl-3 pr-3 py-1 bg-transparent border-b border-muted/30 focus:border-emerald-500 focus:outline-none dark:text-yellow-300 text-emerald-900 min-h-24 h-32 resize-none"
                        placeholder={getRandomPlaceholder(messagePlaceholders)}
                        required
                      ></textarea>
                      <span className="python-string absolute right-0 top-0 pointer-events-none">"</span>
                      {focusedField === 'message' && (
                        <span className="absolute right-3 top-1 python-cursor">█</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-1">
                  <span className="python-bracket">)</span>
                  {!focusedField && formStatus === 'idle' && showCursor && (
                    <span className="python-cursor ml-1">█</span>
                  )}
                </div>
              </motion.div>
              
              <motion.div variants={item} className="flex justify-end mt-4">
                <motion.button 
                  type="submit" 
                  className="flex items-center gap-2 border border-emerald-200 dark:border-muted/30 bg-emerald-50 dark:bg-muted/10 hover:bg-emerald-100 dark:hover:bg-muted/20 text-emerald-800 dark:text-current px-4 py-2 rounded-md text-sm transition-all shadow-sm hover:shadow"
                  disabled={formStatus === 'submitting'}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="w-3.5 h-3.5" />
                  {formStatus === 'submitting' ? (
                    <div className="flex items-center">
                      <span>exec()</span>
                      <div className="flex space-x-1 ml-2">
                        <motion.div 
                          className="w-1.5 h-1.5 rounded-full bg-current"
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                        />
                        <motion.div 
                          className="w-1.5 h-1.5 rounded-full bg-current"
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, repeatType: "loop", ease: "easeInOut", delay: 0.2 }}
                        />
                        <motion.div 
                          className="w-1.5 h-1.5 rounded-full bg-current"
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, repeatType: "loop", ease: "easeInOut", delay: 0.4 }}
                        />
                      </div>
                    </div>
                  ) : (
                    <span>exec("Not working yet")</span>
                  )}
                </motion.button>
              </motion.div>
              
              <AnimatePresence>
                {formStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="python-comment space-y-1"
                  >
                    <div># Message sent successfully!</div>
                    <div># I'll get back to you soon.</div>
                  </motion.div>
                )}
                
                {formStatus === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 dark:text-red-400 text-sm space-y-1"
                  >
                    <div># Error: Failed to send message.</div>
                    <div># Please try again later.</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
          
          {/* Docstring Section (right side) */}
          <motion.div className="lg:col-span-2 space-y-4">
            <motion.div 
              variants={item}
              className="docstring space-y-6 text-gray-700 dark:text-muted-foreground p-4"
            >
              <div className="text-emerald-500 dark:text-blue-400">"""</div>
              
              <motion.div 
                variants={item} 
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 flex-shrink-0 text-emerald-600 dark:text-blue-400" />
                  <p className="text-gray-700 dark:text-gray-300">
                    Ho Chi Minh City, Vietnam
                  </p>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 ml-7">
                  I'm available for consulting, technical advisory roles and project collaborations.
                </p>
              </motion.div>
              
              <motion.div 
                variants={item}
                className="space-y-4 pt-2"
              >
                <motion.a
                  href={process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/minhbtc"}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3"
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <SiGithub className="w-4 h-4 text-emerald-600 dark:text-blue-400" />
                  <span className="group-hover:text-emerald-700 dark:group-hover:text-blue-300 transition-colors">
                    github.com/minhbtc
                  </span>
                </motion.a>
                
                <motion.a
                  href={process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/in/minhbtc"}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3"
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <SiLinkedin className="w-4 h-4 text-emerald-600 dark:text-blue-400" />
                  <span className="group-hover:text-emerald-700 dark:group-hover:text-blue-300 transition-colors">
                    linkedin.com/in/minhbtc
                  </span>
                </motion.a>
              </motion.div>
              
              <motion.div variants={item} className="flex items-center gap-3 pt-2">
                <Coffee className="w-4 h-4 flex-shrink-0 text-emerald-600 dark:text-blue-400" />
                <span className="text-gray-700 dark:text-gray-300">Available for async chats & coffee.</span>
              </motion.div>
              
              <div className="text-emerald-500 dark:text-blue-400">"""</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  );
}

// Component for scroll-based reveal animation
interface ScrollRevealSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

function ScrollRevealSection({ title, children, className = "", delay = 0 }: ScrollRevealSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <motion.section 
      className={`space-y-6 ${className}`}
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
    >
      {title && (
        <motion.h2 
          className="text-xl font-semibold"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: delay + 0.1 }}
        >
          {title}
        </motion.h2>
      )}
      {children}
    </motion.section>
  );
}

// Note: FormField component is no longer used in the updated design
// It remains here for reference but could be removed
interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  icon?: React.ReactNode;
  isFocused: boolean;
  delay?: number;
} 