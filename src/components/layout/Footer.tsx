import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="font-serif text-xl tracking-tight text-stone-900">
              Comfort<span className="italic text-accent-500"> and Co</span>
            </span>
            <p className="mt-3 text-sm leading-relaxed text-stone-500">
              Thoughtfully woven bedding, made from premium natural fibers for
              a better night's sleep.
            </p>
            <div className="mt-5 flex gap-3">
              {["Instagram", "Facebook", "Pinterest"].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 text-stone-500 transition-colors hover:border-accent-400 hover:text-accent-600"
                >
                  <span className="text-xs font-semibold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-900">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Shop", href: "/shop" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-500 transition-colors hover:text-accent-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer support */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-900">Customer Support</h3>
            <ul className="mt-4 space-y-3 text-sm text-stone-500">
              <li>
                <Link href="/privacy" className="transition-colors hover:text-accent-600">
                  Privacy Policy
                </Link>
              </li>
              <li>Shipping &amp; Returns</li>
              <li>Size Guide</li>
              <li>FAQs</li>
              <li className="pt-2">
                <a href="mailto:hello@comfortandco.com" className="hover:text-accent-600">
                  hello@comfortandco.com
                </a>
              </li>
              <li>+1 (800) 555-0192</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-900">Stay in Touch</h3>
            <p className="mt-4 text-sm text-stone-500">
              Get 10% off your first order and early access to new arrivals.
            </p>
            <form className="mt-4 flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="input-premium rounded-full"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-800"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-stone-200 pt-8 sm:flex-row">
          <p className="text-xs text-stone-400">
            © {new Date().getFullYear()} Comfort and Co. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs font-medium text-stone-400">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}