# Luxury E-commerce Frontend

## API Integration

This application supports two data modes:

1. **Mock Data Mode**: Uses local mock data for development without a backend
2. **Real API Mode**: Connects to a real NestJS+Prisma backend

### Environment Variables

Copy `.env.local.example` to `.env.local` and adjust the values:

```
# Use mock data (true) or real API (false)
NEXT_PUBLIC_USE_MOCK=true

# Base URL for the real API backend
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

### API Error Handling

The application includes a comprehensive error handling system:

- Custom API error classes with specific error types
- Standardized error messages for different API responses
- Error message components for both inline and full-page errors
- Fallbacks to mock data during development

### API Endpoints

When implementing the backend, create the following endpoints to match the frontend expectations:

#### Products API
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID 
- `GET /api/products/related?category=X&excludeId=Y` - Get related products
- `GET /api/products/category/:category` - Get products by category

#### Orders API
- `POST /api/orders` - Create a new order
- `GET /api/orders/status?orderId=X&email=Y` - Get order status 