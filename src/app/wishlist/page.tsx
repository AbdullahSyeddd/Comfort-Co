"use client";

import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  const { items, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

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
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        <h1 className="mt-6 font-serif text-3xl text-stone-900 dark:text-navy-100">Your wishlist is empty</h1>
        <p className="mt-2 text-sm text-stone-500 dark:text-navy-400">
          Save items you love so you can find them again later.
        </p>
        <Link href="/shop" className="btn-primary mt-6">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <span className="eyebrow">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
        Saved for later
      </span>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-stone-900 dark:text-navy-100">My Wishlist</h1>
      <p className="mt-2 text-sm text-stone-500 dark:text-navy-400">{items.length} item(s)</p>

      <ul className="mt-10 divide-y divide-stone-200 border-y border-stone-200 dark:divide-navy-800 dark:border-navy-800">
        {items.map((item) => (
          <li key={item.productId} className="flex gap-4 py-6">
            <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-stone-100 dark:bg-navy-800">
              <Image src={item.image} alt={item.title} fill className="object-cover" />
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <div>
                <p className="text-sm font-medium text-stone-800 dark:text-navy-200">{item.title}</p>
                <p className="mt-1 text-xs text-stone-400 dark:text-navy-500">{item.size}</p>
                <p className="mt-1 font-serif text-base text-stone-900 dark:text-navy-100">
                  Rs. {item.price.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    addToCart({
                      id: item.productId.toString(),
                      title: item.title,
                      price: item.price,
                      size: item.size,
                      image: item.image,
                    })
                  }
                  className="rounded-full bg-stone-900 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-stone-800 dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() =>
                    toggleWishlist({
                      id: item.productId,
                      title: item.title,
                      price: item.price,
                      size: item.size,
                      image: item.image,
                    })
                  }
                  className="text-xs font-medium text-stone-400 hover:text-red-600 dark:text-navy-500 dark:hover:text-red-400"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
