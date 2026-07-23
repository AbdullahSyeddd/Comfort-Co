"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const links = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
      </svg>
    ),
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    label: "Customers",
    href: "/admin/customers",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
];

function NavLinks({ pathname, onNavigate }: { pathname: string | null; onNavigate: () => void }) {
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname?.startsWith(href);

  return (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {links.map((link) => {
        const active = isActive(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-accent-50 text-accent-700"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            <span className={active ? "text-accent-600" : "text-stone-400"}>{link.icon}</span>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-stone-200/70 bg-white/90 px-5 py-3.5 backdrop-blur lg:hidden">
        <Link href="/admin" className="font-serif text-lg tracking-tight text-stone-900">
          Admin
        </Link>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className="rounded-md p-2 text-stone-700 hover:bg-stone-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="animate-fade-in fixed inset-0 z-30 bg-stone-900/20 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div
            className="flex h-full w-64 flex-col bg-white pt-6 pb-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <NavLinks pathname={pathname} onNavigate={() => setMobileOpen(false)} />
            <div className="mt-auto border-t border-stone-200 px-3 pt-4">
              <SidebarFooter userEmail={userEmail} />
            </div>
          </div>
        </div>
      )}

      {/* Desktop fixed sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-stone-200/70 bg-white lg:flex">
        <Link href="/admin" className="flex items-center gap-2 px-6 py-6">
          <span className="font-serif text-xl tracking-tight text-stone-900">Comfort &amp; Co</span>
        </Link>
        <p className="mb-4 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
          Admin
        </p>
        <NavLinks pathname={pathname} onNavigate={() => {}} />
        <div className="mt-auto border-t border-stone-200 px-3 py-4">
          <SidebarFooter userEmail={userEmail} />
        </div>
      </aside>
    </>
  );
}

function SidebarFooter({ userEmail }: { userEmail: string }) {
  return (
    <div className="space-y-3 px-1">
      <div className="flex items-center gap-2.5 px-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-100 text-xs font-semibold text-accent-600">
          {userEmail.charAt(0).toUpperCase()}
        </span>
        <span className="truncate text-xs text-stone-500">{userEmail}</span>
      </div>
      <Link
        href="/"
        className="block rounded-xl px-3.5 py-2 text-sm font-medium text-stone-600 hover:bg-stone-100 hover:text-stone-900"
      >
        &larr; Back to Store
      </Link>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="w-full rounded-xl px-3.5 py-2 text-left text-sm font-medium text-stone-600 hover:bg-stone-100 hover:text-stone-900"
      >
        Sign out
      </button>
    </div>
  );
}
