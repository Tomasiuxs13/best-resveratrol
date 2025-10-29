import React from 'react';
import type { FAQItem } from '../../types';
import AccordionItem from '../AccordionItem';

interface FAQPageProps {
  faqs: FAQItem[];
}

const FAQPage: React.FC<FAQPageProps> = ({ faqs }) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg animate-fade-in">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Frequently Asked Questions</h1>
      <div className="max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} title={faq.question}>
            <div dangerouslySetInnerHTML={{ __html: faq.answer || '' }} />
          </AccordionItem>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;