import React from 'react';
import type { BlogPost } from '../../types';

interface BlogPostDetailPageProps {
  post: BlogPost;
  onNavigate: (path: string) => void;
}

const BlogPostDetailPage: React.FC<BlogPostDetailPageProps> = ({ post, onNavigate }) => {
  return (
    <div className="animate-fade-in">
      <article className="max-w-4xl mx-auto">
        {/* Back to Blog Button */}
        <button
          onClick={() => onNavigate('/blog')}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </button>

        {/* Article Header */}
        <header className="mb-12">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 md:p-12 rounded-xl shadow-xl mb-8">
            <div className="text-sm font-semibold uppercase tracking-wide mb-4 opacity-90">
              {post.date}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex items-center text-lg">
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{post.author}</span>
            </div>
          </div>

          {/* Author Bio */}
          {post.authorBio && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
              <p className="text-gray-700 italic flex items-start">
                <svg className="w-5 h-5 mr-3 mt-1 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>{post.authorBio}</span>
              </p>
            </div>
          )}
        </header>

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none text-gray-800 leading-relaxed
            prose-headings:font-bold prose-headings:text-gray-900
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b-2 prose-h2:border-gray-200 prose-h2:pb-3
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:mb-6 prose-p:leading-relaxed prose-p:text-gray-700
            prose-ul:mb-6 prose-ul:space-y-2
            prose-ol:mb-6 prose-ol:space-y-2
            prose-li:text-gray-700 prose-li:leading-relaxed
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t-2 border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => onNavigate('/blog')}
              className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to All Articles
            </button>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Back to Top
            </button>
          </div>

          {/* Related Content */}
          <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Continue Learning</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <button
                onClick={() => onNavigate('/')}
                className="text-left p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="font-semibold text-gray-900 mb-1">View Top Supplements</div>
                <div className="text-sm text-gray-600">Explore our top 10 resveratrol supplement reviews</div>
              </button>
              <button
                onClick={() => onNavigate('/guides')}
                className="text-left p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="font-semibold text-gray-900 mb-1">Read Our Guides</div>
                <div className="text-sm text-gray-600">Learn more about choosing and using resveratrol</div>
              </button>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default BlogPostDetailPage;
