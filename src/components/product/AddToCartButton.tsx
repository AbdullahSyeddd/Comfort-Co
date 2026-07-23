"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface AddToCartButtonProps {
  id: number;
  title: string;
  price: number;
  size: string;
  image: string;
  inStock: boolean;
}

export default function AddToCartButton({ id, title, price, size, image, inStock }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [added, setAdded] = useState(false);
  const wishlisted = isWishlisted(id);

  const handleAddToCart = () => {
    addToCart({ id: id.toString(), title, price, size, image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleToggleWishlist = () => {
    if (status !== "authenticated") {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }
    toggleWishlist({ id, title, price, size, image });
  };

  return (
    <div className="mt-10 flex items-center gap-3">
      <button
        onClick={handleAddToCart}
        disabled={!inStock}
        className={`flex flex-1 items-center justify-center gap-2 rounded-full py-4 text-base font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
          added
            ? "bg-green-700"
            : "bg-stone-900 hover:-translate-y-0.5 hover:bg-stone-800 hover:shadow-lg hover:shadow-stone-900/15"
        }`}
      >
        {added ? "Added to Cart ✓" : inStock ? "Add to Cart" : "Out of Stock"}
      </button>

      <button
        onClick={handleToggleWishlist}
        aria-label={wishlisted ? "Remove from wishlist" : "Save for later"}
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
          wishlisted
            ? "border-accent-300 bg-accent-50 text-accent-500"
            : "border-stone-300 text-stone-500 hover:border-accent-400 hover:text-accent-500"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={wishlisted ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={1.5}
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      </button>
    </div>
  );
}
