import React from 'react';
import dynamic from 'next/dynamic';

const CodeBubbles = dynamic(() => import('./code-bubbles'), { ssr: false });

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  withBackground?: boolean;
}

export function PageContainer({ 
  children, 
  className = '', 
  maxWidth = '4xl',
  withBackground = true
}: PageContainerProps) {
  return (
    <div className={`relative min-h-screen w-full ${withBackground ? 'code-bg-light dark:code-bg-dark' : ''}`}>
      {withBackground && <CodeBubbles />}
      <div className={`w-full flex flex-col items-center px-4 py-12 sm:py-16 relative z-10 ${className}`}>
        <div className={`w-full max-w-${maxWidth}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default PageContainer; 