
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="font-bold text-lg">Top 10 Resveratrol</p>
          <p className="mt-2 text-sm text-gray-400">
            Our mission is to provide clear, unbiased reviews to help you make informed decisions for your health.
          </p>
        </div>
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>
            This website is an affiliate marketing site. We may receive a commission for purchases made through our links. This does not affect our reviews or comparisons. We aim to keep information accurate and up-to-date, but we cannot guarantee the accuracy or completeness of the information provided.
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} Top 10 Resveratrol. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="#privacy" className="hover:text-white">Privacy Policy</a>
            <a href="#terms" className="hover:text-white">Terms of Service</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
