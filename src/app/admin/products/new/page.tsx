import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import ProductForm from "../ProductForm";
import { createProduct } from "../actions";

export default async function NewProductPage() {
  await requireAdmin();

  return (
    <div>
      <Link href="/admin/products" className="text-xs font-medium text-stone-500 hover:text-stone-700">
        &larr; Back to Products
      </Link>
      <h1 className="mt-3 font-serif text-3xl tracking-tight text-stone-900">Add Product</h1>
      <p className="mt-1.5 text-sm text-stone-500">Create a new bedsheet listing.</p>

      <ProductForm action={createProduct} submitLabel="Create Product" />
    </div>
  );
}
