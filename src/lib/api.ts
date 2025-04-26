// Basic product API interface

import { orderProvider, productProvider } from './dataProviders';

// Order interface

// Product API service
export const productApi = productProvider;

// Order API service
export const orderApi = orderProvider;

//await orderApi.getStatus(orderId, email);
