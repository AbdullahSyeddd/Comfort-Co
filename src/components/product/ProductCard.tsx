"use client";

import React, { useState } from "react"; // Yahan React import kiya hai
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  id: number;
  image: string;
  title: string;
  price: number;
  size: string;
}

export default function ProductCard({ id, image, title, price, size }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [added, setAdded] = useState(false);
  const wishlisted = isWishlisted(id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Yeh link ko khulne se rokega jab customer sirf Add to Cart click kare
    addToCart({
      id: id.toString(),
      title: title,
      price: price,
      size: size,
      image: image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (status !== "authenticated") {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }
    toggleWishlist({ id, title, price, size, image });
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-[0_2px_10px_rgba(28,25,23,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/10">
      {/* Humne poore card ko Link mein wrap kar diya hai */}
      <Link href={`/product/${id}`} className="flex flex-1 flex-col">
        {/* Image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Wishlist */}
          <button
            onClick={handleToggleWishlist}
            aria-label={wishlisted ? "Remove from wishlist" : "Save for later"}
            className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition-all duration-300 ${
              wishlisted
                ? "text-accent-500 opacity-100"
                : "text-stone-500 opacity-0 hover:text-accent-500 group-hover:opacity-100"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={wishlisted ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-4 w-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>

          {/* Hover overlay Add to Cart */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-white/95 p-3 backdrop-blur-sm transition-transform duration-300 ease-out group-hover:translate-y-0">
            <button
              onClick={handleAddToCart}
              className={`flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium text-white transition-colors ${
                added ? "bg-green-700" : "bg-stone-900 hover:bg-stone-800"
              }`}
            >
              {added ? (
                "Added ✓"
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.994-4.693 2.608-7.164.087-.352-.186-.686-.548-.686H5.25M7.5 14.25L5.106 5.272M7.5 14.25L5.25 6M9.75 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm9 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-1 flex-col gap-1 p-4">
          <h3 className="text-sm font-medium text-stone-800">{title}</h3>
          <p className="text-xs text-stone-400">{size}</p>
          <p className="mt-1 font-serif text-lg text-stone-900">
            Rs. {price.toLocaleString()}
          </p>
        </div>
      </Link>
    </div>
  );
}