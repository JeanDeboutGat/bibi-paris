'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocalCartStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

// Metadata can't be exported from client components
// export const metadata: Metadata = {
//     title: 'Your cart | LUXE',
//     description: 'Review and checkout your selected items',
// };

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, clearCart } = useLocalCartStore();

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingCost = subtotal >= 500 ? 0 : 25;
  const total = subtotal + shippingCost;

  if (items.length === 0) {
    return (
      <div className="container-luxury min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h1 className="font-serif text-3xl mb-6">Your Shopping Bag</h1>
        <p className="text-luxury-charcoal/70 mb-8">
          Your shopping bag is empty.
        </p>
        <Link href="/products" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-luxury pt-32">
      <h1 className="font-serif text-3xl text-center mb-12">
        Your Shopping Bag
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="border-b border-luxury-gold/10 pb-2 hidden md:grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <span className="text-sm uppercase tracking-wider text-luxury-charcoal/60">
                Product
              </span>
            </div>
            <div className="col-span-2 text-center">
              <span className="text-sm uppercase tracking-wider text-luxury-charcoal/60">
                Quantity
              </span>
            </div>
            <div className="col-span-2 text-right">
              <span className="text-sm uppercase tracking-wider text-luxury-charcoal/60">
                Price
              </span>
            </div>
            <div className="col-span-2 text-right">
              <span className="text-sm uppercase tracking-wider text-luxury-charcoal/60">
                Total
              </span>
            </div>
          </div>

          {items.map((item) => (
            <div key={item.id} className="py-6 border-b border-luxury-gold/10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Product info */}
                <div className="col-span-6 flex gap-4">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="font-serif mb-1">{item.name}</h3>
                    <div className="flex items-center mt-2 md:hidden">
                      <span className="text-sm text-luxury-charcoal/60 w-20">
                        Price:
                      </span>
                      <span>${item.price.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-luxury-sienna text-sm mt-2 hover:underline focus-visible"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Quantity */}
                <div className="col-span-2 flex md:justify-center">
                  <div className="flex items-center md:block">
                    <span className="text-sm text-luxury-charcoal/60 w-20 md:hidden">
                      Quantity:
                    </span>
                    <div className="inline-flex border border-luxury-charcoal/20">
                      <button
                        onClick={() =>
                          item.quantity > 1 &&
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1 hover:bg-[#f6f1eb] /50 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 hover:bg-[#f6f1eb] /50 transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Price - hidden on mobile */}
                <div className="col-span-2 text-right hidden md:block">
                  ${item.price.toLocaleString()}
                </div>

                {/* Total */}
                <div className="col-span-2 text-right">
                  <div className="flex items-center md:block">
                    <span className="text-sm text-luxury-charcoal/60 w-20 md:hidden">
                      Total:
                    </span>
                    <span>
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => clearCart()}
              className="text-luxury-charcoal/70 text-sm hover:text-luxury-sienna transition-colors duration-300 focus-visible"
            >
              Clear Shopping Bag
            </button>
            <Link
              href="/products"
              className="text-luxury-charcoal/70 text-sm hover:text-luxury-sienna transition-colors duration-300 focus-visible"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#f6f1eb] /30 p-6 lg:p-8">
            <h2 className="font-serif text-xl mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-luxury-charcoal/70">Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-luxury-charcoal/70">Shipping</span>
                <span>
                  {shippingCost === 0
                    ? 'Free'
                    : `$${shippingCost.toLocaleString()}`}
                </span>
              </div>
              {shippingCost > 0 && (
                <div className="text-sm text-luxury-charcoal/60 italic">
                  Free shipping on orders over $500
                </div>
              )}
            </div>

            <div className="border-t border-luxury-gold/10 pt-4 mb-6">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => router.push('/checkout')}
              className="w-full btn-primary mb-4"
            >
              Proceed to Checkout
            </button>

            <p className="text-xs text-center text-luxury-charcoal/60 mt-6">
              Shipping costs calculated at checkout. Taxes may apply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
