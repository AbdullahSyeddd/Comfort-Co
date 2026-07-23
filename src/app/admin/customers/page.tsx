import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export default async function AdminCustomersPage() {
  await requireAdmin();

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: { select: { orders: true } },
    },
  });

  return (
    <div>
      <span className="eyebrow">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
        People
      </span>
      <h1 className="mt-3 font-serif text-3xl tracking-tight text-stone-900">Customers</h1>
      <p className="mt-1.5 text-sm text-stone-500">
        {users.length} registered user{users.length === 1 ? "" : "s"}
      </p>

      <div className="card-premium mt-8 overflow-hidden">
        {users.length === 0 ? (
          <p className="px-6 py-16 text-center text-sm text-stone-400">No users yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-stone-200 bg-stone-50/60 text-xs uppercase tracking-wide text-stone-400">
                <tr>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Role</th>
                  <th className="px-6 py-3 font-medium">Orders</th>
                  <th className="px-6 py-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-stone-50/60">
                    <td className="px-6 py-3 font-medium text-stone-900">{user.name || "—"}</td>
                    <td className="px-6 py-3 text-stone-600">{user.email}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-accent-50 text-accent-700"
                            : "bg-stone-100 text-stone-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-stone-600">{user._count.orders}</td>
                    <td className="px-6 py-3 text-stone-600">
                      {user.createdAt.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
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
