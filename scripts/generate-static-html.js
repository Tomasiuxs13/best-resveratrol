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

      /* Static homepage theme */
      .home-section { margin: 3rem 0; }
      .hero { position: relative; overflow: hidden; background: linear-gradient(135deg,#f9fafb,#ffffff,#f9fafb); padding: 4rem 0; }
      .hero-grid { display: grid; grid-template-columns: 1fr; gap: 3rem; align-items: center; }
      @media (min-width: 768px) { .hero-grid { grid-template-columns: 1.2fr 1fr; } }
      .hero-title { font-size: 3rem; font-weight: 900; color:#111827; line-height:1.1; letter-spacing:-0.02em; margin-bottom: 1rem; }
      .hero-sub { font-size:1.125rem; color:#4b5563; margin-bottom:2rem; max-width:36rem; }
      .btn { display:inline-block; font-weight:700; color:#fff; text-decoration:none; border-radius:0.75rem; transition: transform .2s ease, box-shadow .2s ease; }
      .btn:hover { transform: translateY(-2px); box-shadow: 0 20px 25px -5px rgba(0,0,0,.1); }
      .btn-primary { background: linear-gradient(90deg,#ec4899,#8b5cf6); padding:.9rem 1.5rem; }
      .btn-warm { background: linear-gradient(90deg,#f97316,#ea580c); padding:1rem 2.5rem; }
      .badge { display:inline-block; padding:.25rem .75rem; border-radius:9999px; font-weight:700; font-size:.75rem; }
      .badge-pink { background:#fce7f3; color:#be185d; }
      .card { background:#fff; border-radius:1rem; box-shadow:0 10px 15px -3px rgba(0,0,0,.1); }
      .card-lg { border-radius:1.5rem; box-shadow:0 25px 50px -12px rgba(0,0,0,.25); }
      .grid-3 { display:grid; grid-template-columns:1fr; gap:2rem; }
      @media (min-width: 768px) { .grid-3 { grid-template-columns: repeat(3,minmax(0,1fr)); } }
      .top-badge { color:#fff; font-size:.75rem; font-weight:700; padding:.5rem 1.25rem; border-radius:9999px; box-shadow:0 10px 15px -3px rgba(0,0,0,.1); text-transform:uppercase; letter-spacing:.05em; }
      .bg-gold { background:linear-gradient(90deg,#f59e0b,#fbbf24); }
      .bg-violet { background:linear-gradient(90deg,#8b5cf6,#ec4899); }
      .bg-blue { background:linear-gradient(90deg,#3b82f6,#06b6d4); }
      .review-card { border:2px solid transparent; overflow:hidden; }
      .review-col { display:flex; flex-wrap:wrap; }
      .review-img { flex: 1 1 300px; max-width:360px; padding:1rem; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#f9fafb; }
      .review-body { flex: 2 1 400px; padding:1.5rem; }
      .table { width:100%; font-size:.875rem; text-align:left; color:#4b5563; border-collapse:collapse; }
      .table th { padding:.75rem 1.5rem; text-transform:uppercase; font-size:.75rem; color:#374151; background:#f3f4f6; }
      .table td, .table th { border-bottom:1px solid #e5e7eb; }
      .table .zebra:nth-child(even) { background:#f9fafb; }
      .card-grid { display:grid; grid-template-columns:1fr; gap:1.25rem; }
      @media (min-width: 768px) { .card-grid { grid-template-columns: repeat(3,minmax(0,1fr)); } }
      .post-card { background:#fff; border:1px solid #e5e7eb; border-radius:0.75rem; padding:1.25rem; box-shadow:0 4px 6px -1px rgba(0,0,0,.1); display:flex; flex-direction:column; }
      .post-title { font-size:1.125rem; font-weight:800; color:#111827; margin-bottom:.25rem; }
      .post-meta { font-size:.75rem; color:#6b7280; margin-bottom:.5rem; }
      .post-excerpt { color:#4b5563; margin-bottom:1rem; }
      .btn-link { color:#7c3aed; font-weight:700; text-decoration:none; }
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
  const hero = `
    <section class="hero">
      <div style="position:absolute; inset:0; overflow:hidden; pointer-events:none;">
        <div style="position:absolute; left:0; top:50%; transform:translateY(-50%); width:600px; height:600px; opacity:0.1;">
          ${Array.from({ length: 8 }).map((_, i) => `<div style=\"position:absolute; inset:0; border-radius:9999px; border:2px solid #9ca3af; transform: scale(${1 - i * 0.15})\"></div>`).join('')}
        </div>
      </div>
      <div class="container" style="position:relative; z-index:1;">
        <div class="hero-grid">
          <div>
            <h1 class="hero-title">TOP 10<br/>RESVERATROL<br/>SUPPLEMENTS</h1>
            <p class="hero-sub">Unlock Your Longevity Potential: An Expert Review of 2025's Best.</p>
            <a href="#product-1" class="btn btn-warm">See #1 Pick</a>
            <div style="margin-top:2rem; font-size:0.875rem; color:#6b7280;">
              <p style="margin:0 0 0.25rem; font-weight:600;">Last Updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p style="margin:0;"><span style="font-weight:600;">Affiliate Disclosure:</span> We may earn a commission from qualifying purchases.</p>
            </div>
          </div>
          <div style="position:relative; display:flex; justify-content:center;">
            <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center;">
              <div style="width:400px; height:400px; background:linear-gradient(135deg,#dbeafe,#ede9fe,#fce7f3); border-radius:40px; transform:rotate(12deg); opacity:0.3;"></div>
            </div>
            <div class="card-lg" style="position:relative; padding:2rem; max-width:28rem; width:100%; background:#fff;">
              <div style="background:#f3f4f6; border-radius:1rem; padding:1.5rem; margin-bottom:1rem; display:flex; justify-content:center;">
                <img src="${products[0].image}" alt="${products[0].brand} ${products[0].name}" style="width:100%; max-height:16rem; object-fit:contain;" loading="eager" width="400" height="400" />
              </div>
              <div style="text-align:center; margin-bottom:1rem;">
                <span class="badge badge-pink" style="margin-bottom:0.5rem;">≥99% Pure</span>
                <h3 style="font-size:1.5rem; font-weight:800; color:#111827; margin:0 0 0.25rem;">${products[0].brand} ${products[0].name}</h3>
                <p style="font-size:0.875rem; color:#4b5563; margin:0 0 .5rem;">${products[0].potency} • ${products[0].servingSize}</p>
                <div style="font-size:.875rem; color:#6b7280; margin-bottom:.5rem;">Rating: ${(products[0].rating||0).toFixed(1)} / 5 • ${products[0].bestFor}</div>
                ${ (products[0].certifications||[]).slice(0,3).map(c => `<span class=\"badge\" style=\"background:#e0f2fe;color:#075985;margin:.125rem;\">${c}</span>`).join('') }
              </div>
              <div style="display:flex; gap:.75rem;">
                <a href="/products/${products[0].slug}/" class="btn btn-primary" style="flex:1; text-align:center; border-radius:1rem;">Full Review</a>
                <a href="${products[0].affiliateLink}" target="_blank" rel="noopener noreferrer" class="btn btn-warm" style="flex:1; text-align:center; border-radius:1rem;">Check Price</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`;

  const topPicks = `
    <section id="top-picks" class="home-section" style="scroll-margin-top:6rem;">
      <h2 style="font-size:1.875rem; font-weight:800; text-align:center; color:#1f2937; margin-bottom:2rem;">Our 2025 Top Picks</h2>
      <div class="grid-3">
        ${products.slice(0, 3).map((p, idx) => `
            <div class="card" style="position:relative; border:2px solid #e5e7eb; padding:1.5rem; text-align:center;">
            <div style="position:absolute; top:-12px; left:50%; transform:translateX(-50%);">
              <span class="top-badge ${idx===0?'bg-gold':idx===1?'bg-violet':'bg-blue'}">${p.bestFor}</span>
            </div>
            <div style="margin-top:1rem;">
              <img src="${p.image}" alt="${p.brand} ${p.name}" style="width:144px; height:144px; object-fit:contain; margin:1rem auto; display:block;" loading="lazy" width="144" height="144" />
              <h3 style="font-weight:800; color:#111827; font-size:1.25rem; margin-bottom:0.25rem;">${p.brand}</h3>
              <p style="font-size:0.875rem; color:#4b5563; margin-bottom:1rem; min-height:40px;">${p.name}</p>
            </div>
            <div style="display:flex; gap:.75rem; justify-content:center; flex-wrap:wrap;">
              <a href="/products/${p.slug}/" class="btn btn-primary" style="padding:.75rem 1.5rem;">View Review</a>
              <a href="${p.affiliateLink}" target="_blank" rel="noopener noreferrer" class="btn btn-warm" style="padding:.75rem 1.5rem; border-radius:.75rem;">Buy Now</a>
            </div>
          </div>
        `).join('')}
      </div>
    </section>`;

  const comparisonRows = products.slice(0, 6).map((p, i) => `
    <tr class="zebra">
      <td style="padding:.75rem 1rem; font-weight:800; color:#111827;">${p.rank}</td>
      <td style="padding:.75rem 1rem;">
        <div style="display:flex; align-items:center; gap:.75rem;">
          <img src="${p.image}" alt="${p.brand} ${p.name}" style="width:36px; height:36px; border-radius:9999px; object-fit:contain;" loading="lazy" width="36" height="36" />
          <div>
            <div style="font-weight:600; color:#111827;">${p.brand}</div>
            <div style="font-size:.75rem; color:#6b7280;">${p.name}</div>
          </div>
        </div>
      </td>
      <td style="padding:.75rem 1rem; text-align:center;">
        <span class="badge" style="background:#f3e8ff; color:#5b21b6;">${(p.rating || 0).toFixed(1)}★</span>
      </td>
      <td style="padding:.75rem 1rem; white-space:nowrap;">${p.potency}</td>
      <td style="padding:.75rem 1rem;">${p.bestFor}</td>
      <td style="padding:.75rem 1rem; text-align:right; display:flex; gap:.5rem; justify-content:flex-end;">
        <a href="/products/${p.slug}/" class="btn btn-primary" style="padding:.5rem .9rem; border-radius:.5rem;">Review</a>
        <a href="${p.affiliateLink}" target="_blank" rel="noopener noreferrer" class="btn btn-warm" style="padding:.5rem .9rem; border-radius:.5rem;">Buy</a>
      </td>
    </tr>
  `).join('');

  const comparison = `
    <section id="comparison-table" class="home-section">
      <h2 style="font-size:1.875rem; font-weight:800; text-align:center; color:#1f2937; margin-bottom:2rem;">Top Resveratrol Supplements at a Glance</h2>
      <div class="card" style="overflow:hidden;">
        <div style="overflow-x:auto;">
          <table class="table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Product</th>
                <th style="text-align:center;">Rating</th>
                <th>Potency</th>
                <th>Best For</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${comparisonRows}</tbody>
          </table>
        </div>
      </div>
    </section>`;

  const allReviews = `
    <section id="top-products" style="scroll-margin-top:6rem;">
      ${products.map(p => `
        <article id="product-${p.rank}" class="card review-card" style="margin:2rem 0;">
          <div class="review-col">
            <div class="review-img">
              <div style="position:relative; width:96px; height:96px; display:flex; align-items:center; justify-content:center; border-radius:9999px; font-size:1.875rem; font-weight:700; margin-bottom:1rem; background:linear-gradient(90deg,#f59e0b,#fbbf24); color:#ffffff;">#${p.rank}</div>
              <img src="${p.image}" alt="${p.brand} ${p.name} - ${p.potency}" loading="lazy" width="192" height="192" style="height:12rem; width:100%; object-fit:contain; border-radius:0.5rem;" />
            </div>
            <div class="review-body">
              <div style="text-transform:uppercase; letter-spacing:.05em; font-size:0.875rem; color:#2563eb; font-weight:600;">${p.bestFor}</div>
              <h3 style="margin-top:0.25rem; font-size:1.5rem; line-height:2rem; font-weight:800; color:#111827;">${p.brand} - ${p.name}</h3>
              <p style="margin-top:0.5rem; color:#4b5563;">${p.summary}</p>
              <div style="margin-top:1rem; display:flex; align-items:center;"><span style="margin-left:0.5rem; color:#4b5563; font-weight:600;">${(p.rating||0).toFixed(1)} / 5.0</span></div>
              <div style="margin-top:1.5rem; display:flex; flex-direction:column; gap:0.75rem;">
                <a href="/products/${p.slug}/" class="btn btn-primary" style="display:block; width:100%; text-align:center;">View Full Review →</a>
                <a href="${p.affiliateLink}" target="_blank" rel="noopener noreferrer" class="btn btn-warm" style="display:block; width:100%; text-align:center; border-radius:.5rem;">Buy Now - See #${p.rank} Pick</a>
              </div>
            </div>
          </div>
        </article>
      `).join('')}
    </section>`;

  const content = hero + '<div class="container" style="padding: 2rem 1rem;">' + topPicks + comparison + allReviews + '</div>';

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
  const inner = `
    <div class="card-grid">
      ${guides.map(g => `
        <article class="post-card">
          <h3 class="post-title"><a href="/guides/${g.slug}/" class="btn-link">${g.title}</a></h3>
          <p class="post-excerpt">${g.summary}</p>
          <div style="margin-top:auto; display:flex; justify-content:flex-end;">
            <a href="/guides/${g.slug}/" class="btn btn-primary" style="padding:.6rem 1rem;">Read Guide</a>
          </div>
        </article>
      `).join('')}
    </div>`;
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
  const inner = `
    <div class="card-grid">
      ${blogPosts.map(p => `
        <article class="post-card">
          <h3 class="post-title"><a href="/blog/${p.slug}/" class="btn-link">${p.title}</a></h3>
          <div class="post-meta">${p.author} • ${p.date}</div>
          <p class="post-excerpt">${p.summary}</p>
          <div style="margin-top:auto; display:flex; justify-content:flex-end;">
            <a href="/blog/${p.slug}/" class="btn btn-primary" style="padding:.6rem 1rem;">Read Article</a>
          </div>
        </article>
      `).join('')}
    </div>`;
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
