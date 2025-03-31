import React from 'react';
import dynamic from 'next/dynamic';

// Dynamic import of CodeBubbles to avoid SSR issues
const CodeBubbles = dynamic(() => import('./code-bubbles'), { ssr: false });

/**
 * PageContainer - A shared layout component used across all pages
 * 
 * This component provides:
 * 1. Consistent background animation with CodeBubbles
 * 2. Flexible layout options with customizable max-width and padding
 * 3. Proper z-index layering to ensure content is above animations
 * 
 * Usage:
 * <PageContainer maxWidth="xl" withPadding={true}>
 *   {children}
 * </PageContainer>
 */
interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  withBackground?: boolean;
  withPadding?: boolean;
  flexDirection?: 'row' | 'col';
  justifyContent?: string;
}

export function PageContainer({ 
  children, 
  className = '', 
  maxWidth = '4xl',
  withBackground = true,
  withPadding = true,
  flexDirection = 'col',
  justifyContent = ''
}: PageContainerProps) {
  return (
    <div className="relative min-h-screen w-full">
      {/* CodeBubbles provides the animated background elements */}
      
      {/* Main content container with proper z-index to stay above background */}
      <div className={`w-full flex flex-${flexDirection} ${justifyContent} ${withPadding ? 'px-4 py-12 sm:py-16' : ''} relative z-10 ${className}`}>
        {maxWidth !== 'full' ? (
          <div className={`w-full max-w-${maxWidth}`}>
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

export default PageContainer; 