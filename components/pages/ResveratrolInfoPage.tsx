import React from 'react';
import type { ResveratrolInfo } from '../../types';

interface ResveratrolInfoPageProps {
  info: ResveratrolInfo;
}

const ResveratrolInfoPage: React.FC<ResveratrolInfoPageProps> = ({ info }) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg animate-fade-in">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{info.title}</h1>
      <div className="text-lg text-gray-600 mb-8 italic prose" dangerouslySetInnerHTML={{ __html: info.introduction || '' }} />
      
      <div className="space-y-6">
        {(info.sections || []).map((section, index) => (
          <div key={index}>
            <h2 className="text-2xl font-bold text-gray-800 mb-3 border-l-4 border-blue-500 pl-4">{section.heading}</h2>
            <div 
                className="text-gray-700 leading-relaxed pl-5 prose"
                dangerouslySetInnerHTML={{ __html: section.content || '' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResveratrolInfoPage;