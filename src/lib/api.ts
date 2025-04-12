// Basic product API interface
interface Product {
    id: string;
    name: string;
    description: string;
    image: string;
    category: string;
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
    // Get product by ID
    async getById(id: string): Promise<Product> {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // For now, return mock data
        return {
            id,
            name: 'Luxury Product',
            description: 'High-end luxury product with premium materials',
            image: '/images/product-placeholder.jpg',
            category: 'accessories',
            price: 999.99
        };
    },

    // Get related products
    async getRelated(category: string, excludeId: string): Promise<Product[]> {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Return mock related products and filter out the excluded ID
        return Array(4).fill(null).map((_, i) => ({
            id: `related-${i}`,
            name: `Related Product ${i+1}`,
            description: 'Another luxury item you might like',
            image: '/images/product-placeholder.jpg',
            category,
            price: 799.99 + (i * 100)
        })).filter(product => product.id !== excludeId);
    },
    
    // Get products by category
    async getByCategory(category: string): Promise<Product[]> {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Return mock products for the category
        return Array(6).fill(null).map((_, i) => ({
            id: `cat-${i}`,
            name: `${category.charAt(0).toUpperCase() + category.slice(1)} Item ${i+1}`,
            description: `Quality ${category} product`,
            image: '/images/product-placeholder.jpg',
            category,
            price: 599.99 + (i * 150)
        }));
    }
};

// Order API service
export const orderApi = {
    // Create a new order
    async create(orderData: OrderData): Promise<{ orderId: string }> {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Log the order data (for development purposes)
        console.log('Order created:', orderData);
        
        // Return a mock order ID
        return {
            orderId: `ORD-${Date.now()}`
        };
    }
};