
import React from 'react';
import type { Product } from '../types';
import { StarIcon } from './IconComponents';

interface ComparisonTableProps {
  products: Product[];
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ products }) => {
  return (
    <section id="comparison-table" className="my-16">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Top Resveratrol Supplements at a Glance
      </h2>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">Rank</th>
                <th scope="col" className="px-6 py-3">Product</th>
                <th scope="col" className="px-6 py-3 text-center">Rating</th>
                <th scope="col" className="px-6 py-3">Potency</th>
                <th scope="col" className="px-6 py-3">Best For</th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 5).map((product, index) => ( // Show top 5 for brevity
                <tr key={product.id} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="px-6 py-4 font-bold text-lg text-gray-900">{product.rank}</td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <div className="flex items-center">
                        <img src={product.image} alt={product.name} className="w-10 h-10 rounded-full object-contain mr-4"/>
                        <div>
                            <div>{product.brand}</div>
                            <div className="text-xs text-gray-500">{product.name}</div>
                        </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                      {(product.rating || 0).toFixed(1)}
                    </div>
                  </td>
                  <td className="px-6 py-4">{product.potency}</td>
                  <td className="px-6 py-4">{product.bestFor}</td>
                  <td className="px-6 py-4 text-right">
                    <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-2 transition-colors">
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;