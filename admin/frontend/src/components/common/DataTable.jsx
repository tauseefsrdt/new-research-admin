import React from 'react';
import { Search, ChevronLeft, ChevronRight, Plus, Filter, RefreshCw } from 'lucide-react';

export default function DataTable({
  title,
  subtitle,
  columns,
  data = [],
  loading = false,
  totalElements = 0,
  pageNumber = 0,
  pageSize = 10,
  totalPages = 0,
  onPageChange,
  searchQuery = '',
  onSearchChange,
  filters = [], // [{ key, label, options: [{ label, value }], value, onChange }]
  onAddNew,
  addNewLabel = 'Add New',
  onRefresh,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
      {/* Header bar */}
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-serif text-[#0C2F44] tracking-tight flex items-center gap-2.5">
            <span className="w-2 h-5 bg-[#0A4A8F] rounded-full inline-block" />
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 mt-1 pl-4.5">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#0A4A8F]' : ''}`} />
            </button>
          )}

          {onAddNew && (
            <button
              onClick={onAddNew}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A4A8F] hover:bg-[#0C2F44] text-white text-sm font-medium shadow-sm hover:shadow transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{addNewLabel}</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        {onSearchChange && (
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9.5 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F] transition-all"
            />
          </div>
        )}

        {/* Dynamic Filters */}
        {filters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2.5">
            {filters.map((f) => (
              <div key={f.key} className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-slate-500">{f.label}:</span>
                <select
                  value={f.value}
                  onChange={(e) => f.onChange(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0A4A8F]/20 focus:border-[#0A4A8F] transition-all"
                >
                  {f.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto min-h-[300px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`px-5 py-3.5 ${col.className || ''}`}
                  style={{ width: col.width }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="py-16 text-center">
                  <div className="inline-flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-3 border-[#0A4A8F] border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm font-medium text-slate-500">Loading records...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-16 text-center">
                  <div className="inline-flex flex-col items-center gap-2 text-slate-400">
                    <Filter className="w-8 h-8 stroke-1" />
                    <p className="text-base font-semibold text-slate-600">No records found</p>
                    <p className="text-xs text-slate-400">
                      Try adjusting your search criteria or add a new record.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => (
                <tr
                  key={row.id || rowIdx}
                  className="hover:bg-slate-50/70 transition-colors group"
                >
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className={`px-5 py-3.5 ${col.className || ''}`}>
                      {col.render ? col.render(row, rowIdx) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div>
          Showing{' '}
          <span className="font-semibold text-slate-700">
            {data.length > 0 ? pageNumber * pageSize + 1 : 0}
          </span>{' '}
          to{' '}
          <span className="font-semibold text-slate-700">
            {Math.min((pageNumber + 1) * pageSize, totalElements)}
          </span>{' '}
          of <span className="font-semibold text-slate-700">{totalElements}</span> entries
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange && onPageChange(pageNumber - 1)}
            disabled={pageNumber === 0 || loading}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <span className="px-2 font-medium text-slate-600">
            Page {pageNumber + 1} of {Math.max(1, totalPages)}
          </span>

          <button
            onClick={() => onPageChange && onPageChange(pageNumber + 1)}
            disabled={pageNumber >= totalPages - 1 || loading}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
