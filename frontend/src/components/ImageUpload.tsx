'use client';

import { useState, useRef } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ImageUploadProps {
  currentImage?: string;
  onImageUpload: (imageUrl: string) => void;
  onImageRemove?: () => void;
  className?: string;
  placeholder?: string;
}

const ImageUpload = ({ 
  currentImage, 
  onImageUpload, 
  onImageRemove, 
  className = '',
  placeholder = 'Click to upload vehicle image'
}: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File size must be less than 10MB');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('folder', 'vehicles');

      const response = await fetch(`${API_BASE_URL}/upload/image`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        onImageUpload(result.data.url);
      } else {
        alert(`Upload failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    if (onImageRemove) {
      onImageRemove();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
      
      {currentImage ? (
        <div className="relative group">
          <img
            src={currentImage}
            alt="Vehicle"
            className="w-full h-48 object-cover rounded-lg border-2 border-neutral-200"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
            <button
              type="button"
              onClick={handleClick}
              disabled={uploading}
              className="bg-white text-primary-900 px-4 py-2 rounded-lg font-medium hover:bg-neutral-100 transition-colors"
            >
              {uploading ? 'Uploading...' : 'Change'}
            </button>
            {onImageRemove && (
              <button
                type="button"
                onClick={handleRemove}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors
            flex flex-col items-center justify-center space-y-2
            ${dragOver 
              ? 'border-accent-500 bg-accent-50' 
              : 'border-neutral-300 hover:border-accent-400 hover:bg-neutral-50'
            }
            ${uploading ? 'pointer-events-none opacity-50' : ''}
          `}
        >
          {uploading ? (
            <>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-500"></div>
              <p className="text-sm text-neutral-600">Uploading...</p>
            </>
          ) : (
            <>
              <div className="text-4xl text-neutral-400">📷</div>
              <p className="text-sm text-neutral-600 text-center px-4">
                {placeholder}
              </p>
              <p className="text-xs text-neutral-500">
                Drag & drop or click to browse
              </p>
              <p className="text-xs text-neutral-400">
                PNG, JPG, GIF up to 10MB
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
