import React, { useState } from 'react';
import type { Page, GuidePost } from '../types';

interface HeaderProps {
    onNavigate: (path: string) => void;
    currentPage: Page;
    guides: GuidePost[];
}

const pageToPath: Record<Exclude<Page, 'GUIDES_LIST' | 'GUIDE_DETAIL'>, string> = {
    HOME: '/',
    INFO: '/what-is-resveratrol',
    FAQ: '/faq',
    BLOG: '/blog',
    ABOUT: '/about'
};

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage, guides }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isGuidesOpen, setIsGuidesOpen] = useState(false);

    const mainNavLinks: { name: string; page: Page; anchor?: string }[] = [
        { name: 'What is Resveratrol?', page: 'INFO' },
        { name: 'Reviews', page: 'HOME', anchor: '#top-products' },
        { name: 'Compare', page: 'HOME', anchor: '#comparison-table' },
        { name: 'FAQ', page: 'FAQ' },
        { name: 'Blog', page: 'BLOG' },
        { name: 'About Us', page: 'ABOUT' },
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

    const lastUpdatedDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
    });

    const isGuidesPage = currentPage === 'GUIDES_LIST' || currentPage === 'GUIDE_DETAIL';

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <button onClick={() => onNavigate('/')} className="text-2xl font-bold text-gray-800">
                        Top 10 Resveratrol
                    </button>
                    <nav className="hidden md:flex space-x-6 items-center">
                        {mainNavLinks.slice(0, 3).map(link => (
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
                        {/* Guides Dropdown */}
                        <div className="relative" onMouseEnter={() => setIsGuidesOpen(true)} onMouseLeave={() => setIsGuidesOpen(false)}>
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
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-50">
                                    {guides.map(guide => (
                                        <a
                                            key={guide.slug}
                                            onClick={() => handleGuideNav(`/guides/${guide.slug}`)}
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                        >
                                            {guide.title}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                         {mainNavLinks.slice(3).map(link => (
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
                        {mainNavLinks.map(link => (
                            <button
                                key={link.name}
                                onClick={() => handleNavClick(link.page, link.anchor)}
                                className="text-left text-gray-700 hover:bg-gray-100 p-2 rounded"
                            >
                                {link.name}
                            </button>
                        ))}
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
                    </nav>
                </div>
            </div>
            {currentPage === 'HOME' && (
                <div className="bg-gray-50 py-6 text-center border-t">
                     <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
                        Top 10 Resveratrol Supplements
                    </h1>
                    <p className="mt-3 text-lg md:text-xl text-gray-600">
                        Unlock Your Longevity Potential: An Expert Review of 2024's Best.
                    </p>
                    <div className="mt-4 text-sm text-gray-500">
                        <p>Last Updated: {lastUpdatedDate}</p>
                        <p className="mt-1">
                            <span className="font-semibold">Affiliate Disclosure:</span> We may earn a commission from qualifying purchases.
                        </p>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;