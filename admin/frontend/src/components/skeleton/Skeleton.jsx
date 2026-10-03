import React from 'react';

/**
 * Base Skeleton component with subtle pulse animation
 */
export default function Skeleton({
  className = '',
  variant = 'rectangular', // 'rectangular' | 'circular' | 'rounded' | 'text'
  ...props
}) {
  const baseClasses = 'animate-pulse bg-slate-200/70';
  
  let variantClasses = 'rounded-md';
  if (variant === 'circular') variantClasses = 'rounded-full';
  if (variant === 'rounded') variantClasses = 'rounded-xl';
  if (variant === 'text') variantClasses = 'rounded h-4';

  return (
    <div
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    />
  );
}
