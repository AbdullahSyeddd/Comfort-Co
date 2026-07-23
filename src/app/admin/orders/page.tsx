import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import OrderStatusSelect from "./OrderStatusSelect";

export default async function AdminOrdersPage() {
  await requireAdmin();

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div>
      <span className="eyebrow">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
        Fulfillment
      </span>
      <h1 className="mt-3 font-serif text-3xl tracking-tight text-stone-900">Orders</h1>
      <p className="mt-1.5 text-sm text-stone-500">
        {orders.length} order{orders.length === 1 ? "" : "s"} placed
      </p>

      <div className="card-premium mt-8 overflow-hidden">
        {orders.length === 0 ? (
          <p className="px-6 py-16 text-center text-sm text-stone-400">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-stone-200 bg-stone-50/60 text-xs uppercase tracking-wide text-stone-400">
                <tr>
                  <th className="px-6 py-3 font-medium">Order</th>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Items</th>
                  <th className="px-6 py-3 font-medium">Total</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50/60">
                    <td className="px-6 py-3 font-medium text-stone-900">#{order.id}</td>
                    <td className="px-6 py-3 text-stone-700">
                      <p>{order.shippingName}</p>
                      <p className="text-xs text-stone-400">{order.shippingEmail}</p>
                    </td>
                    <td className="px-6 py-3 text-stone-600">
                      {order.createdAt.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-3 text-stone-600">{order.items.length}</td>
                    <td className="px-6 py-3 font-medium text-stone-900">
                      Rs. {order.total.toLocaleString()}
                    </td>
                    <td className="px-6 py-3">
                      <OrderStatusSelect orderId={order.id} status={order.status} />
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
