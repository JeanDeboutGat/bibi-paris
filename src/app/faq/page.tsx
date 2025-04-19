'use client';

import { useState } from 'react';

// FAQ component with accordion functionality
function FaqItem({
  question,
  answer,
  isOpen,
  toggleOpen,
}: {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  toggleOpen: () => void;
}) {
  return (
    <div className="border-b border-luxury-gold/10">
      <button
        onClick={toggleOpen}
        className="flex w-full justify-between items-center py-4 text-left focus-visible"
        aria-expanded={isOpen}
      >
        <h3 className="font-serif text-lg">{question}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="text-luxury-charcoal/80 space-y-3">{answer}</div>
      </div>
    </div>
  );
}

export default function FaqPage() {
  // State to track which FAQ is open
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // FAQ data organized by category
  const faqCategories = [
    {
      title: 'Products & Materials',
      faqs: [
        {
          question: 'What types of wood do you use for your furniture?',
          answer: (
            <>
              <p>
                We source only the finest sustainable hardwoods for our
                furniture, including:
              </p>
              <ul className="list-disc pl-5 mt-2">
                <li>French Oak</li>
                <li>Walnut</li>
                <li>Maple</li>
                <li>Cherry</li>
                <li>Ash</li>
              </ul>
              <p className="mt-2">
                Each piece is carefully selected for its grain pattern, color,
                and structural integrity to ensure the highest quality finished
                product.
              </p>
            </>
          ),
        },
        {
          question: 'Are your products handmade?',
          answer: (
            <p>
              Yes, all our handmade collection pieces are crafted by skilled
              artisans in our Paris workshop. Each piece is made using
              traditional techniques combined with modern precision, ensuring
              exceptional quality and uniqueness. Our second-hand pieces are
              carefully selected and restored by our expert craftspeople.
            </p>
          ),
        },
        {
          question: 'How do I care for my wooden furniture?',
          answer: (
            <>
              <p>To maintain the beauty of your wooden furniture:</p>
              <ul className="list-disc pl-5 mt-2">
                <li>Dust regularly with a soft, dry cloth</li>
                <li>Avoid placing in direct sunlight</li>
                <li>Use coasters for hot or wet items</li>
                <li>Clean spills immediately with a slightly damp cloth</li>
                <li>Apply high-quality wood polish twice a year</li>
              </ul>
              <p className="mt-2">
                For detailed care instructions, refer to the care guide included
                with your purchase or visit our{' '}
                <a href="/care" className="text-luxury-sienna hover:underline">
                  Care Guide
                </a>{' '}
                page.
              </p>
            </>
          ),
        },
        {
          question: 'Do you offer custom furniture pieces?',
          answer: (
            <p>
              Yes, we offer bespoke furniture creation services. Our
              craftspeople can work with you to design and create a custom piece
              tailored to your specific needs and preferences. For custom
              inquiries, please contact us at{' '}
              <a
                href="mailto:custom@bibiparis.com"
                className="text-luxury-sienna hover:underline"
              >
                custom@bibiparis.com
              </a>
              .
            </p>
          ),
        },
      ],
    },
    {
      title: 'Orders & Payment',
      faqs: [
        {
          question: 'How do I place an order?',
          answer: (
            <p>
              You can place an order directly through our website by selecting
              the item you wish to purchase, adding it to your cart, and
              proceeding to checkout. For assistance with orders, contact our
              customer service team at{' '}
              <a
                href="mailto:service@bibiparis.com"
                className="text-luxury-sienna hover:underline"
              >
                service@bibiparis.com
              </a>
              .
            </p>
          ),
        },
        {
          question: 'What payment methods do you accept?',
          answer: (
            <>
              <p>We accept the following payment methods:</p>
              <ul className="list-disc pl-5 mt-2">
                <li>Credit cards (Visa, Mastercard, American Express)</li>
                <li>PayPal</li>
                <li>Bank transfer (for orders over €1,000)</li>
              </ul>
              <p className="mt-2">
                All payments are processed securely through our encrypted
                payment gateway.
              </p>
            </>
          ),
        },
        {
          question: 'Can I modify or cancel my order?',
          answer: (
            <p>
              You may request to modify or cancel your order within 24 hours of
              placing it by contacting our customer service team. After this
              period, orders enter our production and fulfillment process and
              cannot be modified or canceled. For assistance, email{' '}
              <a
                href="mailto:service@bibiparis.com"
                className="text-luxury-sienna hover:underline"
              >
                service@bibiparis.com
              </a>
              .
            </p>
          ),
        },
        {
          question: 'Do you offer financing options?',
          answer: (
            <p>
              Yes, for purchases over €1,500, we offer financing options through
              our partner, Alma. You can select this option during checkout to
              split your payment into 3 or 4 installments. A credit check may be
              required. For more information, please contact our customer
              service team.
            </p>
          ),
        },
      ],
    },
    {
      title: 'Shipping & Delivery',
      faqs: [
        {
          question: 'How long will it take to receive my order?',
          answer: (
            <>
              <p>
                Delivery times vary depending on the item and your location:
              </p>
              <ul className="list-disc pl-5 mt-2">
                <li>Small decorative items: 3-5 business days</li>
                <li>In-stock furniture: 7-14 business days</li>
                <li>Made-to-order pieces: 4-8 weeks</li>
              </ul>
              <p className="mt-2">
                For more specific information, please refer to our{' '}
                <a
                  href="/shipping"
                  className="text-luxury-sienna hover:underline"
                >
                  Shipping Information
                </a>{' '}
                page.
              </p>
            </>
          ),
        },
        {
          question: 'Do you ship internationally?',
          answer: (
            <p>
              Yes, we ship to most countries in Europe and select international
              destinations. Shipping rates and delivery times vary by location.
              For international shipping inquiries, please contact our customer
              service team for a personalized quote and delivery estimate.
            </p>
          ),
        },
        {
          question: 'How can I track my order?',
          answer: (
            <p>
              Once your order ships, you will receive a confirmation email with
              a tracking number. You can track your order by visiting our{' '}
              <a href="/track" className="text-luxury-sienna hover:underline">
                Track Your Order
              </a>{' '}
              page and entering your order number and email address.
            </p>
          ),
        },
        {
          question: 'What is white glove delivery?',
          answer: (
            <p>
              Our white glove delivery service includes delivery to your room of
              choice, assembly of your furniture, and removal of all packaging
              materials. This premium service ensures your furniture is properly
              set up and ready to enjoy. White glove delivery is available for
              an additional fee and can be selected during checkout.
            </p>
          ),
        },
      ],
    },
    {
      title: 'Returns & Exchanges',
      faqs: [
        {
          question: 'What is your return policy?',
          answer: (
            <p>
              We accept returns within 14 days of delivery for a full refund of
              the item price. Items must be in their original condition and
              packaging. For complete details, please visit our{' '}
              <a href="/returns" className="text-luxury-sienna hover:underline">
                Returns & Exchanges
              </a>{' '}
              page.
            </p>
          ),
        },
        {
          question: 'How do I return an item?',
          answer: (
            <>
              <p>To return an item:</p>
              <ol className="list-decimal pl-5 mt-2 space-y-2">
                <li>
                  Contact our customer service team at{' '}
                  <a
                    href="mailto:returns@bibiparis.com"
                    className="text-luxury-sienna hover:underline"
                  >
                    returns@bibiparis.com
                  </a>
                </li>
                <li>Receive a Return Authorization (RA) number</li>
                <li>Package the item securely with all original materials</li>
                <li>
                  Ship the item back to us with the RA number clearly marked
                </li>
              </ol>
              <p className="mt-2">
                For large furniture pieces, we will arrange for pickup. See our{' '}
                <a
                  href="/returns"
                  className="text-luxury-sienna hover:underline"
                >
                  Returns & Exchanges
                </a>{' '}
                page for full details.
              </p>
            </>
          ),
        },
        {
          question: 'What if my item arrives damaged?',
          answer: (
            <p>
              If your item arrives damaged, please contact us immediately at{' '}
              <a
                href="mailto:service@bibiparis.com"
                className="text-luxury-sienna hover:underline"
              >
                service@bibiparis.com
              </a>{' '}
              with photos of the damage. We&apos;ll work quickly to resolve the
              issue and arrange for a replacement or refund. Please inspect your
              items promptly upon delivery and report any damage within 48
              hours.
            </p>
          ),
        },
        {
          question: 'Can I exchange an item for a different one?',
          answer: (
            <p>
              Yes, we offer exchanges within 30 days of delivery for items of
              equal value. If you wish to exchange for an item of different
              value, the difference will either be charged or refunded. To
              initiate an exchange, contact our customer service team with your
              order details and the item you&apos;d like to exchange for.
            </p>
          ),
        },
      ],
    },
  ];

  return (
    <div className="container-luxury min-h-[70vh]">
      <div className="max-w-3xl mx-auto mt-16">
        <h1 className="font-serif text-3xl text-center mb-12">
          Frequently Asked Questions
        </h1>

        <div className="space-y-10">
          {faqCategories.map((category, categoryIndex) => (
            <section key={categoryIndex}>
              <h2 className="font-serif text-2xl mb-6">{category.title}</h2>
              <div className="divide-y divide-luxury-gold/10">
                {category.faqs.map((faq, faqIndex) => {
                  const index = categoryIndex * 10 + faqIndex;
                  return (
                    <FaqItem
                      key={index}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openFaq === index}
                      toggleOpen={() => toggleFaq(index)}
                    />
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 text-center pt-6 border-t border-luxury-gold/10">
          <h2 className="font-serif text-xl mb-4">
            Can&apos;t Find Your Answer?
          </h2>
          <p className="text-luxury-charcoal/80 mb-4">
            If you have a question that&apos;s not answered above, please
            contact our customer service team.
          </p>
          <p className="mb-2">
            <span className="font-medium">Email:</span>{' '}
            <a
              href="mailto:service@bibiparis.com"
              className="text-luxury-sienna hover:underline"
            >
              service@bibiparis.com
            </a>
          </p>
          <p>
            <span className="font-medium">Phone:</span>{' '}
            <a href="tel:+33142123456" className="hover:underline">
              +33 1 42 12 34 56
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
