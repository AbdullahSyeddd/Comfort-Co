import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import OrderItemImage from "@/components/orders/OrderItemImage";

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700",
  CONFIRMED: "bg-accent-50 text-accent-700",
  SHIPPED: "bg-blue-50 text-blue-700",
  DELIVERED: "bg-green-50 text-green-700",
  CANCELLED: "bg-red-50 text-red-700",
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
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-stone-900">
        My Orders
      </h1>
      <p className="mt-2 text-sm text-stone-500">
        {orders.length} order{orders.length === 1 ? "" : "s"}
      </p>

      {orders.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 py-20 text-center">
          <p className="text-sm font-medium text-stone-700">
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
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
                <div>
                  <p className="text-sm font-semibold text-stone-900">
                    Order #{order.id}
                  </p>
                  <p className="mt-0.5 text-xs text-stone-500">
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
                    <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                      <OrderItemImage src={item.imageUrl} alt={item.title} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-stone-800">{item.title}</p>
                      <p className="text-xs text-stone-400">
                        {item.size} · Qty {item.quantity}
                      </p>
                    </div>
                    <p className="font-serif text-sm text-stone-900">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex justify-between border-t border-stone-200 pt-4 text-sm font-semibold text-stone-900">
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
