import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import DeleteProductButton from "./DeleteProductButton";

export default async function AdminProductsPage() {
  await requireAdmin();
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
            Catalog
          </span>
          <h1 className="mt-3 font-serif text-3xl tracking-tight text-stone-900">Products</h1>
          <p className="mt-1.5 text-sm text-stone-500">
            {products.length} product{products.length === 1 ? "" : "s"} in your store
          </p>
        </div>
        <Link href="/admin/products/new" className="btn-primary">
          + Add Product
        </Link>
      </div>

      <div className="card-premium mt-8 overflow-hidden">
        {products.length === 0 ? (
          <p className="px-6 py-16 text-center text-sm text-stone-400">
            No products yet. Add your first one to get started.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-stone-200 bg-stone-50/60 text-xs uppercase tracking-wide text-stone-400">
                <tr>
                  <th className="px-6 py-3 font-medium">Product</th>
                  <th className="px-6 py-3 font-medium">Size</th>
                  <th className="px-6 py-3 font-medium">Price</th>
                  <th className="px-6 py-3 font-medium">Stock</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-stone-50/60">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="h-12 w-10 shrink-0 rounded-lg bg-stone-100 object-cover"
                        />
                        <div className="min-w-0">
                          <p className="truncate font-medium text-stone-900">{product.title}</p>
                          <p className="text-xs text-stone-400">#{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-stone-600">{product.size}</td>
                    <td className="px-6 py-3 font-medium text-stone-900">
                      Rs. {product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          product.inStock ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
                        }`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center justify-end gap-4">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="text-xs font-medium text-accent-600 hover:text-accent-700"
                        >
                          Edit
                        </Link>
                        <DeleteProductButton id={product.id} title={product.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
