import React from 'react';
import type { AboutInfo } from '../../types';

interface AboutPageProps {
  info: AboutInfo;
}

const AboutPage: React.FC<AboutPageProps> = ({ info }) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg animate-fade-in">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">{info.title}</h1>
      <div
        className="prose max-w-none mx-auto text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: info.content || '' }}
      />
    </div>
  );
};

export default AboutPage;