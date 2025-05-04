export const mockHomepageData = {
  heroVideo: '/videos/wood.mp4',
  heroPoster: '/images/handmades/gobolet.jpg',
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

export async function getMockHomepageData() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return mockHomepageData;
}