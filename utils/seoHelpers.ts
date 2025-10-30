// SEO Helper Functions

export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Best Resveratrol",
    "url": "https://bestresveratrol.com",
    "logo": "https://bestresveratrol.com/logo.png",
    "description": "Expert reviews and comprehensive buying guides for the best resveratrol supplements on the market.",
    "sameAs": [
      // Add your social media profiles here when available
      // "https://www.facebook.com/bestresveratrol",
      // "https://twitter.com/bestresveratrol",
      // "https://www.instagram.com/bestresveratrol"
    ]
  };
};

export const generateWebSiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Best Resveratrol - Top 10 Supplements 2025",
    "url": "https://bestresveratrol.com",
    "description": "Expert reviews and buying guides for the best resveratrol supplements for anti-aging and longevity.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://bestresveratrol.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
};

export const generateBreadcrumbSchema = (items: Array<{name: string; url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

export const getCanonicalUrl = (path: string): string => {
  const baseUrl = "https://bestresveratrol.com";
  return `${baseUrl}${path}`;
};

export const generateProductBreadcrumb = (productName: string, productSlug: string) => {
  return generateBreadcrumbSchema([
    { name: "Home", url: "https://bestresveratrol.com/" },
    { name: "Products", url: "https://bestresveratrol.com/" },
    { name: productName, url: `https://bestresveratrol.com/products/${productSlug}` }
  ]);
};

export const generateGuideBreadcrumb = (guideTitle: string, guideSlug: string) => {
  return generateBreadcrumbSchema([
    { name: "Home", url: "https://bestresveratrol.com/" },
    { name: "Guides", url: "https://bestresveratrol.com/guides" },
    { name: guideTitle, url: `https://bestresveratrol.com/guides/${guideSlug}` }
  ]);
};

export const generatePageBreadcrumb = (pageName: string, pageUrl: string) => {
  return generateBreadcrumbSchema([
    { name: "Home", url: "https://bestresveratrol.com/" },
    { name: pageName, url: pageUrl }
  ]);
};

export const generateBlogPostBreadcrumb = (postTitle: string, postSlug: string) => {
  return generateBreadcrumbSchema([
    { name: "Home", url: "https://bestresveratrol.com/" },
    { name: "Blog", url: "https://bestresveratrol.com/blog" },
    { name: postTitle, url: `https://bestresveratrol.com/blog/${postSlug}` }
  ]);
};
