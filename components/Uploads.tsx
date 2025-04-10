// components/Uploads.tsx
'use client'

import React, { useState, useRef } from 'react';
import { Upload, FileText, Check, AlertCircle } from 'lucide-react';

const Uploads = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadResult, setUploadResult] = useState<{ url: string, public_id: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setUploadStatus('idle');
    setErrorMessage(null);
    
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadStatus('idle');
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.error,response)
        throw new Error(result.error || 'Upload failed');
        
      }

      setUploadResult(result);
      setUploadStatus('success');
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-center mb-4 text-blue-600">Upload CS403 Notes</h2>
      
      <div 
        className="border-2 border-dashed border-blue-300 rounded-lg p-6 mb-4 text-center cursor-pointer"
        onClick={triggerFileInput}
      >
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          ref={fileInputRef}
          accept="image/*,.pdf"
        />
        
        {preview ? (
          <div className="flex flex-col items-center">
            <img src={preview} alt="Preview" className="max-h-40 max-w-full mb-4 rounded" />
            <p className="text-gray-700">{file?.name}</p>
          </div>
        ) : file ? (
          <div className="flex flex-col items-center">
            <FileText size={48} className="text-blue-500 mb-2" />
            <p className="text-gray-700">{file.name}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload size={48} className="text-blue-500 mb-2" />
            <p className="text-gray-700">Click to select a file</p>
            <p className="text-gray-500 text-sm mt-1">Supports JPG, PNG, and PDF files</p>
          </div>
        )}
        
        {uploadStatus === 'success' && (
          <div className="mt-4 flex items-center justify-center text-green-600">
            <Check size={20} className="mr-2" />
            <span>Upload successful!</span>
          </div>
        )}
        
        {uploadStatus === 'error' && (
          <div className="mt-4 flex items-center justify-center text-red-600">
            <AlertCircle size={20} className="mr-2" />
            <span>{errorMessage || 'Upload failed'}</span>
          </div>
        )}
      </div>
      
      <button
        onClick={handleUpload}
        disabled={!file || isUploading || uploadStatus === 'success'}
        className="w-full py-2 px-4 rounded-lg font-medium bg-blue-600 text-white disabled:bg-gray-300 disabled:text-gray-500"
      >
        {isUploading ? 'Uploading...' : uploadStatus === 'success' ? 'Uploaded' : 'Upload File'}
      </button>
      
      {uploadResult && uploadStatus === 'success' && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">File uploaded successfully</h3>
          <p className="text-sm text-gray-600 mb-1">
            <a href={uploadResult.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              View Uploaded File
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Uploads;