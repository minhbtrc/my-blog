import React from 'react';
import { cn } from '@/lib/utils';

/**
 * PageContainer - A shared layout component used across all pages
 * Follows Linear/Vercel-inspired spacing and layout conventions
 */
interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  withPadding?: boolean;
  centered?: boolean;
}

export function PageContainer({ 
  children, 
  className = '', 
  maxWidth = '3xl', // Default to the recommended 3xl max width
  withPadding = true,
  centered = true,
}: PageContainerProps) {
  return (
    <div className="w-full">
      <div className={cn(
        "mx-auto w-full",
        maxWidth !== 'full' && `max-w-${maxWidth}`,
        withPadding && "px-4 sm:px-6 lg:px-8 py-6 sm:py-10",
        centered && "flex flex-col items-center",
        className
      )}>
        {children}
      </div>
    </div>
  );
}

export default PageContainer; 