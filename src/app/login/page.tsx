"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <div className="text-center">
        <span className="eyebrow justify-center">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
          Welcome back
        </span>
        <h1 className="mt-4 font-serif text-4xl tracking-tight text-stone-900 dark:text-navy-100">
          Log In
        </h1>
        <p className="mt-2 text-sm text-stone-500 dark:text-navy-400">
          Sign in to view your orders and wishlist.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card-premium mt-8 space-y-5 p-8">
        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-400">
            {error}
          </p>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-stone-700 dark:text-navy-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            className="input-premium mt-1.5"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-stone-700 dark:text-navy-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
            className="input-premium mt-1.5"
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
          {loading ? "Signing in..." : "Log In"}
        </button>

        <p className="text-center text-sm text-stone-500 dark:text-navy-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-accent-600 hover:text-accent-700 dark:text-accent-400">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
