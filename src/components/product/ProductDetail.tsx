'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/lib/store';

type ProductDetailProps = {
    product: {
        id: string;
        name: string;
        price: number;
        description: string;
        details: string[];
        images: string[];
        category: string;
    };
};

export default function ProductDetail({ product }: ProductDetailProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
        });

        setIsAddedToCart(true);

        // Reset the "Added to cart" message after 3 seconds
        setTimeout(() => {
            setIsAddedToCart(false);
        }, 3000);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
                <div className="relative h-[500px] mb-4">
                    <Image
                        src={product.images[selectedImage]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Thumbnail Gallery */}
                {product.images.length > 1 && (
                    <div className="grid grid-cols-5 gap-2">
                        {product.images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`relative h-20 ${
                                    selectedImage === index ? 'ring-2 ring-black' : 'opacity-70 hover:opacity-100'
                                }`}
                            >
                                <Image
                                    src={image}
                                    alt={`${product.name} - view ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div>
                <h1 className="text-3xl font-light mb-2">{product.name}</h1>
                <p className="text-xl text-gray-800 mb-6">${product.price.toLocaleString()}</p>

                <div className="prose prose-sm mb-8">
                    <p>{product.description}</p>
                </div>

                <button
                    onClick={handleAddToCart}
                    className={`w-full py-3 px-6 mb-4 text-sm tracking-wider transition-colors ${
                        isAddedToCart
                            ? 'bg-green-600 text-white'
                            : 'bg-black text-white hover:bg-gray-800'
                    }`}
                >
                    {isAddedToCart ? 'ADDED TO CART' : 'ADD TO CART'}
                </button>

                {/* Product Details */}
                <div className="mt-12">
                    <h2 className="text-lg font-medium mb-4">Details</h2>
                    <ul className="space-y-2">
                        {product.details.map((detail, index) => (
                            <li key={index} className="text-sm text-gray-700">
                                • {detail}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Shipping Info */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                    <h2 className="text-lg font-medium mb-4">Shipping & Returns</h2>
                    <p className="text-sm text-gray-700 mb-2">
                        Free shipping on all orders over $500.
                    </p>
                    <p className="text-sm text-gray-700">
                        Returns accepted within 14 days of delivery.
                    </p>
                </div>
            </div>
        </div>
    );
}