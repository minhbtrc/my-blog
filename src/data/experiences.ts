/**
 * Work Experience data file
 * 
 * This file contains all work experience entries that will be displayed on the about page.
 * Work experience data is stored in /src/db/experiences.json for easy management.
 */

import experiencesData from '@/db/experiences.json';

export interface WorkExperience {
  /** Job title */
  title: string;
  /** Short job description */
  description: string;
  /** Employment period */
  period: string;
  /** Whether this is the current job */
  isCurrent: boolean;
  /** Bullet points describing achievements/responsibilities */
  points: string[];
  /** Technologies used in this role */
  technologies: string[];
  /** Animation delay value (used for staggered animations) */
  delay?: number;
}

/**
 * Array of all work experiences imported from the JSON file
 * 
 * The experiences are already sorted by date (most recent first)
 */
export const experiences: WorkExperience[] = experiencesData;

/**
 * Helper functions to work with work experiences
 */

/**
 * Get experiences by technology
 */
export function getExperiencesByTechnology(tech: string): WorkExperience[] {
  return experiences.filter(exp => 
    exp.technologies.some(t => t.toLowerCase() === tech.toLowerCase())
  );
}

/**
 * Get all unique technologies across all experiences
 */
export function getAllTechnologies(): string[] {
  const technologies = new Set<string>();
  
  experiences.forEach(exp => {
    exp.technologies.forEach(tech => {
      technologies.add(tech.toLowerCase());
    });
  });
  
  return Array.from(technologies).sort();
} 