import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, Image as ImageIcon, Trash2, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { uploadImage } from '../../api/uploadApi';
import { formatImageUrl } from '../../utils/imageUtils';
import { showSuccessToast, showErrorToast, showWarningToast, showInfoToast } from '../../utils/toast';

/**
 * Reusable Image Upload Component
 *
 * @param {string} value Current image URL / path
 * @param {function} onChange Callback when image URL changes `(newUrl: string) => void`
 * @param {string} module Subdirectory in upload_image (e.g. 'institute-department', 'faculty')
 * @param {string} label Label for the input field
 * @param {string} fallbackIcon Fallback Icon component
 * @param {string} helperText Optional helper text
 */
export default function ImageUpload({
  value = '',
  onChange,
  module = 'institute-department',
  label = 'Department Image',
  fallbackIcon: FallbackIcon = ImageIcon,
  helperText = 'Supports JPG, PNG, WEBP (Max: 10MB)',
}) {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  // Sync internal preview with external value
  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(value ? formatImageUrl(value) : '');
    }
  }, [value, selectedFile]);

  const handleFileSelect = async (file) => {
    if (!file) return;

    setError('');
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      const msg = 'Invalid file type. Please upload a JPG, PNG, or WEBP image.';
      setError(msg);
      showWarningToast(msg);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      const msg = 'File size exceeds 10MB limit.';
      setError(msg);
      showWarningToast(msg);
      return;
    }

    // Instant local preview
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
    setSelectedFile(file);

    // Trigger upload to backend
    setUploading(true);
    try {
      const result = await uploadImage(file, module, value);
      if (result && result.url) {
        onChange(result.url);
        setPreviewUrl(formatImageUrl(result.url));
        setSelectedFile(null);
        showSuccessToast('Image uploaded successfully');
      }
    } catch (err) {
      console.error('Failed to upload image:', err);
      const errMsg = err.response?.data?.message || err.message || 'Image upload failed.';
      setError(errMsg);
      showErrorToast(err, { defaultMessage: 'Failed to upload image' });
      // revert preview
      setPreviewUrl(value ? formatImageUrl(value) : '');
      setSelectedFile(null);
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

  const handleRemove = () => {
    onChange('');
    setPreviewUrl('');
    setSelectedFile(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    showInfoToast('Image removed');
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-700">
          {label}
        </label>
        {value && (
          <span className="text-[11px] font-mono text-slate-400 truncate max-w-[240px]" title={value}>
            {value.startsWith('/upload_image') ? 'Uploaded to storage' : value}
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
          accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
          onChange={handleInputChange}
          className="hidden"
        />

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Image Preview Box */}
          <div className="w-28 h-28 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center relative shadow-xs group">
            {previewUrl ? (
              <>
                <img
                  src={previewUrl}
                  alt="Department Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.nextElementSibling) {
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }
                  }}
                />
                <div className="hidden absolute inset-0 items-center justify-center bg-slate-100 text-slate-400">
                  <FallbackIcon className="w-8 h-8 text-slate-400" />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-400 p-2 text-center">
                <FallbackIcon className="w-8 h-8 mb-1 text-slate-300" />
                <span className="text-[10px] text-slate-400 font-medium">No Image</span>
              </div>
            )}

            {uploading && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-center text-white">
                <RefreshCw className="w-6 h-6 animate-spin mb-1 text-white" />
                <span className="text-[10px] font-semibold">Uploading...</span>
              </div>
            )}
          </div>

          {/* Action & Info Area */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div>
              <div className="text-xs font-semibold text-slate-800">
                {previewUrl ? 'Change or Replace Image' : 'Upload Department Banner / Photo'}
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
                className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-[#0A4A8F] font-semibold text-xs border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <UploadCloud className="w-3.5 h-3.5 text-[#0A4A8F]" />
                {previewUrl ? 'Change Image' : 'Select Image File'}
              </button>

              {previewUrl && (
                <button
                  type="button"
                  disabled={uploading}
                  onClick={handleRemove}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-red-50 text-slate-500 hover:text-red-600 font-medium text-xs border border-slate-200 transition-all flex items-center gap-1.5 disabled:opacity-50"
                  title="Remove image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove
                </button>
              )}
            </div>

            {value && value.startsWith('/upload_image') && (
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium pt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Saved in <code className="font-mono text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">upload_image/{module}/</code></span>
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
