"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { WishlistItem } from "@/types/wishlist";

interface ToggleProduct {
  id: number;
  title: string;
  price: number;
  size: string;
  image: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  isWishlisted: (productId: number) => boolean;
  toggleWishlist: (product: ToggleProduct) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    if (status !== "authenticated") {
      setItems([]);
      return;
    }
    fetch("/api/wishlist")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: WishlistItem[]) => setItems(data))
      .catch(() => setItems([]));
  }, [status]);

  const isWishlisted = (productId: number) =>
    items.some((i) => i.productId === productId);

  const toggleWishlist = async (product: ToggleProduct) => {
    if (status !== "authenticated") return;

    const already = isWishlisted(product.id);

    if (already) {
      setItems((prev) => prev.filter((i) => i.productId !== product.id));
      await fetch("/api/wishlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });
    } else {
      const optimistic: WishlistItem = {
        id: -product.id,
        productId: product.id,
        title: product.title,
        price: product.price,
        size: product.size,
        image: product.image,
      };
      setItems((prev) => [...prev, optimistic]);
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });
      if (res.ok) {
        const saved: WishlistItem = await res.json();
        setItems((prev) =>
          prev.map((i) => (i.productId === product.id ? saved : i))
        );
      }
    }
  };

  return (
    <WishlistContext.Provider value={{ items, isWishlisted, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
