"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

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
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({ id: id.toString(), title, price, size, image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={!inStock}
      className={`mt-10 flex w-full items-center justify-center gap-2 rounded-full py-4 text-base font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
        added
          ? "bg-green-700"
          : "bg-stone-900 hover:-translate-y-0.5 hover:bg-stone-800 hover:shadow-lg hover:shadow-stone-900/15"
      }`}
    >
      {added ? "Added to Cart ✓" : inStock ? "Add to Cart" : "Out of Stock"}
    </button>
  );
}
