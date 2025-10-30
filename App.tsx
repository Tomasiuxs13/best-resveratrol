import React, { useState, useEffect, useCallback } from 'react';
// types
import type { Product, FAQItem, BlogPost, Page, AboutInfo, GuidePost } from './types';

// Static data
import {
  products as staticProducts,
  faqs as staticFaqs,
  blogPosts as staticBlogPosts,
  aboutInfo as staticAboutInfo,
  guides as staticGuides
} from './data/mockData';

// Hooks
import { usePageMetadata } from './hooks/usePageMetadata';

// SEO Utils
import {
    generateOrganizationSchema,
    generateWebSiteSchema,
    generateProductBreadcrumb,
    generateGuideBreadcrumb,
    generateBlogPostBreadcrumb,
    generatePageBreadcrumb,
    getCanonicalUrl
} from './utils/seoHelpers';

// Main page components
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ComparisonTable from './components/ComparisonTable';
import Footer from './components/Footer';
import TopPicks from './components/TopPicks';
import SchemaInjector from './components/SchemaInjector';
import SEOHead from './components/SEOHead';


// New page components
import FAQPage from './components/pages/FAQPage';
import BlogPage from './components/pages/BlogPage';
import BlogPostDetailPage from './components/pages/BlogPostDetailPage';
import AboutPage from './components/pages/AboutPage';
import GuidesListPage from './components/pages/GuidesListPage';
import GuideDetailPage from './components/pages/GuideDetailPage';
import ProductDetailPage from './components/pages/ProductDetailPage';
import PrivacyPolicyPage from './components/pages/PrivacyPolicyPage';
import TermsOfServicePage from './components/pages/TermsOfServicePage';
import DisclaimerPage from './components/pages/DisclaimerPage';
import AffiliateDisclosurePage from './components/pages/AffiliateDisclosurePage';
import NotFoundPage from './components/pages/NotFoundPage';


const getPageFromPath = (path: string): { page: Page; slug?: string } => {
    if (path === '/') return { page: 'HOME' };
    if (path === '/faq') return { page: 'FAQ' };
    if (path === '/blog') return { page: 'BLOG' };
    if (path === '/about') return { page: 'ABOUT' };
    if (path === '/guides') return { page: 'GUIDES_LIST' };
    if (path === '/privacy-policy') return { page: 'PRIVACY_POLICY' };
    if (path === '/terms-of-service') return { page: 'TERMS_OF_SERVICE' };
    if (path === '/disclaimer') return { page: 'DISCLAIMER' };
    if (path === '/affiliate-disclosure') return { page: 'AFFILIATE_DISCLOSURE' };

    // Redirect old "What is Resveratrol?" page to the guide
    if (path === '/what-is-resveratrol') return { page: 'GUIDE_DETAIL', slug: 'what-is-resveratrol' };

    const blogMatch = path.match(/^\/blog\/(.+)$/);
    if (blogMatch) return { page: 'BLOG_POST', slug: blogMatch[1] };

    const guideMatch = path.match(/^\/guides\/(.+)$/);
    if (guideMatch) return { page: 'GUIDE_DETAIL', slug: guideMatch[1] };

    const productMatch = path.match(/^\/products\/(.+)$/);
    if (productMatch) return { page: 'PRODUCT_DETAIL', slug: productMatch[1] };

    return { page: 'HOME' }; // Fallback to home
};


const App: React.FC = () => {
    // Page state
    const [currentRoute, setCurrentRoute] = useState<{ page: Page; slug?: string }>(getPageFromPath(window.location.pathname));

    // Content state
    const [products, setProducts] = useState<Product[]>([]);
    const [guides, setGuides] = useState<GuidePost[]>([]);
    const [faq, setFaq] = useState<FAQItem[]>([]);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [aboutInfo, setAboutInfo] = useState<AboutInfo | null>(null);
    const [schema, setSchema] = useState<object | null>(null);
    const [breadcrumbSchema, setBreadcrumbSchema] = useState<object | null>(null);

    // Loading and error state
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Dynamic Page Metadata
    const getPageMetadata = () => {
        const baseMetadata: Record<Page, { title: string; description: string; }> = {
            HOME: {
                title: 'Top 10 Best Resveratrol Supplements (2025 Review)',
                description: "Discover the best resveratrol supplements of 2025. In-depth reviews, a comparison table, and a buyer's guide to help you boost your health and longevity."
            },
            FAQ: {
                title: 'Resveratrol FAQ | Answers to Common Questions',
                description: 'Find answers to frequently asked questions about resveratrol supplements, including dosage, side effects, benefits, and how to choose the right one.'
            },
            BLOG: {
                title: 'Resveratrol Research & Insights Blog',
                description: 'Explore the latest research, tips, and insights on resveratrol, anti-aging, and wellness from our expert-written blog.'
            },
            BLOG_POST: { // Default, will be overridden
                title: 'Resveratrol Article',
                description: 'Expert article on resveratrol, anti-aging, and supplement science.'
            },
            ABOUT: {
                title: 'About Us | Our Mission & Review Process',
                description: 'Learn about our mission to provide clear, unbiased, and science-backed reviews of resveratrol supplements and our rigorous evaluation process.'
            },
            GUIDES_LIST: {
                title: 'Resveratrol Buyer\'s Guides',
                description: 'Our comprehensive guides to help you choose and use resveratrol supplements effectively. Learn about potency, purity, benefits, and more.'
            },
            GUIDE_DETAIL: { // Default, will be overridden
                title: 'Resveratrol Guide',
                description: 'An in-depth guide to understanding resveratrol supplements.'
            },
            PRODUCT_DETAIL: { // Default, will be overridden
                title: 'Resveratrol Product Review',
                description: 'Detailed review of a top-rated resveratrol supplement.'
            },
            PRIVACY_POLICY: {
                title: 'Privacy Policy | Best Resveratrol',
                description: 'Our privacy policy explains how we collect, use, and protect your personal information when you visit our website.'
            },
            TERMS_OF_SERVICE: {
                title: 'Terms of Service | Best Resveratrol',
                description: 'Terms and conditions for using our website, including disclaimers, user obligations, and legal information.'
            },
            DISCLAIMER: {
                title: 'Medical Disclaimer | Best Resveratrol',
                description: 'Important medical and health disclaimers regarding the information provided on our supplement review website.'
            },
            AFFILIATE_DISCLOSURE: {
                title: 'Affiliate Disclosure | Best Resveratrol',
                description: 'Transparency about our affiliate relationships and how we earn commissions from product recommendations.'
            },
            NOT_FOUND: {
                title: 'Page Not Found | Best Resveratrol',
                description: 'The page you are looking for could not be found. Browse our resveratrol supplement reviews, guides, and blog.'
            }
        };

        if (currentRoute.page === 'GUIDE_DETAIL' && currentRoute.slug) {
            const guide = guides.find(g => g.slug === currentRoute.slug);
            if (guide) {
                return { title: `${guide.title} | Resveratrol Guides`, description: guide.summary };
            }
        }

        if (currentRoute.page === 'BLOG_POST' && currentRoute.slug) {
            const blogPost = blogPosts.find(p => p.slug === currentRoute.slug);
            if (blogPost) {
                return {
                    title: `${blogPost.title} | Resveratrol Blog`,
                    description: blogPost.summary
                };
            }
        }

        if (currentRoute.page === 'PRODUCT_DETAIL' && currentRoute.slug) {
            const product = products.find(p => p.slug === currentRoute.slug);
            if (product) {
                return {
                    title: `${product.brand} ${product.name} Review | ${product.bestFor}`,
                    description: product.summary
                };
            }
        }

        return baseMetadata[currentRoute.page];
    };
    const { title, description } = getPageMetadata();
    usePageMetadata(title, description);

    const fetchContentForPage = useCallback((route: { page: Page; slug?: string }) => {
        setLoading(true);
        setError(null);
        window.scrollTo(0, 0);

        try {
            // Load guides for header dropdown if not already loaded.
            if (guides.length === 0) {
                setGuides(staticGuides);
            }

            switch (route.page) {
                case 'HOME':
                    if (products.length === 0) {
                        setProducts(staticProducts);
                    }
                    break;
                case 'FAQ':
                    if (faq.length === 0) {
                        setFaq(staticFaqs);
                    }
                    break;
                case 'BLOG':
                    if (blogPosts.length === 0) {
                        setBlogPosts(staticBlogPosts);
                    }
                    break;
                case 'ABOUT':
                    if (!aboutInfo) {
                        setAboutInfo(staticAboutInfo);
                    }
                    break;
                // GUIDES_LIST and GUIDE_DETAIL cases are intentionally empty
                // as guides are loaded globally above.
                case 'GUIDES_LIST':
                case 'GUIDE_DETAIL':
                    break;
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred.');
            }
        } finally {
            setLoading(false);
        }
    }, [products.length, guides.length, faq.length, blogPosts.length, aboutInfo]);

    // Initial fetch and routing setup
    useEffect(() => {
        fetchContentForPage(currentRoute);

        const handlePopState = () => {
            const newRoute = getPageFromPath(window.location.pathname);
            setCurrentRoute(newRoute);
            fetchContentForPage(newRoute);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // Update schema when page or data changes
    useEffect(() => {
        const generateSchema = () => {
            try {
                const siteName = "Top 10 Resveratrol";
                const url = window.location.href;
                switch(currentRoute.page) {
                    case 'HOME':
                        if (products.length > 0) {
                            return {
                                "@context": "https://schema.org",
                                "@type": "ItemList",
                                "name": "Top 10 Resveratrol Supplements",
                                "description": "An expert-reviewed list of the top 10 resveratrol supplements for 2025.",
                                "itemListElement": products.map((product, index) => ({
                                    "@type": "ListItem",
                                    "position": index + 1,
                                    "item": {
                                        "@type": "Product",
                                        "name": product.name,
                                        "image": product.image,
                                        "brand": { "@type": "Brand", "name": product.brand },
                                        "review": {
                                            "@type": "Review",
                                            "reviewRating": { "@type": "Rating", "ratingValue": product.rating, "bestRating": "5" },
                                            "author": { "@type": "Organization", "name": siteName }
                                        },
                                    }
                                }))
                            };
                        }
                        return null;
                    case 'FAQ':
                         if (faq.length > 0) {
                            return {
                                "@context": "https://schema.org",
                                "@type": "FAQPage",
                                "mainEntity": faq.map(item => ({
                                    "@type": "Question",
                                    "name": item.question,
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": (item.answer || '').replace(/<[^>]*>?/gm, '') // Strip HTML for schema text
                                    }
                                }))
                            };
                        }
                        return null;
                    case 'BLOG':
                         if (blogPosts.length > 0) {
                            return {
                                "@context": "https://schema.org",
                                "@type": "Blog",
                                "name": "Resveratrol Research & Insights Blog",
                                "blogPost": blogPosts.map(p => ({
                                    "@type": "BlogPosting",
                                    "headline": p.title,
                                    "author": {"@type": "Person", "name": p.author},
                                    "datePublished": p.date,
                                }))
                            };
                        }
                        return null;
                    case 'GUIDE_DETAIL':
                        const guide = guides.find(g => g.slug === currentRoute.slug);
                        if (guide) {
                             return {
                                "@context": "https://schema.org",
                                "@type": "Article",
                                "headline": guide.title,
                                "author": { "@type": "Organization", "name": siteName },
                                "publisher": {
                                    "@type": "Organization",
                                    "name": siteName,
                                    "logo": {
                                        "@type": "ImageObject",
                                        "url": "https://bestresveratrol.com/favicon.png"
                                    }
                                },
                                "description": guide.summary,
                                "image": "https://bestresveratrol.com/og-image.png",
                                "datePublished": "2025-01-29",
                                "dateModified": "2025-01-30"
                           }
                        }
                        return null;
                    case 'BLOG_POST':
                        const blogPost = blogPosts.find(p => p.slug === currentRoute.slug);
                        if (blogPost) {
                            return {
                                "@context": "https://schema.org",
                                "@type": "BlogPosting",
                                "headline": blogPost.title,
                                "author": {
                                    "@type": "Person",
                                    "name": blogPost.author,
                                    "description": blogPost.authorBio
                                },
                                "publisher": {
                                    "@type": "Organization",
                                    "name": siteName,
                                    "logo": {
                                        "@type": "ImageObject",
                                        "url": "https://bestresveratrol.com/favicon.png"
                                    }
                                },
                                "datePublished": blogPost.date,
                                "dateModified": blogPost.date,
                                "description": blogPost.summary,
                                "image": "https://bestresveratrol.com/og-image.png",
                                "articleBody": (blogPost.content || '').replace(/<[^>]*>?/gm, ''),
                                "mainEntityOfPage": {
                                    "@type": "WebPage",
                                    "@id": `${url}`
                                }
                            }
                        }
                        return null;
                    case 'PRODUCT_DETAIL':
                        const product = products.find(p => p.slug === currentRoute.slug);
                        if (product) {
                            return {
                                "@context": "https://schema.org",
                                "@type": "Product",
                                "name": `${product.brand} ${product.name}`,
                                "image": product.image,
                                "description": product.summary,
                                "brand": { "@type": "Brand", "name": product.brand },
                                "review": {
                                    "@type": "Review",
                                    "reviewRating": {
                                        "@type": "Rating",
                                        "ratingValue": product.rating,
                                        "bestRating": "5"
                                    },
                                    "author": { "@type": "Organization", "name": siteName }
                                },
                                "offers": {
                                    "@type": "Offer",
                                    "url": product.affiliateLink,
                                    "availability": "https://schema.org/InStock"
                                }
                            }
                        }
                        return null;
                    default:
                        return {
                            "@context": "https://schema.org",
                            "@type": "WebSite",
                            "url": url,
                            "name": siteName,
                        };
                }
            } catch (e) {
                console.error("Error generating schema:", e);
                return null; // On error, return null to avoid crashing
            }
        };
        setSchema(generateSchema());
    }, [currentRoute, products, faq, blogPosts, guides]);

    // Generate breadcrumb schema based on current page
    useEffect(() => {
        const generateBreadcrumb = () => {
            switch(currentRoute.page) {
                case 'HOME':
                    return null; // No breadcrumb on homepage
                case 'PRODUCT_DETAIL':
                    const product = products.find(p => p.slug === currentRoute.slug);
                    if (product) {
                        return generateProductBreadcrumb(`${product.brand} ${product.name}`, product.slug);
                    }
                    return null;
                case 'GUIDE_DETAIL':
                    const guide = guides.find(g => g.slug === currentRoute.slug);
                    if (guide) {
                        return generateGuideBreadcrumb(guide.title, guide.slug);
                    }
                    return null;
                case 'BLOG_POST':
                    const blogPost = blogPosts.find(p => p.slug === currentRoute.slug);
                    if (blogPost) {
                        return generateBlogPostBreadcrumb(blogPost.title, blogPost.slug);
                    }
                    return null;
                case 'FAQ':
                    return generatePageBreadcrumb('FAQ', getCanonicalUrl('/faq'));
                case 'BLOG':
                    return generatePageBreadcrumb('Blog', getCanonicalUrl('/blog'));
                case 'ABOUT':
                    return generatePageBreadcrumb('About Us', getCanonicalUrl('/about'));
                case 'GUIDES_LIST':
                    return generatePageBreadcrumb('Guides', getCanonicalUrl('/guides'));
                case 'PRIVACY_POLICY':
                    return generatePageBreadcrumb('Privacy Policy', getCanonicalUrl('/privacy-policy'));
                case 'TERMS_OF_SERVICE':
                    return generatePageBreadcrumb('Terms of Service', getCanonicalUrl('/terms-of-service'));
                case 'DISCLAIMER':
                    return generatePageBreadcrumb('Disclaimer', getCanonicalUrl('/disclaimer'));
                case 'AFFILIATE_DISCLOSURE':
                    return generatePageBreadcrumb('Affiliate Disclosure', getCanonicalUrl('/affiliate-disclosure'));
                default:
                    return null;
            }
        };
        setBreadcrumbSchema(generateBreadcrumb());
    }, [currentRoute, products, guides, blogPosts]);

    const handleNavigate = (path: string) => {
        const newRoute = getPageFromPath(path);
        if (window.location.pathname !== path) {
            window.history.pushState({ path }, '', path);
        }
        if (newRoute.page !== currentRoute.page || newRoute.slug !== currentRoute.slug) {
            setCurrentRoute(newRoute);
            fetchContentForPage(newRoute);
        }
    };
    
    const renderPageContent = () => {
        if (loading) {
            return (
                <div className="container mx-auto px-4 py-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 my-8">Loading Content...</h2>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg my-8 p-6 animate-pulse">
                            <div className="space-y-4">
                                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        if (error) {
            return (
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center my-16 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                        <p className="font-bold">Error</p>
                        <p>{error}</p>
                        <button
                            onClick={() => fetchContentForPage(currentRoute)}
                            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            );
        }

        switch (currentRoute.page) {
            case 'HOME':
                return (
                  <>
                    <Hero />
                    <div className="container mx-auto px-4 py-8">
                        {products.length > 0 && <TopPicks products={products} />}
                        {products.length > 0 && <ComparisonTable products={products} />}
                        <section id="top-products" className="scroll-mt-24">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} onNavigate={handleNavigate} />
                            ))}
                        </section>
                    </div>
                  </>
                );
            case 'FAQ':
                return <FAQPage faqs={faq} />;
            case 'BLOG':
                return <BlogPage posts={blogPosts} onNavigate={handleNavigate} />;
            case 'BLOG_POST':
                const blogPost = blogPosts.find(p => p.slug === currentRoute.slug);
                return blogPost ? <BlogPostDetailPage post={blogPost} onNavigate={handleNavigate} /> : <div>Blog post not found.</div>;
             case 'ABOUT':
                return aboutInfo ? <AboutPage info={aboutInfo} /> : null;
            case 'GUIDES_LIST':
                return <GuidesListPage guides={guides} onNavigate={handleNavigate} />;
            case 'GUIDE_DETAIL':
                const guide = guides.find(g => g.slug === currentRoute.slug);
                return guide ? <GuideDetailPage guide={guide} /> : <div>Guide not found.</div>;
            case 'PRODUCT_DETAIL':
                const product = products.find(p => p.slug === currentRoute.slug);
                return product ? <ProductDetailPage product={product} onNavigate={handleNavigate} /> : <div>Product not found.</div>;
            case 'PRIVACY_POLICY':
                return <PrivacyPolicyPage />;
            case 'TERMS_OF_SERVICE':
                return <TermsOfServicePage />;
            case 'DISCLAIMER':
                return <DisclaimerPage />;
            case 'AFFILIATE_DISCLOSURE':
                return <AffiliateDisclosurePage />;
            default:
                return <NotFoundPage onNavigate={handleNavigate} />;
        }
    };

    return (
        <div className="font-sans text-gray-900">
            {/* SEO Meta Tags */}
            <SEOHead
                title={title}
                description={description}
                canonical={getCanonicalUrl(window.location.pathname)}
                ogType={currentRoute.page === 'PRODUCT_DETAIL' ? 'product' : currentRoute.page === 'BLOG' ? 'article' : 'website'}
                noindex={currentRoute.page === 'NOT_FOUND'}
            />

            {/* Organization Schema (Global) */}
            <SchemaInjector schema={generateOrganizationSchema()} />

            {/* WebSite Schema (Global) */}
            <SchemaInjector schema={generateWebSiteSchema()} />

            {/* Page-specific Schema */}
            {schema && <SchemaInjector schema={schema} />}

            {/* Breadcrumb Schema */}
            {breadcrumbSchema && <SchemaInjector schema={breadcrumbSchema} />}

            <Header onNavigate={handleNavigate} currentPage={currentRoute.page} guides={guides} products={products} />
            <main className={currentRoute.page === 'HOME' ? '' : 'container mx-auto px-4 py-8'}>
                {renderPageContent()}
            </main>
            <Footer onNavigate={handleNavigate} />
        </div>
    );
};

export default App;