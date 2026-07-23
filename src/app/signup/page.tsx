"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    const signInRes = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (signInRes?.error) {
      router.push("/login");
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
          Join us
        </span>
        <h1 className="mt-4 font-serif text-4xl tracking-tight text-stone-900 dark:text-navy-100">
          Create Account
        </h1>
        <p className="mt-2 text-sm text-stone-500 dark:text-navy-400">
          Track orders and save your favorites for later.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card-premium mt-8 space-y-5 p-8">
        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-400">
            {error}
          </p>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-stone-700 dark:text-navy-300">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className="input-premium mt-1.5"
          />
        </div>

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
          <p className="mt-1.5 text-xs text-stone-400 dark:text-navy-500">At least 8 characters.</p>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-center text-sm text-stone-500 dark:text-navy-400">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-accent-600 hover:text-accent-700 dark:text-accent-400">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupForm />
    </Suspense>
  );
}
