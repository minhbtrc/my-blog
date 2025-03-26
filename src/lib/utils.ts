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
export function isURL(url: string): boolean {
  try {
    return !!new URL(url)
  } catch {
    return false
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
