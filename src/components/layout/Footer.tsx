'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FooterLinkGroup, SocialMedia } from '@/types';

export default function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Social media links
  const socialLinks: SocialMedia[] = [
    {
      platform: 'instagram',
      url: '#',
      icon: 'M12 6.865A5.135 5.135 0 1 0 17.135 12 5.138 5.138 0 0 0 12 6.865Zm0 8.469A3.334 3.334 0 1 1 15.334 12 3.338 3.338 0 0 1 12 15.334ZM18.539 6.611a1.2 1.2 0 1 1-1.2-1.2 1.2 1.2 0 0 1 1.2 1.2Z M21.94 7.88a7.833 7.833 0 0 0-.51-2.522 5.35 5.35 0 0 0-1.3-1.939 5.424 5.424 0 0 0-1.938-1.3 7.875 7.875 0 0 0-2.524-.5C14.734.588 14.38.5 12 .5s-2.734.088-3.667.119a7.848 7.848 0 0 0-2.523.5 5.4 5.4 0 0 0-1.939 1.3 5.394 5.394 0 0 0-1.3 1.939 7.84 7.84 0 0 0-.5 2.522C2.088 9.267 2 9.621 2 12s.088 2.734.119 3.668a7.9 7.9 0 0 0 .5 2.523 5.353 5.353 0 0 0 1.3 1.938 5.373 5.373 0 0 0 1.939 1.3 7.917 7.917 0 0 0 2.523.5C9.267 21.912 9.621 22 12 22s2.734-.088 3.668-.119a7.915 7.915 0 0 0 2.523-.5 5.62 5.62 0 0 0 3.239-3.239 7.9 7.9 0 0 0 .5-2.523c.031-.934.119-1.287.119-3.668s-.088-2.733-.119-3.667Zm-2.113 7.252a5.873 5.873 0 0 1-.4 2.042 3.6 3.6 0 0 1-.877 1.4 3.674 3.674 0 0 1-1.4.858 5.981 5.981 0 0 1-2.042.38c-.934.031-1.18.038-3.514.038s-2.584-.007-3.515-.038a5.922 5.922 0 0 1-2.041-.38 3.549 3.549 0 0 1-1.4-.877 3.653 3.653 0 0 1-.859-1.4 5.922 5.922 0 0 1-.38-2.042c-.03-.934-.038-1.18-.038-3.515s.008-2.584.038-3.515a5.948 5.948 0 0 1 .38-2.041 3.59 3.59 0 0 1 .877-1.4 3.646 3.646 0 0 1 1.4-.859 5.951 5.951 0 0 1 2.042-.38c.934-.03 1.18-.038 3.515-.038s2.584.008 3.515.038a5.922 5.922 0 0 1 2.041.38 3.59 3.59 0 0 1 1.4.877 3.662 3.662 0 0 1 .859 1.4 5.961 5.961 0 0 1 .38 2.042c.03.934.038 1.18.038 3.515s-.008 2.584-.038 3.515Z'
    },
    {
      platform: 'pinterest',
      url: '#',
      icon: 'M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.281a.3.3 0 0 1 .069.286c-.076.324-.246 1.018-.282 1.151-.043.18-.145.219-.335.131-1.247-.581-2.027-2.416-2.027-3.884 0-3.155 2.291-6.051 6.601-6.051 3.469 0 6.152 2.473 6.152 5.777 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.956-1.244 2.622.938.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2Z'
    },
    {
      platform: 'facebook',
      url: '#',
      icon: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z'
    }
  ];

  // Footer link groups
  const footerLinkGroups: FooterLinkGroup[] = [
    {
      title: 'Collections',
      links: [
        { label: 'Handmade Pieces', href: '/products?category=handmades' },
        { label: 'Second-Hand', href: '/products?category=secondHands' },
        { label: 'Paintings', href: '/products?category=paintings' },
        { label: 'Decorative Objects', href: '/products?category=decoratives' }
      ]
    },
    {
      title: 'About',
      links: [
        { label: 'Our Story', href: '/about' },
        { label: 'Craftsmanship', href: '/about#craftsmanship' },
        { label: 'Care Guide', href: '/care' },
        { label: 'Contact Us', href: '/contact' }
      ]
    },
    {
      title: 'Client Services',
      links: [
        { label: 'Shipping Information', href: '/shipping' },
        { label: 'Returns & Exchanges', href: '/returns' },
        { label: 'Track Your Order', href: '/track' },
        { label: 'FAQs', href: '/faq' }
      ]
    }
  ];

  return (
    <footer className="bg-white pt-0 pb-0 border-t border-luxury-gold/10">
      {/* Main Content - Full width section */}
      <div
        className={`w-full pt-16 pb-16 ${isHomePage ? 'bg-[#f6f1eb]' : 'bg-white'}`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            {/* Brand Column */}
            <div className="col-span-1">
              <div className="mb-6 hidden md:block">
                <div className="relative w-20 h-20">
                  <Image
                    src="/logo.png"
                    alt="BIBI Paris"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-sm text-luxury-charcoal/80 mb-6 leading-relaxed">
                Timeless craftsmanship, Parisian elegance. Elevating interiors
                through the art of luxurious wooden furniture since 2010.
              </p>
              <div className="flex space-x-4 items-center">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    className="text-luxury-charcoal/70 hover:text-luxury-sienna transition-colors duration-300 focus-visible"
                    aria-label={social.platform}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                      aria-hidden="true"
                    >
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Link Groups */}
            {footerLinkGroups.map((group, index) => (
              <div className="col-span-1" key={index}>
                <h3 className="text-sm font-medium uppercase tracking-wider mb-6">
                  {group.title}
                </h3>
                <ul className="space-y-3">
                  {group.links.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm text-luxury-charcoal/70 hover:text-luxury-sienna transition-colors duration-300 focus-visible"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter - Full width section */}
      <div
        className={`mt-0 border-t border-luxury-gold/10 w-full py-12 ${!isHomePage ? 'bg-[#f6f1eb]' : 'bg-white'}`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-sm font-medium uppercase tracking-wider mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-sm text-luxury-charcoal/70 mb-6">
              Stay informed about new collections, exclusive events, and the
              world of Bibi Paris.
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
        </div>
      </div>

      {/* Copyright - Full width section */}
      <div
        className={`w-full py-8 border-t border-luxury-gold/10 ${!isHomePage ? 'bg-[#f6f1eb]' : 'bg-white'}`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-3 mb-3">
              <a
                href="mailto:service@bibiparis.com"
                className="text-sm text-luxury-charcoal/70 hover:text-luxury-sienna transition-colors duration-300"
              >
                service@bibiparis.com
              </a>
              <span className="text-luxury-charcoal/30">|</span>
              <a
                href="tel:+33142123456"
                className="text-sm text-luxury-charcoal/70 hover:text-luxury-sienna transition-colors duration-300"
              >
                +33 1 42 12 34 56
              </a>
            </div>
            <p className="text-sm text-luxury-charcoal/60 text-center">
              © {new Date().getFullYear()} Bibi Paris. All rights reserved.
              <Link
                href="/privacy"
                className="ml-2 hover:text-luxury-sienna transition-colors duration-300"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
