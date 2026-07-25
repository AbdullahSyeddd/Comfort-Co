"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { Product } from "@prisma/client";
import type { ProductFormState } from "./actions";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
      {pending ? "Saving..." : label}
    </button>
  );
}

export default function ProductForm({
  action,
  product,
  submitLabel,
}: {
  action: (state: ProductFormState, formData: FormData) => Promise<ProductFormState>;
  product?: Product;
  submitLabel: string;
}) {
  const [state, formAction] = useActionState(action, undefined);

  return (
    <form action={formAction} className="card-premium mt-8 max-w-2xl space-y-5 p-8">
      {state?.message && (
        <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">{state.message}</p>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-stone-700">
          Title
        </label>
        <input
          id="title"
          name="title"
          defaultValue={product?.title}
          required
          className="input-premium mt-1.5"
          placeholder="Egyptian Cotton Sateen Sheet Set"
        />
        {state?.errors?.title && <p className="mt-1 text-xs text-red-600">{state.errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-stone-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={product?.description ?? ""}
          rows={4}
          className="input-premium mt-1.5"
          placeholder="Premium quality bedsheet woven from the finest cotton..."
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-stone-700">
            Price (Rs.)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product?.price}
            required
            className="input-premium mt-1.5"
          />
          {state?.errors?.price && <p className="mt-1 text-xs text-red-600">{state.errors.price}</p>}
        </div>

        <div>
          <label htmlFor="size" className="block text-sm font-medium text-stone-700">
            Size
          </label>
          <input
            id="size"
            name="size"
            defaultValue={product?.size}
            required
            className="input-premium mt-1.5"
            placeholder="King Size, Queen, Single..."
          />
          {state?.errors?.size && <p className="mt-1 text-xs text-red-600">{state.errors.size}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-stone-700">
          Image URL
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="url"
          pattern="https?://.+"
          title="Please enter a valid HTTP/HTTPS URL (e.g. https://example.com/image.jpg), not a local file path."
          defaultValue={product?.imageUrl}
          required
          className="input-premium mt-1.5"
          placeholder="https://..."
        />
        <p className="mt-1 text-xs text-stone-500">
          Must be a public HTTP/HTTPS link (e.g. from an image host). Local file paths like{" "}
          <code>C:\Users\...</code> are not supported.
        </p>
        {state?.errors?.imageUrl && <p className="mt-1 text-xs text-red-600">{state.errors.imageUrl}</p>}
      </div>

      <label className="flex items-center gap-2.5 text-sm font-medium text-stone-700">
        <input
          type="checkbox"
          name="inStock"
          defaultChecked={product?.inStock ?? true}
          className="h-4 w-4 rounded border-stone-300 text-accent-500 focus:ring-2 focus:ring-accent-100"
        />
        In stock
      </label>

      <div className="flex items-center gap-3 pt-2">
        <SubmitButton label={submitLabel} />
        <a href="/admin/products" className="btn-outline">
          Cancel
        </a>
      </div>
    </form>
  );
}
