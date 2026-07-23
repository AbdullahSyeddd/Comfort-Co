export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <div className="text-center">
        <span className="eyebrow justify-center">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
          Contact
        </span>
        <h1 className="mt-4 font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl">
          Get in Touch
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-stone-500">
          Questions about an order, sizing, or just want to say hello? We'd
          love to hear from you.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr]">
        {/* Contact info */}
        <div className="space-y-8">
          {[
            { label: "Email", value: "hello@comfortandco.com" },
            { label: "Phone", value: "+1 (800) 555-0192" },
            { label: "Studio", value: "128 Weaver Street, Suite 4\nPortland, OR 97201" },
            { label: "Support Hours", value: "Mon – Fri, 9:00 AM – 6:00 PM (PST)" },
          ].map((item) => (
            <div key={item.label} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4.5 w-4.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </span>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-900">{item.label}</h3>
                <p className="mt-1 whitespace-pre-line text-sm text-stone-500">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <form className="card-premium space-y-5 p-8">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-stone-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your full name"
              className="input-premium mt-1.5"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-stone-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="input-premium mt-1.5"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-stone-700">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="How can we help?"
              className="input-premium mt-1.5 resize-none"
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}