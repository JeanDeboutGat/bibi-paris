// Basic product API interface

import {OrderStatusDetail, ProductCategory} from '@/types';

interface Product {
    id: string;
    name: string;
    description: string;
    image: string;
    category: ProductCategory;
    price: number;
}

// Order interface
interface OrderData {
    customer: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    };
    shipping: {
        address: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    items: {
        productId: string;
        name: string;
        price: number;
        quantity: number;
    }[];
    payment: {
        method: string;
    };
    totals: {
        subtotal: number;
        tax: number;
        total: number;
    };
}

// Product API service
export const productApi = {
    // Get all products with local images
    async getAll(): Promise<Product[]> {
        // Use local images for each category
        return [
            // Handmade pieces
            {
                id: 'handmades-1',
                name: 'Handcrafted Wooden Goblet',
                description: 'description',
                price: 299.99,
                image: '/images/handmades/gobolet.jpg',
                category: 'handmades',
            },
            {
                id: 'handmades-2',
                name: 'Artisanal Wooden Pullover',
                price: 449.99,
                image: '/images/handmades/pull.jpg',
                category: 'handmades',
                description: 'description',

            },
            {
                id: 'handmades-3',
                name: 'Handcrafted Wooden Cushion',
                price: 189.99,
                image: '/images/handmades/cousin.jpg',
                category: 'handmades',
                description: 'description',

            },
            {
                id: 'handmades-4',
                name: 'Artisanal Wooden Bag',
                price: 499.99,
                image: '/images/handmades/sac.jpg',
                category: 'handmades',
                description: 'description',

            },

            // Second-hand items
            {
                id: 'secondHands-1',
                name: 'Vintage Wooden Table',
                price: 899.99,
                image: '/images/secondHands/table.jpg',
                category: 'secondHands',
                description: 'description',

            },
            {
                id: 'secondHands-2',
                name: 'Antique Wooden Chair',
                price: 599.99,
                image: '/images/secondHands/chair.jpg',
                category: 'secondHands',
                description: 'description',

            },
            {
                id: 'secondHands-3',
                name: 'Vintage Dark Chair',
                price: 649.99,
                image: '/images/secondHands/chairdark.jpg',
                category: 'secondHands',
                description: 'description',

            },
            {
                id: 'secondHands-4',
                name: 'Compact Wooden Chair',
                price: 549.99,
                image: '/images/secondHands/smallChair.jpg',
                category: 'secondHands',
                description: 'description',

            },

            // Paintings
            {
                id: 'paintings-1',
                name: 'Portrait Painting',
                price: 1299.99,
                image: '/images/paintings/girl.jpg',
                category: 'paintings',
                description: 'description',

            },
            {
                id: 'paintings-2',
                name: 'Garden Gate Artwork',
                price: 1499.99,
                image: '/images/paintings/gate.jpg',
                category: 'paintings',
                description: 'description',

            },
            {
                id: 'paintings-3',
                name: 'Children Portrait',
                price: 1199.99,
                image: '/images/paintings/girl-boy.jpg',
                category: 'paintings',
                description: 'description',

            },
            {
                id: 'paintings-4',
                name: 'Floral Artwork',
                price: 999.99,
                image: '/images/paintings/flower.jpg',
                category: 'paintings',
                description: 'description',

            },

            // Decorative objects
            {
                id: 'decoratives-1',
                name: 'Elegant Wooden Vase',
                price: 249.99,
                image: '/images/decoratives/vase.jpg',
                category: 'decoratives',
                description: 'description',

            },
            {
                id: 'decoratives-2',
                name: 'Decorative Wooden Pot',
                price: 199.99,
                image: '/images/decoratives/pot.jpg',
                category: 'decoratives',
                description: 'description',

            },
            {
                id: 'decoratives-3',
                name: 'Wooden Flower Sculpture',
                price: 159.99,
                image: '/images/decoratives/flower.jpg',
                category: 'decoratives',
                description: 'description',

            },
            {
                id: 'decoratives-4',
                name: 'Modern Wooden Vase',
                price: 279.99,
                image: '/images/decoratives/alexandra-gorn-W5dsm9n6e3g-unsplash.jpg',
                category: 'decoratives',
                description: 'description',

            },
        ];
    },
    // Get product by ID
    async getById(id: string): Promise<Product> {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Get all products
        const allProducts = await this.getAll();

        // Find the requested product
        const product = allProducts.find((p) => p.id === id);

        if (product) {
            return {
                ...product,
                description:
                    'This exquisite handcrafted piece embodies our commitment to quality craftsmanship and timeless design. Made from sustainably sourced materials and shaped with traditional techniques, it represents the perfect blend of functionality and artistry that defines our collection.',
            };
        }

        // Fallback if product not found
        return {
            id,
            name: 'Luxury Product',
            description: 'High-end luxury product with premium materials.',
            image: '/images/handmades/gobolet.jpg',
            category: 'handmades',
            price: 999.99,
        };
    },

    // Get related products
    async getRelated(category: string, excludeId: string): Promise<Product[]> {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Get all products
        const allProducts = await this.getAll();

        // Filter products by category and exclude the current product
        const relatedProducts = allProducts
            .filter((p) => p.category === category && p.id !== excludeId)
            // Add description field for each product
            .map((p) => ({
                ...p,
                description:
                    'A beautifully crafted piece from our exclusive collection.',
            }))
            // Limit to 4 related products
            .slice(0, 4);

        return relatedProducts;
    },

    // Get products by category
    async getByCategory(category: ProductCategory): Promise<Product[]> {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Return mock products for the category
        return Array(6)
            .fill(null)
            .map((_, i) => ({
                id: `cat-${i}`,
                name: `${category.charAt(0).toUpperCase() + category.slice(1)} Item ${i + 1}`,
                description: `Quality ${category} product`,
                image: '/images/product-placeholder.jpg',
                category,
                price: 599.99 + i * 150,
            }));
    },
};

// Order API service
export const orderApi = {
    // Create a new order
    async create(orderData: OrderData): Promise<{ orderId: string }> {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Log the order data (for development purposes)
        console.log('Order created:', orderData);

        // Return a mock order ID
        return {
            orderId: `ORD-${Date.now()}`,
        };
    },

    async getStatus(orderId: string, email: string): Promise<OrderStatusDetail> {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Log the order data (for development purposes)
        console.log('Order id fetched:', orderId, 'for email', email);

        // Return a mock order ID
        return {
            orderId: 'ORD123456789',
            status: 'shipped',
            estimatedDelivery: '2025-04-18',
            trackingNumber: '1Z999AA10123456784',
            trackingUrl: 'https://tracking.example.com/1Z999AA10123456784',
            items: [
                {name: 'LUXE Leather Handbag', quantity: 1},
                {name: 'Gold-Plated Bracelet', quantity: 2},
            ],
            shippingAddress: {
                address: '123 Luxury Blvd',
                city: 'Beverly Hills',
                state: 'CA',
                zipCode: '90210',
                country: 'USA',
            },
            timeline: [
                {
                    status: 'processing',
                    date: '2025-04-10T10:15:00Z',
                    description: 'Your order is being prepared.',
                },
                {
                    status: 'shipped',
                    date: '2025-04-11T14:30:00Z',
                    description: 'Your order has been shipped.',
                },
            ],
        };
    },
};

//await orderApi.getStatus(orderId, email);
