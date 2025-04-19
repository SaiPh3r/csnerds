import Upload from "@/components/Uploads";

export default function UploadPage() {
  return (
    <div className="bg-white text-gray-800 p-6 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 border-b border-blue-200 pb-2 text-blue-700">
          File Upload Portal
        </h1>
        <div className="bg-white rounded-md p-6 border border-blue-200 shadow-lg">
          <div className="flex items-center mb-4">
            <div className="w-full h-0.5 bg-blue-100"></div>
          </div>
          <Upload />
          <div className="mt-6 text-sm">
            <p className="text-gray-400">Ready for file processing</p>
          </div>
        </div>
        <div className="text-center mt-4 text-xs text-gray-400">
          Upload service v1.0
        </div>
      </div>
    </div>
  );
}