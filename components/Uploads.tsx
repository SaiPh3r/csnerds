'use client';
import { FileText } from 'lucide-react';

const Upload = () => {
  const handleUpload = async (e: any) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    console.log('Uploaded to:', data.url);
  };

  return (
    <div className="font-sans bg-white rounded-lg shadow-sm p-6 border border-gray-200 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">File Upload</h2>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">CS403</span>
      </div>
      
      <div className="mb-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors">
          <input
            type="file"
            onChange={handleUpload}
            className="w-full p-2 text-sm text-gray-700 focus:outline-none"
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
        <span className="flex items-center">
          <FileText className="h-3 w-3 mr-1" /> 
          Upload lecture notes, assignments, and code snippets
        </span>
        <span>Updated just now</span>
      </div>
    </div>
  );
};

export default Upload;
  