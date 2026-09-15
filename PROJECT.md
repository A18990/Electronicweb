# Electronics store — no-account checkout

A storefront where buyers order without creating an account: pick a product,
pay directly through eSewa/Khalti/Fonepay, enter the transaction code. Orders
sit as "pending verification" until an admin checks the payment actually
arrived and confirms it. Fully separate project from Vinsera — no shared code
or accounts.

## Setup

1. Create a free project at supabase.com.
2. In the Supabase dashboard: SQL Editor → New query → paste in the contents
   of `supabase/schema.sql` → Run.
3. In the Supabase dashboard: Authentication → Add user → create your own
   admin login (an email + password).
4. In the Supabase dashboard: Table editor → `profiles` → insert a row with
   `id` = that new user's UUID (copy it from the Authentication page) and
   `role` = `admin`.
5. In the Supabase dashboard: Table editor → `products` → insert your real
   products (or leave empty for now — the site shows the 20 demo products
   from `lib/products.ts` automatically until real ones exist).
6. Copy `.env.local.example` to `.env.local` and fill in your project's URL
   and anon key (Project settings → API in the Supabase dashboard).
7. `npm install`, then `npm run dev` — open localhost:3000.
8. To deploy: push this repo to GitHub, connect it in Netlify, and add the
   same two env vars under Site settings → Environment variables.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase — Postgres database + Auth (admin login only; buyers stay anonymous)
- Netlify — hosting
- lucide-react — icons, used as placeholder product visuals until real photos exist

## Structure

```
app/
  page.tsx                 storefront — product grid
  admin/login/page.tsx     admin sign-in
  admin/dashboard/page.tsx order list + verify/reject
components/
  ProductCard.tsx          card with expandable specs + "Order now"
  CheckoutModal.tsx        3-step guest checkout (address → payment → tx code)
lib/
  products.ts              demo catalog, used until Supabase has real products
  supabase/client.ts       browser Supabase client
  supabase/server.ts       server Supabase client + admin role check
middleware → proxy.ts     blocks /admin/dashboard for signed-out visitors
supabase/schema.sql        tables + Row Level Security policies — run this first
```

Security notes worth remembering later: the `transaction_code` column is
`unique` at the database level, so the same code can never be reused across
two orders even if the app code has a bug. Only rows in `profiles` with
`role = 'admin'` can read order details — that's enforced by RLS, not by
the frontend, so it holds even against a direct API call.

## Log

#001 — 2026-09-14
Initial build: storefront, product cards, 3-step checkout modal, admin login
and dashboard, Supabase schema with RLS, Netlify config.

#002 — 2026-09-14
Caught and fixed a real security issue: the Next.js version this started on
had known CVEs. Upgraded the stack to current, compatible versions (Next
16.3.5, React 19, current Supabase/Tailwind packages) — 0 vulnerabilities on
a clean install. Switched fonts to self-hosted @fontsource packages instead
of fetching from Google Fonts at build time, one less external dependency.
Renamed middleware.ts to proxy.ts per Next 16's current convention. Full
typecheck and production build both verified clean.
