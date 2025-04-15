import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bibi Paris | Timeless Wooden Furniture',
    description: 'Discover our collection of high-end wooden furniture, featuring handmade pieces, second-hand items, paintings, and decorative objects.',
};

export default function Home() {
    // Collections data to display with featured image and product images
    const collections = [
        {
            id: 'handmades',
            name: 'Handmade Pieces',
            description: 'Expertly crafted furniture that celebrates the beauty of natural wood and artisanal techniques.',
            featuredImage: '/images/handmades/gobolet.jpg',
            href: '/products?category=handmades',
            products: [
                { image: '/images/handmades/pull.jpg', name: 'Hand-carved Oak Table', price: 1825 },
                { image: '/images/handmades/cousin.jpg', name: 'Sculpted Maple Vessel', price: 2125 },
                { image: '/images/handmades/sac.jpg', name: 'Handcrafted Walnut Box', price: 907 },
                { image: '/images/handmades/gobolet.jpg', name: 'Artisanal Wooden Goblet', price: 2107 }
            ]
        },
        {
            id: 'secondHands',
            name: 'Second-Hand',
            description: 'Curated vintage pieces with history and character, restored to their original splendor.',
            featuredImage: '/images/secondHands/table.jpg',
            href: '/products?category=secondHands',
            products: [
                { image: '/images/secondHands/chair.jpg', name: 'Mid-century Lounge Chair', price: 1825 },
                { image: '/images/secondHands/chairdark.jpg', name: 'Antique Oak Cabinet', price: 2125 },
                { image: '/images/secondHands/smallChair.jpg', name: 'Classic Rattan Armchair', price: 907 },
                { image: '/images/secondHands/chair-fonce.jpg', name: 'Vintage Wooden Chair', price: 2107 }
            ]
        },
        {
            id: 'paintings',
            name: 'Paintings',
            description: 'Original artworks that complement our furniture and bring emotional depth to any space.',
            featuredImage: '/images/paintings/girl.jpg',
            href: '/products?category=paintings',
            products: [
                { image: '/images/paintings/gate.jpg', name: 'Botanical Study Print', price: 1825 },
                { image: '/images/paintings/girl-boy.jpg', name: 'Heritage Portrait', price: 2125 },
                { image: '/images/paintings/flower.jpg', name: 'Landscape Oil Painting', price: 907 },
                { image: '/images/paintings/girl.jpg', name: 'Portrait Study', price: 2107 }
            ]
        },
        {
            id: 'decoratives',
            name: 'Decorative Objects',
            description: 'Refined accessories that add the perfect finishing touch to your carefully curated interiors.',
            featuredImage: '/images/decoratives/vase.jpg',
            href: '/products?category=decoratives',
            products: [
                { image: '/images/decoratives/pot.jpg', name: 'Handblown Glass Bowl', price: 1825 },
                { image: '/images/decoratives/flower.jpg', name: 'Modernist Bronze Object', price: 2125 },
                { image: '/images/decoratives/alexandra-gorn-W5dsm9n6e3g-unsplash.jpg', name: 'Woven Rattan Basket', price: 907 },
                { image: '/images/decoratives/vase.jpg', name: 'Sculptural Ceramic Vase', price: 2107 }
            ]
        },
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="relative h-screen overflow-hidden bg-neutral-100">
                <div className="absolute inset-0">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                        poster="/images/handmades/gobolet.jpg"
                    >
                        <source src="/videos/wood.mp4" type="video/mp4" />
                        {/* Fallback image if video fails */}
                    <Image
                            src="/images/handmades/gobolet.jpg"
                            alt="Luxury wooden furniture"
                        fill
                        priority
                        className="object-cover"
                    />
                    </video>
                    <div className="absolute inset-0 bg-black bg-opacity-5"></div>
                </div>

                <div className="absolute bottom-0 left-0 w-full pb-20">
                    <div className="container mx-auto px-2">
                        <div className="max-w-4xl">
                            <h1 className="font-serif text-1xl md:text-2xl lg:text-3xl text-white font-light mb-4 uppercase tracking-wide">
                                Timeless Craftsmanship, Parisian Elegance
                    </h1>
                            <p className="text-white/80 text-sm max-w-1xl mb-10">
                               Elevating interiors through the art of high-end wooden furniture.
                    </p>
                    <Link
                        href="/products"
                                className="inline-block text-sm uppercase tracking-wider text-white hover:text-luxury-gold transition-colors duration-300 group"
                    >
                                Explore
                                <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform duration-300">
                                    &rarr;
                                </span>
                    </Link>
                </div>
                    </div>
                </div>
            </section>

            {/* Featured Products Grid */}
            <section className="py-24 bg-[#f6f1eb]">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-6 md:gap-10">
                            {/* Handmades */}
                            <Link href="/products?category=handmades" className="block group">
                                <div className="relative aspect-square overflow-hidden mb-3">
                                    <Image
                                        src="/images/handmades/pull.jpg"
                                        alt="Hand-carved Oak Table"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="font-serif text-xs text-center text-luxury-charcoal/70">
                                    Hand-carved Oak Table
                                </h3>
                            </Link>
                            <Link href="/products?category=secondHands" className="block group">
                                <div className="relative aspect-square overflow-hidden mb-3">
                                    <Image
                                        src="/images/secondHands/chair.jpg"
                                        alt="Mid-century Lounge Chair"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="font-serif text-xs text-center text-luxury-charcoal/70">
                                    Mid-century Lounge Chair
                                </h3>
                            </Link>
                            <Link href="/products?category=paintings" className="block group">
                                <div className="relative aspect-square overflow-hidden mb-3">
                                    <Image
                                        src="/images/paintings/girl.jpg"
                                        alt="Portrait Study"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="font-serif text-xs text-center text-luxury-charcoal/70">
                                    Portrait Study
                                </h3>
                            </Link>
                            <Link href="/products?category=decoratives" className="block group">
                                <div className="relative aspect-square overflow-hidden mb-3">
                                    <Image
                                        src="/images/decoratives/vase.jpg"
                                        alt="Sculptural Ceramic Vase"
                                        fill
                                        className="object-cover"
                                    />
                </div>
                                <h3 className="font-serif text-xs text-center text-luxury-charcoal/70">
                                    Sculptural Ceramic Vase
                                </h3>
                            </Link>
                            
                            {/* Second row */}
                            <Link href="/products?category=handmades" className="block group">
                                <div className="relative aspect-square overflow-hidden mb-3">
                                    <Image
                                        src="/images/handmades/cousin.jpg"
                                        alt="Sculpted Maple Vessel"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="font-serif text-xs text-center text-luxury-charcoal/70">
                                    Sculpted Maple Vessel
                                </h3>
                            </Link>
                            <Link href="/products?category=secondHands" className="block group">
                                <div className="relative aspect-square overflow-hidden mb-3">
                                    <Image
                                        src="/images/secondHands/smallChair.jpg"
                                        alt="Classic Rattan Armchair"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="font-serif text-xs text-center text-luxury-charcoal/70">
                                    Classic Rattan Armchair
                                </h3>
                            </Link>
                            <Link href="/products?category=paintings" className="block group">
                                <div className="relative aspect-square overflow-hidden mb-3">
                                    <Image
                                        src="/images/paintings/gate.jpg"
                                        alt="Botanical Study Print"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="font-serif text-xs text-center text-luxury-charcoal/70">
                                    Botanical Study Print
                                </h3>
                            </Link>
                            <Link href="/products?category=decoratives" className="block group">
                                <div className="relative aspect-square overflow-hidden mb-3">
                            <Image
                                        src="/images/decoratives/pot.jpg"
                                        alt="Handblown Glass Bowl"
                                fill
                                className="object-cover"
                            />
                        </div>
                                <h3 className="font-serif text-xs text-center text-luxury-charcoal/70">
                                    Handblown Glass Bowl
                                </h3>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Collections Sections - Hermès-inspired Layout */}
            {collections.map((collection, index) => (
                <section 
                    key={collection.id} 
                    className={`py-24 ${index % 2 === 0 ? 'bg-[#f6f1eb]' : 'bg-[#f6f1eb]'}`}
                >
                    <div className="container mx-auto px-4 md:px-8">
                        {/* Collection Title and Description */}
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-3xl md:text-4xl mb-6">{collection.name}</h2>
                            <p className="text-luxury-charcoal/80 max-w-2xl mx-auto">
                                {collection.description}
                            </p>
                        </div>
                        
                        {/* Featured Image - Smaller dimensions */}
                        <div className="mb-16 max-w-5xl mx-auto">
                            <div className="relative aspect-[21/9] w-full overflow-hidden">
                                <Image
                                    src={collection.featuredImage}
                                    alt={`${collection.name} collection`}
                                    fill
                                    priority={index === 0}
                                    className="object-cover"
                                />
                            </div>
                            <div className="mt-4 text-right">
                                <Link 
                                    href={collection.href}
                                    className="inline-flex items-center text-sm text-luxury-charcoal/80 hover:text-luxury-gold transition-colors duration-300"
                                >
                                    Explore Collection
                                    <span className="ml-2">&rarr;</span>
                                </Link>
                            </div>
                        </div>
                        
                        {/* Product Grid - Aligned with featured image width */}
                        <div className="max-w-5xl mx-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {collection.products.map((product, i) => (
                                    <Link 
                                        key={i} 
                                        href={collection.href}
                                        className="block group"
                                    >
                                        <div className="relative aspect-square overflow-hidden mb-3">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover transition-all duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                        <h3 className="font-serif text-sm mb-1">
                                            {product.name}
                                        </h3>
                                        <p className="text-luxury-charcoal/70 text-sm">
                                            ${product.price}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            {/* Craftsmanship Process - Restored from original */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-8 text-center">
                    <h2 className="font-serif text-3xl md:text-4xl mb-6">Artisanal Excellence</h2>
                    <p className="text-luxury-charcoal/80 max-w-3xl mx-auto mb-16">
                        Our passionate craftspeople maintain exacting standards at every step of the creation process, 
                        ensuring each piece is worthy of becoming part of your home.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {[
                            {
                                title: "Material Selection",
                                icon: "M4.5 12.75l6 6 9-13.5",
                                description: "We source only the finest sustainable woods, meticulously selected for character and quality."
                            },
                            {
                                title: "Hand Crafting",
                                icon: "M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",
                                description: "Our master artisans use time-honored techniques to shape and finish each unique creation."
                            },
                            {
                                title: "Finishing Touches",
                                icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z",
                                description: "Every detail is perfected with natural oils and waxes, enhancing the wood's natural beauty."
                            }
                        ].map((step, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-white border border-luxury-gold/10 flex items-center justify-center mb-6">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-8 h-8 text-luxury-gold"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                                    </svg>
                                </div>
                                <h3 className="font-medium mb-3">{step.title}</h3>
                                <p className="text-luxury-charcoal/70 text-sm">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}