import React from 'react';

export default function Badge({ variant = 'default', children, className = '' }) {
  const styles = {
    active: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
    inactive: 'bg-slate-100 text-slate-600 border border-slate-200',
    draft: 'bg-amber-50 text-amber-700 border border-amber-200/80',
    featured: 'bg-amber-500 text-white font-medium',
    primary: 'bg-[#0A4A8F]/10 text-[#0A4A8F] border border-[#0A4A8F]/20',
    gold: 'bg-amber-100 text-amber-900 border border-amber-300',
    default: 'bg-slate-100 text-slate-700 border border-slate-200',
  };

  const currentStyle = styles[variant.toLowerCase()] || styles.default;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide ${currentStyle} ${className}`}>
      {variant.toLowerCase() === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
      {children}
    </span>
  );
}
