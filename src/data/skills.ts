/**
 * Skills data file
 * 
 * This file contains all skill categories that will be displayed on the about page.
 * Skills data is stored in /src/db/skills.json for easy management.
 */

import skillsData from '@/db/skills.json';

export interface SkillCategory {
  /** Category title (e.g., "Frameworks & Libraries") */
  title: string;
  /** Array of skills in this category */
  skills: string[];
  /** Animation delay value (used for staggered animations) */
  delay?: number;
}

/**
 * Array of all skill categories imported from the JSON file
 */
export const skillCategories: SkillCategory[] = skillsData;

/**
 * Helper functions to work with skills
 */

/**
 * Get all unique skills across all categories
 */
export function getAllSkills(): string[] {
  const skills = new Set<string>();
  
  skillCategories.forEach(category => {
    category.skills.forEach(skill => {
      skills.add(skill.toLowerCase());
    });
  });
  
  return Array.from(skills).sort();
}

/**
 * Check if a specific skill exists in any category
 */
export function hasSkill(skill: string): boolean {
  const skillLower = skill.toLowerCase();
  
  return skillCategories.some(category => 
    category.skills.some(s => s.toLowerCase() === skillLower)
  );
}

/**
 * Get all categories that contain a specific skill
 */
export function getCategoriesWithSkill(skill: string): SkillCategory[] {
  const skillLower = skill.toLowerCase();
  
  return skillCategories.filter(category => 
    category.skills.some(s => s.toLowerCase() === skillLower)
  );
} 