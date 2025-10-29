import React from 'react';
import type { GuidePost } from '../../types';

interface GuidesListPageProps {
  guides: GuidePost[];
  onNavigate: (path: string) => void;
}

const GuidesListPage: React.FC<GuidesListPageProps> = ({ guides, onNavigate }) => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Resveratrol Buyer's Guides</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Everything you need to know to make an informed decision. Our in-depth guides cover benefits, dosage, purity, and how to choose the right supplement for you.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <article 
            key={guide.id} 
            className="bg-white p-6 rounded-xl shadow-lg flex flex-col transition-transform duration-300 hover:-translate-y-1"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2">{guide.title}</h2>
            <p className="text-gray-600 mb-4 flex-grow">{guide.summary}</p>
            <button 
              onClick={() => onNavigate(`/guides/${guide.slug}`)}
              className="font-semibold text-blue-600 hover:underline self-start mt-auto"
            >
              Read Guide &rarr;
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};

export default GuidesListPage;