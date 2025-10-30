// SEO Helper Functions

export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Top 10 Resveratrol",
    "url": "https://www.yoursite.com",
    "logo": "https://www.yoursite.com/logo.png",
    "description": "Expert reviews and comprehensive buying guides for the best resveratrol supplements on the market.",
    "sameAs": [
      // Add your social media profiles here when available
      // "https://www.facebook.com/yourpage",
      // "https://twitter.com/yourhandle",
      // "https://www.instagram.com/yourhandle"
    ]
  };
};

export const generateWebSiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Top 10 Resveratrol Supplements",
    "url": "https://www.yoursite.com",
    "description": "Expert reviews and buying guides for the best resveratrol supplements for anti-aging and longevity.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.yoursite.com/search?q={search_term_string}"
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
  const baseUrl = "https://www.yoursite.com";
  return `${baseUrl}${path}`;
};

export const generateProductBreadcrumb = (productName: string, productSlug: string) => {
  return generateBreadcrumbSchema([
    { name: "Home", url: "https://www.yoursite.com/" },
    { name: "Products", url: "https://www.yoursite.com/" },
    { name: productName, url: `https://www.yoursite.com/products/${productSlug}` }
  ]);
};

export const generateGuideBreadcrumb = (guideTitle: string, guideSlug: string) => {
  return generateBreadcrumbSchema([
    { name: "Home", url: "https://www.yoursite.com/" },
    { name: "Guides", url: "https://www.yoursite.com/guides" },
    { name: guideTitle, url: `https://www.yoursite.com/guides/${guideSlug}` }
  ]);
};

export const generatePageBreadcrumb = (pageName: string, pageUrl: string) => {
  return generateBreadcrumbSchema([
    { name: "Home", url: "https://www.yoursite.com/" },
    { name: pageName, url: pageUrl }
  ]);
};
