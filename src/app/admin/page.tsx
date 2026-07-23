import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700",
  CONFIRMED: "bg-accent-50 text-accent-700",
  SHIPPED: "bg-blue-50 text-blue-700",
  DELIVERED: "bg-green-50 text-green-700",
  CANCELLED: "bg-red-50 text-red-700",
};

export default async function AdminDashboardPage() {
  await requireAdmin();

  const [orderCount, productCount, userCount, revenue, recentOrders] = await Promise.all([
    prisma.order.count(),
    prisma.product.count(),
    prisma.user.count(),
    prisma.order.aggregate({ _sum: { total: true } }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        shippingName: true,
        total: true,
        status: true,
        createdAt: true,
      },
    }),
  ]);

  const totalRevenue = revenue._sum.total ?? 0;

  const stats = [
    { label: "Total Revenue", value: `Rs. ${totalRevenue.toLocaleString()}` },
    { label: "Total Orders", value: orderCount.toLocaleString() },
    { label: "Total Products", value: productCount.toLocaleString() },
    { label: "Total Users", value: userCount.toLocaleString() },
  ];

  return (
    <div>
      <span className="eyebrow">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
        Overview
      </span>
      <h1 className="mt-3 font-serif text-3xl tracking-tight text-stone-900">Dashboard</h1>
      <p className="mt-1.5 text-sm text-stone-500">A snapshot of your store, live from the database.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card-premium p-6">
            <p className="text-xs font-medium uppercase tracking-wide text-stone-400">{stat.label}</p>
            <p className="mt-2 font-serif text-2xl text-stone-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="card-premium mt-8 overflow-hidden">
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4">
          <h2 className="text-sm font-semibold text-stone-900">Recent Orders</h2>
          <Link href="/admin/orders" className="text-xs font-medium text-accent-600 hover:text-accent-700">
            View all &rarr;
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-stone-400">No orders yet.</p>
        ) : (
          <ul className="divide-y divide-stone-200">
            {recentOrders.map((order) => (
              <li key={order.id} className="flex items-center justify-between gap-4 px-6 py-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-stone-900">
                    #{order.id} &middot; {order.shippingName}
                  </p>
                  <p className="mt-0.5 text-xs text-stone-400">
                    {order.createdAt.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[order.status]}`}>
                    {order.status}
                  </span>
                  <span className="w-24 text-right text-sm font-semibold text-stone-900">
                    Rs. {order.total.toLocaleString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
