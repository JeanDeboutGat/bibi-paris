import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import FeaturedProducts from '@/components/product/FeaturedProducts';

export const metadata: Metadata = {
    title: 'LUXE | Timeless Luxury',
    description: 'Discover our collection of timeless luxury products crafted with exceptional materials and artisanal expertise.',
};

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative h-screen">
                <div className="absolute inset-0">
                    <Image
                        src="/images/hero.jpg" // You'll need to add this image
                        alt="Luxury product showcase"
                        fill
                        priority
                        className="object-cover"
                        quality={90}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                </div>

                <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-4">
                    <h1 className="text-4xl md:text-6xl font-light tracking-wider mb-4">
                        TIMELESS ELEGANCE
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mb-8">
                        Crafted with exceptional materials and artisanal expertise
                    </p>
                    <Link
                        href="/products"
                        className="bg-white text-black px-8 py-3 text-sm tracking-wider hover:bg-gray-100 transition-colors"
                    >
                        DISCOVER
                    </Link>
                </div>
            </section>

            {/* Brand Story Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl font-light mb-8">Our Philosophy</h2>
                    <p className="text-lg text-gray-700 mb-10 leading-relaxed">
                        At LUXE, we believe in the power of exceptional craftsmanship and timeless design.
                        Each piece is meticulously created by our artisans, combining traditional techniques
                        with contemporary vision to create objects of lasting beauty.
                    </p>
                    <Link
                        href="/about"
                        className="text-sm tracking-wider border-b border-black pb-1 hover:text-gray-600 transition-colors"
                    >
                        LEARN MORE
                    </Link>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-light text-center mb-12">Featured Collections</h2>
                    <FeaturedProducts />
                </div>
            </section>

            {/* Collection Highlight */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="relative h-[600px]">
                            <Image
                                src="/images/collection.jpg" // You'll need to add this image
                                alt="Seasonal collection"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="px-4 md:px-12">
                            <h2 className="text-3xl font-light mb-6">The Autumn Collection</h2>
                            <p className="text-gray-700 mb-8 leading-relaxed">
                                Inspired by the rich textures and warm hues of autumn, our latest collection
                                embodies sophisticated comfort. Each piece is designed to elevate your everyday
                                experience with subtle luxury and enduring quality.
                            </p>
                            <Link
                                href="/products?collection=autumn"
                                className="bg-black text-white px-8 py-3 text-sm tracking-wider hover:bg-gray-800 transition-colors inline-block"
                            >
                                EXPLORE
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 bg-gray-100">
                <div className="container mx-auto px-4 max-w-xl text-center">
                    <h2 className="text-2xl font-light mb-6">Join Our Community</h2>
                    <p className="text-gray-700 mb-8">
                        Subscribe to receive updates on new collections, exclusive events, and the world of LUXE.
                    </p>
                    <form className="flex flex-col md:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-grow px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-black text-white px-6 py-3 text-sm tracking-wider hover:bg-gray-800 transition-colors"
                        >
                            SUBSCRIBE
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}