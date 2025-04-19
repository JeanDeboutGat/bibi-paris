import Image from 'next/image';
import { CartItem } from '@/lib/store';

type OrderSummaryProps = {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
};

export default function OrderSummary({
  items,
  subtotal,
  tax,
  total,
}: OrderSummaryProps) {
  return (
    <div className="bg-gray-50 p-6">
      <h2 className="text-lg font-medium mb-6">Order Summary</h2>

      {/* Item List */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-sm font-light">{item.name}</h3>
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
            </div>
            <div className="text-sm">
              ${(item.price * item.quantity).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span>${subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Estimated Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span>Free</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
