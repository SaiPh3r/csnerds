import React from 'react';
import { BookOpen, Search, Bell, Filter, Plus, Star, Clock } from 'lucide-react';

const Feed = () => {
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
              <span>New Note</span>
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
    </div>
  );
};

export default Feed;