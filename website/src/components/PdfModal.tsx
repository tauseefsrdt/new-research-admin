import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Download, FileText, Loader2, Maximize2 } from 'lucide-react';

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl?: string | null;
  title?: string;
  subtitle?: string;
}

export const PdfModal: React.FC<PdfModalProps> = ({
  isOpen,
  onClose,
  pdfUrl,
  title,
  subtitle,
}) => {
  const [loading, setLoading] = useState(true);

  // Close on Escape key and prevent background body scroll
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset loading state when pdfUrl changes
  useEffect(() => {
    if (isOpen && pdfUrl) {
      setLoading(true);
    }
  }, [isOpen, pdfUrl]);

  if (!isOpen || !pdfUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-[#0C2F44]/75 backdrop-blur-md transition-all duration-300 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-modal-title"
    >
      <div
        className="relative w-full max-w-5xl h-[92vh] sm:h-[88vh] bg-white rounded-3xl border border-[#0A4A8F]/20 shadow-2xl flex flex-col overflow-hidden animate-fadeInUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 bg-[#F8FAFC] border-b border-slate-200/80">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-[#0A4A8F]/10 border border-[#0A4A8F]/20 flex items-center justify-center shrink-0 text-[#0A4A8F]">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3
                id="pdf-modal-title"
                className="font-serif text-base sm:text-lg font-bold text-[#0F172A] truncate"
                title={title || 'Patent Document'}
              >
                {title || 'Patent Document'}
              </h3>
              {subtitle && (
                <p className="text-xs font-mono text-slate-500 truncate">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#0A4A8F]/10 text-slate-700 hover:text-[#0A4A8F] font-mono text-xs font-medium border border-slate-200 transition-colors"
              title="Open in new window"
            >
              <Maximize2 size={13} />
              <span>Full Screen</span>
            </a>

            <a
              href={pdfUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0A4A8F] hover:bg-[#0C5CA8] text-white font-mono text-xs font-medium transition-all shadow-sm"
              title="Download or open original"
            >
              <Download size={13} />
              <span className="hidden sm:inline">Download</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200/70 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer Body */}
        <div className="relative flex-1 w-full bg-slate-100 overflow-hidden flex flex-col">
          {loading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-50/80 backdrop-blur-xs">
              <Loader2 className="w-8 h-8 text-[#0A4A8F] animate-spin mb-2" />
              <p className="text-xs font-mono text-slate-500">Loading document...</p>
            </div>
          )}

          <iframe
            src={pdfUrl}
            title={title || 'Patent PDF Viewer'}
            className="w-full h-full border-none"
            onLoad={() => setLoading(false)}
          />
        </div>

        {/* Footer info */}
        <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Document Preview</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">Press <kbd className="px-1 py-0.5 rounded bg-white border border-slate-300 text-[10px]">ESC</kbd> to exit</span>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0A4A8F] hover:underline font-semibold flex items-center gap-1"
            >
              Direct Link <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfModal;
