import React from 'react';
import Skeleton from './Skeleton';

/**
 * Reusable Form Skeleton for modals and form pages
 */
export default function FormSkeleton({ fields = 4, className = '' }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: fields }).map((_, idx) => (
        <div key={idx} className="space-y-1.5">
          <Skeleton className="h-3.5 w-32 rounded-md" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      ))}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        <Skeleton className="h-9 w-20 rounded-xl" />
        <Skeleton className="h-9 w-28 rounded-xl" />
      </div>
    </div>
  );
}
