import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createClient as createAdminClient } from "@supabase/supabase-js"

const ADMIN_EMAIL = "ramrajjnk75@gmail.com"

async function authorized() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user?.email?.toLowerCase() === ADMIN_EMAIL
}

function adminDb() {
  return createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

export async function GET() {
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { data, error } = await adminDb().from("orders").select("id, created_at, product_name, product_price, shipping_charge, total_amount, customer_name, phone, email, address, ward, city, transaction_code, status").order("created_at", { ascending: false })
  if (error) return NextResponse.json({ error: "Could not load orders." }, { status: 500 })
  return NextResponse.json({ orders: data })
}

export async function PATCH(request: Request) {
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const body = await request.json()
  if (!body.id || !["pending", "verified", "rejected", "shipped"].includes(body.status)) return NextResponse.json({ error: "Invalid update." }, { status: 400 })
  const { error } = await adminDb().from("orders").update({ status: body.status }).eq("id", body.id)
  if (error) return NextResponse.json({ error: "Could not update order." }, { status: 500 })
  return NextResponse.json({ ok: true })
}
