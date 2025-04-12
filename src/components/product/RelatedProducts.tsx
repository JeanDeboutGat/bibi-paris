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

type RelatedProductsProps = {
    currentProductId: string;
    category: string;
};

export default function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                setLoading(true);

                // In a real app, you'd have a specific endpoint for related products
                // For now, we'll get products by category and filter out the current one
                const data = await productApi.getByCategory(category);

                // Filter out the current product and limit to 4 items
                const relatedProducts = data
                    .filter((product: Product) => product.id !== currentProductId)
                    .slice(0, 4);

                setProducts(relatedProducts);
            } catch (err) {
                console.error('Failed to fetch related products:', err);

                // For development, use mock data if API fails
                setProducts([
                    {
                        id: '2',
                        name: 'Silk Scarf',
                        price: 450,
                        image: '/images/product2.jpg',
                        category: category,
                    },
                    {
                        id: '3',
                        name: 'Leather Belt',
                        price: 680,
                        image: '/images/product3.jpg',
                        category: category,
                    },
                    {
                        id: '5',
                        name: 'Porcelain Vase',
                        price: 980,
                        image: '/images/product5.jpg',
                        category: category,
                    },
                    {
                        id: '8',
                        name: 'Leather Wallet',
                        price: 520,
                        image: '/images/product8.jpg',
                        category: category,
                    },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchRelatedProducts();
    }, [currentProductId, category]);

    if (loading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[...Array(4)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                        <div className="bg-gray-200 h-64 mb-4"></div>
                        <div className="bg-gray-200 h-5 w-3/4 mb-2"></div>
                        <div className="bg-gray-200 h-4 w-1/4"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {products.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} className="group">
                    <div className="relative h-64 mb-4 overflow-hidden">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                    <h3 className="text-base font-light mb-1">{product.name}</h3>
                    <p className="text-gray-700">${product.price.toLocaleString()}</p>
                </Link>
            ))}
        </div>
    );
}