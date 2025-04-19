import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bibi Paris | Returns & Exchanges',
  description:
    'Learn about our returns and exchanges policy for luxury wooden furniture and decorative items.',
};

export default function ReturnsAndExchangesPage() {
  return (
    <div className="container-luxury min-h-[70vh]">
      <div className="max-w-3xl mx-auto pt-16">
        <h1 className="font-serif text-3xl text-center mb-12">
          Returns & Exchanges
        </h1>

        <div className="space-y-10">
          <section>
            <h2 className="font-serif text-2xl mb-4">Our Policy</h2>
            <p className="text-luxury-charcoal/80 mb-4">
              At Bibi Paris, we stand behind the quality of our products. We
              want you to be completely satisfied with your purchase.
            </p>
            <p className="text-luxury-charcoal/80">
              If you&apos;re not entirely satisfied, we accept returns within 14
              days of delivery for a full refund of the item price. We also
              offer exchanges for items of equal value within 30 days of
              delivery.
            </p>
          </section>

          <section className="bg-[#f6f1eb]/30 p-6">
            <h2 className="font-serif text-2xl mb-4">Return Eligibility</h2>
            <p className="text-luxury-charcoal/80 mb-4">
              To be eligible for a return, your item must be:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-luxury-charcoal/80">
              <li>In the same condition that you received it</li>
              <li>Unused and in its original packaging</li>
              <li>Accompanied by the original receipt or proof of purchase</li>
              <li>Returned within 14 days of delivery</li>
            </ul>

            <div className="mt-6 pt-6 border-t border-luxury-gold/10">
              <h3 className="font-serif text-lg mb-3">Non-Returnable Items</h3>
              <p className="text-luxury-charcoal/80 mb-2">
                The following items cannot be returned:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-luxury-charcoal/80">
                <li>Custom-made or personalized pieces</li>
                <li>Items with signs of use or damage caused after delivery</li>
                <li>Items marked as &quot;Final Sale&quot;</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">Return Process</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg mb-3">1. Request a Return</h3>
                <p className="text-luxury-charcoal/80">
                  Contact our customer service team at{' '}
                  <a
                    href="mailto:returns@bibiparis.com"
                    className="text-luxury-sienna hover:underline"
                  >
                    returns@bibiparis.com
                  </a>{' '}
                  to initiate a return. Please include your order number and the
                  reason for the return.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-lg mb-3">
                  2. Receive Return Authorization
                </h3>
                <p className="text-luxury-charcoal/80">
                  Our team will review your request and send you a Return
                  Authorization (RA) number and return shipping instructions
                  within 2 business days.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-lg mb-3">
                  3. Package Your Item
                </h3>
                <p className="text-luxury-charcoal/80">
                  Securely package the item in its original packaging, including
                  all accessories and documentation. Include the RA number on
                  the outside of the package.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-lg mb-3">4. Ship Your Return</h3>
                <p className="text-luxury-charcoal/80">
                  For small to medium items, you are responsible for shipping
                  the product back to us. For large furniture pieces, contact us
                  to arrange pickup.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">Exchanges</h2>
            <p className="text-luxury-charcoal/80 mb-4">
              If you would like to exchange your item for a different piece,
              please follow the same process as for returns. Mention in your
              initial contact that you&apos;re seeking an exchange and specify
              the item you would like instead.
            </p>
            <p className="text-luxury-charcoal/80">
              Exchanges must be of equal or greater value. If the new item is of
              greater value, you will be charged the difference. If the new item
              is of lesser value, the difference will be refunded to your
              original payment method.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">Refunds</h2>
            <p className="text-luxury-charcoal/80 mb-4">
              Once we receive and inspect your return, we will notify you about
              the status of your refund.
            </p>
            <p className="text-luxury-charcoal/80 mb-4">
              If approved, your refund will be processed to the original method
              of payment within 5-7 business days. Please note that it may take
              an additional 2-10 business days for the refund to appear in your
              account, depending on your financial institution.
            </p>
            <div className="bg-[#f6f1eb]/30 p-6 mt-6">
              <h3 className="font-serif text-lg mb-3">Return Shipping Costs</h3>
              <p className="text-luxury-charcoal/80">
                Return shipping costs are the responsibility of the customer,
                except in cases of defective or incorrectly shipped items.
                Return shipping for large furniture items may incur a restocking
                fee of 15% of the purchase price.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">Damaged Items</h2>
            <p className="text-luxury-charcoal/80 mb-4">
              If you receive a damaged item, please contact us immediately at{' '}
              <a
                href="mailto:service@bibiparis.com"
                className="text-luxury-sienna hover:underline"
              >
                service@bibiparis.com
              </a>{' '}
              with photos of the damage. We&apos;ll work quickly to resolve the
              issue and arrange for a replacement or refund.
            </p>
            <p className="text-luxury-charcoal/80">
              Please inspect your items promptly upon delivery and report any
              damage within 48 hours.
            </p>
          </section>

          <section className="pt-6 border-t border-luxury-gold/10">
            <h2 className="font-serif text-xl mb-4">Need Assistance?</h2>
            <p className="text-luxury-charcoal/80 mb-4">
              If you have any questions about our return and exchange policy,
              please contact our customer service team.
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
          </section>
        </div>
      </div>
    </div>
  );
}
