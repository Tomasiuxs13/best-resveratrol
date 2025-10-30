import React from 'react';
import type { Product } from '../types';

const TopPickCard: React.FC<{ product: Product, label: string, badgeColor: string }> = ({ product, label, badgeColor }) => (
    <div className="relative border-2 border-gray-200 rounded-2xl p-6 text-center shadow-xl bg-white transform hover:scale-105 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:border-blue-300">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className={`text-xs font-bold text-white ${badgeColor} px-5 py-2 rounded-full shadow-md uppercase tracking-wide`}>{label}</span>
        </div>
        <div className="mt-4">
            <img
                src={product.image}
                alt={`${product.brand} ${product.name} - Top Rated Resveratrol Supplement`}
                className="w-36 h-36 mx-auto my-4 object-contain drop-shadow-lg"
                loading="lazy"
                width="144"
                height="144"
            />
            <h3 className="font-bold text-gray-900 text-xl mb-1">{product.brand}</h3>
            <p className="text-sm text-gray-600 mb-4 min-h-[40px]">{product.name}</p>
        </div>
        <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="mt-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all duration-300 w-full shadow-md hover:shadow-lg">
            Check Price
        </a>
    </div>
);

interface TopPicksProps {
    products: Product[];
}

const TopPicks: React.FC<TopPicksProps> = ({ products }) => {
    if (products.length < 3) return null;

    const topPicks = [
        { product: products[0], label: products[0].bestFor, badgeColor: "bg-gradient-to-r from-amber-500 to-yellow-500" },
        { product: products[1], label: products[1].bestFor, badgeColor: "bg-gradient-to-r from-purple-500 to-pink-500" },
        { product: products[2], label: products[2].bestFor, badgeColor: "bg-gradient-to-r from-blue-500 to-cyan-500" },
    ];

    return (
        <section id="top-picks" className="my-12 scroll-mt-24">
             <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Our 2025 Top Picks
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
                {topPicks.map(pick => (
                    <TopPickCard key={pick.product.id} {...pick} />
                ))}
            </div>
        </section>
    );
};

export default TopPicks;
