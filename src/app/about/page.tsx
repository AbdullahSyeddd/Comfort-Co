const values = [
  {
    title: "Sustainably Sourced",
    desc: "Our cotton is grown using low-impact farming practices, sourced from certified partner farms.",
  },
  {
    title: "Woven for Longevity",
    desc: "Every sheet undergoes 200+ hours of quality testing to withstand years of washing and use.",
  },
  {
    title: "Fair Craftsmanship",
    desc: "We partner with family-run mills that pay fair wages and uphold ethical labor standards.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <span className="eyebrow justify-center">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
          Our Story
        </span>
        <h1 className="mt-4 font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl dark:text-navy-100">
          Woven with care, <span className="italic text-accent-500">since day one.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-stone-500 dark:text-navy-400">
          Linen &amp; Loom began with a simple frustration — finding bedding
          that was genuinely soft, durable, and honestly made. So we set out
          to create it ourselves, sheet by sheet.
        </p>
      </div>

      {/* Story image */}
      <div className="mt-12 aspect-[16/7] w-full overflow-hidden rounded-3xl bg-stone-100 shadow-xl shadow-stone-900/5 dark:bg-navy-800 dark:shadow-black/30">
        <img
          src="https://placehold.co/1200x525/e3e6df/78716c?text=Our+Workshop"
          alt="Comfort & Co workshop"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Story text */}
      <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl text-stone-900 dark:text-navy-100">How it started</h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-500 dark:text-navy-400">
            What began as a small idea between two friends who couldn't find
            bedding that lived up to its promises has grown into a brand
            trusted by thousands of households. We visited mills, tested
            hundreds of fabric samples, and refused to compromise on feel or
            durability.
          </p>
        </div>
        <div>
          <h2 className="font-serif text-2xl text-stone-900 dark:text-navy-100">
            Our material promise
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-500 dark:text-navy-400">
            Every product we sell is made from 100% long-staple natural
            fibers — cotton, linen, and Tencel — chosen for breathability and
            softness that only improves with every wash.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="mt-20">
        <h2 className="text-center font-serif text-3xl tracking-tight text-stone-900 dark:text-navy-100">
          What we stand for
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="card-premium p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-900/10"
            >
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-accent-50 font-serif italic text-accent-500 dark:bg-accent-500/10">
                {value.title[0]}
              </span>
              <h3 className="mt-4 text-sm font-semibold text-stone-900 dark:text-navy-100">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-500 dark:text-navy-400">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}