import React from 'react';
import Skeleton from './Skeleton';

/**
 * Reusable Card Skeleton component for dashboard metrics and summary cards
 */
export default function CardSkeleton({ count = 1, className = '', variant = 'stat' }) {
  const items = Array.from({ length: count });

  if (variant === 'academic') {
    return (
      <>
        {items.map((_, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between ${className}`}
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Skeleton className="w-10 h-10 rounded-xl" />
                <Skeleton className="h-7 w-12 rounded-lg" />
              </div>
              <Skeleton className="h-4 w-3/4 rounded-md mb-2" />
              <Skeleton className="h-3 w-5/6 rounded-md opacity-70" />
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {items.map((_, idx) => (
        <div
          key={idx}
          className={`p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between ${className}`}
        >
          <div className="flex items-start justify-between">
            <div className="space-y-2.5 flex-1 pr-4">
              <Skeleton className="h-3.5 w-28 rounded-md" />
              <Skeleton className="h-8 w-20 rounded-xl" />
            </div>
            <Skeleton className="w-11 h-11 rounded-2xl shrink-0" />
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <Skeleton className="h-3.5 w-32 rounded-md" />
            <Skeleton className="h-3.5 w-3.5 rounded-full" />
          </div>
        </div>
      ))}
    </>
  );
}
