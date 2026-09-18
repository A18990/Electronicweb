import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const requiredDetails = ["product_name", "product_price", "customer_name", "phone", "email", "address", "ward", "city"]

function validateDetails(body: Record<string, unknown>) {
  return requiredDetails.every((key) => String(body[key] ?? "").trim())
}

export async function POST(request: Request) {
  const body = await request.json() as Record<string, unknown>
  if (!validateDetails(body)) return NextResponse.json({ error: "Please complete your shipping details." }, { status: 400 })
  const productPrice = Number(body.product_price)
  if (!Number.isInteger(productPrice) || productPrice <= 0) return NextResponse.json({ error: "Invalid product price." }, { status: 400 })

  const supabase = await createClient()
  const { data, error } = await supabase.from("orders").insert({
    product_name: String(body.product_name), product_price: productPrice, shipping_charge: 200,
    total_amount: productPrice + 200, customer_name: String(body.customer_name), phone: String(body.phone),
    email: String(body.email), address: String(body.address), ward: String(body.ward), city: String(body.city),
    transaction_code: null, status: "pending",
  }).select("id").single()
  if (error) return NextResponse.json({ error: "We could not save your details. Please try again." }, { status: 500 })
  return NextResponse.json({ id: data.id })
}

export async function PATCH(request: Request) {
  const body = await request.json() as Record<string, unknown>
  const id = String(body.id ?? "").trim()
  const transactionCode = String(body.transaction_code ?? "").trim()
  if (!id || !transactionCode) return NextResponse.json({ error: "Enter your eSewa transaction code." }, { status: 400 })
  const supabase = await createClient()
  const { error } = await supabase.from("orders").update({ transaction_code: transactionCode }).eq("id", id)
  if (error) return NextResponse.json({ error: "We could not update your payment reference." }, { status: 500 })
  return NextResponse.json({ ok: true })
}
