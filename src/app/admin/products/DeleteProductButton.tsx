"use client";

import { useState, useTransition } from "react";
import { deleteProduct } from "./actions";

export default function DeleteProductButton({ id, title }: { id: number; title: string }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setError(null);
    startTransition(async () => {
      const result = await deleteProduct(id);
      if (result?.error) setError(result.error);
    });
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleClick}
        disabled={isPending}
        className="text-xs font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>
      {error && <p className="max-w-[160px] text-right text-[11px] leading-tight text-red-600">{error}</p>}
    </div>
  );
}
