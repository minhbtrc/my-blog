# Data Management System

This directory contains data files used throughout the application, including certificates, work experiences, skills, education, projects, and blogs.

## Certificates

The certificates system is designed to make it easy to add, update, and display professional certifications and academic achievements directly on the About page.

### How to Add New Certificates

1. Open `src/db/certificates.json`
2. Add a new certificate entry to the JSON array
3. Fill in the required fields:
   - `name`: The name/title of the certificate
   - `issuer`: The organization that issued the certificate
   - `date`: When the certificate was issued (format: "MMM YYYY")
   - `url`: URL to the certificate verification page
4. Add optional fields as needed:
   - `description`: A brief description of the certificate
   - `categories`: Array of categories/tags for the certificate

### Example Certificate Entry

```json
{
  "name": "Deep Learning Specialization",
  "issuer": "Coursera",
  "date": "May 2023",
  "url": "https://www.coursera.org/account/accomplishments/specialization/certificate/XXXXXXXXXXX",
  "description": "Five-course specialization by Andrew Ng covering neural networks, optimization algorithms, and ML projects structuring",
  "categories": ["AI", "Deep Learning", "Neural Networks"]
}
```

### Certificate Display

All certificates are displayed directly on the About page in the Certifications section. They are shown in the order they appear in the certificates.json array, so you can manually arrange them as needed (typically with newest first).

The certificates are displayed with the following information:
- Certificate name (linked to the verification URL)
- Issuing organization
- Date of issuance

Each certificate entry is clickable and will open the verification URL in a new tab.

## Work Experiences

The work experience system allows easy management of your professional history directly from a JSON file.

### How to Add New Work Experiences

1. Open `src/db/experiences.json`
2. Add a new experience entry to the JSON array
3. Fill in the required fields:
   - `title`: Job title including company name
   - `description`: Short description of the role
   - `period`: Employment period (e.g., "Jan 2022 - Dec 2023")
   - `isCurrent`: Boolean indicating if this is your current job
   - `points`: Array of bullet points describing achievements
   - `technologies`: Array of technologies used in this role

### Example Work Experience Entry

```json
{
  "title": "AI Engineer – Example Company",
  "description": "Developing advanced AI solutions for enterprise clients",
  "period": "Jan 2023 – Present",
  "isCurrent": true,
  "points": [
    "Implemented RAG systems using LangChain and vector databases",
    "Optimized LLM inference for production environments",
    "Developed document processing pipeline with 98% accuracy"
  ],
  "technologies": ["LangChain", "PyTorch", "FastAPI", "Docker"]
}
```

### Experience Display

Work experiences are displayed in the Experience section of the About page, with the following information:
- Job title
- Brief job description
- Employment period with a current job indicator
- Bullet points highlighting key responsibilities and achievements
- Technologies used, displayed as tags

## Skills & Technologies

The skills system organizes your technical skills and expertise into categories for easy display.

### How to Add or Update Skills

1. Open `src/db/skills.json`
2. Add a new skill category or update existing categories
3. Each category contains:
   - `title`: Category name (e.g., "Frameworks & Libraries")
   - `skills`: Array of skills in this category

### Example Skills Category

```json
{
  "title": "AI Techniques",
  "skills": [
    "NLP",
    "LLMs",
    "RAG",
    "Prompt Engineering", 
    "Fine-tuning",
    "Embeddings",
    "Vector Databases"
  ]
}
```

### Skills Display

Skills are displayed in a grid layout in the Skills & Technologies section, grouped by category. Each skill is shown as a tag that can be hovered over for effect.

## Education

The education system manages your academic background and educational history.

### How to Add or Update Education

1. Open `src/db/education.json`
2. Add a new education entry or update existing entries
3. Each education entry contains:
   - `title`: Degree or program title
   - `institution`: Educational institution name
   - `period`: Period of study
   - `subjects`: Array of subjects or focus areas
   - `description`: Optional description of the program

### Example Education Entry

```json
{
  "title": "Bachelor of Computer Science",
  "institution": "Ho Chi Minh University of Technology",
  "period": "Aug 2018 – Apr 2023",
  "subjects": [
    "machine learning",
    "ai",
    "data structures",
    "algorithms",
    "deep learning"
  ],
  "description": "Computer Science program with focus on Artificial Intelligence and Machine Learning"
}
```

### Education Display

Education entries are displayed in the Education section of the About page, showing:
- Degree/program title
- Institution name
- Period of study
- Subject tags

## Projects

The projects system allows you to showcase your portfolio of work and side projects.

### How to Add or Update Projects

1. Open `src/db/projects.json`
2. Add a new project or update existing projects
3. Each project entry contains:
   - `title`: Project name
   - `description`: Description of the project
   - `tags`: Array of technologies or topics related to the project
   - `url`: Link to the project (GitHub, live site, etc.)
   - `image`: Optional path to a project screenshot/image
   - `featured`: Optional boolean to mark as a featured project

### Example Project Entry

```json
{
  "title": "Langchain Chatbot",
  "tags": ["ai", "llm", "chatbot"],
  "description": "Developed a chatbot using the Langchain framework, integrated with Vertex AI or OpenAI API. Implemented MongoDB for memory management, utilized Gradio and Langchain UI, and incorporated Microsoft Presidio for data anonymization.",
  "url": "https://github.com/minhbtrc/langchain-chatbot",
  "image": "/images/projects/langchain.png"
}
```

### Projects Display

Projects are displayed in the Projects section of the About page, showing:
- Project title
- Description of the project
- Technology tags
- Link to the project (if provided)

## Blogs

The blogs system allows you to manage your blog posts in a structured way directly from a JSON file.

### How to Add or Update Blog Posts

1. Open `src/db/blogs.json`
2. Add a new blog entry or update existing entries
3. Each blog entry contains:
   - `slug`: Unique identifier used in the URL
   - `title`: Blog post title
   - `description`: Short description for preview and SEO
   - `date`: Publication date (YYYY-MM-DD format)
   - `readingTime`: Estimated reading time
   - `tags`: Array of tags for categorization
   - `featuredImage`: Optional path to the featured image
   - `content`: Markdown content of the blog post
   - `published`: Boolean indicating if the post is published

### Example Blog Entry

```json
{
  "slug": "langchain-chatbot",
  "title": "Building a Privacy-First AI Chatbot with LangChain",
  "description": "The langchain-chatbot repository is a comprehensive implementation of an AI-powered conversational tool designed for developers and organizations focused on privacy concerns and data protection policies.",
  "date": "2023-07-15",
  "readingTime": "8 min read",
  "tags": ["ai", "langchain", "privacy", "development"],
  "featuredImage": "/images/blog/langchain-cover.png",
  "content": "# Building a Privacy-First AI Chatbot with LangChain\n\nIn this post, I'll walk through how I built a privacy-focused chatbot using LangChain, with proper storage controls and data anonymization...",
  "published": true
}
```

### Blog Display

Blog posts are displayed on the blog page and individual blog post pages, showing:
- Blog title
- Featured image (if provided)
- Publication date
- Estimated reading time
- Tags for categorization
- Blog content in Markdown format

## How It Works

All data is stored in JSON files in the `src/db` directory, making it easy to update without touching the application code. The TypeScript interfaces in the `src/data` directory provide type safety and helper functions.

### System Structure

- `src/db/certificates.json`: JSON file containing all certificates data
- `src/db/experiences.json`: JSON file containing all work experience data
- `src/db/skills.json`: JSON file containing all skills and technologies data
- `src/db/education.json`: JSON file containing all education history data
- `src/db/projects.json`: JSON file containing all project data
- `src/db/blogs.json`: JSON file containing all blog post data
- `src/data/certificates.ts`: TypeScript interface and helper functions for certificates
- `src/data/experiences.ts`: TypeScript interface and helper functions for work experiences
- `src/data/skills.ts`: TypeScript interface and helper functions for skills
- `src/data/education.ts`: TypeScript interface and helper functions for education
- `src/data/projects.ts`: TypeScript interface and helper functions for projects
- `src/data/blogs.ts`: TypeScript interface and helper functions for blogs

The data is automatically imported and displayed in the appropriate pages using the existing components. 
