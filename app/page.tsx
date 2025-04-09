import React from 'react';
import { Book, BookOpen, Calendar, CheckCircle, Code, FileText, Users } from 'lucide-react';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">csNerds</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">Testimonials</a>
            <a href="#faq" className="text-gray-700 hover:text-blue-600 transition-colors">FAQ</a>
            <SignInButton mode="modal">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg shadow-sm transition">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
            <button className="bg-white border border-gray-300 text-gray-800 hover:bg-gray-100 font-medium px-5 py-2 rounded-lg shadow-sm transition">
              Sign Up
            </button>
            </SignUpButton>
          </div>
          <div className="flex space-x-4">

          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto py-16 px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">CS403 Notes Made <span className="text-blue-600">Simple</span></h1>
            <p className="text-lg text-gray-600">
              The ultimate note-taking app designed specifically for CS403 students. Organize, collaborate, and excel in your computer science studies.
            </p>
            <div className="flex space-x-4 pt-4">
              <button className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium">Get Started Free</button>
              <button className="px-6 py-3 rounded-lg bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 transition-colors font-medium">Watch Demo</button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl">
            <div className="rounded-lg overflow-hidden bg-gray-50 p-4">
              <div className="h-8 flex space-x-2">
                <div className="rounded-full w-3 h-3 bg-red-500"></div>
                <div className="rounded-full w-3 h-3 bg-yellow-500"></div>
                <div className="rounded-full w-3 h-3 bg-green-500"></div>
              </div>
              <div className="mt-4 space-y-3">
                <div className="h-6 bg-blue-100 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-6 bg-blue-100 rounded w-2/3 mt-6"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="features" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Why CS403 Students Love csNerds</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Features designed specifically for computer science students to master complex concepts
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Syntax Highlighting</h3>
              <p className="text-gray-600">
                Support for multiple programming languages with automatic syntax highlighting for your code examples
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Templates</h3>
              <p className="text-gray-600">
                CS403-specific templates for algorithms, data structures, and theoretical concepts
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Study Groups</h3>
              <p className="text-gray-600">
                Create or join study groups to share notes and collaborate on complex CS topics
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Exam Countdown</h3>
              <p className="text-gray-600">
                Never miss a deadline with our integrated CS403 syllabus calendar and smart reminders
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-4">
                <Book className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Topic Summaries</h3>
              <p className="text-gray-600">
                AI-powered summaries of complex CS topics to help you review key concepts quickly
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Practice Problems</h3>
              <p className="text-gray-600">
                Access to CS403-specific practice problems with step-by-step solutions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div id="testimonials" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">What Students Say</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Join hundreds of CS403 students who've improved their grades with csNerds
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">JS</div>
                <div className="ml-4">
                  <h4 className="font-semibold">Jake S.</h4>
                  <p className="text-gray-600 text-sm">CS Junior</p>
                </div>
              </div>
              <p className="text-gray-700">
                "csNerds helped me organize my algorithm notes in a way that finally made sense. The syntax highlighting and template features are game changers for CS403."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">AT</div>
                <div className="ml-4">
                  <h4 className="font-semibold">Anita T.</h4>
                  <p className="text-gray-600 text-sm">CS Senior</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The study group feature helped our team prepare for the midterm. We went from struggling to mastering complex concepts together. My grade improved from a C to an A-."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800">Is csNerds only for CS403 students?</h3>
              <p className="text-gray-600 mt-2">
                While optimized for CS403, csNerds can be used for any computer science course. Our templates and features are particularly helpful for algorithm and data structure courses.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800">Can I access my notes offline?</h3>
              <p className="text-gray-600 mt-2">
                Yes! csNerds features offline access, allowing you to view and edit your notes even without an internet connection. Changes will sync when you're back online.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800">Is there a free version available?</h3>
              <p className="text-gray-600 mt-2">
                Absolutely. Our basic plan is free forever and includes all essential note-taking features. Premium plans include additional features like AI summaries and unlimited study groups.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to ace CS403?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join csNerds today and transform your computer science notes
          </p>
          <button className="px-8 py-3 rounded-lg bg-white text-blue-600 font-medium hover:bg-blue-50 transition-colors">
            Start Taking Better Notes Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold text-white">csNerds</span>
              </div>
              <p className="text-gray-400">
                The ultimate note-taking solution for computer science students.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>© 2025 csNerds. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;