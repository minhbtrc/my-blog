/**
 * Education data file
 * 
 * This file contains all education entries that will be displayed on the about page.
 * Education data is stored in /src/db/education.json for easy management.
 */

import educationData from '@/db/education.json';

export interface Education {
  /** Degree or program title */
  title: string;
  /** Educational institution name */
  institution: string;
  /** Period of study */
  period: string;
  /** Optional description of the program */
  description?: string;
  /** Array of subjects or focus areas */
  subjects: string[];
  /** Animation delay value (used for staggered animations) */
  delay?: number;
}

/**
 * Array of all education entries imported from the JSON file
 * 
 * The education entries are already sorted by date (most recent first)
 */
export const education: Education[] = educationData;

/**
 * Helper functions to work with education data
 */

/**
 * Get education entries by subject
 */
export function getEducationBySubject(subject: string): Education[] {
  return education.filter(edu => 
    edu.subjects.some(s => s.toLowerCase() === subject.toLowerCase())
  );
}

/**
 * Get all unique subjects across all education entries
 */
export function getAllSubjects(): string[] {
  const subjects = new Set<string>();
  
  education.forEach(edu => {
    edu.subjects.forEach(subject => {
      subjects.add(subject.toLowerCase());
    });
  });
  
  return Array.from(subjects).sort();
} 