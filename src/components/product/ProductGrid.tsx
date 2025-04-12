'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocalCartStore } from '@/lib/store';

type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    collection?: string;
};

type ProductGridProps = {
    category?: string;
    collection?: string;
    sort?: string;
};

export default function ProductGrid({ category, collection, sort }: ProductGridProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
    const { addItem } = useLocalCartStore();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                // For development purposes, use mock data directly instead of API call
                // that would likely fail without a backend
                
                // Use actual image filenames based on category
                const mockImages = {
                    handmades: ['/images/handmades/gobolet.jpg', '/images/handmades/pull.jpg', '/images/handmades/cousin.jpg', '/images/handmades/sac.jpg'],
                    secondHands: ['/images/secondHands/table.jpg', '/images/secondHands/chair.jpg', '/images/secondHands/chairdark.jpg', '/images/secondHands/smallChair.jpg', '/images/secondHands/chair-fonce.jpg'],
                    paintings: ['/images/paintings/girl.jpg', '/images/paintings/gate.jpg', '/images/paintings/girl-boy.jpg', '/images/paintings/flower.jpg'],
                    decoratives: ['/images/decoratives/vase.jpg', '/images/decoratives/pot.jpg', '/images/decoratives/flower.jpg', '/images/decoratives/alexandra-gorn-W5dsm9n6e3g-unsplash.jpg'],
                };

                // Create mock data for all categories
                let data: Product[] = [];
                
                // Only generate products for the selected category, or all categories if none selected
                const categoriesToGenerate = category 
                    ? [category] 
                    : ['handmades', 'secondHands', 'paintings', 'decoratives'];
                
                categoriesToGenerate.forEach(cat => {
                    const categoryImages = mockImages[cat as keyof typeof mockImages];
                    if (categoryImages) {
                        const categoryProducts = Array.from({ length: 4 }, (_, i) => ({
                            id: `${cat}-${i + 1}`,
                            name: `${cat === 'handmades' ? 'Handcrafted' : 
                                cat === 'secondHands' ? 'Vintage' : 
                                cat === 'paintings' ? 'Artwork' : 'Decorative'} Piece ${i + 1}`,
                            price: Math.floor(Math.random() * 3000) + 500,
                            image: categoryImages[i % categoryImages.length],
                            category: cat,
                            collection: i % 2 === 0 ? 'signature' : 'spring',
                        }));
                        data = [...data, ...categoryProducts];
                    }
                });

                // Filter by collection if specified
                if (collection) {
                    data = data.filter(product => 
                        product.collection?.toLowerCase() === collection.toLowerCase()
                    );
                }

                // Sort products
                if (sort) {
                    switch (sort) {
                        case 'price_asc':
                            data.sort((a, b) => a.price - b.price);
                            break;
                        case 'price_desc':
                            data.sort((a, b) => b.price - a.price);
                            break;
                        case 'newest':
                            data.reverse();
                            break;
                    }
                }

                setProducts(data);
            } catch (err) {
                console.error('Failed to fetch products:', err);
                setError('Failed to load products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category, collection, sort]);

    const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
        e.preventDefault();
        e.stopPropagation();
        
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
        });

        // Trigger subtle bounce animation on cart icon
        document.querySelector('.cart-icon')?.classList.add('animate-subtle-bounce');
        setTimeout(() => {
            document.querySelector('.cart-icon')?.classList.remove('animate-subtle-bounce');
        }, 500);
    };

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                        <div className="bg-luxury-cream h-96 mb-4"></div>
                        <div className="bg-luxury-cream h-6 w-3/4 mb-2"></div>
                        <div className="bg-luxury-cream h-4 w-1/4"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12 text-luxury-charcoal">
                <p className="text-lg mb-4">{error}</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="btn-secondary"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-lg text-luxury-charcoal/80 mb-6">No products found matching your criteria.</p>
                <button
                    onClick={() => window.history.back()}
                    className="btn-secondary"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <>
            <p className="text-sm text-luxury-charcoal/60 mb-8 font-light tracking-wide">
                {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {products.map((product) => (
                    <Link 
                        key={product.id} 
                        href={`/product/${product.id}`} 
                        className="group focus-visible"
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                    >
                        <div className="relative h-96 mb-4 overflow-hidden">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-all duration-2000 group-hover:scale-105"
                            />
                            
                            {/* Add to cart button overlay */}
                            <div 
                                className={`absolute inset-0 bg-black bg-opacity-20 flex items-end justify-center transition-opacity duration-300 ${
                                    hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                <button 
                                    onClick={(e) => handleQuickAdd(e, product)}
                                    className="bg-white text-luxury-charcoal mb-6 py-3 px-6 text-sm uppercase tracking-wider hover:bg-luxury-cream transition-colors duration-300 focus-visible"
                                    aria-label={`Quick add ${product.name} to cart`}
                                >
                                    Quick Add
                                </button>
                            </div>
                        </div>
                        <div className="transition-all duration-300 group-hover:translate-x-2">
                            <h3 className="font-serif text-lg mb-2 group-hover:text-luxury-sienna transition-colors duration-300">{product.name}</h3>
                            <p className="text-luxury-charcoal/80">${product.price.toLocaleString()}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}