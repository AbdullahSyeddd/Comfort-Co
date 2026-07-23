"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          className="h-16 w-16 text-stone-300 dark:text-navy-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.994-4.693 2.608-7.164.087-.352-.186-.686-.548-.686H5.25M7.5 14.25L5.106 5.272M7.5 14.25L5.25 6M9.75 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm9 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
        <h1 className="mt-6 font-serif text-3xl text-stone-900 dark:text-navy-100">Your cart is empty</h1>
        <p className="mt-2 text-sm text-stone-500 dark:text-navy-400">
          Looks like you haven't added anything yet.
        </p>
        <Link href="/shop" className="btn-primary mt-6">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const shipping = cartTotal > 75 ? 0 : 9;
  const tax = Math.round(cartTotal * 0.08);
  const total = cartTotal + shipping + tax;

  return (
    <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <h1 className="font-serif text-4xl tracking-tight text-stone-900 dark:text-navy-100">Your Cart</h1>
      <p className="mt-2 text-sm text-stone-500 dark:text-navy-400">{items.length} item(s)</p>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
        {/* Items list */}
        <ul className="divide-y divide-stone-200 border-y border-stone-200 dark:divide-navy-800 dark:border-navy-800">
          {items.map((item) => (
            <li key={item.id} className="flex gap-4 py-6">
              <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-stone-100 dark:bg-navy-800">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-stone-800 dark:text-navy-200">{item.title}</p>
                    <p className="mt-1 text-xs text-stone-400 dark:text-navy-500">{item.size}</p>
                  </div>
                  <p className="font-serif text-base text-stone-900 dark:text-navy-100">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  {/* Quantity stepper */}
                  <div className="flex items-center rounded-full border border-stone-300 dark:border-navy-700">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1.5 text-stone-600 hover:text-accent-600 dark:text-navy-400"
                    >
                      −
                    </button>
                    <span className="px-3 text-sm text-stone-800 dark:text-navy-200">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1.5 text-stone-600 hover:text-accent-600 dark:text-navy-400"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs font-medium text-stone-400 hover:text-red-600 dark:text-navy-500 dark:hover:text-red-400"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Order summary */}
        <div className="card-premium h-fit p-6">
          <h2 className="text-base font-semibold text-stone-900 dark:text-navy-100">Order Summary</h2>

          <div className="mt-5 space-y-2.5 text-sm">
            <div className="flex justify-between text-stone-500 dark:text-navy-400">
              <span>Subtotal</span>
              <span>Rs. {cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-stone-500 dark:text-navy-400">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `Rs. ${shipping}`}</span>
            </div>
            <div className="flex justify-between text-stone-500 dark:text-navy-400">
              <span>Estimated Tax</span>
              <span>Rs. {tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t border-stone-200 pt-3 text-base font-semibold text-stone-900 dark:border-navy-800 dark:text-navy-100">
              <span>Total</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>
          </div>

          <Link href="/checkout" className="btn-primary mt-6 w-full">
            Proceed to Checkout
          </Link>

          <Link
            href="/shop"
            className="mt-4 block text-center text-xs text-stone-400 hover:text-accent-600 dark:text-navy-500"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}