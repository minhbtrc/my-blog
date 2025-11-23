/**
 * Work Experience data file
 * 
 * This file contains all work experience entries that will be displayed on the about page.
 * Work experience data is stored in /src/db/experiences.json for easy management.
 */

import experiencesData from '@/db/experiences.json';

export interface JobPosition {
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
}

export interface CompanyExperience {
  /** Company name */
  company: string;
  /** List of positions at this company */
  positions: JobPosition[];
  /** Animation delay value (used for staggered animations) */
  delay?: number;
}

/**
 * Array of all work experiences imported from the JSON file
 */
export const experiences: CompanyExperience[] = experiencesData as unknown as CompanyExperience[];

/**
 * Helper functions to work with work experiences
 */

/**
 * Get experiences by technology
 * Returns a flattened list of positions that match the technology
 */
export function getPositionsByTechnology(tech: string): (JobPosition & { company: string })[] {
  const matchingPositions: (JobPosition & { company: string })[] = [];

  experiences.forEach(exp => {
    exp.positions.forEach(pos => {
      if (pos.technologies.some(t => t.toLowerCase() === tech.toLowerCase())) {
        matchingPositions.push({ ...pos, company: exp.company });
      }
    });
  });

  return matchingPositions;
}

/**
 * Get all unique technologies across all experiences
 */
export function getAllTechnologies(): string[] {
  const technologies = new Set<string>();

  experiences.forEach(exp => {
    exp.positions.forEach(pos => {
      pos.technologies.forEach(tech => {
        technologies.add(tech.toLowerCase());
      });
    });
  });

  return Array.from(technologies).sort();
} 