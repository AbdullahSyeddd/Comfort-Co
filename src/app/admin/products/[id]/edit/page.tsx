import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import ProductForm from "../../ProductForm";
import { updateProduct } from "../../actions";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();

  const { id } = await params;
  const productId = Number(id);
  if (Number.isNaN(productId)) notFound();

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) notFound();

  const updateProductWithId = updateProduct.bind(null, product.id);

  return (
    <div>
      <Link href="/admin/products" className="text-xs font-medium text-stone-500 hover:text-stone-700">
        &larr; Back to Products
      </Link>
      <h1 className="mt-3 font-serif text-3xl tracking-tight text-stone-900">Edit Product</h1>
      <p className="mt-1.5 text-sm text-stone-500">{product.title}</p>

      <ProductForm action={updateProductWithId} product={product} submitLabel="Save Changes" />
    </div>
  );
}
