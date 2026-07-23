"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useTheme } from "@/context/ThemeContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="rounded-full p-2.5 text-stone-700 transition-colors hover:bg-stone-100 dark:text-navy-300 dark:hover:bg-navy-800"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-6.364-.386 1.591-1.591M3 12h2.25m.386-6.364 1.591 1.591M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 008.997-5.998z" />
        </svg>
      )}
    </button>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/70 bg-white/80 backdrop-blur-lg dark:border-navy-800/70 dark:bg-navy-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-1">
          <span className="font-serif text-2xl tracking-tight text-stone-900 dark:text-navy-100">
            Linen<span className="italic text-accent-500">&amp;Loom</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 dark:text-navy-400 dark:hover:text-navy-100"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right side: wishlist + cart + account + mobile toggle */}
        <div className="flex items-center gap-1">
          <ThemeToggle />

          <Link
            href="/wishlist"
            className="relative rounded-full p-2.5 text-stone-700 transition-colors hover:bg-stone-100 dark:text-navy-300 dark:hover:bg-navy-800"
            aria-label="Wishlist"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            {wishlistItems.length > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4.5 w-4.5 min-w-[18px] items-center justify-center rounded-full bg-accent-500 px-1 text-[10px] font-semibold text-white shadow-sm">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link
            href="/cart"
            className="relative rounded-full p-2.5 text-stone-700 transition-colors hover:bg-stone-100 dark:text-navy-300 dark:hover:bg-navy-800"
            aria-label="Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.994-4.693 2.608-7.164.087-.352-.186-.686-.548-.686H5.25M7.5 14.25L5.106 5.272M7.5 14.25L5.25 6M9.75 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm9 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4.5 w-4.5 min-w-[18px] items-center justify-center rounded-full bg-accent-500 px-1 text-[10px] font-semibold text-white shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Account */}
          <div className="relative hidden md:block">
            {status === "authenticated" ? (
              <>
                <button
                  onClick={() => setAccountMenuOpen((v) => !v)}
                  className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-accent-100 text-sm font-semibold text-accent-600 transition-colors hover:bg-accent-200 dark:bg-accent-500/20 dark:text-accent-400 dark:hover:bg-accent-500/30"
                  aria-label="Account menu"
                >
                  {(session.user?.name || session.user?.email || "?").charAt(0).toUpperCase()}
                </button>
                {accountMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 animate-fade-up rounded-xl border border-stone-200/80 bg-white py-2 shadow-lg shadow-stone-900/10 dark:border-navy-800 dark:bg-navy-900">
                    <Link
                      href="/orders"
                      onClick={() => setAccountMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 dark:text-navy-300 dark:hover:bg-navy-800"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        setAccountMenuOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-stone-700 hover:bg-stone-50 dark:text-navy-300 dark:hover:bg-navy-800"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link href="/login" className="ml-2 text-sm font-medium text-stone-600 hover:text-stone-900 dark:text-navy-400 dark:hover:text-navy-100">
                Log in
              </Link>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-md p-2 text-stone-700 hover:bg-stone-100 dark:text-navy-300 dark:hover:bg-navy-800 md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-6 w-6"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      {menuOpen && (
        <nav className="flex animate-fade-up flex-col gap-1 border-t border-stone-200 bg-white px-6 py-4 dark:border-navy-800 dark:bg-navy-950 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:text-navy-300 dark:hover:bg-navy-900"
            >
              {link.label}
            </Link>
          ))}
          <div className="my-1 border-t border-stone-200 dark:border-navy-800" />
          {status === "authenticated" ? (
            <>
              <Link
                href="/orders"
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:text-navy-300 dark:hover:bg-navy-900"
              >
                My Orders
              </Link>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="rounded-md px-3 py-2.5 text-left text-sm font-medium text-stone-700 hover:bg-stone-50 dark:text-navy-300 dark:hover:bg-navy-900"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:text-navy-300 dark:hover:bg-navy-900"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:text-navy-300 dark:hover:bg-navy-900"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
