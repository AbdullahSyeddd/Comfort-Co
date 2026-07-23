import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/product/AddToCartButton";

// Next.js ke naye version mein params as Promise aate hain
export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Params ko pehle await karna zaroori hai
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id);

  // Agar ID number nahi hai, to 404 dikhao
  if (isNaN(productId)) {
    return notFound();
  }

  // 2. Database se dhondhna
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  // Agar database mein product na mile
  if (!product) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-[#fdfcfa] py-14 dark:bg-navy-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-xs text-stone-400 dark:text-navy-500">
          <Link href="/" className="hover:text-stone-600 dark:hover:text-navy-300">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-stone-600 dark:hover:text-navy-300">Shop</Link>
          <span>/</span>
          <span className="text-stone-600 dark:text-navy-400">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Side: Bari Image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-stone-100 shadow-xl shadow-stone-900/5 dark:bg-navy-800 dark:shadow-black/30">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Right Side: Product Details */}
          <div className="flex flex-col justify-center">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
              {product.size}
            </span>
            <h1 className="mt-3 font-serif text-4xl tracking-tight text-stone-900 dark:text-navy-100">{product.title}</h1>
            <p className="mt-4 font-serif text-2xl text-accent-600 dark:text-accent-400">Rs. {product.price.toLocaleString()}</p>

            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-900 dark:text-navy-100">Description</h3>
              <p className="mt-3 text-base leading-relaxed text-stone-500 dark:text-navy-400">
                {product.description || "Premium quality bedsheet for a comfortable night's sleep. Woven with the finest cotton to ensure durability and softness."}
              </p>
            </div>

            <AddToCartButton
              id={product.id}
              title={product.title}
              price={product.price}
              size={product.size}
              image={product.imageUrl}
              inStock={product.inStock}
            />

            {/* Stock Status */}
            <p className={`mt-4 flex items-center justify-center gap-1.5 text-center text-sm font-medium ${product.inStock ? 'text-green-700 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${product.inStock ? 'bg-green-600' : 'bg-red-600'}`} />
              {product.inStock ? "In Stock and ready to ship" : "Out of Stock"}
            </p>

            {/* Trust row */}
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-stone-200 pt-6 text-center dark:border-navy-800">
              {["Free Shipping", "30-Night Trial", "Secure Checkout"].map((label) => (
                <div key={label} className="text-xs font-medium text-stone-500 dark:text-navy-400">
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}