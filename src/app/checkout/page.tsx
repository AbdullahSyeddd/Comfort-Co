"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { items, cartTotal, clearCart } = useCart();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
  });

  useEffect(() => {
    if (session?.user) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || session.user?.name || "",
        email: prev.email || session.user?.email || "",
      }));
    }
  }, [session]);

  const shipping = cartTotal > 75 ? 0 : 9;
  const tax = Math.round(cartTotal * 0.08);
  const total = cartTotal + shipping + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async () => {
    if (!form.name || !form.email || !form.phone || !form.address || !form.city || !form.zip) {
      alert("Please fill in all required fields before placing your order.");
      return;
    }
    setError("");
    setPlacing(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: Number(item.id),
            quantity: item.quantity,
          })),
          shipping: form,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to place order");
      }

      const { orderId } = await res.json();
      clearCart();
      router.push(`/order-confirmed?orderId=${orderId}`);
    } catch {
      setError("Something went wrong placing your order. Please try again.");
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
        <h1 className="font-serif text-3xl text-stone-900">Your cart is empty</h1>
        <p className="mt-2 text-sm text-stone-500">Add some items before checking out.</p>
        <Link href="/shop" className="btn-primary mt-6">
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <h1 className="font-serif text-4xl tracking-tight text-stone-900">Checkout</h1>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
        {/* Left: forms */}
        <div className="space-y-10">
          {/* Contact */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-stone-900">Contact Information</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="Full Name *"
                className="input-premium"
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Email Address *"
                className="input-premium"
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="tel"
                placeholder="Phone Number *"
                className="input-premium sm:col-span-2"
              />
            </div>
          </section>

          {/* Shipping */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-stone-900">Shipping Address</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                type="text"
                placeholder="Street Address *"
                className="input-premium sm:col-span-2"
              />
              <input
                name="apartment"
                value={form.apartment}
                onChange={handleChange}
                type="text"
                placeholder="Apartment, suite, etc. (optional)"
                className="input-premium sm:col-span-2"
              />
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                type="text"
                placeholder="City *"
                className="input-premium"
              />
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                type="text"
                placeholder="State / Province"
                className="input-premium"
              />
              <input
                name="zip"
                value={form.zip}
                onChange={handleChange}
                type="text"
                placeholder="ZIP / Postal Code *"
                className="input-premium"
              />
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                className="input-premium text-stone-600"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Pakistan</option>
              </select>
            </div>
          </section>

          {/* Payment — Cash on Delivery only */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-stone-900">Payment Method</h2>
            <div className="mt-4">
              <div className="flex items-center justify-between rounded-xl border border-accent-400 bg-accent-50/50 px-4 py-3.5">
                <span className="flex items-center gap-3">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full border-4 border-accent-500" />
                  <span className="text-sm font-medium text-stone-800">Cash on Delivery</span>
                </span>
                <span className="text-xs text-stone-400">Pay when your order arrives</span>
              </div>
            </div>
          </section>
        </div>

        {/* Right: order summary — now pulled from real cart */}
        <div className="card-premium h-fit p-6">
          <h2 className="text-base font-semibold text-stone-900">Order Summary</h2>

          <ul className="mt-5 space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-stone-800">{item.title}</p>
                  <p className="text-xs text-stone-400">
                    {item.size} · Qty {item.quantity}
                  </p>
                </div>
                <p className="font-serif text-base text-stone-900">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>

          {/* Totals */}
          <div className="mt-6 space-y-2.5 border-t border-stone-200 pt-6 text-sm">
            <div className="flex justify-between text-stone-500">
              <span>Subtotal</span>
              <span>Rs. {cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-stone-500">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `Rs. ${shipping}`}</span>
            </div>
            <div className="flex justify-between text-stone-500">
              <span>Estimated Tax</span>
              <span>Rs. {tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t border-stone-200 pt-3 text-base font-semibold text-stone-900">
              <span>Total</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-center text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            onClick={handlePlaceOrder}
            disabled={placing}
            className="btn-primary mt-6 w-full disabled:opacity-60"
          >
            {placing ? "Placing Order..." : "Place Order"}
          </button>

          <p className="mt-4 text-center text-xs text-stone-400">
            <Link href="/cart" className="hover:text-accent-600">
              ← Back to Cart
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}