# Nargis — Kashmiri crafts store (MERN)

An e-commerce store for handcrafted Kashmiri goods — pashmina, saffron, walnut wood, papier-mâché, copperware — built with MongoDB, Express, React and Node.

Deployed live at [https://azshop.onrender.com/](https://azshop.onrender.com/)

## Features

- Storefront with a custom design system (no UI framework), featured-product hero, search and pagination
- 21 seeded Kashmiri products in 6 browsable categories (Shawls & Stoles, Clothing, Food & Pantry, Utensils & Copperware, Home & Textiles, Arts & Crafts), with prices in ₹ (INR), reviews and star ratings
- Search matches product names, descriptions, craft houses and categories, with sort (price, rating, newest), price range and minimum-rating filters carried in the URL
- Front page closes with lines from Mahjoor, the poet of the Kashmir Valley
- Cart with quantity management; free shipping over ₹2,000, flat ₹99 otherwise, 5% GST
- Checkout with **Cash on Delivery** (default) or PayPal (sandbox)
- Product reviews from signed-in customers
- User profiles with order history
- Admin console: dashboard (revenue, orders, COD to collect, stock alerts, recent orders), product / order / user management, mark COD orders as paid, mark orders as delivered
- Database seeder with users, products and reviews (see `IMAGE_CREDITS.md` for photo sources)

## Tech

- **Frontend:** React 18 + Vite, Redux Toolkit (RTK Query), React Router 6, custom CSS
- **Backend:** Express 4, Mongoose 8, JWT auth (httpOnly cookie), Multer uploads

## Getting started

```bash
cp example.env .env    # then fill in MONGO_URI, JWT_SECRET, PayPal keys
npm install
npm install --prefix frontend

npm run data:import    # seed users, products, reviews (destroys existing data)
npm run dev            # backend on :5000, Vite dev server on :3000
```

Seeded logins (password `123456` for all): `admin@email.com` (admin), `aarav@email.com`, `priya@email.com`, …

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Run backend + frontend together |
| `npm run server` | Backend only (nodemon) |
| `npm run client` | Frontend only (Vite) |
| `npm run build` | Install everything and build the frontend to `frontend/dist` |
| `npm start` | Serve the API (and the built frontend when `NODE_ENV=production`) |
| `npm run data:import` / `data:destroy` | Seed / wipe the database |

## Deploying on Render

- **Build command:** `npm run build`
- **Start command:** `npm start`
- **Environment:** set `NODE_ENV=production` plus the variables from `example.env`
