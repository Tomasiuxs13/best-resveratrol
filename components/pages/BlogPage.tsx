import React from 'react';
import type { BlogPost } from '../../types';

interface BlogPageProps {
  posts: BlogPost[];
  onNavigate: (path: string) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ posts, onNavigate }) => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Resveratrol Research & Insights</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Expert articles on resveratrol benefits, anti-aging science, and supplement guides to help you make informed decisions.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            {/* Article Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
              <div className="text-xs font-semibold uppercase tracking-wide mb-2 opacity-90">
                {post.date}
              </div>
              <h2 className="text-2xl font-bold leading-tight mb-2">{post.title}</h2>
              <div className="flex items-center text-sm opacity-90">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span>{post.author}</span>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6 flex-grow flex flex-col">
              <p className="text-gray-600 mb-4 flex-grow line-clamp-4">{post.summary}</p>

              {/* Author Bio */}
              {post.authorBio && (
                <div className="text-sm text-gray-500 italic border-l-4 border-blue-200 pl-4 py-2 mb-4">
                  {post.authorBio}
                </div>
              )}

              {/* Read More Button */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">5 min read</span>
                <button
                  onClick={() => onNavigate(`/blog/${post.slug}`)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Read Article
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
