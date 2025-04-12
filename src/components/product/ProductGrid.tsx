'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { productApi } from '@/lib/api';

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

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                // In a real app, you'd pass these filters to your API
                // For now, we'll simulate filtering on the client side with mock data
                let data = await productApi.getAll();

                // Mock filtering
                if (category) {
                    data = data.filter((product: Product) =>
                        product.category.toLowerCase() === category.toLowerCase()
                    );
                }

                if (collection) {
                    data = data.filter((product: Product) =>
                        product.collection?.toLowerCase() === collection.toLowerCase()
                    );
                }

                // Mock sorting
                if (sort) {
                    switch (sort) {
                        case 'price_asc':
                            data.sort((a: Product, b: Product) => a.price - b.price);
                            break;
                        case 'price_desc':
                            data.sort((a: Product, b: Product) => b.price - a.price);
                            break;
                        case 'newest':
                            // Assuming there's a createdAt field in a real app
                            // Here we just reverse the array as a simple simulation
                            data.reverse();
                            break;
                    }
                }

                setProducts(data);
            } catch (err) {
                console.error('Failed to fetch products:', err);
                setError('Failed to load products. Please try again later.');

                // For development, use mock data if API fails
                setProducts([
                    {
                        id: '1',
                        name: 'Leather Handbag',
                        price: 2800,
                        image: '/images/product1.jpg',
                        category: 'Bags',
                        collection: 'Autumn',
                    },
                    {
                        id: '2',
                        name: 'Silk Scarf',
                        price: 450,
                        image: '/images/product2.jpg',
                        category: 'Accessories',
                        collection: 'Spring',
                    },
                    {
                        id: '3',
                        name: 'Leather Belt',
                        price: 680,
                        image: '/images/product3.jpg',
                        category: 'Accessories',
                        collection: 'Timeless',
                    },
                    {
                        id: '4',
                        name: 'Cashmere Sweater',
                        price: 1200,
                        image: '/images/product4.jpg',
                        category: 'Clothing',
                        collection: 'Autumn',
                    },
                    {
                        id: '5',
                        name: 'Porcelain Vase',
                        price: 980,
                        image: '/images/product5.jpg',
                        category: 'Home',
                        collection: 'Timeless',
                    },
                    {
                        id: '6',
                        name: 'Gold Bracelet',
                        price: 3200,
                        image: '/images/product6.jpg',
                        category: 'Jewelry',
                        collection: 'Limited Edition',
                    },
                    {
                        id: '7',
                        name: 'Wool Blanket',
                        price: 750,
                        image: '/images/product7.jpg',
                        category: 'Home',
                        collection: 'Autumn',
                    },
                    {
                        id: '8',
                        name: 'Leather Wallet',
                        price: 520,
                        image: '/images/product8.jpg',
                        category: 'Accessories',
                        collection: 'Timeless',
                    },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category, collection, sort]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                        <div className="bg-gray-200 h-80 mb-4"></div>
                        <div className="bg-gray-200 h-6 w-3/4 mb-2"></div>
                        <div className="bg-gray-200 h-4 w-1/4"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-lg text-gray-700">No products found matching your criteria.</p>
                <button
                    onClick={() => window.history.back()}
                    className="mt-4 text-sm underline text-gray-600 hover:text-black"
                >
                    Go back
                </button>
            </div>
        );
    }

    return (
        <>
            <p className="text-sm text-gray-600 mb-6">{products.length} products</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {products.map((product) => (
                    <Link key={product.id} href={`/product/${product.id}`} className="group">
                        <div className="relative h-80 mb-4 overflow-hidden">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <h3 className="text-lg font-light mb-1">{product.name}</h3>
                        <p className="text-gray-700">${product.price.toLocaleString()}</p>
                    </Link>
                ))}
            </div>
        </>
    );
}