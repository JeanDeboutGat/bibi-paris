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
};

export default function FeaturedProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                setLoading(true);
                // In a real app, you'd have a specific endpoint for featured products
                const data = await productApi.getAll();
                // For now, just take the first 4 products
                setProducts(data.slice(0, 4));
            } catch (err) {
                console.error('Failed to fetch featured products:', err);
                setError('Failed to load featured products. Please try again later.');

                // For development, use mock data if API fails
                setProducts([
                    {
                        id: '1',
                        name: 'Leather Handbag',
                        price: 2800,
                        image: '/images/product1.jpg',
                        category: 'Bags',
                    },
                    {
                        id: '2',
                        name: 'Silk Scarf',
                        price: 450,
                        image: '/images/product2.jpg',
                        category: 'Accessories',
                    },
                    {
                        id: '3',
                        name: 'Leather Belt',
                        price: 680,
                        image: '/images/product3.jpg',
                        category: 'Accessories',
                    },
                    {
                        id: '4',
                        name: 'Cashmere Sweater',
                        price: 1200,
                        image: '/images/product4.jpg',
                        category: 'Clothing',
                    },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[...Array(4)].map((_, index) => (
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

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
    );
}