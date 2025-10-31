import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { products, blogPosts, faqs, guides } from '../data/mockData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🏗️  Generating fully static HTML pages...');

// Base HTML template without React
function generateStaticHTML({ title, description, canonical, content, structuredData }) {
  return `<!DOCTYPE html>
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

    <!-- Inline Critical CSS -->
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; background-color: #f9fafb; color: #111827; line-height: 1.6; }
      .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
      .bg-white { background-color: white; }
      .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
      .rounded-xl { border-radius: 0.75rem; }
      .p-8 { padding: 2rem; }
      .mb-8 { margin-bottom: 2rem; }
      .mb-4 { margin-bottom: 1rem; }
      .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
      .text-2xl { font-size: 1.5rem; line-height: 2rem; }
      .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
      .font-bold { font-weight: 700; }
      .text-gray-900 { color: #111827; }
      .text-gray-700 { color: #374151; }
      .text-gray-600 { color: #4b5563; }
      .text-purple-600 { color: #9333ea; }
      .text-green-600 { color: #16a34a; }
      .text-red-600 { color: #dc2626; }
      .btn-primary { display: inline-block; background: linear-gradient(to right, #9333ea, #db2777); color: white; font-weight: 700; padding: 1rem 2rem; border-radius: 0.5rem; text-decoration: none; text-align: center; transition: all 0.3s; }
      .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
      .grid { display: grid; }
      .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
      @media (min-width: 768px) { .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
      .gap-8 { gap: 2rem; }
      .flex { display: flex; }
      .items-center { align-items: center; }
      .justify-between { justify-content: space-between; }
      .space-y-3 > * + * { margin-top: 0.75rem; }
      img { max-width: 100%; height: auto; }
      ul { list-style: none; }
      a { color: #9333ea; text-decoration: none; }
      a:hover { text-decoration: underline; }

      /* Header styles */
      .site-header { position: sticky; top: 0; z-index: 50; background: #ffffff; box-shadow: 0 1px 2px rgba(0,0,0,0.06); }
      .nav-link { color: #4b5563; font-weight: 500; text-decoration: none; border-bottom: 2px solid transparent; padding-bottom: 0.25rem; }
      .nav-link:hover { color: #2563eb; }
      .dropdown { position: relative; }
      .dropdown-menu { position: absolute; top: 100%; left: 50%; transform: translateX(-50%); padding-top: 0.5rem; z-index: 50; display: none; }
      .dropdown:hover .dropdown-menu { display: block; }
      .dropdown-card { width: 20rem; background: #ffffff; border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); padding: 0.5rem 0; border: 1px solid #e5e7eb; max-height: 24rem; overflow-y: auto; }
      .dropdown-item { display: block; padding: 0.75rem 1rem; font-size: 0.875rem; color: #374151; }
      .dropdown-item:hover { background: #eff6ff; color: #2563eb; text-decoration: none; }
      .dropdown-item-strong { font-weight: 600; color: #111827; border-bottom: 1px solid #f3f4f6; }

      /* Responsive nav */
      .desktop-nav { display: none; }
      .mobile-toggle { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border: 1px solid #e5e7eb; border-radius: 0.375rem; background: #ffffff; }
      .mobile-menu { display: none; padding: 0.5rem 0; }
      .mobile-link { display: block; padding: 0.75rem 1rem; color: #374151; text-decoration: none; }
      .mobile-link:hover { background: #f3f4f6; }
      .mobile-section { border-top: 1px solid #e5e7eb; }
      .mobile-section-header { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; font-weight: 600; color: #374151; cursor: pointer; }
      .mobile-section-items { display: none; }
      .chevron { transition: transform 0.2s ease; }
      @media (min-width: 768px) {
        .desktop-nav { display: flex; }
        .mobile-only { display: none !important; }
      }
    </style>
    ${structuredData ? `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>` : ''}
</head>
<body>
    <header class="site-header">
      <div class="container" style="display: flex; align-items: center; justify-content: space-between; padding: 1rem 1rem;">
        <a href="/" style="font-size: 1.5rem; font-weight: 700; color: #1f2937; text-decoration: none;">Top 10 Resveratrol</a>
        <nav class="desktop-nav" style="gap: 1.5rem; align-items: center;">
          <div class="dropdown">
            <a href="/#top-products" class="nav-link" style="display: inline-flex; align-items: center; gap: 0.25rem;">Reviews
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </a>
            <div class="dropdown-menu">
              <div class="dropdown-card">
                <a href="/#top-products" class="dropdown-item dropdown-item-strong">View All Reviews</a>
                ${products.map(p => `
                  <a href="/products/${p.slug}/" class="dropdown-item">
                    <div style="display:flex; align-items:center; justify-content: space-between;">
                      <span style="font-weight:600;">#${p.rank} ${p.brand}</span>
                      <span style="font-size:0.75rem; color:#6b7280;">${p.rating}★</span>
                    </div>
                    <div style="font-size:0.75rem; color:#6b7280; margin-top:0.25rem;">${p.name}</div>
                  </a>
                `).join('')}
              </div>
            </div>
          </div>
          <a href="/#comparison-table" class="nav-link">Compare</a>
          <div class="dropdown">
            <a href="/guides" class="nav-link" style="display: inline-flex; align-items: center; gap: 0.25rem;">Guides
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </a>
            <div class="dropdown-menu">
              <div class="dropdown-card" style="width: 16rem;">
                <a href="/guides" class="dropdown-item dropdown-item-strong">All Guides</a>
                ${guides.map(g => `
                  <a href="/guides/${g.slug}/" class="dropdown-item">${g.title}</a>
                `).join('')}
              </div>
            </div>
          </div>
          <a href="/faq" class="nav-link">FAQ</a>
          <a href="/blog" class="nav-link">Blog</a>
        </nav>
        <button id="mobileMenuBtn" class="mobile-only mobile-toggle" aria-label="Open menu" aria-expanded="false">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#111827" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
      <div id="mobileMenu" class="mobile-only mobile-menu" aria-hidden="true">
        <div class="container" style="background:#ffffff; border-top:1px solid #e5e7eb; border-bottom:1px solid #e5e7eb; border-radius: 0 0 0.5rem 0.5rem;">
          <a href="/#comparison-table" class="mobile-link">Compare</a>
          <div class="mobile-section">
            <div class="mobile-section-header" data-section="reviews">
              <span>Reviews</span>
              <svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="#111827" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
            <div id="mobileReviews" class="mobile-section-items">
              <a href="/#top-products" class="mobile-link" style="font-weight:600;">All Reviews</a>
              ${products.map(p => `
                <a href="/products/${p.slug}/" class="mobile-link">
                  <div style=\"display:flex; align-items:center; justify-content: space-between;\">
                    <span style=\"font-weight:600;\">#${p.rank} ${p.brand}</span>
                    <span style=\"font-size:0.75rem; color:#6b7280;\">${p.rating}★</span>
                  </div>
                  <div style=\"font-size:0.75rem; color:#6b7280; margin-top:0.25rem;\">${p.name}</div>
                </a>
              `).join('')}
            </div>
          </div>
          <div class="mobile-section">
            <div class="mobile-section-header" data-section="guides">
              <span>Guides</span>
              <svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="#111827" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
            <div id="mobileGuides" class="mobile-section-items">
              <a href="/guides" class="mobile-link" style="font-weight:600;">All Guides</a>
              ${guides.map(g => `
                <a href="/guides/${g.slug}/" class="mobile-link">${g.title}</a>
              `).join('')}
            </div>
          </div>
          <a href="/faq" class="mobile-link">FAQ</a>
          <a href="/blog" class="mobile-link">Blog</a>
        </div>
      </div>
    </header>
    ${content}
    <script>
      (function(){
        var btn = document.getElementById('mobileMenuBtn');
        var menu = document.getElementById('mobileMenu');
        var reviewsHeader = null;
        var guidesHeader = null;
        var reviews = null;
        var guides = null;
        function qs(sel){ return document.querySelector(sel); }
        function qsa(sel){ return Array.prototype.slice.call(document.querySelectorAll(sel)); }
        function toggle(el){ if(!el) return; el.style.display = (el.style.display === 'block') ? 'none' : 'block'; }
        function rotateChevron(header){
          var svg = header && header.querySelector('.chevron');
          if(!svg) return;
          var open = header.getAttribute('aria-expanded') === 'true';
          svg.style.transform = open ? 'rotate(0deg)' : 'rotate(180deg)';
          header.setAttribute('aria-expanded', open ? 'false' : 'true');
        }
        function init(){
          reviewsHeader = qs('.mobile-section-header[data-section="reviews"]');
          guidesHeader = qs('.mobile-section-header[data-section="guides"]');
          reviews = document.getElementById('mobileReviews');
          guides = document.getElementById('mobileGuides');
          if(btn && menu){
            btn.addEventListener('click', function(){
              var open = menu.style.display === 'block';
              menu.style.display = open ? 'none' : 'block';
              btn.setAttribute('aria-expanded', open ? 'false' : 'true');
            });
          }
          if(reviewsHeader && reviews){
            reviewsHeader.addEventListener('click', function(){ toggle(reviews); rotateChevron(reviewsHeader); });
          }
          if(guidesHeader && guides){
            guidesHeader.addEventListener('click', function(){ toggle(guides); rotateChevron(guidesHeader); });
          }
        }
        if(document.readyState === 'loading'){
          document.addEventListener('DOMContentLoaded', init);
        } else { init(); }
      })();
    </script>
</body>
</html>`;
}

// Generate product detail page
function generateProductPage(product) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${product.brand} ${product.name}`,
    "description": product.summary,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "bestRating": 5
    },
    "offers": {
      "@type": "Offer",
      "url": product.affiliateLink,
      "availability": "https://schema.org/InStock"
    }
  };

  const content = `
    <div class="container" style="padding: 2rem 1rem;">
      <!-- Breadcrumb -->
      <nav style="margin-bottom: 1.5rem; font-size: 0.875rem; color: #4b5563;">
        <a href="/" style="color: #4b5563;">Home</a>
        <span style="margin: 0 0.5rem;">/</span>
        <span style="color: #111827; font-weight: 500;">${product.brand} ${product.name}</span>
      </nav>

      <!-- Product Header -->
      <div class="bg-white rounded-xl shadow-lg mb-8" style="overflow: hidden;">
        <div class="grid md:grid-cols-2 gap-8 p-8">
          <!-- Product Image -->
          <div style="display: flex; align-items: center; justify-content: center; background-color: #f9fafb; border-radius: 0.5rem; padding: 2rem;">
            <img
              src="${product.image}"
              alt="${product.brand} ${product.name} - ${product.potency} Trans-Resveratrol Supplement Bottle"
              width="400"
              height="400"
              sizes="(max-width: 768px) 90vw, 400px"
              style="border-radius: 0.5rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);"
            />
          </div>

          <!-- Product Info -->
          <div>
            <div style="margin-bottom: 1rem;">
              <span style="display: inline-flex; align-items: center; padding: 0.5rem 1rem; background: linear-gradient(to right, #9333ea, #db2777); color: white; font-size: 0.875rem; font-weight: 700; border-radius: 9999px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                #${product.rank} ${product.bestFor}
              </span>
            </div>

            <h1 class="text-4xl font-bold text-gray-900 mb-4">
              ${product.brand} ${product.name}
            </h1>

            <!-- Rating -->
            <div style="display: flex; align-items: center; margin-bottom: 1rem;">
              <div style="color: #fbbf24; font-size: 1.25rem;">
                ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span style="margin-left: 0.5rem; color: #4b5563; font-weight: 600;">${product.rating}/5</span>
            </div>

            <!-- Key Details -->
            <div style="margin-bottom: 1.5rem;">
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 0.75rem;">
                <span style="color: #4b5563; font-weight: 500;">Potency:</span>
                <span style="color: #111827; font-weight: 600;">${product.potency}</span>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">
                <span style="color: #4b5563; font-weight: 500;">Serving Size:</span>
                <span style="color: #111827; font-weight: 600;">${product.servingSize}</span>
              </div>
            </div>

            <!-- Certifications -->
            <div style="margin-bottom: 1.5rem;">
              <h3 style="font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Certifications:</h3>
              <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${product.certifications.map(cert => `
                  <span style="padding: 0.25rem 0.75rem; background-color: #d1fae5; color: #065f46; font-size: 0.75rem; font-weight: 500; border-radius: 9999px; border: 1px solid #a7f3d0;">
                    ✓ ${cert}
                  </span>
                `).join('')}
              </div>
            </div>

            <!-- CTA Button -->
            <a
              href="${product.affiliateLink}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary"
              style="display: block; width: 100%; margin-bottom: 0.5rem;"
            >
              Buy Now →
            </a>
            <p style="font-size: 0.75rem; color: #6b7280; text-align: center;">
              We may earn a commission from qualifying purchases
            </p>
          </div>
        </div>
      </div>

      <!-- Product Summary -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Product Overview</h2>
        <p style="color: #374151; line-height: 1.75; font-size: 1.125rem;">
          ${product.summary}
        </p>
      </div>

      <!-- Pros and Cons -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <!-- Pros -->
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h3 class="text-xl font-bold text-green-600 mb-4" style="display: flex; align-items: center;">
            <span style="font-size: 1.5rem; margin-right: 0.5rem;">✓</span>
            Pros
          </h3>
          <ul class="space-y-3">
            ${product.pros.map(pro => `
              <li style="display: flex; align-items: start;">
                <span style="color: #16a34a; font-weight: 700; margin-right: 0.5rem;">+</span>
                <span style="color: #374151;">${pro}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Cons -->
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h3 class="text-xl font-bold text-red-600 mb-4" style="display: flex; align-items: center;">
            <span style="font-size: 1.5rem; margin-right: 0.5rem;">⚠</span>
            Cons
          </h3>
          <ul class="space-y-3">
            ${product.cons.map(con => `
              <li style="display: flex; align-items: start;">
                <span style="color: #dc2626; font-weight: 700; margin-right: 0.5rem;">-</span>
                <span style="color: #374151;">${con}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>

      <!-- Why Choose This Product -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8" style="background: linear-gradient(to bottom right, #faf5ff, #fce7f3); border: 1px solid #e9d5ff;">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">
          Why Choose ${product.brand} ${product.name}?
        </h2>
        <div style="color: #374151; font-size: 1.125rem; line-height: 1.75;">
          <p style="margin-bottom: 1rem;">
            ${product.brand} ${product.name} is ranked <strong>#${product.rank}</strong> in our comprehensive review
            of the best resveratrol supplements for 2025. This product stands out as the <strong>${product.bestFor}</strong> option,
            with a rating of <strong>${product.rating}/5</strong>.
          </p>
          <p>
            With ${product.potency}, this supplement provides a potent dose of bioavailable resveratrol
            to support your health and longevity goals. The ${product.servingSize.toLowerCase()} serving size makes it
            easy to incorporate into your daily routine.
          </p>
        </div>
      </div>

      <!-- Final CTA -->
      <div class="bg-white rounded-xl shadow-lg p-8" style="text-align: center;">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">
          Ready to Experience the Benefits?
        </h3>
        <p style="color: #4b5563; margin-bottom: 1.5rem; max-width: 48rem; margin-left: auto; margin-right: auto;">
          Join thousands of satisfied customers who trust ${product.brand} for their resveratrol supplementation needs.
        </p>
        <a
          href="${product.affiliateLink}"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-primary"
        >
          Buy ${product.brand} ${product.name} →
        </a>
        <p style="font-size: 0.75rem; color: #6b7280; margin-top: 1rem;">
          Affiliate Disclosure: We may earn a commission from qualifying purchases
        </p>
      </div>

      <!-- Back to All Products -->
      <div style="margin-top: 2rem; text-align: center;">
        <a href="/" style="color: #9333ea; font-weight: 600;">
          ← Back to All Products
        </a>
      </div>
    </div>
  `;

  return generateStaticHTML({
    title: `${product.brand} ${product.name} Review - ${product.potency} Trans-Resveratrol`,
    description: product.summary,
    canonical: `https://bestresveratrol.com/products/${product.slug}/`,
    content,
    structuredData
  });
}

// Generate a simple section block
function section(title, inner) {
  return `\n      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">\n        <h2 class="text-2xl font-bold text-gray-900 mb-4">${title}</h2>\n        ${inner}\n      </div>`;
}

function generateHomePage() {
  const topCards = products.slice(0, 3).map(p => `
    <div class="bg-white rounded-xl shadow-lg p-6">
      <div class="flex items-center justify-between mb-2">
        <div class="text-sm font-semibold text-gray-700">#${p.rank} ${p.bestFor}</div>
        <div class="text-sm text-gray-500">${p.rating}★</div>
      </div>
      <img src="${p.image}" alt="${p.brand} ${p.name}" style="max-width:200px; height:auto;" />
      <h3 class="text-xl font-bold text-gray-900 mt-3 mb-2">${p.brand} - ${p.name}</h3>
      <p class="text-gray-600 mb-4">${p.summary}</p>
      <a href="/products/${p.slug}/" class="btn-primary">View Full Review →</a>
    </div>
  `).join('\n');

  const content = `
    <div class="container" style="padding: 2rem 1rem;">
      ${section('Top Picks', `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">${topCards}</div>
      `)}
      ${section('All Reviews', `
        <div class="grid grid-cols-1 gap-6" id="top-products">
          ${products.map(p => `
            <div class="bg-white rounded-xl shadow-lg p-6">
              <div class="flex items-center justify-between mb-2">
                <div class="text-sm font-semibold text-gray-700">#${p.rank} ${p.bestFor}</div>
                <div class="text-sm text-gray-500">${p.rating}★</div>
              </div>
              <div class="flex items-start gap-4">
                <img src="${p.image}" alt="${p.brand} ${p.name}" style="max-width:120px; height:auto;" />
                <div>
                  <h3 class="text-xl font-bold text-gray-900">${p.brand} - ${p.name}</h3>
                  <p class="text-gray-600 mb-3">${p.summary}</p>
                  <a href="/products/${p.slug}/" class="btn-primary">View Full Review →</a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `)}
    </div>`;

  return generateStaticHTML({
    title: 'Top 10 Best Resveratrol Supplements (2025 Review)',
    description: 'Discover the best resveratrol supplements of 2025. In-depth reviews, a comparison table, and a buyer\'s guide to help you boost your health and longevity.',
    canonical: 'https://bestresveratrol.com/',
    content
  });
}

function generateFAQPage() {
  const inner = faqs.map(f => `
    <div class="mb-6">
      <h3 class="text-xl font-bold text-gray-900 mb-2">${f.question}</h3>
      <div class="text-gray-700">${f.answer}</div>
    </div>
  `).join('');
  const content = `
    <div class="container" style="padding: 2rem 1rem;">
      ${section('FAQ', inner)}
    </div>`;
  return generateStaticHTML({
    title: 'Resveratrol FAQ | Answers to Common Questions',
    description: 'Find answers to frequently asked questions about resveratrol supplements, including dosage, side effects, benefits, and how to choose the right one.',
    canonical: 'https://bestresveratrol.com/faq',
    content
  });
}

function generateGuidesIndexPage() {
  const inner = guides.map(g => `
    <div class="mb-6">
      <h3 class="text-xl font-bold text-gray-900 mb-1"><a href="/guides/${g.slug}/">${g.title}</a></h3>
      <p class="text-gray-600">${g.summary}</p>
    </div>
  `).join('');
  const content = `
    <div class="container" style="padding: 2rem 1rem;">
      ${section('Guides', inner)}
    </div>`;
  return generateStaticHTML({
    title: 'Resveratrol Buyer\'s Guides',
    description: 'Our comprehensive guides to help you choose and use resveratrol supplements effectively. Learn about potency, purity, benefits, and more.',
    canonical: 'https://bestresveratrol.com/guides',
    content
  });
}

function generateGuidePage(guide) {
  const content = `
    <div class="container" style="padding: 2rem 1rem;">
      ${section(guide.title, guide.content || '')}
    </div>`;
  return generateStaticHTML({
    title: `${guide.title} | Resveratrol Guides`,
    description: guide.summary,
    canonical: `https://bestresveratrol.com/guides/${guide.slug}/`,
    content
  });
}

function generateBlogIndexPage() {
  const inner = blogPosts.map(p => `
    <div class="mb-6">
      <h3 class="text-xl font-bold text-gray-900 mb-1"><a href="/blog/${p.slug}/">${p.title}</a></h3>
      <div class="text-sm text-gray-500 mb-1">${p.author} • ${p.date}</div>
      <p class="text-gray-600">${p.summary}</p>
    </div>
  `).join('');
  const content = `
    <div class="container" style="padding: 2rem 1rem;">
      ${section('Resveratrol Research & Insights Blog', inner)}
    </div>`;
  return generateStaticHTML({
    title: 'Resveratrol Research & Insights Blog',
    description: 'Explore the latest research, tips, and insights on resveratrol, anti-aging, and wellness from our expert-written blog.',
    canonical: 'https://bestresveratrol.com/blog',
    content
  });
}

function generateBlogPostPage(post) {
  const content = `
    <div class="container" style="padding: 2rem 1rem;">
      ${section(post.title, `
        <div class="text-sm text-gray-500 mb-4">${post.author} • ${post.date}</div>
        <div class="prose prose-lg max-w-none">${post.content || ''}</div>
      `)}
    </div>`;
  return generateStaticHTML({
    title: `${post.title} | Resveratrol Blog`,
    description: post.summary,
    canonical: `https://bestresveratrol.com/blog/${post.slug}/`,
    content
  });
}

function generateSimplePage({ title, description, canonical, bodyTitle, bodyHtml }) {
  const content = `
    <div class="container" style="padding: 2rem 1rem;">
      ${section(bodyTitle, bodyHtml)}
    </div>`;
  return generateStaticHTML({ title, description, canonical, content });
}

// Create dist directory if it doesn't exist
const distDir = path.resolve(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Generate product pages
const productsDir = path.join(distDir, 'products');
if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
}

let generatedCount = 0;

products.forEach(product => {
  const productDir = path.join(productsDir, product.slug);
  if (!fs.existsSync(productDir)) {
    fs.mkdirSync(productDir, { recursive: true });
  }

  const html = generateProductPage(product);
  fs.writeFileSync(path.join(productDir, 'index.html'), html);
  generatedCount++;
  console.log(`✅ Generated: /products/${product.slug}/index.html`);
});

// NEW: Generate non-product static pages
// Home
fs.writeFileSync(path.join(distDir, 'index.html'), generateHomePage());

// FAQ
const faqDir = path.join(distDir, 'faq');
if (!fs.existsSync(faqDir)) fs.mkdirSync(faqDir, { recursive: true });
fs.writeFileSync(path.join(faqDir, 'index.html'), generateFAQPage());

// Guides index and details
const guidesDir = path.join(distDir, 'guides');
if (!fs.existsSync(guidesDir)) fs.mkdirSync(guidesDir, { recursive: true });
fs.writeFileSync(path.join(guidesDir, 'index.html'), generateGuidesIndexPage());

guides.forEach(g => {
  const dir = path.join(guidesDir, g.slug);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), generateGuidePage(g));
});

// Blog index and posts
const blogDir = path.join(distDir, 'blog');
if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });
fs.writeFileSync(path.join(blogDir, 'index.html'), generateBlogIndexPage());

blogPosts.forEach(p => {
  const dir = path.join(blogDir, p.slug);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), generateBlogPostPage(p));
});

// Legal pages
const legalPages = [
  { slug: 'privacy-policy', title: 'Privacy Policy | Best Resveratrol', desc: 'Privacy policy for Best Resveratrol', bodyTitle: 'Privacy Policy', bodyHtml: '<p>See our privacy policy details inside the app content.</p>' },
  { slug: 'terms-of-service', title: 'Terms of Service | Best Resveratrol', desc: 'Terms of service for Best Resveratrol', bodyTitle: 'Terms of Service', bodyHtml: '<p>See our terms of service details inside the app content.</p>' },
  { slug: 'disclaimer', title: 'Medical Disclaimer | Best Resveratrol', desc: 'Disclaimer for Best Resveratrol', bodyTitle: 'Medical Disclaimer', bodyHtml: '<p>See our medical disclaimer details inside the app content.</p>' },
  { slug: 'affiliate-disclosure', title: 'Affiliate Disclosure | Best Resveratrol', desc: 'Affiliate disclosure for Best Resveratrol', bodyTitle: 'Affiliate Disclosure', bodyHtml: '<p>We may earn a commission from qualifying purchases made through links on our site.</p>' }
];

legalPages.forEach(page => {
  const dir = path.join(distDir, page.slug);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'index.html'),
    generateSimplePage({
      title: page.title,
      description: page.desc,
      canonical: `https://bestresveratrol.com/${page.slug}`,
      bodyTitle: page.bodyTitle,
      bodyHtml: page.bodyHtml
    })
  );
});

console.log(`\n🎉 Successfully generated ${generatedCount} static product pages!`);
console.log(`📁 Output directory: ${distDir}`);
console.log('✅ Generated: home, faq, guides, blog, and legal static pages');
