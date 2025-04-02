/**
 * Projects data file
 * 
 * This file contains all project entries that will be displayed on the about page.
 * Projects data is stored in /src/db/projects.json for easy management.
 */

import projectsData from '@/db/projects.json';

export interface Project {
  /** Project title */
  title: string;
  /** Array of technologies or keywords */
  tags: string[];
  /** Project description */
  description: string;
  /** URL to project (GitHub, live site, etc.) */
  url?: string;
  /** Optional path to project image */
  image?: string;
  /** Whether this is a featured project */
  featured?: boolean;
  /** Animation delay value (used for staggered animations) */
  delay?: number;
}

/**
 * Array of all projects imported from the JSON file
 */
export const projects: Project[] = projectsData;

/**
 * Helper functions to work with projects data
 */

/**
 * Get projects by tag
 */
export function getProjectsByTag(tag: string): Project[] {
  return projects.filter(project => 
    project.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get all unique tags across all projects
 */
export function getAllProjectTags(): string[] {
  const tags = new Set<string>();
  
  projects.forEach(project => {
    project.tags.forEach(tag => {
      tags.add(tag.toLowerCase());
    });
  });
  
  return Array.from(tags).sort();
}

/**
 * Get featured projects
 */
export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured);
} 