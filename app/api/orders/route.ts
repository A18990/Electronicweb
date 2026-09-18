import { NextResponse } from "next/server"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const requiredDetails = ["product_name", "product_price", "customer_name", "phone", "email", "address", "ward", "city"]

function getAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )
}

function validateDetails(body: Record<string, unknown>) {
  return requiredDetails.every((key) => String(body[key] ?? "").trim())
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>
    if (!validateDetails(body)) return NextResponse.json({ error: "Please complete your shipping details." }, { status: 400 })
    const productPrice = Number(body.product_price)
    if (!Number.isInteger(productPrice) || productPrice <= 0) return NextResponse.json({ error: "Invalid product price." }, { status: 400 })

    const id = crypto.randomUUID()
    const { error } = await getAdminClient().from("orders").insert({
      id, product_name: String(body.product_name).trim(), product_price: productPrice, shipping_charge: 200,
      total_amount: productPrice + 200, customer_name: String(body.customer_name).trim(), phone: String(body.phone).trim(),
      email: String(body.email).trim().toLowerCase(), address: String(body.address).trim(), ward: String(body.ward).trim(), city: String(body.city).trim(),
      transaction_code: null, status: "pending",
    })
    if (error) {
      console.error("[v0] Order details insert failed:", error.message)
      return NextResponse.json({ error: "We could not save your details. Please try again." }, { status: 500 })
    }
    return NextResponse.json({ id })
  } catch (error) {
    console.error("[v0] Order details request failed:", error)
    return NextResponse.json({ error: "We could not save your details. Please try again." }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>
    const id = String(body.id ?? "").trim()
    const transactionCode = String(body.transaction_code ?? "").trim()
    if (!id || !transactionCode) return NextResponse.json({ error: "Enter your eSewa transaction code." }, { status: 400 })
    const { error } = await getAdminClient().from("orders").update({ transaction_code: transactionCode }).eq("id", id)
    if (error) {
      console.error("[v0] Payment reference update failed:", error.message)
      return NextResponse.json({ error: "We could not update your payment reference." }, { status: 500 })
    }
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[v0] Payment update request failed:", error)
    return NextResponse.json({ error: "We could not update your payment reference." }, { status: 500 })
  }
}
