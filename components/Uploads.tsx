// components/Uploads.tsx
'use client'

import React, { useState, useRef } from 'react';
import { Upload, FileText, Check, AlertCircle, Eye } from 'lucide-react';

const Uploads = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileTitle, setFileTitle] = useState<string>('');
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadResult, setUploadResult] = useState<{ url: string, public_id: string, type: string, title: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setUploadStatus('idle');
    setErrorMessage(null);
    
    // Set default title from filename but remove extension
    if (selectedFile) {
      const filename = selectedFile.name;
      const titleWithoutExtension = filename.substring(0, filename.lastIndexOf('.')) || filename;
      setFileTitle(titleWithoutExtension);
      
      console.log('Selected file type:', selectedFile.type); // Debug log for file type
      
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else if (selectedFile.type === 'application/pdf') {
        // For PDFs, we don't show a preview, just indicate it's a PDF
        setPreview(null);
      } else {
        setPreview(null);
        console.warn('Unsupported file type:', selectedFile.type);
      }
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
      formData.append('title', fileTitle || file.name); // Add title to form data
      formData.append('fileType', file.type); // Send file type to backend

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.error, response);
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

  // Function to open PDF in our custom viewer
  const openPdfViewer = (url: string, title: string) => {
    const viewerUrl = `/view-pdf?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    window.open(viewerUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-center mb-4 text-blue-600">Upload CS403 Notes</h2>
      
      <div 
        className="border-2 border-dashed border-blue-200 rounded-lg p-6 mb-4 text-center cursor-pointer hover:bg-blue-50 transition-colors"
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
            <img src={preview} alt="Preview" className="max-h-40 max-w-full mb-4 rounded shadow-sm" />
            <p className="text-gray-700">{file?.name}</p>
          </div>
        ) : file ? (
          <div className="flex flex-col items-center">
            <FileText size={48} className={file?.type === 'application/pdf' ? 'text-red-400 mb-2' : 'text-blue-500 mb-2'} />
            <p className="text-gray-700">{file.name}</p>
            {file.type === 'application/pdf' && <p className="text-xs text-gray-500">PDF Document</p>}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload size={48} className="text-blue-400 mb-2" />
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
          <div className="mt-4 flex items-center justify-center text-red-500">
            <AlertCircle size={20} className="mr-2" />
            <span>{errorMessage || 'Upload failed'}</span>
          </div>
        )}
      </div>
      
      {file && (
        <div className="mb-4">
          <label htmlFor="fileTitle" className="block text-sm font-medium text-gray-600 mb-1">
            Title
          </label>
          <input
            type="text"
            id="fileTitle"
            value={fileTitle}
            onChange={(e) => setFileTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter a title for your file"
          />
        </div>
      )}
      
      <button
        onClick={handleUpload}
        disabled={!file || isUploading || uploadStatus === 'success'}
        className="w-full py-2 px-4 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:bg-gray-200 disabled:text-gray-400"
      >
        {isUploading ? 'Uploading...' : uploadStatus === 'success' ? 'Uploaded' : 'Upload File'}
      </button>
      
      {uploadResult && uploadStatus === 'success' && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">File uploaded successfully</h3>
          
          <div className="flex items-center gap-2 mt-2">
            {uploadResult.type === 'pdf' ? (
              <>
                <button 
                  onClick={() => openPdfViewer(uploadResult.url, uploadResult.title)}
                  className="flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                >
                  <Eye size={16} className="mr-1" />
                  View PDF
                </button>
                <a 
                  href={uploadResult.url} 
                  download={uploadResult.title || "document.pdf"}
                  className="flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
                >
                  Download
                </a>
              </>
            ) : (
              <a 
                href={uploadResult.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
              >
                <Eye size={16} className="mr-1" />
                View Image
              </a>
            )}
          </div>
          
          <p className="text-xs text-gray-500 mt-2">File Type: {uploadResult.type}</p>
        </div>
      )}
    </div>
  );
};

export default Uploads;