import React from 'react';
import type { GuidePost } from '../../types';

interface GuideDetailPageProps {
  guide: GuidePost;
}

const GuideDetailPage: React.FC<GuideDetailPageProps> = ({ guide }) => {
  return (
    <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg animate-fade-in max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">{guide.title}</h1>
      <div 
        className="prose max-w-none text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: guide.content || '' }}
      />
    </div>
  );
};

export default GuideDetailPage;