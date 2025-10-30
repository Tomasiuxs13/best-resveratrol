export type Page = 'HOME' | 'INFO' | 'FAQ' | 'BLOG' | 'ABOUT' | 'GUIDES_LIST' | 'GUIDE_DETAIL' | 'PRODUCT_DETAIL';

export interface Product {
  id: number;
  rank: number;
  name: string;
  brand: string;
  slug: string; // URL-friendly identifier for product pages
  image: string;
  summary: string;
  pros: string[];
  cons: string[];
  bestFor: string;
  rating: number;
  affiliateLink: string;
  servingSize: string;
  potency: string; // e.g., "99% Trans-Resveratrol"
  certifications: string[]; // e.g., ["Third-Party Tested", "GMP Certified"]
}

export interface FAQItem {
  question: string;
  answer: string; // HTML content
}

export interface BlogPost {
  id: number;
  title: string;
  author: string;
  authorBio: string;
  date: string; // e.g., "October 26, 2024"
  summary: string;
  content: string; // HTML content
}

export interface GuidePost {
  id: number;
  slug: string; // e.g., "how-to-choose-resveratrol"
  title: string;
  summary: string;
  content: string; // HTML content
}


export interface ResveratrolInfo {
  title: string;
  introduction: string; // HTML content
  sections: {
    heading: string;
    content: string; // HTML content
  }[];
}

export interface AboutInfo {
  title: string;
  content: string; // HTML content
}