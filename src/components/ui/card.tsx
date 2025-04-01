import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'ghost';
  hover?: boolean;
  padding?: boolean;
}

export default function Card({
  className,
  variant = 'default',
  hover = false,
  padding = true,
  children,
  ...props
}: CardProps) {
  // Base styles applied to all cards
  const baseStyles = "rounded-lg overflow-hidden";

  // Padding if enabled
  const paddingClass = padding ? "p-4" : "";

  // Hover effect if enabled
  const hoverStyles = hover
    ? "transition-all duration-200 hover:-translate-y-1"
    : 'transition-all duration-200';

  // Variant-specific styles - following the "either border OR shadow, never both" rule
  const variantStyles = {
    default: "border border-base-200 bg-base-100", // Border only
    outline: "border border-base-300 bg-transparent", // Border only, transparent bg
    ghost: "bg-base-100 shadow-sm", // Shadow only, no border
  };

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        hoverStyles,
        paddingClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
} 