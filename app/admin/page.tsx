"use client"

import { FormEvent, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

const ADMIN_EMAIL = "ramrajjnk75@gmail.com"

function getSupabase() {
  return createClient()
}

type Order = { id: string; created_at: string; product_name: string; total_amount: number; customer_name: string; phone: string; email: string; address: string; ward: string; city: string; transaction_code: string; status: string }

export default function AdminPage() {
  const [session, setSession] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [email, setEmail] = useState(ADMIN_EMAIL)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  async function load() { const response = await fetch("/api/admin/orders"); if (response.ok) { setSession(true); setOrders((await response.json()).orders) } }
  useEffect(() => { void load() }, [])
  async function signIn(event: FormEvent) { event.preventDefault(); setError(""); const { error } = await getSupabase().auth.signInWithPassword({ email, password }); if (error) { setError("Invalid email or password."); return } await load() }
  async function update(id: string, status: string) { await fetch("/api/admin/orders", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) }); await load() }
  if (!session) return <main className="min-h-screen bg-paper px-5 py-16 text-ink"><div className="mx-auto max-w-md rounded-[2rem] border border-slate/20 bg-white p-8 shadow-xl"><p className="font-mono text-xs uppercase tracking-[.2em] text-amber">Private area</p><h1 className="mt-3 text-3xl font-semibold text-petrol">Admin sign in</h1><p className="mt-2 text-sm text-slate">Use the store owner Supabase email and password.</p><form onSubmit={signIn} className="mt-8 grid gap-4"><label className="grid gap-2 text-sm font-medium text-petrol">Email<input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="rounded-xl border border-slate/25 px-4 py-3" /></label><label className="grid gap-2 text-sm font-medium text-petrol">Password<input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="rounded-xl border border-slate/25 px-4 py-3" /></label>{error && <p className="text-sm text-red-700">{error}</p>}<button className="rounded-full bg-petrol px-5 py-3 font-semibold text-white hover:bg-ink">Sign in</button></form></div></main>
  return <main className="min-h-screen bg-paper px-5 py-10 text-ink"><div className="mx-auto max-w-6xl"><div className="flex items-end justify-between"><div><p className="font-mono text-xs uppercase tracking-[.2em] text-amber">Operations</p><h1 className="mt-2 text-4xl font-semibold text-petrol">Orders</h1></div><button onClick={async () => { await getSupabase().auth.signOut(); setSession(false) }} className="rounded-full border border-slate/30 px-4 py-2 text-sm">Sign out</button></div><div className="mt-8 grid gap-4">{orders.map(order => <article key={order.id} className="rounded-2xl border border-slate/20 bg-white p-5"><div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="font-semibold text-petrol">{order.product_name}</h2><p className="mt-1 text-sm text-slate">{order.customer_name} · {order.phone} · {order.email}</p><p className="mt-2 text-sm">{order.address}, Ward {order.ward}, {order.city}</p><p className="mt-2 font-mono text-sm">NPR {order.total_amount.toLocaleString()} · TXN {order.transaction_code}</p></div><span className="rounded-full bg-paper px-3 py-1 text-xs uppercase">{order.status}</span></div><div className="mt-5 flex flex-wrap gap-2"><a href={`tel:${order.phone}`} className="rounded-full border border-petrol px-4 py-2 text-sm text-petrol">Call customer</a><a target="_blank" rel="noreferrer" href={`https://wa.me/${order.phone.replace(/\D/g, "")}`} className="rounded-full border border-emerald-700 px-4 py-2 text-sm text-emerald-800">WhatsApp</a>{order.status === "pending" && <><button onClick={() => update(order.id, "verified")} className="rounded-full bg-petrol px-4 py-2 text-sm text-white">Verify payment</button><button onClick={() => update(order.id, "rejected")} className="rounded-full border border-red-700 px-4 py-2 text-sm text-red-700">Reject</button></>}{order.status === "verified" && <button onClick={() => update(order.id, "shipped")} className="rounded-full bg-amber px-4 py-2 text-sm text-ink">Mark shipped</button>}</div></article>)}{!orders.length && <p className="rounded-2xl bg-white p-8 text-center text-slate">No orders yet.</p>}</div></div></main>
}
