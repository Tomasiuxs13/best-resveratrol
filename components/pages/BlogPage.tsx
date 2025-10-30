import React from 'react';
import type { BlogPost } from '../../types';

interface BlogPageProps {
  posts: BlogPost[];
}

const BlogPage: React.FC<BlogPageProps> = ({ posts }) => {
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
                <a
                  href={`#post-${post.id}`}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Read Article
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Full Article Content Below */}
      <div className="mt-20 space-y-16">
        <div className="border-t-2 border-gray-200 pt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Full Articles</h2>
        </div>

        {posts.map((post) => (
          <section
            key={`full-${post.id}`}
            id={`post-${post.id}`}
            className="bg-white p-8 md:p-12 rounded-xl shadow-lg scroll-mt-24"
          >
            {/* Article Header */}
            <div className="border-l-4 border-blue-600 pl-6 mb-8">
              <div className="text-sm text-gray-500 mb-2">
                <span>{post.date}</span> • <span>By {post.author}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{post.title}</h2>
              {post.authorBio && (
                <p className="text-sm text-gray-600 italic mt-2">{post.authorBio}</p>
              )}
            </div>

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed
                prose-headings:font-bold prose-headings:text-gray-900
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:mb-4 prose-p:leading-relaxed
                prose-ul:mb-4 prose-li:mb-2
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />

            {/* Back to Top */}
            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <a
                href="#"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                Back to Top
              </a>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;