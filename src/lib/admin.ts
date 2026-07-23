import "server-only";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

/**
 * Secure authorization check for admin-only pages and Server Actions.
 * Proxy already performs an optimistic redirect for /admin routes, but per
 * Next.js data-security guidance that check must be re-verified close to
 * the data source since Proxy/layouts aren't guaranteed to re-run on every
 * request (e.g. direct Server Action calls).
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    redirect("/");
  }
  return session;
}
