import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  FileCode,
  Download,
  Eye,
  Search,
  RefreshCw,
  FolderDown,
  Sparkles,
  FileCheck2,
  FileCheck,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { gsap } from 'gsap';
import { RC_FORMAT_DOCUMENTS, RcFormatDocument } from '../data/rcFormatData';
import PdfModal from '../components/PdfModal';

const CATEGORIES = [
  'All',
  'Thesis Submission',
  'Quality & Plagiarism',
  'Checklists',
  'Administrative & Financial',
  'General',
] as const;

function RcFormatPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFileType, setSelectedFileType] = useState<'All' | 'pdf' | 'docx'>('All');
  const [selectedPdf, setSelectedPdf] = useState<{ url: string; title: string; subtitle?: string } | null>(null);

  // Entrance animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.rc-hero-reveal',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', clearProps: 'all' }
      );
      gsap.fromTo(
        '.rc-filter-reveal',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.15, ease: 'power2.out', clearProps: 'all' }
      );
      gsap.fromTo(
        '.rc-card-reveal',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, delay: 0.25, ease: 'power2.out', clearProps: 'all' }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const filteredDocs = RC_FORMAT_DOCUMENTS.filter((doc) => {
    // Search query match
    if (search.trim()) {
      const term = search.toLowerCase();
      const match =
        doc.title.toLowerCase().includes(term) ||
        doc.filename.toLowerCase().includes(term) ||
        doc.description.toLowerCase().includes(term) ||
        doc.category.toLowerCase().includes(term);
      if (!match) return false;
    }

    // Category filter
    if (selectedCategory !== 'All' && doc.category !== selectedCategory) {
      return false;
    }

    // File type filter
    if (selectedFileType !== 'All') {
      if (selectedFileType === 'docx') {
        if (doc.fileType !== 'docx' && doc.fileType !== 'doc') return false;
      } else if (doc.fileType !== selectedFileType) {
        return false;
      }
    }

    return true;
  });

  const hasFilters = search.trim() !== '' || selectedCategory !== 'All' || selectedFileType !== 'All';

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSelectedFileType('All');
  };

  const handleDocumentAction = (doc: RcFormatDocument) => {
    if (doc.fileType === 'pdf') {
      setSelectedPdf({
        url: doc.path,
        title: doc.title,
        subtitle: `${doc.category} • ${doc.filename} (${doc.fileSize})`,
      });
    } else {
      // For doc / docx, trigger native browser download / open
      const link = document.createElement('a');
      link.href = doc.path;
      link.download = doc.filename;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div ref={pageRef} className="archive-page home-width py-8 sm:py-12">
      {/* Header Banner */}
      <div className="page-hero-copy mb-8">
        <div className="rc-hero-reveal eyebrow">
          <span className="eyebrow-dot" />
          <FileCheck2 className="w-4 h-4" />
          <span>Research &amp; Consultancy Cell</span>
        </div>
        <h1 className="rc-hero-reveal text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#1F2937] tracking-tight mt-2 mb-3">
          R&amp;C <em>Format &amp; Guidelines</em>
        </h1>
        <p className="rc-hero-reveal text-base sm:text-lg text-[#6B7280] max-w-2xl">
          Official proformas, checklists, thesis submission formats, plagiarism certificates, and guidelines provided by the Research &amp; Consultancy Cell.
        </p>
      </div>

      {/* Summary Highlight Cards */}
      <div className="rc-hero-reveal grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8">
        <div className="p-4 rounded-2xl bg-white/90 border border-[#0A4A8F]/15 shadow-xs backdrop-blur-md flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0A4A8F]/10 text-[#0A4A8F] flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-serif text-[#0F172A]">{RC_FORMAT_DOCUMENTS.length}</div>
            <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Total Formats</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/90 border border-[#0A4A8F]/15 shadow-xs backdrop-blur-md flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 border border-red-200/50 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-serif text-[#0F172A]">
              {RC_FORMAT_DOCUMENTS.filter((d) => d.fileType === 'pdf').length}
            </div>
            <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">PDF Files</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/90 border border-[#0A4A8F]/15 shadow-xs backdrop-blur-md flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/50 flex items-center justify-center shrink-0">
            <FileCode className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-serif text-[#0F172A]">
              {RC_FORMAT_DOCUMENTS.filter((d) => d.fileType === 'docx' || d.fileType === 'doc').length}
            </div>
            <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Word Docs</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/90 border border-[#0A4A8F]/15 shadow-xs backdrop-blur-md flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/50 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-serif text-[#0F172A]">Verified</div>
            <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Latest 2026/25</div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="rc-filter-reveal filter-bar papers-filter-bar mb-6 p-4 rounded-2xl bg-white/80 border border-[#0A4A8F]/15 shadow-md backdrop-blur-md">
        {/* Search Input */}
        <div className="filter-search flex-1">
          <Search className="text-[#0A4A8F]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents by title, keyword, or filename..."
            className="archive-input"
          />
        </div>

        {/* Category Select */}
        <div className="filter-select department-select">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="archive-input"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        {/* File Type Filter */}
        <div className="filter-select">
          <select
            value={selectedFileType}
            onChange={(e) => setSelectedFileType(e.target.value as any)}
            className="archive-input"
          >
            <option value="All">All Formats</option>
            <option value="pdf">PDF Documents (.pdf)</option>
            <option value="docx">Word Documents (.docx)</option>
          </select>
        </div>

        {/* Reset Button */}
        {hasFilters && (
          <button
            onClick={resetFilters}
            className="btn-ghost reset-button"
            title="Reset filters"
          >
            <RefreshCw className="w-4 h-4" style={{ color: 'var(--color-deep-teal)' }} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between mb-5 px-1">
        <div className="results-count-badge">
          <strong>{filteredDocs.length}</strong>
          documents found
          {hasFilters && <span className="text-[#6B7280] ml-1 font-normal">(filtered)</span>}
        </div>
      </div>

      {/* Documents Grid */}
      {filteredDocs.length === 0 ? (
        <div className="empty-state min-h-[280px] flex flex-col items-center justify-center p-12 bg-white/60 rounded-2xl border border-[#0A4A8F]/10 text-center">
          <FileText className="w-10 h-10 text-[#9CA3AF] mb-3 stroke-[1.5]" />
          <p className="font-semibold text-[#1F2937]">No documents match your filter criteria</p>
          <p className="text-xs text-[#6B7280] mt-1">Try adjusting your search terms or clearing the selected category.</p>
          {hasFilters && (
            <button
              onClick={resetFilters}
              className="btn-ghost inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full border border-[#0A4A8F]/20 text-xs font-medium text-[#0A4A8F]"
            >
              <RefreshCw size={13} />
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => {
            const isPdf = doc.fileType === 'pdf';
            const isDocx = doc.fileType === 'docx' || doc.fileType === 'doc';

            return (
              <article
                key={doc.id}
                className="rc-card-reveal group relative p-6 sm:p-7 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-[#0A4A8F]/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between h-full overflow-hidden"
              >
                {/* Accent strip on hover */}
                <div
                  className={`absolute top-0 inset-x-0 h-1 transition-opacity duration-300 ${
                    isPdf
                      ? 'bg-gradient-to-r from-red-600 via-[#FFB703] to-red-600'
                      : 'bg-gradient-to-r from-blue-600 via-[#FFB703] to-blue-600'
                  } opacity-0 group-hover:opacity-100`}
                />

                <div>
                  {/* Category Chip & File Format Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3.5 flex-wrap">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0A4A8F] px-2.5 py-1 rounded-full bg-[#0A4A8F]/8 border border-[#0A4A8F]/15">
                      ● {doc.category}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        isPdf
                          ? 'text-red-700 bg-red-50 border-red-200'
                          : 'text-blue-700 bg-blue-50 border-blue-200'
                      }`}
                    >
                      {isPdf ? 'PDF DOCUMENT' : 'WORD DOCUMENT'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-[17px] sm:text-[18px] font-bold text-[#0F172A] leading-snug mb-2.5 group-hover:text-[#0A4A8F] transition-colors">
                    {doc.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {doc.description}
                  </p>

                  {/* File Metadata Box */}
                  <div className="p-3 rounded-2xl bg-slate-50/90 border border-slate-200/70 mb-4 flex items-center justify-between gap-2 text-xs font-mono">
                    <div className="flex items-center gap-2 min-w-0 text-slate-600">
                      {isPdf ? (
                        <FileText size={15} className="text-red-500 shrink-0" />
                      ) : (
                        <FileCode size={15} className="text-blue-600 shrink-0" />
                      )}
                      <span className="truncate text-[11px]" title={doc.filename}>
                        {doc.filename}
                      </span>
                    </div>
                    <span className="shrink-0 font-bold text-slate-700 text-[11px] px-2 py-0.5 bg-white rounded-md border border-slate-200">
                      {doc.fileSize}
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                  {/* Primary View / Open Action */}
                  {isPdf ? (
                    <button
                      type="button"
                      onClick={() => handleDocumentAction(doc)}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0A4A8F] hover:bg-[#0C5CA8] text-white font-mono text-xs font-medium transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer active:scale-95"
                      title="Preview PDF"
                    >
                      <Eye size={13} />
                      <span>View PDF</span>
                    </button>
                  ) : (
                    <a
                      href={doc.path}
                      download={doc.filename}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0A4A8F] hover:bg-[#0C5CA8] text-white font-mono text-xs font-medium transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                      title="Download Word Document"
                    >
                      <Download size={13} />
                      <span>Download DOCX</span>
                    </a>
                  )}

                  {/* Secondary Download Action for PDFs */}
                  {isPdf && (
                    <a
                      href={doc.path}
                      download={doc.filename}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs font-medium transition-all"
                      title="Download PDF file directly"
                    >
                      <Download size={12} />
                      <span className="hidden sm:inline">Download</span>
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* PDF Viewer Modal */}
      <PdfModal
        isOpen={Boolean(selectedPdf)}
        onClose={() => setSelectedPdf(null)}
        pdfUrl={selectedPdf?.url}
        title={selectedPdf?.title}
        subtitle={selectedPdf?.subtitle}
      />
    </div>
  );
}

export default RcFormatPage;
