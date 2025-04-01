import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combine class names using clsx and tailwind-merge
 * @param inputs - Class names to combine
 * @returns Combined class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Delay by async/await
 * @param ms - milisenconds
 * @returns A promise
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Check url
 * @returns MacOS or not
 */
export function isURL(str: string): boolean {
  if (!str) return false;
  try {
    // Check if it starts with a protocol
    if (str.startsWith('http://') || str.startsWith('https://')) {
      new URL(str);
      return true;
    }
    // Check if it's a relative URL
    if (str.startsWith('/')) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

/**
 * Check the current system
 * @returns MacOS or not
 */
export function isMac() {
  return typeof navigator !== 'undefined'
    ? navigator.userAgent.toLowerCase().includes('mac')
    : true
}
