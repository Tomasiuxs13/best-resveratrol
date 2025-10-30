
import React from 'react';
import type { Product } from '../types';
import { StarIcon, CheckCircleIcon, XCircleIcon, ShieldCheckIcon } from './IconComponents';

interface ProductCardProps {
  product: Product;
  onNavigate?: (path: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate }) => {
  const renderStars = (rating: number) => {
    const numericRating = typeof rating === 'number' ? rating : 0;
    const stars = [];
    const fullStars = Math.floor(numericRating);
    const hasHalfStar = numericRating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={`full-${i}`} className="w-5 h-5 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <StarIcon className="w-5 h-5 text-gray-300" />
          <div className="absolute top-0 left-0 overflow-hidden w-1/2">
            <StarIcon className="w-5 h-5 text-yellow-400" />
          </div>
        </div>
      );
    }
    
    const emptyStars = 5 - Math.ceil(numericRating);
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<StarIcon key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }

    return stars;
  };

  const badgeColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-amber-500 to-yellow-400 text-white';
    if (rank === 2) return 'bg-gradient-to-r from-slate-400 to-gray-400 text-white';
    if (rank === 3) return 'bg-gradient-to-r from-orange-600 to-amber-500 text-white';
    return 'bg-gray-200 text-gray-700';
  };

  return (
    <article id={`product-${product.rank}`} className="bg-white rounded-xl shadow-lg overflow-hidden my-8 border-2 border-transparent hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1">
      <div className="md:flex">
        <div className="md:w-1/3 p-4 flex flex-col items-center justify-center bg-gray-50">
          <div className={`relative w-24 h-24 flex items-center justify-center rounded-full text-3xl font-bold mb-4 ${badgeColor(product.rank)}`}>
            #{product.rank}
          </div>
          <img className="h-48 w-full object-contain md:h-full md:w-48 rounded-lg" src={product.image} alt={`Image of ${product.name}`} />
        </div>
        <div className="md:w-2/3 p-6 flex flex-col">
          <div className="flex-grow">
            <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">{product.bestFor}</div>
            <h2 className="block mt-1 text-2xl leading-tight font-bold text-black">{product.brand} - {product.name}</h2>
            <p className="mt-2 text-gray-600">{product.summary}</p>
            <div className="mt-4 flex items-center">
              <div className="flex items-center">{renderStars(product.rating)}</div>
              <span className="ml-2 text-gray-600 font-semibold">{(product.rating || 0).toFixed(1)} / 5.0</span>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Pros</h3>
                    <ul className="space-y-2">
                        {(product.pros || []).map((pro, index) => (
                            <li key={index} className="flex items-start">
                                <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span>{pro}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                 <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Cons</h3>
                    <ul className="space-y-2">
                        {(product.cons || []).map((con, index) => (
                            <li key={index} className="flex items-start">
                                <XCircleIcon className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span>{con}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {product.certifications && product.certifications.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Quality & Certifications</h3>
                    <div className="flex flex-wrap gap-2">
                        {product.certifications.map((cert, index) => (
                            <span key={index} className="flex items-center text-xs bg-green-100 text-green-800 font-medium px-2.5 py-1 rounded-full">
                                <ShieldCheckIcon className="w-4 h-4 mr-1.5" />
                                {cert}
                            </span>
                        ))}
                    </div>
                </div>
            )}
          </div>
          <div className="mt-6 space-y-3">
            {onNavigate && (
              <button
                onClick={() => onNavigate(`/products/${product.slug}`)}
                className="block w-full text-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                View Full Review →
              </button>
            )}
            <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
              Buy Now - See #{product.rank} Pick
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;