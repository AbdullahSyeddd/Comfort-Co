import Link from "next/link";

export default async function OrderConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 shadow-sm dark:bg-green-500/10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="h-9 w-9 text-green-700 dark:text-green-400"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <span className="eyebrow mt-6 justify-center">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
        Order Confirmed
      </span>
      <h1 className="mt-3 font-serif text-3xl text-stone-900 dark:text-navy-100">Order Placed Successfully</h1>
      {orderId && (
        <p className="mt-2 text-sm font-medium text-stone-600 dark:text-navy-400">
          Order #{orderId}
        </p>
      )}
      <p className="mt-3 text-sm leading-relaxed text-stone-500 dark:text-navy-400">
        Thank you for your order! You'll pay via Cash on Delivery when it
        arrives. A confirmation email is on its way, and we'll begin preparing
        your bedding right away.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/orders" className="btn-outline">
          View My Orders
        </Link>
        <Link href="/shop" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
