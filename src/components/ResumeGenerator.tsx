'use client'

import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { experiences } from '@/data/experiences';
import { education } from '@/data/education';
import { skillCategories } from '@/data/skills';
import { projects } from '@/data/projects';
import { certificates } from '@/data/certificates';

export default function ResumeGenerator() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateResume = () => {
    // Create PDF document - A4 size
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Fix TypeScript errors by properly typing everything
    type Color = [number, number, number];
    
    // Professional typography system with careful font sizing
    const fonts = {
      name: 20,
      title: 12,
      subtitle: 11,
      sectionTitle: 14,
      normal: 10,
      small: 9,
      tiny: 8
    };
    
    // Line heights
    const lineHeights = {
      heading: 8,
      normal: 5, 
      small: 4,
      tight: 3
    };
    
    // Modern professional color scheme
    const colors: Record<string, Color> = {
      primary: [38, 68, 115],      // Deeper blue for better contrast
      secondary: [55, 65, 85],     // Darker text for better readability
      tertiary: [95, 110, 130],    // Medium gray for less important text
      accent: [50, 125, 185],      // Vibrant accent blue for highlights
      border: [190, 200, 210],     // Subtle border color
      background: [245, 248, 250], // Very light gray for backgrounds
      white: [255, 255, 255]       // White
    };
    
    // Document layout with precise margins
    const layout = {
      page: {
        width: 210,
        height: 297
      },
      margins: {
        left: 18,
        right: 18, 
        top: 15,
        bottom: 15
      }
    };
    
    // Calculate content dimensions
    const contentWidth = layout.page.width - layout.margins.left - layout.margins.right;
    
    // Main vertical position tracker
    let y = layout.margins.top;
    
    // Helper function for multiline text with better alignment
    const addWrappedText = (
      text: string, 
      x: number, 
      y: number, 
      maxWidth: number, 
      fontSize: number, 
      align: 'left' | 'center' | 'right' = 'left'
    ): number => {
      pdf.setFontSize(fontSize);
      const lines = pdf.splitTextToSize(text, maxWidth);
      pdf.text(lines, x, y, { align: align });
      return lines.length * (fontSize * 0.35);
    };
    
    // Section header with professional styling
    const addSectionHeader = (text: string, y: number): number => {
      // Add white background to section headers
      pdf.setFillColor(255, 255, 255);
      pdf.rect(layout.margins.left - 2, y - 4, contentWidth + 4, 10, 'F');
      
      pdf.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(fonts.sectionTitle);
      pdf.text(text.toUpperCase(), layout.margins.left, y);
      
      pdf.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
      pdf.setLineWidth(0.5);
      pdf.line(layout.margins.left, y + 3, layout.page.width - layout.margins.right, y + 3);
      
      return y + 10; // Increased spacing after headers
    };
    
    // ============ HEADER SECTION ============
    
    // Add subtle header background (white)
    pdf.setFillColor(255, 255, 255); // White background
    pdf.rect(0, 0, layout.page.width, layout.margins.top + 20, 'F');
    
    // Professional name styling - all caps for impact
    pdf.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(fonts.name);
    pdf.text('MINH BUI TRAN CONG', layout.margins.left, y);
    
    // Job title with subtle styling
    pdf.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
    pdf.setFontSize(fonts.subtitle);
    pdf.setFont('helvetica', 'normal');
    y += 8;
    pdf.text('AI/NLP Engineer', layout.margins.left, y);
    
    // Contact information with clean, minimal layout - right-aligned
    const contactY = layout.margins.top;
    const contactX = layout.page.width - layout.margins.right;
    
    pdf.setFontSize(fonts.small);
    pdf.setTextColor(colors.tertiary[0], colors.tertiary[1], colors.tertiary[2]);
    pdf.setFont('helvetica', 'normal');
    
    // Precise contact details with professional formatting
    pdf.text('minh.btrc@gmail.com', contactX, contactY, { align: 'right' });
    pdf.text('github.com/minhbtrc', contactX, contactY + 5, { align: 'right' });
    pdf.text('linkedin.com/in/minhbtcm00', contactX, contactY + 10, { align: 'right' });
    pdf.text('Ho Chi Minh City, Vietnam', contactX, contactY + 15, { align: 'right' });
    
    // Add a separator line with gradient effect
    y += 15;
    const gradientWidth = 0.5;
    for (let i = 0; i < 5; i++) {
      const alpha = 0.8 - (i * 0.15);
      pdf.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2], alpha);
      pdf.setLineWidth(gradientWidth);
      pdf.line(layout.margins.left, y + (i * gradientWidth), layout.page.width - layout.margins.right, y + (i * gradientWidth));
    }
    y += 8;
    
    // ============ SUMMARY SECTION ============
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(fonts.normal);
    pdf.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
    
    const professionalSummary = "Building real-world AI systems with a focus on large language models and their applications. Passionate about creating tools that bridge the gap between cutting-edge research and practical solutions. AI Engineer by day, LLM whisperer by night. I work with Transformers to build cool things like question generators, sentiment detectors, and data diggers.";
    
    const summaryHeight = addWrappedText(professionalSummary, layout.margins.left, y, contentWidth, fonts.normal);
    y += summaryHeight + 15; // More space after summary
    
    // ============ PROFESSIONAL EXPERIENCE SECTION ============
    
    y = addSectionHeader('PROFESSIONAL EXPERIENCE', y);
    
    // Loop through experiences from the data file
    experiences.forEach((exp, index) => {
      // Title with company - professional formatting
      pdf.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(fonts.title);
      
      // Extract job title and company from the title string
      const titleParts = exp.title.split('–');
      const jobTitle = titleParts[0].trim();
      const company = titleParts.length > 1 ? titleParts[1].trim() : '';
      
      pdf.text(jobTitle, layout.margins.left, y);
      
      // Company name
      if (company) {
        pdf.setFont('helvetica', 'normal');
        pdf.text(` — ${company}`, layout.margins.left + pdf.getTextWidth(jobTitle), y);
      }
      
      // Date - right aligned
      pdf.setTextColor(colors.tertiary[0], colors.tertiary[1], colors.tertiary[2]);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(fonts.small);
      pdf.text(exp.period, layout.page.width - layout.margins.right, y, { align: 'right' });
      y += 5;
      
      // Description
      pdf.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(fonts.normal);
      
      pdf.text(exp.description, layout.margins.left, y);
      y += 6;
      
      // Key achievements with professional bullets
      pdf.setFont('helvetica', 'normal');
      
      exp.points.forEach(point => {
        // Use custom styled bullets
        pdf.setFillColor(colors.accent[0], colors.accent[1], colors.accent[2]);
        pdf.circle(layout.margins.left + 1, y - 1.5, 0.8, 'F');
        
        const bulletIndent = 5;
        const pointHeight = addWrappedText(point, layout.margins.left + bulletIndent, y, contentWidth - bulletIndent, fonts.normal);
        y += pointHeight + 3;
      });
      
      // Technologies with clean styling
      if (exp.technologies.length > 0) {
        y += 1;
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(fonts.small);
        pdf.setTextColor(colors.tertiary[0], colors.tertiary[1], colors.tertiary[2]);
        pdf.text('Technologies:', layout.margins.left, y);
        y += 4;
        
        // Add technologies in a clean, minimal format with subtle highlighting
        pdf.setFont('helvetica', 'normal');
        const techItems = exp.technologies.map(tech => {
          return tech;
        });
        pdf.text(techItems.join(' • '), layout.margins.left, y);
      }
      
      // Add more space after each position except the last one
      if (index < experiences.length - 1) {
        y += 12; // Increased spacing between experiences
        
        // Add a subtle divider
        pdf.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
        pdf.setLineWidth(0.2);
        pdf.line(layout.margins.left + 15, y - 6, layout.page.width - layout.margins.right - 15, y - 6);
        
        // If we're running out of space, add a new page
        if (y > layout.page.height - 60) {
          pdf.addPage();
          y = layout.margins.top;
        }
      }
    });
    
    // Add a new page for the remaining sections
    pdf.addPage();
    y = layout.margins.top;
    
    // ============ EDUCATION SECTION ============
    y = addSectionHeader('EDUCATION', y);
    
    // Display education from data
    education.forEach((edu, index) => {
      pdf.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(fonts.title);
      pdf.text(edu.title, layout.margins.left, y);
      
      // University and date
      pdf.setTextColor(colors.tertiary[0], colors.tertiary[1], colors.tertiary[2]);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(fonts.small);
      pdf.text(`${edu.institution}, ${edu.period}`, layout.page.width - layout.margins.right, y, { align: 'right' });
      y += 5;
      
      // Description
      if (edu.description) {
        pdf.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(fonts.normal);
        
        pdf.text(edu.description, layout.margins.left, y);
        y += 5;
      }
      
      // Relevant coursework
      if (edu.subjects.length > 0) {
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(fonts.small);
        pdf.setTextColor(colors.tertiary[0], colors.tertiary[1], colors.tertiary[2]);
        pdf.text('Key subjects:', layout.margins.left, y);
        y += 4;
        
        // Format subjects with improved readability
        pdf.setFont('helvetica', 'normal');
        pdf.text(edu.subjects.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', '), layout.margins.left, y);
      }
      
      if (index < education.length - 1) {
        y += 10;
      }
    });
    
    y += 15;
    
    // ============ PROJECTS SECTION ============
    y = addSectionHeader('SELECTED PROJECTS', y);
    
    // Display projects from data
    projects.forEach((project, index) => {
      pdf.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(fonts.title);
      pdf.text(project.title, layout.margins.left, y);
      y += 5;
      
      pdf.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(fonts.normal);
      
      const projectTextHeight = addWrappedText(project.description, layout.margins.left, y, contentWidth, fonts.normal);
      y += projectTextHeight + 3;
      
      // Project technologies with enhanced styling
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(fonts.small);
      pdf.setTextColor(colors.tertiary[0], colors.tertiary[1], colors.tertiary[2]);
      
      // Add a white background behind project technologies
      pdf.setFillColor(255, 255, 255);
      pdf.roundedRect(layout.margins.left - 1, y - 1, contentWidth + 2, 5, 1, 1, 'F');
      
      let techText = `Technologies: ${project.tags.join(', ')}`;
      if (project.url) {
        techText += ` • URL: ${project.url}`;
      }
      
      pdf.text(techText, layout.margins.left, y);
      
      // Add space after each project except the last one
      if (index < projects.length - 1) {
        y += 10;
        
        // Add a subtle divider
        pdf.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
        pdf.setLineWidth(0.2);
        pdf.line(layout.margins.left + 15, y - 5, layout.page.width - layout.margins.right - 15, y - 5);
        
        // Check if we need a new page
        if (y > layout.page.height - 50) {
          pdf.addPage();
          y = layout.margins.top;
        }
      }
    });
    
    // Check if we need a new page for certificates
    if (y > layout.page.height - 60) {
      pdf.addPage();
      y = layout.margins.top;
    } else {
      y += 15;
    }
    
    // ============ CERTIFICATIONS SECTION ============
    y = addSectionHeader('CERTIFICATIONS', y);
    
    // Create two-column layout for certifications to save space
    const certColWidth = (contentWidth - 10) / 2;
    let certLeftY = y;
    let certRightY = y;
    
    // First half of certifications in left column
    for (let i = 0; i < Math.ceil(certificates.length / 2); i++) {
      const cert = certificates[i];
      
      // Add white background for each certification
      pdf.setFillColor(255, 255, 255);
      pdf.roundedRect(layout.margins.left - 2, certLeftY - 2, certColWidth + 2, 10, 1, 1, 'F');
      
      pdf.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(fonts.normal);
      pdf.text(cert.name, layout.margins.left, certLeftY);
      
      pdf.setTextColor(colors.tertiary[0], colors.tertiary[1], colors.tertiary[2]);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(fonts.small);
      pdf.text(`${cert.issuer}`, layout.margins.left, certLeftY + 4);
      pdf.text(cert.date, layout.margins.left + certColWidth - 5, certLeftY + 4, { align: 'right' });
      
      certLeftY += 12; // Increased spacing between certificates
    }
    
    // Second half of certifications in right column
    for (let i = Math.ceil(certificates.length / 2); i < certificates.length; i++) {
      const cert = certificates[i];
      
      // Add white background for each certification
      pdf.setFillColor(255, 255, 255);
      pdf.roundedRect(layout.margins.left + certColWidth + 8, certRightY - 2, certColWidth + 2, 10, 1, 1, 'F');
      
      pdf.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(fonts.normal);
      pdf.text(cert.name, layout.margins.left + certColWidth + 10, certRightY);
      
      pdf.setTextColor(colors.tertiary[0], colors.tertiary[1], colors.tertiary[2]);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(fonts.small);
      pdf.text(`${cert.issuer}`, layout.margins.left + certColWidth + 10, certRightY + 4);
      pdf.text(cert.date, layout.page.width - layout.margins.right, certRightY + 4, { align: 'right' });
      
      certRightY += 12; // Increased spacing between certificates
    }
    
    // Update y position to the maximum of both columns
    y = Math.max(certLeftY, certRightY) + 5;
    
    // Check if we need a new page for skills
    if (y > layout.page.height - 80) {
      pdf.addPage();
      y = layout.margins.top;
    } else {
      y += 15;
    }
    
    // ============ SKILLS SECTION ============
    y = addSectionHeader('SKILLS & EXPERTISE', y);
    
    // Create skill section with data from skillCategories
    const skillColumns: Record<string, string[]> = {};
    
    // Collect all skill categories and their skills
    skillCategories.forEach(category => {
      skillColumns[category.title] = category.skills;
    });
    
    // Two-column skills layout for first row
    const colWidth = (contentWidth - 10) / 2;
    
    // Get the keys for the categories
    const categoryKeys = Object.keys(skillColumns);
    
    // First row of skills (2 columns)
    if (categoryKeys.length >= 2) {
      // Add white background for skills section
      pdf.setFillColor(255, 255, 255);
      pdf.rect(layout.margins.left - 3, y - 3, contentWidth + 6, 10 + (Math.max(skillColumns[categoryKeys[0]].length, skillColumns[categoryKeys[1]].length) * 5), 'F');
      
      // Column 1 headers
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(fonts.normal);
      pdf.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
      pdf.text(categoryKeys[0], layout.margins.left, y);
      
      // Column 2 headers
      pdf.text(categoryKeys[1], layout.margins.left + colWidth + 10, y);
      y += 5;
      
      // Column 1 skills
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(fonts.normal);
      pdf.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
      
      let skill1Y = y;
      skillColumns[categoryKeys[0]].forEach(skill => {
        // Custom styled bullets for skills
        pdf.setFillColor(colors.accent[0], colors.accent[1], colors.accent[2]);
        pdf.circle(layout.margins.left + 1, skill1Y - 1.5, 1, 'F');
        pdf.text(`  ${skill}`, layout.margins.left, skill1Y);
        skill1Y += 5;
      });
      
      // Column 2 skills
      let skill2Y = y;
      skillColumns[categoryKeys[1]].forEach(skill => {
        // Custom styled bullets for skills
        pdf.setFillColor(colors.accent[0], colors.accent[1], colors.accent[2]);
        pdf.circle(layout.margins.left + colWidth + 11, skill2Y - 1.5, 1, 'F');
        pdf.text(`  ${skill}`, layout.margins.left + colWidth + 10, skill2Y);
        skill2Y += 5;
      });
      
      y = Math.max(skill1Y, skill2Y) + 5;
    }
    
    // Third category (if exists)
    if (categoryKeys.length >= 3) {
      // AI Techniques header with white background
      pdf.setFillColor(255, 255, 255);
      pdf.rect(layout.margins.left - 3, y - 3, contentWidth + 6, 15, 'F');
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(fonts.normal);
      pdf.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
      pdf.text(categoryKeys[2], layout.margins.left, y);
      y += 5;
      
      // Tools skills in a single row
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(fonts.normal);
      pdf.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
      
      // Create a nicer display for techniques with a subtle separator
      const techniques = skillColumns[categoryKeys[2]];
      let techText = '';
      techniques.forEach((tech, idx) => {
        techText += tech;
        if (idx < techniques.length - 1) {
          techText += ' • ';
        }
      });
      
      pdf.text(techText, layout.margins.left, y);
      y += 15; // More space after skills section
    }
    
    // Add a white footer
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, layout.page.height - 15, layout.page.width, 15, 'F');
    
    return pdf;
  };

  const downloadPDF = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const pdf = generateResume();
      
      // Try to download
      try {
        const pdfBlob = pdf.output('blob');
        const blobUrl = URL.createObjectURL(pdfBlob);
        
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'Minh_Bui_Resume.pdf';
        downloadLink.target = '_blank';
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        
        setTimeout(() => {
          document.body.removeChild(downloadLink);
          URL.revokeObjectURL(blobUrl);
        }, 100);
      } catch (downloadError) {
        console.error('Error triggering download:', downloadError);
        setError('Download failed. Please try the "View in Browser" option.');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError('Error generating PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const viewInBrowser = () => {
    setLoading(true);
    setError(null);
    
    try {
      const pdf = generateResume();
      const pdfData = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfData);
      window.open(pdfUrl, '_blank');
      
      // Clean up URL after a delay
      setTimeout(() => {
        URL.revokeObjectURL(pdfUrl);
      }, 100);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError('Error generating PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={downloadPDF}
          disabled={loading}
          className={`px-4 py-2 bg-primary text-white rounded-md transition-colors ${
            loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary/90'
          }`}
        >
          {loading ? 'Processing...' : 'Download Resume'}
        </button>
        
        <button 
          onClick={viewInBrowser}
          disabled={loading}
          className="px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
        >
          View in Browser
        </button>
      </div>
      
      {error && (
        <p className="mt-2 text-red-500 text-sm">{error}</p>
      )}
      
      <div className="mt-4 text-sm text-muted-foreground">
        <p>Tip: If download doesn't work, try the "View in Browser" option and save from there.</p>
      </div>
    </div>
  );
} 