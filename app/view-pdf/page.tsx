// app/view-pdf/page.tsx
'use client'

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function PDFViewer() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');
  const title = searchParams.get('title') || 'PDF Document';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set document title
    document.title = `Viewing: ${title}`;
    
    // Give a little time for the iframe to load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [title]);

  if (!url) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700">No PDF URL provided.</p>
          <button 
            onClick={() => window.close()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">{title}</h1>
          <div className="flex gap-2">
            <a 
              href={url}
              download
              className="px-3 py-1 bg-white text-blue-600 rounded-md text-sm hover:bg-gray-100"
            >
              Download
            </a>
            <button 
              onClick={() => window.close()}
              className="px-3 py-1 bg-blue-800 text-white rounded-md text-sm hover:bg-blue-900"
            >
              Close
            </button>
          </div>
        </div>
      </header>
      
      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading PDF...</p>
          </div>
        </div>
      )}
      
      <iframe 
        src={url}
        className={`flex-1 w-full ${loading ? 'hidden' : 'block'}`}
        title={title}
      />
    </div>
  );
}