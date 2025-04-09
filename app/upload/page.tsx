import Upload from "@/components/Uploads";

export default function UploadPage() {
  return (
    <div className="bg-gray-900 text-green-400 p-6 min-h-screen font-mono">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 border-b border-green-500 pb-2">
          <span className="text-green-300">~/</span>
          <span className="text-blue-400">upload</span>
          <span className="text-green-300">_file.sh</span>
        </h1>
        
        <div className="bg-gray-800 rounded-md p-4 border border-green-600 shadow-lg">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <p className="ml-2 text-xs text-gray-400">upload.exe</p>
          </div>
          
          <Upload />
          
          <div className="mt-6 text-sm">
            <p className="text-gray-500">// Ready to process input</p>
            <p className="text-gray-400 flex items-center mt-2">
              <span className="text-green-500 mr-2">$</span> 
              <span className="animate-pulse">_</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
