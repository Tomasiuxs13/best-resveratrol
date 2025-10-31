
import React from 'react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
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
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <button onClick={() => onNavigate('/about')} className="hover:text-white transition-colors">
              About Us
            </button>
            <span className="text-gray-600">|</span>
            <button onClick={() => onNavigate('/privacy-policy')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <span className="text-gray-600">|</span>
            <button onClick={() => onNavigate('/terms-of-service')} className="hover:text-white transition-colors">
              Terms of Service
            </button>
            <span className="text-gray-600">|</span>
            <button onClick={() => onNavigate('/disclaimer')} className="hover:text-white transition-colors">
              Disclaimer
            </button>
            <span className="text-gray-600">|</span>
            <button onClick={() => onNavigate('/affiliate-disclosure')} className="hover:text-white transition-colors">
              Affiliate Disclosure
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
