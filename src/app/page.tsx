import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bibi Paris | Timeless Wooden Furniture',
    description: 'Discover our collection of high-end wooden furniture, featuring handmade pieces, second-hand items, paintings, and decorative objects.',
};

export default function Home() {
    // Collections data to display
    const collections = [
        {
            id: 'handmades',
            name: 'Handmade Pieces',
            description: 'Expertly crafted furniture that celebrates the beauty of natural wood and artisanal techniques.',
            image: '/images/handmades/gobolet.jpg',
            href: '/products?category=handmades',
        },
        {
            id: 'secondHands',
            name: 'Second-Hand',
            description: 'Curated vintage pieces with history and character, restored to their original splendor.',
            image: '/images/secondHands/table.jpg',
            href: '/products?category=secondHands',
        },
        {
            id: 'paintings',
            name: 'Paintings',
            description: 'Original artworks that complement our furniture and bring emotional depth to any space.',
            image: '/images/paintings/girl.jpg',
            href: '/products?category=paintings',
        },
        {
            id: 'decoratives',
            name: 'Decorative Objects',
            description: 'Refined accessories that add the perfect finishing touch to your carefully curated interiors.',
            image: '/images/decoratives/vase.jpg',
            href: '/products?category=decoratives',
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

            {/* Our Collections Section */}
            <section className="py-24 bg-luxury-cream">
                <div className="container mx-auto px-4 md:px-8">
                    <h2 className="font-serif text-3xl md:text-4xl text-center mb-6">Our Collections</h2>
                    <p className="text-center text-luxury-charcoal/80 max-w-3xl mx-auto mb-16">
                        Each piece tells a story of exceptional craftsmanship and design, creating a dialogue between 
                        tradition and contemporary living.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {collections.map((collection) => (
                            <Link 
                                key={collection.id}
                                href={collection.href}
                                className="group hover-expand focus-visible block"
                            >
                                <div className="relative h-96 mb-6 overflow-hidden">
                                    <Image
                                        src={collection.image}
                                        alt={collection.name}
                                        fill
                                        className="object-cover transition-all duration-2000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                <h3 className="font-serif text-xl mb-2 group-hover:text-luxury-sienna transition-colors duration-300">{collection.name}</h3>
                                <p className="text-luxury-charcoal/70 text-sm leading-relaxed">{collection.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative h-[500px] lg:h-[700px] group overflow-hidden">
                            <Image
                                src="/images/handmades/pull.jpg"
                                alt="Wood craftsmanship"
                                fill
                                className="object-cover transition-all duration-2000 group-hover:scale-105"
                            />
                        </div>
                        <div className="lg:pl-12">
                            <h2 className="font-serif text-3xl md:text-4xl mb-8">The Essence of Bibi Paris</h2>
                            <div className="prose prose-lg text-luxury-charcoal/80">
                                <p className="mb-6">
                                    At Bibi Paris, we believe in the beauty of natural materials and the value of expert craftsmanship. 
                                    Our pieces are designed to transcend trends, becoming heirlooms that tell a story across generations.
                                </p>
                                <p className="mb-8">
                                    Each creation embodies our philosophy of understated luxury – where quality speaks through 
                                    attention to detail, exceptional materials, and timeless design. We honor traditional woodworking 
                                    techniques while embracing contemporary aesthetics, resulting in pieces that feel both familiar and novel.
                                </p>
                                <Link 
                                    href="/about" 
                                    className="btn-secondary inline-block"
                                >
                                    OUR STORY
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Product */}
            <section className="py-24 bg-luxury-cream/50">
                <div className="container mx-auto px-4 md:px-8">
                    <h2 className="font-serif text-3xl md:text-4xl text-center mb-16">Featured Piece</h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="relative h-[400px] md:h-[600px] overflow-hidden order-2 lg:order-1">
                            <Image
                                src="/images/secondHands/chair.jpg"
                                alt="Featured wooden chair"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col justify-center lg:pl-12 order-1 lg:order-2">
                            <h3 className="font-serif text-2xl mb-3">Vintage Dining Chair</h3>
                            <p className="text-luxury-gold font-medium mb-6">Handmade Collection</p>
                            <p className="text-luxury-charcoal/70 leading-relaxed mb-8">
                                Crafted from century-old reclaimed oak with traditional joinery techniques, 
                                the Marseille dining table embodies our commitment to sustainability and timeless design. 
                                Each piece bears unique markings that tell the story of its previous life, now reimagined for contemporary living.
                            </p>
                            <Link 
                                href="/products?category=handmades" 
                                className="btn-primary self-start"
                            >
                                EXPLORE COLLECTION
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Craftsmanship Process */}
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
                                <div className="w-16 h-16 rounded-full bg-luxury-cream flex items-center justify-center mb-6">
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

            {/* Newsletter Section */}
            <section className="py-24 bg-luxury-cream">
                <div className="container mx-auto px-4 md:px-8 max-w-2xl text-center">
                    <h2 className="font-serif text-3xl md:text-4xl mb-6">Stay Connected</h2>
                    <p className="text-luxury-charcoal/80 mb-10">
                        Subscribe to receive updates on new collections, exclusive events, and the world of Bibi Paris.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="input-luxury flex-grow py-3"
                            required
                            aria-label="Email address"
                        />
                        <button
                            type="submit"
                            className="btn-primary whitespace-nowrap"
                            aria-label="Subscribe to newsletter"
                        >
                            SUBSCRIBE
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}