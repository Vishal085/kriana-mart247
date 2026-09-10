'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, RefreshCw, AlertCircle, CheckCircle2, Image as ImageIcon, Sparkles } from 'lucide-react';

export interface UploadedImage {
  url: string;
  altText?: string;
  sortOrder?: number;
  isPrimary?: boolean;
}

interface ProductImageUploaderProps {
  images: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
  maxImages?: number;
  disabled?: boolean;
}

export function ProductImageUploader({ images, onChange, maxImages = 4, disabled }: ProductImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceIndexRef = useRef<number | null>(null);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(null);

    const file = files[0];

    // Client-side validations
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!allowed.includes(file.type)) {
      setError('Please upload a valid JPG, PNG, WebP, or SVG image.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError(`Image exceeds 5MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).`);
      return;
    }

    setUploading(true);
    setProgress(20);

    const timer = setInterval(() => {
      setProgress((prev) => (prev < 85 ? prev + 15 : prev));
    }, 120);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(timer);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload image.');
      }

      setProgress(100);

      const newImage: UploadedImage = {
        url: data.url,
        altText: file.name.replace(/\.[^/.]+$/, ''),
        sortOrder: images.length,
      };

      if (replaceIndexRef.current !== null) {
        const next = [...images];
        next[replaceIndexRef.current] = newImage;
        onChange(next);
        replaceIndexRef.current = null;
      } else {
        onChange([...images, newImage]);
      }
    } catch (err: any) {
      setError(err.message || 'Image upload failed. Please try again.');
    } finally {
      clearInterval(timer);
      setTimeout(() => {
        setUploading(false);
        setProgress(0);
      }, 300);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = (index: number) => {
    const next = images.filter((_, i) => i !== index);
    onChange(next);
  };

  const handleTriggerReplace = (index: number) => {
    replaceIndexRef.current = index;
    fileInputRef.current?.click();
  };

  const handleTriggerAdd = () => {
    replaceIndexRef.current = null;
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-800">
          Product Packaging Images <span className="text-rose-500">*</span>
        </label>
        <span className="text-[11px] font-semibold text-slate-500">
          {images.length} of {maxImages} uploaded (Max 5MB each)
        </span>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-2.5 text-xs text-red-600 font-semibold">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/svg+xml"
        className="hidden"
        onChange={(e) => handleFileSelect(e.target.files)}
      />

      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50 p-2 transition hover:border-[#39A9E8]"
          >
            <img
              src={img.url}
              alt={img.altText || `Product Image ${idx + 1}`}
              className="h-full w-full object-contain mix-blend-multiply"
            />

            {/* Primary badge */}
            {idx === 0 && (
              <span className="absolute top-2 left-2 rounded-md bg-[#073B6F] px-1.5 py-0.5 text-[9px] font-black text-white shadow-xs">
                PRIMARY
              </span>
            )}

            {/* Overlay Action Buttons */}
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-slate-900/60 opacity-0 backdrop-blur-xs transition group-hover:opacity-100">
              <button
                type="button"
                onClick={() => handleTriggerReplace(idx)}
                title="Replace image"
                className="rounded-full bg-white p-1.5 text-slate-700 shadow-md transition hover:bg-[#39A9E8] hover:text-white"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                title="Remove image"
                className="rounded-full bg-rose-500 p-1.5 text-white shadow-md transition hover:bg-rose-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}

        {/* Add image drop zone button */}
        {images.length < maxImages && (
          <button
            type="button"
            onClick={handleTriggerAdd}
            disabled={uploading}
            className="flex aspect-square flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-4 text-center transition hover:border-[#39A9E8] hover:bg-blue-50/40 disabled:opacity-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-xs border border-slate-200">
              <Upload className="h-5 w-5 text-[#0B5FA5]" />
            </div>
            <span className="mt-2 text-[11px] font-bold text-slate-700">
              {images.length === 0 ? 'Upload Main Image' : 'Add More Images'}
            </span>
            <span className="mt-0.5 text-[10px] text-slate-400">JPG, PNG, WebP, SVG</span>
          </button>
        )}
      </div>

      {/* Upload Progress Bar */}
      {uploading && (
        <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3">
          <div className="flex items-center justify-between text-xs font-semibold text-[#0B5FA5] mb-1.5">
            <span className="flex items-center gap-1.5">
              <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Uploading image to storage...
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-blue-200/60">
            <div
              className="h-full bg-[#0B5FA5] transition-all duration-200 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
