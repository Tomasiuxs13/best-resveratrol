import React from 'react';
import type { BlogPost } from '../../types';

interface BlogPageProps {
  posts: BlogPost[];
}

const BlogPage: React.FC<BlogPageProps> = ({ posts }) => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">Our Resveratrol Blog</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id} className="bg-white p-6 rounded-xl shadow-lg flex flex-col transition-transform duration-300 hover:-translate-y-1">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h2>
            <div className="text-sm text-gray-500 mb-4">
              <span>By {post.author}</span> | <span>{post.date}</span>
            </div>
            <p className="text-gray-600 mb-4 flex-grow">{post.summary}</p>
            <a href={`#post-${post.id}`} className="font-semibold text-blue-600 hover:underline self-start">
              Read More &rarr;
            </a>
          </article>
        ))}
      </div>

      <div className="mt-16 space-y-12">
        {posts.map((post) => (
            <section key={`full-${post.id}`} id={`post-${post.id}`} className="bg-white p-6 md:p-8 rounded-xl shadow-lg scroll-mt-24">
                 <h2 className="text-3xl font-bold text-gray-800 mb-2">{post.title}</h2>
                <div className="text-sm text-gray-500 mb-2">
                    <span>By {post.author}</span> | <span>{post.date}</span>
                </div>
                 <p className="text-sm text-gray-600 italic mb-6">{post.authorBio}</p>
                <div 
                    className="max-w-none text-gray-700 leading-relaxed prose"
                    dangerouslySetInnerHTML={{ __html: post.content || '' }}
                />
            </section>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;