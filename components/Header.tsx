import React, { useState } from 'react';
import type { Page, GuidePost, Product } from '../types';

interface HeaderProps {
    onNavigate: (path: string) => void;
    currentPage: Page;
    guides: GuidePost[];
    products: Product[];
}

const pageToPath: Record<Exclude<Page, 'GUIDES_LIST' | 'GUIDE_DETAIL'>, string> = {
    HOME: '/',
    INFO: '/what-is-resveratrol',
    FAQ: '/faq',
    BLOG: '/blog',
    ABOUT: '/about'
};

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage, guides, products }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isGuidesOpen, setIsGuidesOpen] = useState(false);
    const [isReviewsOpen, setIsReviewsOpen] = useState(false);

    const mainNavLinks: { name: string; page: Page; anchor?: string }[] = [
        { name: 'FAQ', page: 'FAQ' },
        { name: 'Blog', page: 'BLOG' },
    ];

    const handleNavClick = (page: Page, anchor?: string) => {
        const path = (page in pageToPath) ? pageToPath[page as keyof typeof pageToPath] : '/';

        if (page === 'HOME') {
             // If we are already on the home page, just scroll
            if (currentPage === 'HOME') {
                if(anchor) document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' });
            } else {
            // If we are not on the home page, navigate and then scroll
                onNavigate(path);
                setTimeout(() => {
                    if (anchor) document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' });
                }, 100); // Small delay to allow page to render
            }
        } else {
            onNavigate(path);
        }
        setIsMenuOpen(false); // Close menu on navigation
    };
    
    const handleGuideNav = (path: string) => {
        onNavigate(path);
        setIsMenuOpen(false);
        setIsGuidesOpen(false);
    }

    const handleProductNav = (path: string) => {
        onNavigate(path);
        setIsMenuOpen(false);
        setIsReviewsOpen(false);
    }

    const isGuidesPage = currentPage === 'GUIDES_LIST' || currentPage === 'GUIDE_DETAIL';
    const isProductPage = currentPage === 'PRODUCT_DETAIL';

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <button onClick={() => onNavigate('/')} className="text-2xl font-bold text-gray-800">
                        Top 10 Resveratrol
                    </button>
                    <nav className="hidden md:flex space-x-6 items-center">
                        {/* Reviews Dropdown */}
                        <div className="relative group" onMouseEnter={() => setIsReviewsOpen(true)} onMouseLeave={() => setIsReviewsOpen(false)}>
                            <button
                                onClick={() => handleNavClick('HOME', '#top-products')}
                                className={`text-gray-600 hover:text-blue-600 transition-colors pb-1 border-b-2 font-medium flex items-center ${
                                    (currentPage === 'HOME' || isProductPage) ? 'border-blue-600 text-blue-600' : 'border-transparent'
                                }`}
                            >
                                Reviews
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            {isReviewsOpen && products.length > 0 && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                                    <div className="w-80 bg-white rounded-lg shadow-xl py-2 border border-gray-200 max-h-96 overflow-y-auto">
                                        <a
                                            onClick={() => handleProductNav('/#top-products')}
                                            className="block px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100"
                                        >
                                            View All Reviews
                                        </a>
                                        {products.map(product => (
                                            <a
                                                key={product.slug}
                                                onClick={() => handleProductNav(`/products/${product.slug}/`)}
                                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium">#{product.rank} {product.brand}</span>
                                                    <span className="text-xs text-gray-500">{product.rating}★</span>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">{product.name}</div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Compare */}
                        <button
                            onClick={() => handleNavClick('HOME', '#comparison-table')}
                            className={`text-gray-600 hover:text-blue-600 transition-colors pb-1 border-b-2 font-medium ${
                                currentPage === 'HOME'
                                ? 'border-blue-600 text-blue-600' : 'border-transparent'
                            }`}
                        >
                            Compare
                        </button>
                        {/* Guides Dropdown */}
                        <div className="relative group" onMouseEnter={() => setIsGuidesOpen(true)} onMouseLeave={() => setIsGuidesOpen(false)}>
                            <button
                                onClick={() => handleGuideNav('/guides')}
                                className={`text-gray-600 hover:text-blue-600 transition-colors pb-1 border-b-2 font-medium flex items-center ${
                                    isGuidesPage ? 'border-blue-600 text-blue-600' : 'border-transparent'
                                }`}
                            >
                                Guides
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            {isGuidesOpen && guides.length > 0 && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                                    <div className="w-64 bg-white rounded-lg shadow-xl py-2 border border-gray-200">
                                        {guides.map(guide => (
                                            <a
                                                key={guide.slug}
                                                onClick={() => handleGuideNav(`/guides/${guide.slug}`)}
                                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
                                            >
                                                {guide.title}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                         {mainNavLinks.map(link => (
                            <button
                                key={link.name}
                                onClick={() => handleNavClick(link.page, link.anchor)}
                                className={`text-gray-600 hover:text-blue-600 transition-colors pb-1 border-b-2 font-medium ${
                                    currentPage === link.page
                                    ? 'border-blue-600 text-blue-600' : 'border-transparent'
                                }`}
                            >
                                {link.name}
                            </button>
                        ))}
                    </nav>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                        </button>
                    </div>
                </div>
                {/* Mobile Menu */}
                <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <nav className="flex flex-col space-y-2 pb-4">
                        {/* Reviews Dropdown - Mobile */}
                        <button onClick={() => setIsReviewsOpen(!isReviewsOpen)} className="text-left font-semibold text-gray-700 p-2 rounded flex justify-between items-center">
                            Reviews
                            <svg className={`w-4 h-4 transform transition-transform ${isReviewsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        {isReviewsOpen && products.length > 0 && (
                            <div className="pl-4 border-l-2 border-gray-200">
                                <a onClick={() => handleProductNav('/#top-products')} className="block text-gray-600 hover:bg-gray-100 p-2 rounded cursor-pointer font-semibold">All Reviews</a>
                                {products.map(product => (
                                    <a key={product.slug} onClick={() => handleProductNav(`/products/${product.slug}/`)} className="block text-gray-600 hover:bg-gray-100 p-2 rounded cursor-pointer">
                                        <div className="text-sm font-medium">#{product.rank} {product.brand}</div>
                                        <div className="text-xs text-gray-500">{product.name}</div>
                                    </a>
                                ))}
                            </div>
                        )}

                        <button
                            onClick={() => handleNavClick('HOME', '#comparison-table')}
                            className="text-left text-gray-700 hover:bg-gray-100 p-2 rounded"
                        >
                            Compare
                        </button>

                        {/* Guides Dropdown - Mobile */}
                        <button onClick={() => setIsGuidesOpen(!isGuidesOpen)} className="text-left font-semibold text-gray-700 p-2 rounded flex justify-between items-center">
                            Guides
                            <svg className={`w-4 h-4 transform transition-transform ${isGuidesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        {isGuidesOpen && guides.length > 0 && (
                            <div className="pl-4 border-l-2 border-gray-200">
                                <a onClick={() => handleGuideNav('/guides')} className="block text-gray-600 hover:bg-gray-100 p-2 rounded cursor-pointer">All Guides</a>
                                {guides.map(guide => (
                                     <a key={guide.slug} onClick={() => handleGuideNav(`/guides/${guide.slug}`)} className="block text-gray-600 hover:bg-gray-100 p-2 rounded cursor-pointer">
                                        {guide.title}
                                    </a>
                                ))}
                            </div>
                        )}

                        <button
                            onClick={() => handleNavClick('FAQ')}
                            className="text-left text-gray-700 hover:bg-gray-100 p-2 rounded"
                        >
                            FAQ
                        </button>
                        <button
                            onClick={() => handleNavClick('BLOG')}
                            className="text-left text-gray-700 hover:bg-gray-100 p-2 rounded"
                        >
                            Blog
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;