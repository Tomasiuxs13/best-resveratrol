import React from 'react';
import type { Product } from '../../types';

interface ProductDetailPageProps {
  product: Product;
  onNavigate: (path: string) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onNavigate }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 text-sm text-gray-600">
        <button
          onClick={() => onNavigate('/')}
          className="hover:text-purple-600 transition-colors"
        >
          Home
        </button>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{product.brand} {product.name}</span>
      </nav>

      {/* Product Header */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-gray-50 rounded-lg p-8">
            <img
              src={product.image}
              alt={`${product.brand} ${product.name}`}
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            {/* Rank Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold rounded-full shadow-lg">
                #{product.rank} {product.bestFor}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {product.brand} {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 text-xl">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>
                    {i < Math.floor(product.rating) ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <span className="ml-2 text-gray-600 font-semibold">{product.rating}/5</span>
            </div>

            {/* Key Details */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-600 font-medium">Potency:</span>
                <span className="text-gray-900 font-semibold">{product.potency}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-600 font-medium">Serving Size:</span>
                <span className="text-gray-900 font-semibold">{product.servingSize}</span>
              </div>
            </div>

            {/* Certifications */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Certifications:</h3>
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((cert, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full border border-green-200"
                  >
                    ✓ {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <a
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Buy Now →
            </a>
            <p className="text-xs text-gray-500 text-center mt-2">
              We may earn a commission from qualifying purchases
            </p>
          </div>
        </div>
      </div>

      {/* Product Summary */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Overview</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          {product.summary}
        </p>
      </div>

      {/* Pros and Cons */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Pros */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center">
            <span className="text-2xl mr-2">✓</span>
            Pros
          </h3>
          <ul className="space-y-3">
            {product.pros.map((pro, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 font-bold mr-2 mt-1">+</span>
                <span className="text-gray-700">{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center">
            <span className="text-2xl mr-2">⚠</span>
            Cons
          </h3>
          <ul className="space-y-3">
            {product.cons.map((con, index) => (
              <li key={index} className="flex items-start">
                <span className="text-red-500 font-bold mr-2 mt-1">-</span>
                <span className="text-gray-700">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Why Choose This Product */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-8 mb-8 border border-purple-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Why Choose {product.brand} {product.name}?
        </h2>
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            {product.brand} {product.name} is ranked <strong>#{product.rank}</strong> in our comprehensive review
            of the best resveratrol supplements for 2025. This product stands out as the <strong>{product.bestFor}</strong> option,
            with a rating of <strong>{product.rating}/5</strong>.
          </p>
          <p>
            With {product.potency}, this supplement provides a potent dose of bioavailable resveratrol
            to support your health and longevity goals. The {product.servingSize.toLowerCase()} serving size makes it
            easy to incorporate into your daily routine.
          </p>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Experience the Benefits?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust {product.brand} for their resveratrol supplementation needs.
        </p>
        <a
          href={product.affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-12 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Buy {product.brand} {product.name} →
        </a>
        <p className="text-xs text-gray-500 mt-4">
          Affiliate Disclosure: We may earn a commission from qualifying purchases
        </p>
      </div>

      {/* Back to All Products */}
      <div className="mt-8 text-center">
        <button
          onClick={() => onNavigate('/')}
          className="text-purple-600 hover:text-purple-700 font-semibold hover:underline"
        >
          ← Back to All Products
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
