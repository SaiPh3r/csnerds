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
} from 'lucide-react';
import { useRouter } from 'next/navigation';

type Document = {
  public_id: string;
  filename: string;
  created_at: string;
  secure_url: string;
};

const Feed = () => {
  const router = useRouter();
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [documents, setDocuments] = useState<Document[]>([]);

  // Move API key to server-side for security
  // This will be handled through a server API route
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { sender: 'user', text: inputMessage };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Create a server-side API endpoint to handle the Gemini API call
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

      setMessages((prev) => [...prev, { sender: 'ai', text: aiResponse }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Sorry, there was an error processing your request.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = () => {
    router.push('/upload');
  };

  const fetchDocuments = async () => {
    try {
      const res = await fetch('/api/docs');
      const data = await res.json();
      setDocuments(data);
    } catch (error) {
      console.error('Failed to fetch docs:', error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
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
            {documents.map((doc) => (
              <div
                key={doc.public_id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">
                      {doc.filename}
                    </h3>
                    <a
                      href={doc.secure_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-500"
                    >
                      <Star className="h-5 w-5" />
                    </a>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    View or download this file from Cloudinary.
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500 mt-4 pt-2 border-t">
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(doc.created_at).toLocaleDateString()}
                    </span>
                    <span>CS403</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

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