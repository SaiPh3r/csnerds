'use client'
import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Search, Bell, Filter, Plus, Star, Clock, MessageCircle, Send, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Feed = () => {
  const router = useRouter()
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const apiKey = "AIzaSyAW08GMRJfT467Kys6Lz6cutglglFJgS0M";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const handleUpload = () => {
    router.push('/upload')
  }

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Add user message to chat
    const userMessage = { sender: 'user', text: inputMessage };
    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    // Call Gemini API
    try {
      const data = {
        contents: [
          {
            parts: [{ text: inputMessage }]
          }
        ]
      };
      
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      console.log("Response:", result);
      
      // Extract AI response from the result
      let aiResponse = "Sorry, I couldn't process your request.";
      if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        aiResponse = result.candidates[0].content.parts[0].text;
      }
      
      // Add AI response to chat
      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { sender: 'ai', text: "Sorry, there was an error processing your request." }]);
    } finally {
      setIsLoading(false);
    }
  }

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle Enter key press
  const handleKeyPress = (e:any) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              U
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Notes</h1>
          <div className="flex space-x-3">
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              <span>Filter</span>
            </button>
            <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              <span onClick={handleUpload}>New Note</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button className="px-4 py-2 border-b-2 border-blue-600 text-blue-600 font-medium">All Notes</button>
          <button className="px-4 py-2 text-gray-600 hover:text-gray-800">Shared</button>
          <button className="px-4 py-2 text-gray-600 hover:text-gray-800">Favorites</button>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Note Card 1 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg text-gray-800">Algorithm Analysis</h3>
                <button className="text-gray-400 hover:text-yellow-500">
                  <Star className="h-5 w-5" />
                </button>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                Big O notation, time complexity analysis, and space complexity for common algorithms...
              </p>
              <div className="flex justify-between items-center text-xs text-gray-500 mt-4 pt-2 border-t">
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" /> Updated 2h ago
                </span>
                <span>CS403</span>
              </div>
            </div>
          </div>

          {/* Note Card 2 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg text-gray-800">Sorting Algorithms</h3>
                <button className="text-yellow-500">
                  <Star className="h-5 w-5" />
                </button>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                Implementation and analysis of QuickSort, MergeSort, HeapSort, and other common sorting algorithms...
              </p>
              <div className="flex justify-between items-center text-xs text-gray-500 mt-4 pt-2 border-t">
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" /> Updated 1d ago
                </span>
                <span>CS403</span>
              </div>
            </div>
          </div>

          {/* Note Card 3 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg text-gray-800">Graph Traversal</h3>
                <button className="text-gray-400 hover:text-yellow-500">
                  <Star className="h-5 w-5" />
                </button>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                BFS and DFS implementations, applications and complexity analysis. Examples of graph problems...
              </p>
              <div className="flex justify-between items-center text-xs text-gray-500 mt-4 pt-2 border-t">
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" /> Updated 3d ago
                </span>
                <span>CS403</span>
              </div>
            </div>
          </div>

          {/* Empty State - can be shown when there are no notes */}
          <div className="hidden md:col-span-3 py-12 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800">No notes yet</h3>
            <p className="text-gray-600 mt-2 mb-6">Create your first note to get started</p>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              <span>Create New Note</span>
            </button>
          </div>
        </div>
      </main>

      {/* AI Chatbot */}
      <div className="fixed bottom-6 left-6 z-50">
        {/* Chat Button */}
        <button 
          onClick={toggleChat}
          className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          {isChatOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </button>

        {/* Chat Window */}
        {isChatOpen && (
          <div className="absolute bottom-16 left-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
              <h3 className="font-medium">AI Assistant</h3>
              <button onClick={toggleChat} className="text-white hover:text-gray-200">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages Container */}
            <div className="p-3 h-80 overflow-y-auto bg-gray-50">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 my-4">
                  <p>Ask me anything about CS concepts!</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`mb-3 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
                  >
                    <div 
                      className={`inline-block p-3 rounded-lg ${
                        msg.sender === 'user' 
                          ? 'bg-blue-600 text-white rounded-br-none' 
                          : 'bg-gray-200 text-gray-800 rounded-bl-none'
                      } max-w-xs break-words`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="text-left mb-3">
                  <div className="inline-block p-3 rounded-lg bg-gray-200 text-gray-800 rounded-bl-none">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-2 flex">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 py-2 px-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button 
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 disabled:bg-blue-400"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;