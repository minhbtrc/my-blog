'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Mail, Briefcase, GraduationCap, Book, Award, Code } from 'lucide-react'
import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons'
import { motion, useInView } from 'framer-motion'

export default function AboutContent() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Set mounted to true after component mounts to trigger animations
    const timer = setTimeout(() => {
      setMounted(true)
    }, 100) // Small delay for better effect
    
    return () => clearTimeout(timer)
  }, [])

  // Container variants for staggered children
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

  // Item variants for children animation
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  // Social link animation
  const socialVariants = {
    hover: { scale: 1.05, color: "var(--color-primary)" },
    tap: { scale: 0.95 }
  }

  return (
    <motion.div 
      className="w-full max-w-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <main className="max-w-3xl mx-auto py-16 space-y-20">
        {/* Header Section */}
        <motion.section 
          id="profile"
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <motion.div 
              className="w-20 h-20 md:w-24 md:h-24 relative rounded-full overflow-hidden shadow-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/new_profile.png"
                alt="Minh Bui Tran Cong"
                width={96}
                height={96}
                className="object-cover w-full h-full"
                unoptimized={true}
                priority={true}
              />
            </motion.div>

            <div className="flex-1 text-center md:text-left">
              <motion.h1 
                className="text-3xl md:text-4xl font-bold tracking-tight mb-2"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                MINH BUI TRAN CONG
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <p className="font-mono text-muted-foreground mb-4 flex items-center gap-2 justify-center md:justify-start">
                  <span className="text-muted-foreground font-mono inline-flex items-center">
                    minh@ai-lab:~$<span className="inline-block w-2 h-4 bg-primary/70 ml-1 animate-pulse"></span>
                  </span> 
                  <span>AI Engineer</span>
                </p>
              </motion.div>
              <motion.p 
                className="text-sm text-muted-foreground mb-5 max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                Building real-world AI systems with a focus on large language models and their applications. Passionate about creating tools that bridge the gap between cutting-edge research and practical solutions.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4 justify-center md:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <motion.a
                  href={process.env.NEXT_PUBLIC_GITHUB_URL || ""}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-2 transition-colors"
                  whileHover={socialVariants.hover}
                  whileTap={socialVariants.tap}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="inline-flex items-center gap-1">
                    <SiGithub className="w-4 h-4" />
                    GitHub
                  </span>
                </motion.a>
                <motion.a
                  href={process.env.NEXT_PUBLIC_LINKEDIN_URL || ""}
                  target="_blank"
                  rel="noreferrer" 
                  className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-2 transition-colors"
                  whileHover={socialVariants.hover}
                  whileTap={socialVariants.tap}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="inline-flex items-center gap-1">
                    <SiLinkedin className="w-4 h-4" />
                    LinkedIn
                  </span>
                </motion.a>
                
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Remaining sections with scroll-based animations */}
        {/* About Me Section */}
        <ScrollRevealSection id="about" title="About Me">
          <div className="text-muted-foreground space-y-4">
            <p>
              AI Engineer by day, LLM whisperer by night. I work with Transformers (the model kind, not the robot kind) to build cool things like question generators, sentiment detectors, and data diggers. Big fan of LangChain, clever hacks, and shipping stuff that works.
            </p>
            <p>
              When I'm not wrangling models, I'm reading AI papers, pretending to be productive with a book, or chasing a football like it owes me money.
            </p>
          </div>
        </ScrollRevealSection>

        {/* Work Experience Section */}
        <ScrollRevealSection id="experience" title="Work Experience">
          <div className="space-y-8">
            {/* FPT Software */}
            <JobCard 
              title="AI Engineer – FPT Software AI Center"
              description="Building AI solutions for enterprise clients"
              points={[
                "Research and apply techniques for handling document extraction",
                "Develop RAG chatbot"
              ]}
              period="Sep 2024 – Present"
              isCurrent={true}
              delay={0.1}
            />
            
            {/* SPARTAN */}
            <JobCard 
              title="AI Engineer – SPARTAN"
              description="Led development of PDF parsing solutions with LLMs"
              period="Oct 2023 – Dec 2024"
              points={[
                "Implemented advanced document parsing using large language models",
                "Created comprehensive pipeline for data mining with seamless integration",
                "Developed Langflow application for drag-and-drop PDF parsing",
                "Implemented and improved APIs for robust backend services"
              ]}
              technologies={['LLM', 'Langchain', 'Python', 'FastAPI', 'ONNX']}
              delay={0.15}
            />

            {/* J. D. Power */}
            <JobCard 
              title="AI Consultant – J. D. Power"
              description="Developed scalable AI solutions for PDF processing and retrieval-augmented generation (RAG) workflows"
              period="Oct 2023 – Dec 2024"
              points={[
                "Built reusable pipelines for PDF parsing using Azure Document Intelligence, PDFPlumber, and PyMuPDF.",
                "Applied LLMs (GPT‑3.5, GPT‑4, Llama2) to solve domain-specific tasks.",
                "Integrated LangChain and LlamaIndex to improve RAG performance.",
                "Managed deployments with Kubernetes, Helm, Terraform, and GCP.",
                "Designed scalable APIs and automated workflows for document intelligence."
              ]}
              technologies={[
                'LLMs',
                'LangChain',
                'LlamaIndex',
                'Python',
                'FastAPI',
                'Kubernetes',
                'GCP'
              ]}
              delay={0.2}
            />
            
            {/* TRUONG MINH THINH */}
            <JobCard 
              title="AI Engineer – TRUONG MINH THINH TECHNOLOGY JSC"
              description="Developing NLP models and optimizing for production"
              period="Jul 2021 – Oct 2023"
              points={[
                "Developed question generation models using BARTPho and Marian",
                "Built sentiment analysis models to classify user messages",
                "Fine-tuned LLM models using SFT Trainer and LoRA techniques",
                "Optimized models with ONNX and TorchScript for better performance"
              ]}
              technologies={['pytorch', 'huggingface', 'torchscript', 'onnx', 'langchain']}
              delay={0.25}
            />
          </div>
        </ScrollRevealSection>
        
        {/* Education Section */}
        <ScrollRevealSection id="education" title="Education">
          <div className="space-y-8">
            <EducationCard 
              title="Bachelor of Computer Science"
              institution="Ho Chi Minh University of Technology"
              period="Aug 2018 – Apr 2023"
              subjects={['machine learning', 'ai', 'data structures', 'algorithms', 'deep learning']}
              delay={0.1}
            />

            <EducationCard 
              title="Mathematics Gifted Program"
              institution="Hung Vuong High School for the Gifted"
              period="Aug 2015 – Aug 2018"
              subjects={['advanced math', 'calculus', 'problem solving', 'logic', 'statistics']}
              delay={0.15}
            />
          </div>
        </ScrollRevealSection>
        
        {/* Projects Section */}
        <ScrollRevealSection id="projects" title="Projects">
          <div className="space-y-8">
            {/* The AI-Driven Blog */}
            <ProjectCard 
              title="The AI-Driven Blog"
              tags={['llm', 'cursor', 'agent']}
              description="New blog project that heavily uses ChatGPT and Cursor. As a back-end enthusiast who’s no fan of CSS, I relied on these AI tools to help shape both the design and content. From styling advice to layout tweaks, the entire process was an AI-driven collaboration—and it turned out surprisingly well!"
              url="https://minhbtc.blog"
              delay={0.1}
            />

            {/* Langchain Chatbot */}
            <ProjectCard 
              title="Langchain Chatbot"
              tags={['ai', 'llm', 'chatbot']}
              description="Developed a chatbot using the Langchain framework, integrated with Vertex AI or OpenAI API. Implemented MongoDB for memory management, utilized Gradio and Langchain UI, and incorporated Microsoft Presidio for data anonymization."
              url="https://github.com/minhbtrc/langchain-chatbot"
              delay={0.1}
            />
            
            {/* Covid Chatbot */}
            <ProjectCard 
              title="Covid Chatbot"
              tags={['ai', 'nlp', 'healthcare']}
              description="Led the development of a consultancy chatbot for SARS-COVID-2 patients, providing symptom assessment and self-care advice. Implemented machine learning models (KNN, SVM) for Intent Classification and developed a Named Entity Recognition system using PhoBERT and CRF."
              delay={0.15}
            />
          </div>
        </ScrollRevealSection>
        
        {/* Skills Section */}
        <ScrollRevealSection id="skills" title="Skills & Technologies">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <SkillsCard 
              title="Frameworks & Libraries"
              skills={[
                'PyTorch', 
                'Transformers',
                'Langchain',
                'TensorFlow',
                'HuggingFace',
                'ONNX',
                'spaCy',
                'FastAPI'
              ]}
              delay={0.1}
            />
            
            <SkillsCard 
              title="Tools & Platforms"
              skills={[
                'MongoDB',
                'PostgreSQL',
                'Redis',
                'Docker',
                'Git',
                'AWS',
                'GCP'
              ]}
              delay={0.15}
            />
          </div>
        </ScrollRevealSection>
        
        {/* Certifications Section */}
        <ScrollRevealSection id="certifications" title="Certifications">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { 
                name: 'AI Agents Fundamentals',
                issuer: 'Hugging Face',
                date: 'Mar 2025',
                url: 'https://huggingface.co/datasets/agents-course/certificates/resolve/main/certificates/minhbtc/2025-03-02.png',
                delay: 0.1
              },
              { 
                name: 'Develop Your AI Skills with Google Gemini and Google Cloud Platform',
                issuer: 'LinkedIn',
                date: 'Dec 2024',
                url: 'https://www.linkedin.com/learning/certificates/786f207a8154d5e7d9e82497fa26826c46243ad0009bbb044c795cb0fad9aabf',
                delay: 0.15
              },
              { 
                name: 'Google Gemini for Developers',
                issuer: 'LinkedIn',
                date: 'Dec 2024',
                url: 'https://www.linkedin.com/learning/certificates/184dd13911e12c507705d3b1a40d2ac7b843bf700454512fbf7a2034243accf9',
                delay: 0.2
              },
              { 
                name: 'Generative AI Fundamentals',
                issuer: 'Google Cloud Skills Boost',
                date: 'Sep 2023',
                url: 'https://www.cloudskillsboost.google/public_profiles/62daf634-c499-4c31-8ed2-bf1c0d6a9b15/badges/5406285',
                delay: 0.25
              },
              { 
                name: 'Introduction to Large Language Models',
                issuer: 'Google Cloud Skills Boost',
                date: 'Sep 2023',
                url: 'https://www.cloudskillsboost.google/public_profiles/62daf634-c499-4c31-8ed2-bf1c0d6a9b15/badges/5393841',
                delay: 0.3
              },
              { 
                name: 'Generative AI with Large Language Models',
                issuer: 'Coursera',
                date: 'Aug 2023',
                url: 'https://www.coursera.org/account/accomplishments/certificate/M8QJYLYC9FCD',
                delay: 0.35
              },
              { 
                name: 'LangChain & Vector Databases in Production',
                issuer: 'Activeloop',
                date: 'Aug 2023',
                url: 'https://learn.activeloop.ai/certificates/snnl0bjoa4',
                delay: 0.4,
              },
              { 
                name: 'Deep Neural Networks with PyTorch',
                issuer: 'IBM',
                date: 'Mar 2022',
                url: 'https://www.credly.com/badges/1a28ac75-fe07-46c8-af42-d6c655cde21a',
                delay: 0.45
              },
              { 
                name: 'Natural Language Processing Specialization',
                issuer: 'Coursera',
                date: 'Mar 2022',
                url: 'https://www.coursera.org/account/accomplishments/specialization/certificate/8JVX3M2H36T2',
                delay: 0.5
              }
            ].map((cert, index) => (
              <CertificationCard 
                key={`cert-${index}`}
                name={cert.name}
                issuer={cert.issuer}
                date={cert.date}
                url={cert.url}
                delay={cert.delay}
              />
            ))}
          </div>
        </ScrollRevealSection>
      </main>
    </motion.div>
  );
}

// Component for scroll-based reveal animation
function ScrollRevealSection({ id, title, children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <motion.section 
      id={id}
      className="space-y-4"
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.h2 
        className="text-xl font-semibold mb-6"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      {children}
    </motion.section>
  );
}

// Component for job experience card
function JobCard({ title, description, period, isCurrent = false, points = [], technologies = [], delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  return (
    <motion.div 
      className="space-y-2 relative pl-4 border-l border-muted"
      ref={ref}
      initial={{ opacity: 0, x: -5 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -5 }}
      transition={{ duration: 0.3, delay: delay }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1">
        <div>
          <h3 className="font-medium">{title}</h3>
          <div className="text-sm text-muted-foreground mb-2">
            {description}
          </div>
        </div>
        <div className="text-xs text-muted whitespace-nowrap flex items-center">
          {period} {isCurrent && <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>}
        </div>
      </div>
      
      {points.length > 0 && (
        <motion.ul 
          className="list-disc list-outside ml-5 text-sm text-muted-foreground space-y-1"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: delay + 0.1 }}
        >
          {points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </motion.ul>
      )}
      
      {technologies.length > 0 && (
        <motion.div 
          className="flex flex-wrap gap-2 pt-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: delay + 0.2 }}
        >
          {technologies.map((tech) => (
            <span 
              key={tech} 
              className="px-2 py-0.5 bg-muted/30 text-muted-foreground rounded-full text-xs"
            >
              {tech.toLowerCase()}
            </span>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

// Component for education card
function EducationCard({ title, institution, period, subjects = [], delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  return (
    <motion.div 
      className="space-y-2 relative pl-4 border-l border-muted"
      ref={ref}
      initial={{ opacity: 0, x: -5 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -5 }}
      transition={{ duration: 0.3, delay: delay }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1">
        <div>
          <h3 className="font-medium">{title}</h3>
          <div className="text-sm text-muted-foreground">
            {institution}
          </div>
        </div>
        <div className="text-xs text-muted whitespace-nowrap">
          {period}
        </div>
      </div>
      
      {subjects.length > 0 && (
        <motion.div 
          className="flex flex-wrap gap-2 pt-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: delay + 0.1 }}
        >
          {subjects.map((subject) => (
            <span 
              key={subject} 
              className="px-2 py-0.5 bg-muted/30 text-muted-foreground rounded-full text-xs"
            >
              {subject}
            </span>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

// Component for project card
function ProjectCard({ title, tags = [], description, url, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  return (
    <motion.div 
      className="space-y-2"
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.3, delay: delay }}
      whileHover={{ x: 2 }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1">
        <h3 className="font-medium">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-0.5 bg-muted/30 text-muted-foreground rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
      {url && (
        <motion.a 
          href={url}
          target="_blank" 
          rel="noreferrer"
          className="text-sm text-primary inline-flex items-center hover:underline underline-offset-2 transition-colors mt-1"
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.98 }}
        >
          View project <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </motion.a>
      )}
    </motion.div>
  );
}

// Component for skills card
function SkillsCard({ title, skills = [], delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  return (
    <motion.div 
      className="space-y-4"
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.3, delay: delay }}
    >
      <h3 className="text-base font-medium">
        {title}
      </h3>
      <motion.div 
        className="flex flex-wrap gap-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ 
          duration: 0.4, 
          delay: delay + 0.1,
          staggerChildren: 0.05 
        }}
      >
        {skills.map((skill, index) => (
          <motion.span 
            key={skill} 
            className="px-2.5 py-1 bg-muted/30 text-muted-foreground rounded-full text-xs"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, delay: delay + 0.1 + (index * 0.03) }}
            whileHover={{ scale: 1.05 }}
          >
            {skill.toLowerCase()}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

// Component for certification card
function CertificationCard({ name, issuer, date, url, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  return (
    <motion.div 
      ref={ref}
      className="relative pl-4 border-l border-muted"
      initial={{ opacity: 0, x: -5 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -5 }}
      transition={{ duration: 0.3, delay: delay }}
      whileHover={{ x: 2 }}
    >
      <a 
        href={url || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <h4 className="font-medium group-hover:text-primary transition-colors">
          {name}
        </h4>
        <div className="flex justify-between items-center text-sm mt-1">
          <span className="text-muted-foreground">{issuer}</span>
          <span className="text-xs text-muted">{date}</span>
        </div>
      </a>
    </motion.div>
  );
} 