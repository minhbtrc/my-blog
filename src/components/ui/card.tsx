import React from 'react';
import { cn } from '@/lib/utils';
import { themeStyles } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export default function Card({
  className,
  variant = 'default',
  size = 'md',
  hover = false,
  children,
  ...props
}: CardProps) {
  // Base styles applied to all cards
  const baseStyles = themeStyles(
    'rounded-xl overflow-hidden',
    'rounded-xl overflow-hidden'
  );

  // Size classes
  const sizeClasses = {
    sm: themeStyles('shadow-sm', 'shadow-sm'),
    md: themeStyles('shadow-md', 'shadow-md'),
    lg: themeStyles('shadow-lg', 'shadow-lg')
  };

  // Hover effect if enabled
  const hoverStyles = hover
    ? themeStyles(
        'transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
        'transition-all duration-300 hover:shadow-lg hover:-translate-y-1'
      )
    : '';

  // Variant-specific styles
  const variantStyles = {
    default: themeStyles(
      'bg-white border border-gray-100',
      'bg-slate-800 border border-slate-700'
    ),
    glass: themeStyles(
      'bg-white/95 backdrop-blur-sm border border-gray-100/50',
      'bg-slate-800/30 backdrop-blur-sm border border-blue-900/20'
    ),
    gradient: themeStyles(
      'bg-gradient-to-br from-white to-gray-50 border border-gray-100/50',
      'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50'
    ),
    outline: themeStyles(
      'bg-transparent border border-gray-200',
      'bg-transparent border border-slate-600'
    )
  };

  return (
    <div
      className={cn(
        baseStyles,
        sizeClasses[size],
        variantStyles[variant],
        hoverStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
} 