import { requireAdmin } from "@/lib/admin";
import AdminSidebar from "./AdminSidebar";

export const metadata = {
  title: "Admin | Comfort and Co",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <AdminSidebar userEmail={session.user.email ?? ""} />
      <main className="lg:pl-64">
        <div className="mx-auto max-w-6xl px-5 py-8 lg:px-10 lg:py-10">{children}</div>
      </main>
    </div>
  );
}
