import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import data
const mockDataPath = path.resolve(__dirname, '../data/mockData.ts');
const mockDataContent = fs.readFileSync(mockDataPath, 'utf-8');

// Very simple eval to get the data (not ideal but works for static generation)
// We'll parse the products, guides, blog posts manually

console.log('🏗️  Building static HTML website...');

// Read the current index.html template
const templatePath = path.resolve(__dirname, '../index.html');
const template = fs.readFileSync(templatePath, 'utf-8');

// Create output directory
const outDir = path.resolve(__dirname, '../static-site');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Simple HTML page generator
function generatePage({ title, description, canonical, content }) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-Z621CZJKJM"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-Z621CZJKJM');
    </script>

    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

    <link rel="canonical" href="${canonical}" />

    <!-- Open Graph -->
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://bestresveratrol.com/og-image.png" />

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/favicon.png" />

    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body {
        background-color: #f9fafb;
      }
    </style>
</head>
<body class="bg-gray-50">
    ${content}
</body>
</html>`;

  return html;
}

// Generate homepage
const homepage = generatePage({
  title: 'Top 10 Best Resveratrol Supplements (2025 Review)',
  description: 'Discover the best resveratrol supplements of 2025. In-depth reviews, comparison table, and buyer\'s guide.',
  canonical: 'https://bestresveratrol.com/',
  content: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-center mb-8">Top 10 Best Resveratrol Supplements</h1>
      <p class="text-center text-xl mb-12">Expert reviews and comprehensive buying guide for 2025</p>

      <div class="bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-2xl font-bold mb-4">Coming Soon</h2>
        <p>We're rebuilding this site as a simple, fast-loading static website.</p>
        <p class="mt-4">No more complex JavaScript - just pure HTML that works everywhere!</p>
      </div>
    </div>
  `
});

fs.writeFileSync(path.join(outDir, 'index.html'), homepage);

console.log('✅ Generated index.html');
console.log(`\n📦 Static site generated in: ${outDir}`);
console.log('📁 Upload everything in this folder to your server');
