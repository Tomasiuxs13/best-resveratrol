import { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  articlePublishedTime?: string;
  articleAuthor?: string;
  productPrice?: string;
  productAvailability?: string;
  keywords?: string;
  noindex?: boolean;
}

const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogImage = 'https://www.yoursite.com/og-default.jpg',
  ogType = 'website',
  articlePublishedTime,
  articleAuthor,
  productPrice,
  productAvailability,
  keywords,
  noindex = false,
}) => {
  useEffect(() => {
    // Update title
    document.title = title;

    // Helper function to update or create meta tag
    const updateMetaTag = (name: string, content: string, useProperty = false) => {
      const attribute = useProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Helper function to update or create link tag
    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);

      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }

      element.setAttribute('href', href);
    };

    // Basic Meta Tags
    updateMetaTag('description', description);
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Robots meta
    if (noindex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow');
    }

    // Canonical URL
    if (canonical) {
      updateLinkTag('canonical', canonical);
    }

    // Open Graph Tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:image:alt', title, true);

    if (canonical) {
      updateMetaTag('og:url', canonical, true);
    }

    updateMetaTag('og:site_name', 'Top 10 Resveratrol Supplements', true);
    updateMetaTag('og:locale', 'en_US', true);

    // Article-specific OG tags
    if (ogType === 'article' && articlePublishedTime) {
      updateMetaTag('article:published_time', articlePublishedTime, true);
    }
    if (ogType === 'article' && articleAuthor) {
      updateMetaTag('article:author', articleAuthor, true);
    }

    // Product-specific OG tags
    if (ogType === 'product' && productPrice) {
      updateMetaTag('product:price:amount', productPrice, true);
      updateMetaTag('product:price:currency', 'USD', true);
    }
    if (ogType === 'product' && productAvailability) {
      updateMetaTag('product:availability', productAvailability, true);
    }

    // Twitter Card Tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    updateMetaTag('twitter:image:alt', title);

    // Additional Twitter tags if you have a Twitter account
    // updateMetaTag('twitter:site', '@yourtwitterhandle');
    // updateMetaTag('twitter:creator', '@yourtwitterhandle');

  }, [title, description, canonical, ogImage, ogType, articlePublishedTime, articleAuthor, productPrice, productAvailability, keywords, noindex]);

  // This component doesn't render anything visible
  return null;
};

export default SEOHead;
