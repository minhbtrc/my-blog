/**
 * Certificates data file
 * 
 * This file contains all certificates that will be displayed on the about page.
 * Certificates data is stored in /src/db/certificates.json for easy management.
 */

import certificatesData from '@/db/certificates.json';

export interface Certificate {
  /** The name of the certificate */
  name: string;
  /** The organization that issued the certificate */
  issuer: string;
  /** When the certificate was issued (format: MMM YYYY) */
  date: string;
  /** URL to the certificate verification page */
  url: string;
  /** Optional description of the certificate */
  description?: string;
  /** Optional image of the certificate (relative path from public directory) */
  image?: string;
  /** Optional categories/tags for the certificate (e.g., "AI", "Development") */
  categories?: string[];
}

/**
 * Array of all certificates imported from the JSON file
 * 
 * The certificates are already sorted by date (most recent first)
 */
export const certificates: Certificate[] = certificatesData;

/**
 * Helper functions to work with certificates
 */

/**
 * Get certificates by category
 */
export function getCertificatesByCategory(category: string): Certificate[] {
  return certificates.filter(cert => 
    cert.categories?.includes(category)
  );
}

/**
 * Get all unique certificate categories
 */
export function getAllCertificateCategories(): string[] {
  const categories = new Set<string>();
  
  certificates.forEach(cert => {
    cert.categories?.forEach(category => {
      categories.add(category);
    });
  });
  
  return Array.from(categories).sort();
} 