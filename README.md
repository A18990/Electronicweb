# Electronics Web Store

No-account checkout e-commerce platform built with Next.js, TypeScript, Supabase, and Tailwind CSS.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

See `PROJECT.md` for detailed setup instructions including Supabase database initialization.

## Project Structure

- **app/** - Next.js App Router pages and layouts
- **components/** - Reusable React components
- **lib/** - Utilities, Supabase clients, and product data
- **supabase/** - Database schema and migrations
- **public/** - Static assets

## Key Features

✅ Guest checkout (no account required)  
✅ Admin dashboard for order verification  
✅ Payment gateway integration (eSewa, Khalti, Fonepay)  
✅ Row-level security on Supabase  
✅ Server-side auth middleware  
✅ Responsive Tailwind design  

## Tech Stack

- Next.js 16.3.5
- React 19.3.0
- TypeScript 5.7.2
- Tailwind CSS 3.4.19
- Supabase 2.116.0
- Netlify deployment
