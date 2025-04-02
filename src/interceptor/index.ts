/**
 * Simple interceptor module for Next.js API routes
 * Provides decorators to mark route handlers
 */

/**
 * Injectable decorator (empty implementation)
 * In a real application, this would potentially do dependency injection or middleware handling
 */
export function Injectable() {
  return function(target: any, key?: string, descriptor?: PropertyDescriptor) {
    return descriptor;
  };
} 