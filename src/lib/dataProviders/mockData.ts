import { Product, ProductListItem } from '@/types/product';

export const mockProducts: Product[] = [
  {
    id: 'handmades-1',
    name: 'Handcrafted Wooden Goblet',
    description:
      'This exquisite handcrafted piece embodies our commitment to quality craftsmanship and timeless design.',
    price: 299.99,
    images: [
      '/images/handmades/gobolet.jpg',
      '/images/handmades/sac.jpg',
      '/images/handmades/gobolet.jpg',
    ],
    category: 'handmades',
    inStock: true,
    sku: 'SKU-HANDMADES-1',
    details: [
      'Handcrafted from premium wood',
      'One-of-a-kind design',
      'Made in Paris',
    ],
  },
  {
    id: 'handmades-2',
    name: 'Artisanal Wooden Pullover',
    price: 449.99,
    images: [
      '/images/handmades/pull.jpg',
      '/images/handmades/pull.jpg',
      '/images/handmades/pull.jpg',
    ],
    category: 'handmades',
    description:
      'Blend of natural materials and expert craftsmanship for a truly unique piece.',
    inStock: true,
    sku: 'SKU-HANDMADES-2',
    details: [
      'Hand-stitched details',
      'Natural materials',
      'Sustainable production',
    ],
  },
  {
    id: 'handmades-3',
    name: 'Handcrafted Wooden Cushion',
    price: 189.99,
    images: [
      '/images/handmades/cousin.jpg',
      '/images/handmades/cousin.jpg',
      '/images/handmades/cousin.jpg',
    ],
    category: 'handmades',
    description: 'A comfortable and stylish addition to your living space.',
    inStock: true,
    sku: 'SKU-HANDMADES-3',
    details: [
      'Soft yet durable',
      'Hidden zipper closure',
      'Hypoallergenic filling',
    ],
  },
  {
    id: 'handmades-4',
    name: 'Artisanal Wooden Bag',
    price: 499.99,
    images: [
      '/images/handmades/sac.jpg',
      '/images/handmades/sac.jpg',
      '/images/handmades/sac.jpg',
    ],
    category: 'handmades',
    description:
      'A functional work of art that combines beauty and practicality.',
    inStock: true,
    sku: 'SKU-HANDMADES-4',
    details: [
      'Lightweight yet sturdy',
      'Multiple interior compartments',
      'Adjustable strap',
    ],
  },
  // Second-hand items
  {
    id: 'secondHands-1',
    name: 'Vintage Wooden Table',
    price: 899.99,
    images: [
      '/images/secondHands/table.jpg',
      '/images/secondHands/table.jpg',
      '/images/secondHands/table.jpg',
    ],
    category: 'secondHands',
    description: 'A beautifully preserved piece with decades of character.',
    inStock: true,
    sku: 'SKU-SECONDHANDS-1',
    details: [
      'Mid-century design',
      'Restored finish',
      'Solid wood construction',
    ],
  },
  {
    id: 'secondHands-2',
    name: 'Antique Wooden Chair',
    price: 599.99,
    images: [
      '/images/secondHands/chair.jpg',
      '/images/secondHands/chair.jpg',
      '/images/secondHands/chair.jpg',
    ],
    category: 'secondHands',
    description: 'Elegant seating with a storied past, carefully restored.',
    inStock: true,
    sku: 'SKU-SECONDHANDS-2',
    details: [
      'Original upholstery',
      'Hand-carved details',
      'Sturdy construction',
    ],
  },
  {
    id: 'secondHands-3',
    name: 'Vintage Dark Chair',
    price: 649.99,
    images: [
      '/images/secondHands/chairdark.jpg',
      '/images/secondHands/chairdark.jpg',
      '/images/secondHands/chairdark.jpg',
    ],
    category: 'secondHands',
    description:
      'A striking dark finish highlights the beautiful grain of this vintage chair.',
    inStock: true,
    sku: 'SKU-SECONDHANDS-3',
    details: [
      'Rich ebony finish',
      'Ergonomic design',
      'Carefully restored',
    ],
  },
  {
    id: 'secondHands-4',
    name: 'Compact Wooden Chair',
    price: 549.99,
    images: [
      '/images/secondHands/smallChair.jpg',
      '/images/secondHands/smallChair.jpg',
      '/images/secondHands/smallChair.jpg',
    ],
    category: 'secondHands',
    description:
      'Perfect for small spaces without sacrificing comfort or style.',
    inStock: true,
    sku: 'SKU-SECONDHANDS-4',
    details: [
      'Space-saving design',
      'Versatile use',
      'Solid hardwood construction',
    ],
  },
  // Paintings
  {
    id: 'paintings-1',
    name: 'Portrait Painting',
    price: 1299.99,
    images: [
      '/images/paintings/girl.jpg',
      '/images/paintings/girl.jpg',
      '/images/paintings/girl.jpg',
    ],
    category: 'paintings',
    description:
      'A captivating portrait that brings timeless elegance to any room.',
    inStock: true,
    sku: 'SKU-PAINTINGS-1',
    details: [
      'Original artwork',
      'Signed by the artist',
      'Custom framing available',
    ],
  },
  {
    id: 'paintings-2',
    name: 'Garden Gate Artwork',
    price: 1499.99,
    images: [
      '/images/paintings/gate.jpg',
      '/images/paintings/gate.jpg',
      '/images/paintings/gate.jpg',
    ],
    category: 'paintings',
    description:
      'Transport yourself to a serene garden with this evocative piece.',
    inStock: true,
    sku: 'SKU-PAINTINGS-2',
    details: ['Oil on canvas', 'Archival quality', 'UV-protective glazing'],
  },
  {
    id: 'paintings-3',
    name: 'Children Portrait',
    price: 1199.99,
    images: [
      '/images/paintings/girl-boy.jpg',
      '/images/paintings/girl-boy.jpg',
      '/images/paintings/girl-boy.jpg',
    ],
    category: 'paintings',
    description: 'A tender portrayal of childhood innocence and wonder.',
    inStock: true,
    sku: 'SKU-PAINTINGS-3',
    details: [
      'Limited edition print',
      'Certificate of authenticity',
      'Museum-quality framing',
    ],
  },
  {
    id: 'paintings-4',
    name: 'Floral Artwork',
    price: 999.99,
    images: [
      '/images/paintings/flower.jpg',
      '/images/paintings/flower.jpg',
      '/images/paintings/flower.jpg',
    ],
    category: 'paintings',
    description:
      'Vibrant colors and delicate details bring these flowers to life.',
    inStock: true,
    sku: 'SKU-PAINTINGS-4',
    details: [
      'Botanical study',
      'Archival pigments',
      'Gallery-wrapped canvas',
    ],
  },
  // Decorative objects
  {
    id: 'decoratives-1',
    name: 'Elegant Wooden Vase',
    price: 249.99,
    images: [
      '/images/decoratives/vase.jpg',
      '/images/decoratives/vase.jpg',
      '/images/decoratives/vase.jpg',
    ],
    category: 'decoratives',
    description:
      'A statement piece that adds natural elegance to any space.',
    inStock: true,
    sku: 'SKU-DECORATIVES-1',
    details: ['Hand-turned wood', 'Natural finish', 'Waterproof interior'],
  },
  {
    id: 'decoratives-2',
    name: 'Decorative Wooden Pot',
    price: 199.99,
    images: [
      '/images/decoratives/pot.jpg',
      '/images/decoratives/pot.jpg',
      '/images/decoratives/pot.jpg',
    ],
    category: 'decoratives',
    description:
      'Versatile and beautiful, perfect for plants or as a standalone piece.',
    inStock: true,
    sku: 'SKU-DECORATIVES-2',
    details: [
      'Drainage hole included',
      'Weather-resistant',
      'Indoor/outdoor use',
    ],
  },
  {
    id: 'decoratives-3',
    name: 'Wooden Flower Sculpture',
    price: 159.99,
    images: [
      '/images/decoratives/flower.jpg',
      '/images/decoratives/flower.jpg',
      '/images/decoratives/flower.jpg',
    ],
    category: 'decoratives',
    description: 'The beauty of nature captured in a lasting wooden form.',
    inStock: true,
    sku: 'SKU-DECORATIVES-3',
    details: [
      'Hand-carved details',
      'Natural variations',
      'Stable base design',
    ],
  },
  {
    id: 'decoratives-4',
    name: 'Modern Wooden Vase',
    price: 279.99,
    images: [
      '/images/decoratives/alexandra-gorn-W5dsm9n6e3g-unsplash.jpg',
      '/images/decoratives/alexandra-gorn-W5dsm9n6e3g-unsplash.jpg',
      '/images/decoratives/alexandra-gorn-W5dsm9n6e3g-unsplash.jpg',
    ],
    category: 'decoratives',
    description:
      'Contemporary design meets natural materials in this stunning vase.',
    inStock: true,
    sku: 'SKU-DECORATIVES-4',
    details: [
      'Minimalist design',
      'Versatile display options',
      'Sealed for durability',
    ],
  },
];

export const mockProductListItems: ProductListItem[] = mockProducts.map(({ id, name, price, images, category }) => ({
  id,
  name,
  price,
  images,
  category,
}));

export const mockHomepageData = {
  heroVideo: '/videos/wood.mp4',
  // heroPoster: '/images/handmades/gobolet.jpg',
  featuredGrid: [
    {
      image: '/images/handmades/pull.jpg',
      alt: 'Hand-carved Oak Table',
      title: 'Hand-carved Oak Table',
      href: '/products?category=handmades',
    },
    {
      image: '/images/secondHands/chair.jpg',
      alt: 'Mid-century Lounge Chair',
      title: 'Mid-century Lounge Chair',
      href: '/products?category=secondHands',
    },
    {
      image: '/images/paintings/girl.jpg',
      alt: 'Portrait Study',
      title: 'Portrait Study',
      href: '/products?category=paintings',
    },
    {
      image: '/images/decoratives/vase.jpg',
      alt: 'Sculptural Ceramic Vase',
      title: 'Sculptural Ceramic Vase',
      href: '/products?category=decoratives',
    },
    {
      image: '/images/handmades/cousin.jpg',
      alt: 'Sculpted Maple Vessel',
      title: 'Sculpted Maple Vessel',
      href: '/products?category=handmades',
    },
    {
      image: '/images/secondHands/smallChair.jpg',
      alt: 'Classic Rattan Armchair',
      title: 'Classic Rattan Armchair',
      href: '/products?category=secondHands',
    },
    {
      image: '/images/paintings/gate.jpg',
      alt: 'Botanical Study Print',
      title: 'Botanical Study Print',
      href: '/products?category=paintings',
    },
    {
      image: '/images/decoratives/pot.jpg',
      alt: 'Handblown Glass Bowl',
      title: 'Handblown Glass Bowl',
      href: '/products?category=decoratives',
    },
  ],
};
