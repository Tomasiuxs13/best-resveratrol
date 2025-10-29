import React from 'react';
import type { Product } from '../types';

const TopPickCard: React.FC<{ product: Product, label: string, badgeColor: string }> = ({ product, label, badgeColor }) => (
    <div className="border rounded-xl p-6 text-center shadow-lg bg-white transform hover:scale-105 transition-transform duration-300 flex flex-col justify-between">
        <div>
            <span className={`text-sm font-bold text-white ${badgeColor} px-4 py-1.5 rounded-full`}>{label}</span>
            <img src={product.image} alt={product.name} className="w-32 h-32 mx-auto my-4 object-contain" />
            <h3 className="font-bold text-gray-800 text-lg">{product.brand}</h3>
            <p className="text-sm text-gray-600 mb-4">{product.name}</p>
        </div>
        <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="mt-4 bg-orange-500 text-white font-bold py-3 px-4 rounded-lg text-sm hover:bg-orange-600 transition-colors w-full">
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
        { product: products[0], label: "Best Overall", badgeColor: "bg-gradient-to-r from-amber-500 to-yellow-400" },
        { product: products[1], label: "Premium Choice", badgeColor: "bg-gradient-to-r from-slate-500 to-gray-500" },
        { product: products[2], label: "Best Value", badgeColor: "bg-gradient-to-r from-green-600 to-emerald-500" },
    ];

    return (
        <section id="top-picks" className="my-12 scroll-mt-24">
             <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Our 2024 Top Picks
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
