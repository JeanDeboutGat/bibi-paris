import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-50 py-16 border-t border-gray-200">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div className="col-span-1">
                        <h2 className="text-xl font-light tracking-widest mb-6">LUXE</h2>
                        <p className="text-sm text-gray-600 mb-4">
                            Crafting timeless luxury for the discerning individual.
                        </p>
                    </div>

                    {/* Navigation Columns */}
                    <div className="col-span-1">
                        <h3 className="text-sm font-medium uppercase tracking-wider mb-4">Shop</h3>
                        <ul className="space-y-2">
                            {['All Products', 'New Arrivals', 'Best Sellers', 'Collections'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h3 className="text-sm font-medium uppercase tracking-wider mb-4">About</h3>
                        <ul className="space-y-2">
                            {['Our Story', 'Craftsmanship', 'Sustainability', 'Contact Us'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h3 className="text-sm font-medium uppercase tracking-wider mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            {['Shipping & Returns', 'FAQ', 'Track Order', 'Privacy Policy'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-600">
                            © {new Date().getFullYear()} LUXE. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            {['Facebook', 'Instagram', 'Twitter', 'Pinterest'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                    aria-label={social}
                                >
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}