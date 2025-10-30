import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the products from mockData
const mockDataPath = path.resolve(__dirname, '../data/mockData.ts');
const mockDataContent = fs.readFileSync(mockDataPath, 'utf-8');

// Extract product slugs using regex
const productSlugs = [];
const slugMatches = mockDataContent.matchAll(/slug:\s*["']([^"']+)["']/g);
for (const match of slugMatches) {
  if (match[1] && !match[1].includes('blog') && !match[1].includes('guide')) {
    productSlugs.push(match[1]);
  }
}

// Extract guide slugs
const guideSlugs = [];
const guideMatches = mockDataContent.matchAll(/slug:\s*["']([a-z-]+)["'],?\s*title:/g);
for (const match of guideMatches) {
  if (match[1]) {
    guideSlugs.push(match[1]);
  }
}

// Extract blog slugs
const blogSlugs = [];
const blogMatches = mockDataContent.matchAll(/id:\s*\d+,\s*slug:\s*["']([^"']+)["'],\s*title:/g);
for (const match of guideMatches) {
  if (match[1] && match[1].includes('-')) {
    blogSlugs.push(match[1]);
  }
}

// Define all routes to prerender
const routes = [
  { path: '/', title: 'Top 10 Best Resveratrol Supplements (2025 Review)', description: 'Discover the best resveratrol supplements of 2025. In-depth reviews, a comparison table, and a buyer\'s guide to help you boost your health and longevity.' },
  { path: '/faq', title: 'Resveratrol FAQ | Answers to Common Questions', description: 'Find answers to frequently asked questions about resveratrol supplements, including dosage, side effects, benefits, and how to choose the right one.' },
  { path: '/blog', title: 'Resveratrol Research & Insights Blog', description: 'Explore the latest research, tips, and insights on resveratrol, anti-aging, and wellness from our expert-written blog.' },
  { path: '/about', title: 'About Us | Our Mission & Review Process', description: 'Learn about our mission to provide clear, unbiased, and science-backed reviews of resveratrol supplements and our rigorous evaluation process.' },
  { path: '/guides', title: 'Resveratrol Buyer\'s Guides', description: 'Our comprehensive guides to help you choose and use resveratrol supplements effectively. Learn about potency, purity, benefits, and more.' },
  { path: '/privacy-policy', title: 'Privacy Policy | Best Resveratrol', description: 'Our privacy policy explains how we collect, use, and protect your personal information when you visit our website.' },
  { path: '/terms-of-service', title: 'Terms of Service | Best Resveratrol', description: 'Terms and conditions for using our website, including disclaimers, user obligations, and legal information.' },
  { path: '/disclaimer', title: 'Medical Disclaimer | Best Resveratrol', description: 'Important medical and health disclaimers regarding the information provided on our supplement review website.' },
  { path: '/affiliate-disclosure', title: 'Affiliate Disclosure | Best Resveratrol', description: 'Transparency about our affiliate relationships and how we earn commissions from product recommendations.' },
];

// Add product routes
productSlugs.forEach(slug => {
  routes.push({
    path: `/products/${slug}`,
    title: `${slug.replace(/-/g, ' ')} Review | Best Resveratrol`,
    description: `Detailed review and analysis of ${slug.replace(/-/g, ' ')} resveratrol supplement.`
  });
});

// Add guide routes
guideSlugs.forEach(slug => {
  routes.push({
    path: `/guides/${slug}`,
    title: `${slug.replace(/-/g, ' ')} | Resveratrol Guides`,
    description: `Comprehensive guide about ${slug.replace(/-/g, ' ')}.`
  });
});

// Add blog routes
blogSlugs.forEach(slug => {
  routes.push({
    path: `/blog/${slug}`,
    title: `${slug.replace(/-/g, ' ')} | Resveratrol Blog`,
    description: `Expert article about ${slug.replace(/-/g, ' ')}.`
  });
});

// Read the base index.html
const distPath = path.resolve(__dirname, '../dist');
const indexPath = path.join(distPath, 'index.html');
const baseHtml = fs.readFileSync(indexPath, 'utf-8');

console.log(`Prerendering ${routes.length} routes...`);

// Generate HTML for each route
routes.forEach(route => {
  // Update meta tags
  let html = baseHtml;
  html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);
  html = html.replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${route.description}"`);
  html = html.replace(/<link rel="canonical" href=".*?"/, `<link rel="canonical" href="https://bestresveratrol.com${route.path}"`);
  html = html.replace(/<meta property="og:title" content=".*?"/, `<meta property="og:title" content="${route.title}"`);
  html = html.replace(/<meta property="og:description" content=".*?"/, `<meta property="og:description" content="${route.description}"`);
  html = html.replace(/<meta property="og:url" content=".*?"/, `<meta property="og:url" content="https://bestresveratrol.com${route.path}"`);
  html = html.replace(/<meta name="twitter:title" content=".*?"/, `<meta name="twitter:title" content="${route.title}"`);
  html = html.replace(/<meta name="twitter:description" content=".*?"/, `<meta name="twitter:description" content="${route.description}"`);
  html = html.replace(/<meta name="twitter:url" content=".*?"/, `<meta name="twitter:url" content="https://bestresveratrol.com${route.path}"`);

  // Create directory if needed
  if (route.path !== '/') {
    const routePath = path.join(distPath, route.path);
    if (!fs.existsSync(routePath)) {
      fs.mkdirSync(routePath, { recursive: true });
    }
    fs.writeFileSync(path.join(routePath, 'index.html'), html);
  } else {
    fs.writeFileSync(indexPath, html);
  }

  console.log(`✓ Generated ${route.path}`);
});

console.log(`\nPrerendering complete! Generated ${routes.length} pages.`);
