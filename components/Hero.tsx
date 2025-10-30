import React from 'react';

const Hero: React.FC = () => {
    const lastUpdatedDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
    });

    const handleScrollToProduct = () => {
        const productElement = document.querySelector('#product-1');
        if (productElement) {
            productElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16 md:py-24">
            {/* Circular Background Pattern - matching screenshot */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute inset-0 rounded-full border-2 border-gray-400"
                            style={{
                                transform: `scale(${1 - i * 0.15})`,
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left side - Text content */}
                    <div className="text-left">
                        <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-4 tracking-tight">
                            TOP 10<br />
                            RESVERATROL<br />
                            SUPPLEMENTS
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
                            Unlock Your Longevity Potential: An Expert Review of 2025's Best.
                        </p>
                        <button
                            onClick={handleScrollToProduct}
                            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-10 rounded-lg text-lg shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                            See #1 Pick
                        </button>
                        <div className="mt-8 text-sm text-gray-500 space-y-1">
                            <p className="font-semibold">Last Updated: {lastUpdatedDate}</p>
                            <p>
                                <span className="font-semibold">Affiliate Disclosure:</span> We may earn a commission from qualifying purchases.
                            </p>
                        </div>
                    </div>

                    {/* Right side - Product showcase */}
                    <div className="relative flex justify-center md:justify-end">
                        {/* Background decorative circle */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[400px] h-[400px] bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-[40px] transform rotate-12 opacity-30"></div>
                        </div>

                        {/* Product card */}
                        <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-md transform hover:scale-105 transition-all duration-300">
                            <div className="bg-gray-100 rounded-2xl p-6 mb-4">
                                <img
                                    src="https://picsum.photos/seed/partiqlar/400/400"
                                    alt="PartiQlar Pure Resveratrol"
                                    className="w-full h-64 object-contain"
                                />
                            </div>
                            <div className="text-center mb-4">
                                <span className="inline-block bg-pink-100 text-pink-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
                                    ≥99% Pure
                                </span>
                                <h3 className="text-2xl font-bold text-gray-900">PartiQlar RESVERATROL</h3>
                                <p className="text-sm text-gray-600">500mg Ultra-High Purity<br />60 Capsules</p>
                            </div>
                            <a
                                href="https://partiqlar.com/products/pure-resveratrol-60-capsules?variant=42593106296941"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 rounded-2xl text-center transition-all duration-300 shadow-lg"
                            >
                                Check Price
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
