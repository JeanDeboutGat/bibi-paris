import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bibi Paris | Shipping Information',
  description:
    'Learn about our shipping policy, delivery times, and shipping fees for our luxury furniture.',
};

export default function ShippingInformationPage() {
  return (
    <div className="container-luxury min-h-[70vh]">
      <div className="max-w-3xl mx-auto pt-16">
        <h1 className="font-serif text-3xl text-center mb-12">
          Shipping Information
        </h1>

        <div className="space-y-10">
          <section>
            <h2 className="font-serif text-2xl mb-4">Delivery Options</h2>
            <p className="text-luxury-charcoal/80 mb-4">
              At Bibi Paris, we provide premium delivery services to ensure your
              luxury furniture arrives in perfect condition.
            </p>

            <div className="mt-6 border-t border-luxury-gold/10 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#f6f1eb]/30 p-6">
                  <h3 className="font-serif text-lg mb-3">Standard Delivery</h3>
                  <p className="text-luxury-charcoal/80 mb-2">
                    Your order will be carefully packaged and delivered within
                    7-10 business days.
                  </p>
                  <p className="font-medium">€20 - Free for orders over €500</p>
                </div>

                <div className="bg-[#f6f1eb]/30 p-6">
                  <h3 className="font-serif text-lg mb-3">Premium Delivery</h3>
                  <p className="text-luxury-charcoal/80 mb-2">
                    Express delivery with white-glove service within 3-5
                    business days.
                  </p>
                  <p className="font-medium">€50</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">Shipping Policy</h2>
            <div className="space-y-4">
              <p className="text-luxury-charcoal/80">
                All orders are processed within 1-2 business days. Orders placed
                after 2 PM CET will be processed the following business day.
                Orders are not shipped or delivered on weekends or holidays.
              </p>

              <p className="text-luxury-charcoal/80">
                If we are experiencing a high volume of orders, shipments may be
                delayed by a few days. Please allow additional days in transit
                for delivery. If there is a significant delay in shipment of
                your order, we will contact you via email or telephone.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">Delivery Areas</h2>
            <p className="text-luxury-charcoal/80 mb-4">
              We currently ship to the following regions:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <h3 className="font-serif text-lg mb-3">France</h3>
                <ul className="space-y-2 text-luxury-charcoal/80">
                  <li>Paris and Surrounding Areas: 2-3 days</li>
                  <li>Major Cities: 3-5 days</li>
                  <li>Other Regions: 5-7 days</li>
                </ul>
              </div>

              <div>
                <h3 className="font-serif text-lg mb-3">Europe</h3>
                <ul className="space-y-2 text-luxury-charcoal/80">
                  <li>Western Europe: 5-7 days</li>
                  <li>Central Europe: 7-10 days</li>
                  <li>Other European Regions: 10-14 days</li>
                </ul>
              </div>
            </div>

            <p className="mt-6 text-luxury-charcoal/80">
              For international shipping outside Europe, please contact our
              customer service for a tailored quote and delivery estimate.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">
              Shipment Confirmation & Order Tracking
            </h2>
            <p className="text-luxury-charcoal/80 mb-4">
              You will receive a shipment confirmation email once your order has
              shipped containing your tracking number. The tracking number will
              be active within 24 hours.
            </p>
            <p className="text-luxury-charcoal/80">
              You can track your order by visiting our{' '}
              <a href="/track" className="text-luxury-sienna hover:underline">
                Track Your Order
              </a>{' '}
              page.
            </p>
          </section>

          <section className="pt-6 border-t border-luxury-gold/10">
            <h2 className="font-serif text-xl mb-4">Need Assistance?</h2>
            <p className="text-luxury-charcoal/80 mb-4">
              If you have any questions about shipping or delivery, please
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
          </section>
        </div>
      </div>
    </div>
  );
}
