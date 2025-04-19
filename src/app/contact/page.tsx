'use client';

import Link from 'next/link';
// import Image from "next/image";
import { useState } from 'react';

export default function ContactPage() {
  const [consentChecked, setConsentChecked] = useState(false);

  return (
    <div className="container-luxury min-h-[70vh]">
      <div className="mb-12 mt-16 text-center">
        <h1 className="font-serif text-3xl mb-4">Contact Us</h1>
        <p className="text-luxury-charcoal/80 max-w-2xl mx-auto">
          We welcome your inquiries. Our team is dedicated to providing
          exceptional service and would be delighted to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white p-8 py-12 shadow-sm border border-luxury-gold/10">
          <h2 className="font-serif text-2xl mb-12">Send Us Message</h2>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="input-luxury w-full"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="input-luxury w-full"
                  placeholder="Your email address"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="input-luxury w-full"
                placeholder="Subject of your message"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="input-luxury w-full resize-none"
                placeholder="How can we assist you?"
                required
              ></textarea>
            </div>

            <div className="flex items-center">
              <button
                type="button"
                className={`w-5 h-5 flex-shrink-0 rounded-sm border ${
                  consentChecked
                    ? 'bg-luxury-sienna border-luxury-sienna text-white'
                    : 'border-luxury-charcoal/30 bg-transparent'
                } flex items-center justify-center mr-3 transition-colors duration-200`}
                onClick={() => setConsentChecked(!consentChecked)}
                aria-checked={consentChecked}
                role="checkbox"
              >
                {consentChecked && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-3 h-3"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
              <label
                onClick={() => setConsentChecked(!consentChecked)}
                className="text-sm text-luxury-charcoal/70 cursor-pointer select-none"
              >
                I consent to Bibi Paris collecting and storing my data from this
                form. View our{' '}
                <Link
                  href="/privacy"
                  className="text-luxury-sienna hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </label>
              <input
                type="checkbox"
                id="privacy"
                className="sr-only"
                checked={consentChecked}
                onChange={() => setConsentChecked(!consentChecked)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full md:w-auto"
              disabled={!consentChecked}
            >
              SEND MESSAGE
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div className="bg-white p-6 shadow-sm border border-luxury-gold/10">
            <h2 className="font-serif text-xl mb-4">Contact Information</h2>

            <div className="space-y-4">
              <div className="flex">
                <div className="flex-shrink-0 mr-3 pt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-luxury-sienna"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-sm uppercase tracking-wider">
                    Address
                  </h3>
                  <address className="text-luxury-charcoal/80 text-sm not-italic mt-1">
                    42 Rue du Faubourg Saint-Honoré
                    <br />
                    75008 Paris, France
                  </address>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mr-3 pt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-luxury-sienna"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-sm uppercase tracking-wider">
                    Phone
                  </h3>
                  <p className="text-luxury-charcoal/80 text-sm mt-1">
                    <a
                      href="tel:+33142123456"
                      className="hover:text-luxury-sienna transition-colors"
                    >
                      +33 1 42 12 34 56
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mr-3 pt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-luxury-sienna"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-sm uppercase tracking-wider">
                    Email
                  </h3>
                  <p className="text-luxury-charcoal/80 text-sm mt-1">
                    <a
                      href="mailto:service@bibiparis.com"
                      className="hover:text-luxury-sienna transition-colors"
                    >
                      service@bibiparis.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 shadow-sm border border-luxury-gold/10">
            <h2 className="font-serif text-xl mb-4">Opening Hours</h2>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-luxury-charcoal/80">Monday - Friday</span>
                <span className="font-medium">10:00 - 19:00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-luxury-charcoal/80">Saturday</span>
                <span className="font-medium">11:00 - 18:00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-luxury-charcoal/80">Sunday</span>
                <span className="font-medium">Closed</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-luxury-gold/10">
              <p className="text-sm text-luxury-charcoal/70">
                Appointments available for private viewings and consultations.
                Please contact us to schedule.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 shadow-sm border border-luxury-gold/10">
            <h2 className="font-serif text-xl mb-2">Follow Us</h2>

            <div className="flex space-x-4">
              {[
                {
                  name: 'Instagram',
                  icon: 'M12 6.865A5.135 5.135 0 1 0 17.135 12 5.138 5.138 0 0 0 12 6.865Zm0 8.469A3.334 3.334 0 1 1 15.334 12 3.338 3.338 0 0 1 12 15.334ZM18.539 6.611a1.2 1.2 0 1 1-1.2-1.2 1.2 1.2 0 0 1 1.2 1.2Z M21.94 7.88a7.833 7.833 0 0 0-.51-2.522 5.35 5.35 0 0 0-1.3-1.939 5.424 5.424 0 0 0-1.938-1.3 7.875 7.875 0 0 0-2.524-.5C14.734.588 14.38.5 12 .5s-2.734.088-3.667.119a7.848 7.848 0 0 0-2.523.5 5.4 5.4 0 0 0-1.939 1.3 5.394 5.394 0 0 0-1.3 1.939 7.84 7.84 0 0 0-.5 2.522C2.088 9.267 2 9.621 2 12s.088 2.734.119 3.668a7.9 7.9 0 0 0 .5 2.523 5.353 5.353 0 0 0 1.3 1.938 5.373 5.373 0 0 0 1.939 1.3 7.917 7.917 0 0 0 2.523.5C9.267 21.912 9.621 22 12 22s2.734-.088 3.668-.119a7.915 7.915 0 0 0 2.523-.5 5.62 5.62 0 0 0 3.239-3.239 7.9 7.9 0 0 0 .5-2.523c.031-.934.119-1.287.119-3.668s-.088-2.733-.119-3.667Zm-2.113 7.252a5.873 5.873 0 0 1-.4 2.042 3.6 3.6 0 0 1-.877 1.4 3.674 3.674 0 0 1-1.4.858 5.981 5.981 0 0 1-2.042.38c-.934.031-1.18.038-3.514.038s-2.584-.007-3.515-.038a5.922 5.922 0 0 1-2.041-.38 3.549 3.549 0 0 1-1.4-.877 3.653 3.653 0 0 1-.859-1.4 5.922 5.922 0 0 1-.38-2.042c-.03-.934-.038-1.18-.038-3.515s.008-2.584.038-3.515a5.948 5.948 0 0 1 .38-2.041 3.59 3.59 0 0 1 .877-1.4 3.646 3.646 0 0 1 1.4-.859 5.951 5.951 0 0 1 2.042-.38c.934-.03 1.18-.038 3.515-.038s2.584.008 3.515.038a5.922 5.922 0 0 1 2.041.38 3.59 3.59 0 0 1 1.4.877 3.662 3.662 0 0 1 .859 1.4 5.961 5.961 0 0 1 .38 2.042c.03.934.038 1.18.038 3.515s-.008 2.584-.038 3.515Z',
                },
                {
                  name: 'Pinterest',
                  icon: 'M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.281a.3.3 0 0 1 .069.286c-.076.324-.246 1.018-.282 1.151-.043.18-.145.219-.335.131-1.247-.581-2.027-2.416-2.027-3.884 0-3.155 2.291-6.051 6.601-6.051 3.469 0 6.152 2.473 6.152 5.777 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.956-1.244 2.622.938.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2Z',
                },
                {
                  name: 'Facebook',
                  icon: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z',
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="text-luxury-charcoal/70 hover:text-luxury-sienna transition-colors duration-300 focus-visible"
                  aria-label={social.name}
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
        </div>
      </div>

      {/* Map Section */}
      {/* <div className="mt-12 bg-white p-4 shadow-sm border border-luxury-gold/10">
        <div className="relative w-full h-96">
          <Image
            src="/images/decoratives/alexandra-gorn-W5dsm9n6e3g-unsplash.jpg"
            alt="Store location map"
            fill
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/80 backdrop-blur p-4 text-center max-w-md">
              <p className="font-serif text-xl mb-2">Visit Our Showroom</p>
              <p className="text-sm text-luxury-charcoal/80">
                42 Rue du Faubourg Saint-Honoré, 75008 Paris, France
              </p>
              <a
                href="https://maps.google.com/?q=42+Rue+du+Faubourg+Saint-Honoré+75008+Paris+France"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-xs uppercase tracking-wider text-luxury-sienna border-b border-luxury-sienna pb-1 hover:text-luxury-charcoal hover:border-luxury-charcoal transition-colors duration-300"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
