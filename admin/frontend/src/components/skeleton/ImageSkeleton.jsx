import React from 'react';
import Skeleton from './Skeleton';

/**
 * Reusable Image Skeleton for image upload previews, gallery items, or cards
 */
export default function ImageSkeleton({
  count = 1,
  className = 'w-full h-44 rounded-2xl',
  containerClassName = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5',
}) {
  const items = Array.from({ length: count });

  if (count === 1) {
    return <Skeleton className={className} />;
  }

  return (
    <div className={containerClassName}>
      {items.map((_, idx) => (
        <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
          <Skeleton className={className} />
          <Skeleton className="h-4 w-3/4 rounded-md" />
          <Skeleton className="h-3 w-1/2 rounded-md opacity-60" />
        </div>
      ))}
    </div>
  );
}
