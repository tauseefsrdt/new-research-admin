import React from 'react';
import Skeleton from './Skeleton';

/**
 * Reusable Detail Skeleton for profile or detailed data views
 */
export default function DetailSkeleton({ className = '' }) {
  return (
    <div className={`p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-6 ${className}`}>
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-16 rounded-2xl shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-48 rounded-lg" />
          <Skeleton className="h-3.5 w-32 rounded-md opacity-70" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-24 rounded-md" />
          <Skeleton className="h-8 w-full rounded-xl" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-24 rounded-md" />
          <Skeleton className="h-8 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
