import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { categories, testimonials } from "@/lib/products"; // 'products' ko yahan se hata diya kyunke ab hum DB use karenge
import Counter from "@/components/ui/Counter";
import { prisma } from "@/lib/prisma"; // Prisma import kiya

const trustBadges = [
  { label: "Free Shipping", desc: "On orders over Rs 2000" },
  { label: "Premium Cotton", desc: "100% long-staple fibers" },
  { label: "30-Night Trial", desc: "Risk-free returns" },
  { label: "Secure Checkout", desc: "Encrypted payments" },
];

const features = [
  {
    title: "Ethically Sourced Fibers",
    desc: "We work directly with certified mills that use sustainable farming and fair labor practices from farm to finished sheet.",
  },
  {
    title: "Engineered for Comfort",
    desc: "Every weave is tested for breathability and softness, so your bedding feels better with every single wash — not worse.",
  },
  {
    title: "Built to Last",
    desc: "Reinforced stitching and long-staple cotton mean our bedding is designed to outlast fast-fashion alternatives by years.",
  },
];

// Function ko 'async' kar diya taake database se data la sakein
export default async function Home() {
  // Database se asal products mangwana (latest 4 products)
  const dbProducts = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 4, // Sirf 4 products dikhayenge Featured section mein
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent-50/40 via-stone-50 to-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent-200/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-stone-300/20 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div className="animate-fade-up">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
              New Season Collection
            </span>
            <h1 className="mt-6 font-serif text-5xl font-medium leading-[1.05] tracking-tight text-stone-900 sm:text-6xl lg:text-7xl">
              Sleep in softness,
              <br />
              <span className="italic text-accent-500">wake up renewed.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-stone-500">
              Discover bedsheets woven from the world's finest cotton —
              breathable, durable, and designed for a better night's rest.
              Trusted by over 40,000 households across the country.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/shop" className="btn-primary">
                Shop Now
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Link>
              <Link href="/about" className="btn-outline">
                Our Story
              </Link>
            </div>

            {/* Quick stats */}
            <div className="mt-12 flex gap-10 border-t border-stone-200 pt-8">
              <div>
                <Counter value={40} suffix="K+" />
                <p className="mt-1 text-xs text-stone-500">Happy customers</p>
              </div>
              <div>
                <Counter value={4.9} decimals={1} suffix="/5" />
                <p className="mt-1 text-xs text-stone-500">Average rating</p>
              </div>
              <div>
                <Counter value={100} suffix="%" />
                <p className="mt-1 text-xs text-stone-500">Natural fibers</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-4 -z-10 rounded-[2rem] border border-accent-200/60 lg:-inset-6"
            />
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-stone-100 shadow-2xl shadow-stone-900/10 lg:aspect-square">
              <img
                src="https://placehold.co/900x900/ede8df/78716c?text=Comfort+and+Co"
                alt="Premium bedding lifestyle"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Floating trust card */}
            <div className="absolute -bottom-6 -left-6 hidden animate-fade-in items-center gap-3 rounded-2xl bg-white/90 p-4 shadow-xl shadow-stone-900/10 backdrop-blur sm:flex">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-100 text-accent-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.363 1.118l1.286 3.957c.3.922-.755 1.688-1.538 1.118l-3.367-2.447a1 1 0 00-1.176 0l-3.367 2.447c-.783.57-1.838-.196-1.538-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.062 9.385c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.958z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-900">4.9 / 5 rating</p>
                <p className="text-xs text-stone-500">From 12,000+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust banner */}
      <section className="border-y border-stone-200 bg-stone-50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-6 py-10 lg:grid-cols-4 lg:px-8">
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex flex-col items-center gap-2 rounded-2xl px-4 py-3 text-center transition-colors hover:bg-white sm:flex-row sm:text-left"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4.5 w-4.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-stone-900">{badge.label}</p>
                <p className="mt-0.5 text-xs text-stone-500">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by Category */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 text-center">
          <span className="eyebrow justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
            Collections
          </span>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-stone-900 sm:text-4xl">
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href="/shop"
              className="group relative overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-stone-900/10"
            >
              <div className="aspect-[4/5] w-full overflow-hidden bg-stone-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{cat.name}</p>
                  <p className="text-xs text-white/75">{cat.count} items</p>
                </div>
                <span className="flex h-8 w-8 shrink-0 translate-x-2 items-center justify-center rounded-full bg-white/90 text-stone-900 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Bestsellers (Ab yeh data DB se aayega) */}
      <section className="bg-stone-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                Bestsellers
              </span>
              <h2 className="mt-3 font-serif text-3xl tracking-tight text-stone-900 sm:text-4xl">
                Featured Bestsellers
              </h2>
              <p className="mt-2 text-sm text-stone-500">
                Our most-loved pieces, chosen by thousands of happy sleepers.
              </p>
            </div>
            <Link
              href="/shop"
              className="hidden items-center gap-1 text-sm font-medium text-accent-600 hover:text-accent-700 sm:flex"
            >
              View all
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {dbProducts.length === 0 ? (
              <p className="col-span-full text-stone-500">No products added yet...</p>
            ) : (
              dbProducts.map((product) => (
                <ProductCard 
                
                  key={product.id} 
                  id={product.id}
                  image={product.imageUrl}
                  title={product.title}
                  price={product.price}
                  size={product.size}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-14 text-center">
          <span className="eyebrow justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
            Why Comfort and Co
          </span>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-stone-900 sm:text-4xl">
            Quality you can feel, from the first night
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="text-center sm:text-left">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-50 text-lg font-serif italic text-accent-500 sm:mx-0 mx-auto">
                {feature.title[0]}
              </span>
              <h3 className="mt-4 text-base font-semibold text-stone-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative overflow-hidden bg-stone-900 py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14 text-center">
            <span className="eyebrow justify-center text-accent-400">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
              Testimonials
            </span>
            <h2 className="mt-3 font-serif text-3xl tracking-tight text-white sm:text-4xl">
              Loved by thousands of sleepers
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="relative rounded-2xl border border-stone-700 bg-stone-800/60 p-6 transition-colors hover:border-accent-500/40"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-stone-700">
                  <path d="M9.352 4C5.579 4 2.5 7.079 2.5 10.852c0 3.288 2.334 6.037 5.427 6.686-.135.42-.33.973-.552 1.516-.35.858.61 1.65 1.395 1.128 1.51-1.005 3.573-2.628 4.425-4.522.512-1.135.805-2.393.805-3.727C13.999 7.14 12.83 4 9.352 4zm11 0C16.579 4 13.5 7.079 13.5 10.852c0 3.288 2.334 6.037 5.427 6.686-.135.42-.33.973-.552 1.516-.35.858.61 1.65 1.395 1.128 1.51-1.005 3.573-2.628 4.425-4.522.512-1.135.805-2.393.805-3.727C24.999 7.14 23.83 4 20.352 4z" />
                </svg>
                <div className="mt-2 flex gap-1 text-accent-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.363 1.118l1.286 3.957c.3.922-.755 1.688-1.538 1.118l-3.367-2.447a1 1 0 00-1.176 0l-3.367 2.447c-.783.57-1.838-.196-1.538-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.062 9.385c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.958z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-stone-300">
                  &quot;{t.quote}&quot;
                </p>
                <div className="mt-5 flex items-center gap-3 border-t border-stone-700 pt-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-500/20 text-xs font-semibold text-accent-400">
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-stone-400">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent-50 via-stone-50 to-accent-100/60 px-8 py-14 text-center sm:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-accent-200/40 blur-3xl"
          />
          <span className="eyebrow justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
            Join the list
          </span>
          <h2 className="relative mt-3 font-serif text-3xl tracking-tight text-stone-900 sm:text-4xl">
            Get 10% off your first order
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-sm text-stone-500">
            Join our newsletter for early access to new collections, care
            tips, and exclusive offers.
          </p>
          <form className="relative mx-auto mt-6 flex max-w-md gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="input-premium rounded-full"
            />
            <button type="submit" className="btn-primary shrink-0">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}