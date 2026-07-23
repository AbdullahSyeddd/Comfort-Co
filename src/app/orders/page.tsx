import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import OrderItemImage from "@/components/orders/OrderItemImage";

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  CONFIRMED: "bg-accent-50 text-accent-700 dark:bg-gold-500/10 dark:text-gold-400",
  SHIPPED: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  DELIVERED: "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  CANCELLED: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

const statusLabels: Record<string, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/orders");
  }

  const orders = await prisma.order.findMany({
    where: { userId: Number(session.user.id) },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-5xl px-6 py-14 lg:px-8">
      <span className="eyebrow">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
        Account
      </span>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-stone-900 dark:text-navy-100">
        My Orders
      </h1>
      <p className="mt-2 text-sm text-stone-500 dark:text-navy-400">
        {orders.length} order{orders.length === 1 ? "" : "s"}
      </p>

      {orders.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 py-20 text-center dark:border-navy-700">
          <p className="text-sm font-medium text-stone-700 dark:text-navy-300">
            You haven&apos;t placed any orders yet
          </p>
          <Link href="/shop" className="btn-primary mt-6">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-10 space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="card-premium p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4 dark:border-navy-800">
                <div>
                  <p className="text-sm font-semibold text-stone-900 dark:text-navy-100">
                    Order #{order.id}
                  </p>
                  <p className="mt-0.5 text-xs text-stone-500 dark:text-navy-400">
                    Placed on{" "}
                    {order.createdAt.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[order.status]}`}
                >
                  {statusLabels[order.status]}
                </span>
              </div>

              <ul className="mt-4 space-y-4">
                {order.items.map((item) => (
                  <li key={item.id} className="flex items-center gap-3">
                    <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-stone-100 dark:bg-navy-800">
                      <OrderItemImage src={item.imageUrl} alt={item.title} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-stone-800 dark:text-navy-200">{item.title}</p>
                      <p className="text-xs text-stone-400 dark:text-navy-500">
                        {item.size} · Qty {item.quantity}
                      </p>
                    </div>
                    <p className="font-serif text-sm text-stone-900 dark:text-navy-100">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex justify-between border-t border-stone-200 pt-4 text-sm font-semibold text-stone-900 dark:border-navy-800 dark:text-navy-100">
                <span>Total</span>
                <span>Rs. {order.total.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
