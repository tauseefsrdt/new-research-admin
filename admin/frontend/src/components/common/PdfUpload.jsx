import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, Trash2, CheckCircle2, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';
import { uploadPdf, deleteUploadedPdf } from '../../api/uploadApi';
import { showSuccessToast, showErrorToast, showWarningToast, showInfoToast } from '../../utils/toast';

/**
 * Reusable PDF Upload & Update Component
 *
 * @param {string} value Current PDF URL / path
 * @param {function} onChange Callback when PDF URL changes `(newUrl: string) => void`
 * @param {string} module Subdirectory in upload_pdf (e.g. 'patents', 'rc-documents', 'theses', 'research-papers')
 * @param {string} label Label for the input field
 * @param {string} helperText Optional helper text
 */
export default function PdfUpload({
  value = '',
  onChange,
  module = 'patents',
  label = 'Patent Document (PDF)',
  helperText = 'Upload official patent document / certificate in PDF format (Max: 50MB)',
}) {
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = async (file) => {
    if (!file) return;

    setError('');
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension !== 'pdf' && file.type !== 'application/pdf') {
      const msg = 'Invalid file type. Please upload a valid PDF document (.pdf).';
      setError(msg);
      showWarningToast(msg);
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      const msg = 'File size exceeds 50MB limit.';
      setError(msg);
      showWarningToast(msg);
      return;
    }

    setSelectedFileName(file.name);
    setUploading(true);

    try {
      // Passes current `value` as `oldPdfPath` so backend automatically deletes the old file
      const result = await uploadPdf(file, module, value);
      if (result && result.url) {
        onChange(result.url);
        setSelectedFileName('');
        showSuccessToast('PDF document uploaded successfully');
      }
    } catch (err) {
      console.error('Failed to upload PDF:', err);
      const errMsg = err.response?.data?.message || err.message || 'PDF upload failed.';
      setError(errMsg);
      showErrorToast(err, { defaultMessage: 'Failed to upload PDF' });
      setSelectedFileName('');
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleRemove = async () => {
    if (value && value.startsWith('/upload_pdf')) {
      try {
        await deleteUploadedPdf(value);
      } catch (err) {
        console.warn('Could not delete old PDF from server:', err);
      }
    }
    onChange('');
    setSelectedFileName('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    showInfoToast('PDF removed');
  };

  const displayFilename = value ? value.split('/').pop() : '';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-700">
          {label}
        </label>
        {value && (
          <span className="text-[11px] font-mono text-slate-400 truncate max-w-[240px]" title={value}>
            {value.startsWith('/upload_pdf') ? 'Stored in upload_pdf' : value}
          </span>
        )}
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-4 transition-all ${
          isDragOver
            ? 'border-[#0A4A8F] bg-blue-50/50'
            : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleInputChange}
          className="hidden"
        />

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* PDF Box Preview */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-red-50/80 border border-red-200 overflow-hidden shrink-0 flex flex-col items-center justify-center relative shadow-xs">
            <FileText className="w-8 h-8 sm:w-9 sm:h-9 text-red-500 mb-1" />
            <span className="font-mono text-[10px] font-bold text-red-600 uppercase tracking-wider">PDF DOC</span>

            {uploading && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-center text-white">
                <RefreshCw className="w-5 h-5 animate-spin mb-1 text-white" />
                <span className="text-[9px] font-semibold">Uploading...</span>
              </div>
            )}
          </div>

          {/* Action & Info Area */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div>
              <div className="text-xs font-semibold text-slate-800 flex items-center justify-center sm:justify-start gap-1.5">
                <span>{value ? 'Attached PDF Document' : 'Upload or Update PDF File'}</span>
                {value && (
                  <span className="font-mono text-[10px] bg-blue-50 text-[#0A4A8F] px-2 py-0.5 rounded-full border border-blue-200 truncate max-w-[180px]">
                    {displayFilename}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-500">
                {helperText}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
              <button
                type="button"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-[#0A4A8F] font-semibold text-xs border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                <UploadCloud className="w-3.5 h-3.5 text-[#0A4A8F]" />
                {value ? 'Change / Replace PDF' : 'Select PDF File'}
              </button>

              {value && (
                <>
                  <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-blue-50 text-[#0A4A8F] font-medium text-xs border border-slate-200 transition-all flex items-center gap-1.5"
                    title="View uploaded PDF in new tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Preview PDF
                  </a>

                  <button
                    type="button"
                    disabled={uploading}
                    onClick={handleRemove}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-red-50 text-slate-500 hover:text-red-600 font-medium text-xs border border-slate-200 transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                    title="Remove PDF"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Remove
                  </button>
                </>
              )}
            </div>

            {value && value.startsWith('/upload_pdf') && (
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium pt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Saved in <code className="font-mono text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">upload_pdf/{module}/</code> (auto cleans old file on replace)</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 font-medium bg-red-50 p-2 rounded-xl border border-red-100">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
