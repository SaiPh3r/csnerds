'use client';
import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Bell,
  Filter,
  Plus,
  Star,
  Clock,
  MessageCircle,
  X,
  FileText,
  Download,
  ExternalLink
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// Document type definition
type Document = {
  public_id: string;
  filename?: string;
  title: string;
  created_at: string;
  secure_url: string;
  type?: string;
};

const Feed = () => {
  const router = useRouter();
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<Document | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch documents from the API
  const fetchDocuments = async () => {
    try {
      const res = await fetch('/api/documents');
      if (!res.ok) throw new Error('Failed to fetch documents');
      const data = await res.json();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Chat handlers
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = { sender: 'user', text: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage }),
      });
      
      const result = await response.json();
      let aiResponse = "Sorry, I couldn't process your request.";
      
      if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        aiResponse = result.candidates[0].content.parts[0].text;
      }
      
      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { sender: 'ai', text: 'Sorry, there was an error processing your request.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  // Document handling functions
  const handleUpload = () => {
    router.push('/upload');
  };

  const getFileType = (doc: Document): 'pdf' | 'image' => {
    if (doc.type === 'pdf') return 'pdf';
    if (doc.secure_url?.toLowerCase().endsWith('.pdf')) return 'pdf';
    return 'image';
  };

  const openPdfViewer = (doc: Document) => {
    setSelectedPdf(doc);
  };

  const closePdfViewer = () => {
    setSelectedPdf(null);
  };

  // Open document in new tab (fallback)
  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content */}
      <div className={`transition-all duration-300 ${isChatVisible ? 'w-3/4' : 'w-full'}`}>
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-blue-600">csNerds</span>
            </div>

            <div className="relative w-full max-w-md mx-4">
              <input
                type="text"
                placeholder="Search notes..."
                className="w-full py-2 px-4 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsChatVisible(!isChatVisible)}
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 border border-gray-300"
              >
                <MessageCircle className="h-5 w-5 text-blue-600 mr-1" />
                <span className="text-sm font-medium">AI Chat</span>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="h-5 w-5 text-gray-600" />
              </button>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                U
              </div>
            </div>
          </div>
        </header>

        {/* Main Section */}
        <main className="max-w-6xl mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">My Notes</h1>
            <div className="flex space-x-3">
              <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                <span>Filter</span>
              </button>
              <button
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleUpload}
              >
                <Plus className="h-4 w-4 mr-2" />
                <span>New Note</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button className="px-4 py-2 border-b-2 border-blue-600 text-blue-600 font-medium">
              All Notes
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800">Shared</button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800">Favorites</button>
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => {
              const fileType = getFileType(doc);
              
              return (
                <div
                  key={doc.public_id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
                >
                  {/* Preview Section */}
                  <div 
                    className="h-40 bg-gray-100 overflow-hidden relative cursor-pointer"
                    onClick={() => fileType === 'pdf' ? openPdfViewer(doc) : openInNewTab(doc.secure_url)}
                  >
                    {fileType === 'image' ? (
                      <img 
                        src={doc.secure_url} 
                        alt={doc.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-blue-50">
                        <FileText size={48} className="text-blue-500 mb-2" />
                        <span className="text-blue-600 font-medium text-sm">PDF Document</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">
                        {doc.title || doc.filename || "Untitled Document"}
                      </h3>
                      <Star className="h-5 w-5 text-gray-400 hover:text-yellow-500 cursor-pointer" />
                    </div>
                    
                    <div className="flex space-x-3">
                      {fileType === 'pdf' ? (
                        <>
                          <button
                            onClick={() => openPdfViewer(doc)}
                            className="text-blue-600 hover:underline text-sm inline-flex items-center"
                          >
                            <FileText className="h-3 w-3 mr-1" />
                            <span>View PDF</span>
                          </button>
                          
                          <a
                            href={doc.secure_url}
                            download
                            className="text-green-600 hover:underline text-sm inline-flex items-center"
                          >
                            <Download className="h-3 w-3 mr-1" />
                            <span>Download</span>
                          </a>
                        </>
                      ) : (
                        <a
                          href={doc.secure_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm inline-flex items-center"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          <span>View Image</span>
                        </a>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center text-xs text-gray-500 mt-3 pt-2 border-t">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(doc.created_at).toLocaleDateString()}
                      </span>
                      <span>CS403</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {/* PDF Viewer Modal */}
      {selectedPdf && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full h-[80vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold text-lg">{selectedPdf.title}</h3>
              <div className="flex items-center space-x-2">
                <a 
                  href={selectedPdf.secure_url} 
                  download 
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                  title="Download PDF"
                >
                  <Download className="h-5 w-5" />
                </a>
                <button 
                  onClick={closePdfViewer}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                  title="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-hidden bg-gray-100">
              {/* Object tag is more reliable for PDF display than iframe */}
              <object
                data={selectedPdf.secure_url}
                type="application/pdf"
                className="w-full h-full"
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-gray-600 mb-4">
                    Unable to display PDF directly. Please download or view in a new tab.
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href={selectedPdf.secure_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Open in New Tab
                    </a>
                    
                    <a
                      href={selectedPdf.secure_url}
                      download
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      Download PDF
                    </a>
                  </div>
                </div>
              </object>
            </div>
          </div>
        </div>
      )}

      {/* Chatbot */}
      {isChatVisible && (
        <div className="w-1/4 bg-white border-l border-gray-200 flex flex-col h-screen">
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              <h3 className="font-medium">AI Assistant</h3>
            </div>
            <button onClick={() => setIsChatVisible(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 my-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-gray-700 font-medium">Start a conversation</h3>
                <p className="text-sm text-gray-500">Ask anything about your notes or concepts.</p>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`mb-3 px-4 py-2 rounded-lg max-w-[85%] ${
                    msg.sender === 'user'
                      ? 'bg-blue-100 self-end text-right ml-auto'
                      : 'bg-gray-200 self-start text-left'
                  }`}
                >
                  {msg.text}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t flex items-center gap-2">
            <input
              type="text"
              className="flex-1 py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {isLoading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;