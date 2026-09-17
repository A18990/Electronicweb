import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  const body = await request.json()
  const required = ["product_name", "product_price", "customer_name", "phone", "email", "address", "ward", "city", "transaction_code"]
  if (required.some((key) => !String(body[key] ?? "").trim())) return NextResponse.json({ error: "Please complete every required field." }, { status: 400 })
  const productPrice = Number(body.product_price)
  if (!Number.isInteger(productPrice) || productPrice <= 0) return NextResponse.json({ error: "Invalid product price." }, { status: 400 })
  const supabase = await createClient()
  const { data, error } = await supabase.from("orders").insert({ ...body, product_price: productPrice, shipping_charge: 200, total_amount: productPrice + 200 }).select("id").single()
  if (error) return NextResponse.json({ error: "We could not save your order. Please try again." }, { status: 500 })
  return NextResponse.json({ id: data.id })
}
