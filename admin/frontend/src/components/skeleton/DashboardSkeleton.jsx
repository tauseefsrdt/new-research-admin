import React from 'react';
import Skeleton from './Skeleton';
import CardSkeleton from './CardSkeleton';

/**
 * Full Dashboard Skeleton that perfectly mirrors the DashboardPage layout
 */
export default function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Welcome Hero Banner Skeleton */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0C2F44]/90 via-[#0A4A8F]/90 to-[#125B9A]/90 p-6 sm:p-8 shadow-xl">
        <div className="space-y-3 max-w-2xl">
          <Skeleton className="h-6 w-48 rounded-full bg-white/20" />
          <Skeleton className="h-8 w-80 rounded-xl bg-white/20" />
          <Skeleton className="h-4 w-full rounded-lg bg-white/15" />
          <Skeleton className="h-4 w-3/4 rounded-lg bg-white/15" />
        </div>
      </div>

      {/* Primary Key Stats Grid Skeleton (4 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <CardSkeleton count={4} />
      </div>

      {/* Academic Entities Summary Grid Skeleton */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="w-2 h-4 rounded-full bg-[#FFB703]" />
          <Skeleton className="h-5 w-52 rounded-md" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <CardSkeleton count={4} variant="academic" />
        </div>
      </div>

      {/* Recent Records Grid Skeleton (2 boxes) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Patents Box */}
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 rounded-md" />
              <Skeleton className="h-4 w-36 rounded-md" />
            </div>
            <Skeleton className="h-3.5 w-16 rounded-md" />
          </div>
          <div className="divide-y divide-slate-100">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="py-3 flex items-start justify-between gap-3">
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-4/5 rounded-md" />
                  <Skeleton className="h-3 w-1/2 rounded-md opacity-60" />
                </div>
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Publications Box */}
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 rounded-md" />
              <Skeleton className="h-4 w-40 rounded-md" />
            </div>
            <Skeleton className="h-3.5 w-16 rounded-md" />
          </div>
          <div className="divide-y divide-slate-100">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="py-3 flex items-start justify-between gap-3">
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-4/5 rounded-md" />
                  <Skeleton className="h-3 w-1/2 rounded-md opacity-60" />
                </div>
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
