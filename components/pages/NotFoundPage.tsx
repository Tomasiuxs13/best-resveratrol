import React from 'react';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-purple-600 mb-4">404</h1>
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => onNavigate('/')}
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Go to Homepage
          </button>
          <div className="mt-6">
            <p className="text-gray-700 font-semibold mb-3">Popular pages:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => onNavigate('/guides')}
                className="text-purple-600 hover:text-purple-800 underline"
              >
                Buying Guides
              </button>
              <button
                onClick={() => onNavigate('/blog')}
                className="text-purple-600 hover:text-purple-800 underline"
              >
                Blog
              </button>
              <button
                onClick={() => onNavigate('/faq')}
                className="text-purple-600 hover:text-purple-800 underline"
              >
                FAQ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
