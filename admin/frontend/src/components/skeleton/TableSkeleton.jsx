import React from 'react';
import Skeleton from './Skeleton';

/**
 * Reusable Table Skeleton Loader
 * Can be rendered directly inside a <tbody> or as a standalone table wrapper
 */
export default function TableSkeleton({
  rows = 6,
  columns = 5,
  colWidths = [],
}) {
  const rowArray = Array.from({ length: rows });
  const colCount = typeof columns === 'number' ? columns : columns.length;

  return (
    <>
      {rowArray.map((_, rowIdx) => (
        <tr key={rowIdx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/40">
          {Array.from({ length: colCount }).map((_, colIdx) => {
            const widthClass = colWidths[colIdx] || (colIdx === 0 ? 'w-4/5' : colIdx === colCount - 1 ? 'w-20' : 'w-1/2');
            return (
              <td key={colIdx} className="px-5 py-3.5">
                <div className="flex flex-col gap-1.5">
                  <Skeleton className={`h-4 ${widthClass} rounded-lg`} />
                  {colIdx === 0 && (
                    <Skeleton className="h-3 w-2/5 rounded-md opacity-60" />
                  )}
                </div>
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}
