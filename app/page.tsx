const products = [
  { name: "Orbit ANC Headphones", category: "Audio", price: "NPR 8,499", detail: "Adaptive noise cancelling · 40-hour battery" },
  { name: "Volt 65W GaN Charger", category: "Power", price: "NPR 3,299", detail: "Three ports · Compact travel design" },
  { name: "Frame 4K Webcam", category: "Workspace", price: "NPR 6,999", detail: "Auto framing · Dual microphones" },
  { name: "Pulse Mechanical Keyboard", category: "Workspace", price: "NPR 5,499", detail: "Hot-swap switches · USB-C wired" },
  { name: "Link Wi-Fi 6 Router", category: "Networking", price: "NPR 7,499", detail: "Whole-home coverage · Easy setup" },
  { name: "Echo Mini Speaker", category: "Audio", price: "NPR 2,899", detail: "Room-filling sound · 12-hour battery" },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="border-b border-slate/20 bg-paper/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 lg:px-8">
          <a href="/" className="font-mono text-sm font-bold tracking-tight text-petrol">ELECTRONICWEB<span className="text-amber">/</span></a>
          <div className="flex items-center gap-5 text-sm text-slate"><span className="hidden sm:inline">Kathmandu, Nepal</span><a href="#how-it-works" className="hover:text-petrol">How it works</a></div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 pb-12 pt-16 lg:px-8 lg:pt-24">
        <div className="max-w-3xl">
          <p className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-amber">Useful technology, without the noise</p>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-petrol sm:text-6xl">Good gear.<br /><span className="text-slate">Straightforward buying.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate sm:text-lg">Curated electronics for your everyday setup. Order as a guest, pay with your preferred local wallet, and we&apos;ll verify your payment before dispatch.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 lg:px-8" aria-labelledby="catalog-heading">
        <div className="mb-6 flex items-end justify-between border-b border-slate/20 pb-4"><div><p className="font-mono text-xs text-slate">01 / CATALOG</p><h2 id="catalog-heading" className="mt-1 text-2xl font-semibold text-petrol">Featured equipment</h2></div><span className="font-mono text-xs text-slate">{products.length} ITEMS</span></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => <article key={product.name} className="group flex min-h-72 flex-col justify-between border border-slate/20 bg-white p-5 transition hover:-translate-y-1 hover:border-petrol/50 hover:shadow-lg hover:shadow-petrol/5"><div><div className="mb-10 flex items-start justify-between"><span className="font-mono text-xs text-slate">0{index + 1}</span><span className="rounded-full bg-paper px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-slate">{product.category}</span></div><div className="mb-2 h-14 w-14 bg-petrol/10 p-3"><div className="h-full w-full border border-amber/70" /></div><h3 className="mt-4 text-lg font-semibold text-petrol">{product.name}</h3><p className="mt-1 text-sm text-slate">{product.detail}</p></div><div className="mt-6 flex items-center justify-between"><span className="font-mono text-sm font-bold text-ink">{product.price}</span><button className="bg-petrol px-4 py-2 text-sm font-medium text-white transition hover:bg-ink">Order now</button></div></article>)}
        </div>
      </section>

      <section id="how-it-works" className="border-y border-slate/20 bg-petrol text-white"><div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3 lg:px-8"><div><p className="font-mono text-xs text-amber">01</p><h2 className="mt-3 text-lg font-semibold">Choose your gear</h2><p className="mt-2 text-sm leading-6 text-white/65">Browse our practical, tested catalog.</p></div><div><p className="font-mono text-xs text-amber">02</p><h2 className="mt-3 text-lg font-semibold">Pay locally</h2><p className="mt-2 text-sm leading-6 text-white/65">Use eSewa, Khalti, or Fonepay at checkout.</p></div><div><p className="font-mono text-xs text-amber">03</p><h2 className="mt-3 text-lg font-semibold">We verify and ship</h2><p className="mt-2 text-sm leading-6 text-white/65">Share your transaction code; we confirm it before dispatch.</p></div></div></section>
      <footer className="mx-auto flex max-w-6xl justify-between px-5 py-8 font-mono text-[10px] uppercase tracking-wider text-slate lg:px-8"><span>Electronicweb / 2026</span><span>Guest checkout · Payment verified</span></footer>
    </main>
  )
}
