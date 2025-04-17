"use client";

import { useState } from "react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderStatus, setOrderStatus] = useState<null | {
    id: string;
    status: "processing" | "shipped" | "delivered";
    date: string;
    trackingNumber?: string;
    estimatedDelivery?: string;
  }>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orderId || !email) {
      setError("Please enter both order number and email");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      // In a real app, you would make an API call here
      // For demo purposes, we'll simulate a successful response
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock order status based on input
      if (orderId === "123456") {
        setOrderStatus({
          id: orderId,
          status: "shipped",
          date: "2023-05-15",
          trackingNumber: "TRK928374651",
          estimatedDelivery: "2023-05-20",
        });
      } else if (orderId === "789012") {
        setOrderStatus({
          id: orderId,
          status: "delivered",
          date: "2023-05-10",
          trackingNumber: "TRK827365498",
        });
      } else if (orderId === "345678") {
        setOrderStatus({
          id: orderId,
          status: "processing",
          date: "2023-05-18",
          estimatedDelivery: "2023-05-25",
        });
      } else {
        setError("No order found with this ID and email combination.");
      }
    } catch (e) {
      console.log(e);
      setError(
        "An error occurred while tracking your order. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-luxury min-h-[70vh]">
      <div className="max-w-2xl mx-auto mt-16">
        <h1 className="font-serif text-3xl text-center mb-8">
          Track Your Order
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mb-12 animate-fade-in bg-[#f6f1eb] /30 p-8"
        >
          <p className="text-luxury-charcoal/70 mb-6 text-center">
            Enter your order number and email address to track your order
            status.
          </p>

          <div className="space-y-6">
            <div>
              <label htmlFor="orderId" className="block text-sm mb-1">
                Order Number
              </label>
              <input
                type="text"
                id="orderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="input-luxury w-full"
                placeholder="e.g., 123456"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-luxury w-full"
                placeholder="e.g., name@example.com"
                required
              />
            </div>

            {error && <div className="text-red-500 text-sm py-2">{error}</div>}

            <button
              type="submit"
              className={`btn-primary w-full ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Tracking..." : "Track Order"}
            </button>
          </div>
        </form>

        {orderStatus && (
          <div className="animate-fade-in mt-8">
            <h2 className="font-serif text-xl mb-6">Order Status</h2>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-luxury-gold/10">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <p className="text-sm text-luxury-charcoal/60">
                    Order Number
                  </p>
                  <p className="font-medium">{orderStatus.id}</p>
                </div>
                <div>
                  <p className="text-sm text-luxury-charcoal/60">Order Date</p>
                  <p className="font-medium">
                    {new Date(orderStatus.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                {orderStatus.trackingNumber && (
                  <div>
                    <p className="text-sm text-luxury-charcoal/60">
                      Tracking Number
                    </p>
                    <p className="font-medium">{orderStatus.trackingNumber}</p>
                  </div>
                )}
                {orderStatus.estimatedDelivery && (
                  <div>
                    <p className="text-sm text-luxury-charcoal/60">
                      Estimated Delivery
                    </p>
                    <p className="font-medium">
                      {new Date(
                        orderStatus.estimatedDelivery,
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                )}
              </div>

              <div className="relative">
                <div className="absolute top-2 left-0 w-full h-[2px] bg-luxury-charcoal/10"></div>

                <div className="flex justify-between relative">
                  <div
                    className={`flex flex-col items-center z-10 ${orderStatus.status === "processing" || orderStatus.status === "shipped" || orderStatus.status === "delivered" ? "text-luxury-sienna" : "text-luxury-charcoal/30"}`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full mb-2 ${orderStatus.status === "processing" || orderStatus.status === "shipped" || orderStatus.status === "delivered" ? "bg-luxury-sienna" : "bg-luxury-charcoal/20"}`}
                    ></div>
                    <p className="text-sm font-medium">Processing</p>
                  </div>

                  <div
                    className={`flex flex-col items-center z-10 ${orderStatus.status === "shipped" || orderStatus.status === "delivered" ? "text-luxury-sienna" : "text-luxury-charcoal/30"}`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full mb-2 ${orderStatus.status === "shipped" || orderStatus.status === "delivered" ? "bg-luxury-sienna" : "bg-luxury-charcoal/20"}`}
                    ></div>
                    <p className="text-sm font-medium">Shipped</p>
                  </div>

                  <div
                    className={`flex flex-col items-center z-10 ${orderStatus.status === "delivered" ? "text-luxury-sienna" : "text-luxury-charcoal/30"}`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full mb-2 ${orderStatus.status === "delivered" ? "bg-luxury-sienna" : "bg-luxury-charcoal/20"}`}
                    ></div>
                    <p className="text-sm font-medium">Delivered</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-luxury-charcoal/70">
                  {orderStatus.status === "processing" &&
                    "Your order is being prepared for shipment."}
                  {orderStatus.status === "shipped" &&
                    "Your order is on its way to you!"}
                  {orderStatus.status === "delivered" &&
                    "Your order has been delivered. Enjoy your purchase!"}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <h3 className="font-serif text-xl mb-4">Need Assistance?</h3>
          <p className="text-luxury-charcoal/70 mb-4">
            If you have any questions about your order, please contact our
            customer service team.
          </p>
          <a
            href="mailto:service@bibiparis.com"
            className="text-luxury-sienna hover:underline focus-visible"
          >
            service@bibiparis.com
          </a>
        </div>
      </div>
    </div>
  );
}
