"use client";

import { useState } from "react";
import Image from "next/image";

export default function OrderItemImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-stone-100 text-stone-300">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 3.75h18M4.5 3.75v16.5a1.5 1.5 0 001.5 1.5h12a1.5 1.5 0 001.5-1.5V3.75" />
        </svg>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      onError={() => setFailed(true)}
    />
  );
}
