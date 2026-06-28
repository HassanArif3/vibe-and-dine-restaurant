# Vibe & Dine - Restaurant Website

A modern, fully responsive restaurant website built with React. Features a professional UI with menu browsing, online reservations, user authentication, and cart-based ordering.

## Features

- **Responsive Design** — Fully adaptive layout for desktop, tablet, and mobile
- **Menu System** — Browse items with category filtering, search, and add-to-cart
- **Table Reservations** — Online booking form with date/time/guest selection
- **User Authentication** — Login/signup with JWT-based auth (Express + MongoDB backend)
- **Shopping Cart** — Add/remove items, delivery details, place orders
- **Professional UI** — Clean typography, subtle warmth, smooth interactions

## Tech Stack

| Frontend | Backend |
|---|---|
| React 19 | Node.js + Express |
| React Router v7 | MongoDB + Mongoose |
| Framer Motion | JWT Authentication |
| Lucide React Icons | RESTful API |
| Vite | CORS |

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (optional — app runs with fallback mock data)

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/vibe-and-dine-restaurant.git
cd vibe-and-dine-restaurant

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running Locally

**Terminal 1 — Backend:**
```bash
cd backend
node server.js
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Environment Variables (Backend)

Create a `.env` file in the `backend` directory:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/vibe-dine
```

## Project Structure

```
vibe-and-dine-restaurant/
├── backend/
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoints
│   ├── server.js        # Express entry point
│   └── .env             # Environment variables
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # Navbar, Footer
│   │   ├── pages/       # Home, Menu, Reservation, Cart, Login, Signup
│   │   ├── context/     # App context (auth, cart state)
│   │   ├── assets/      # Images
│   │   ├── App.jsx      # Root component with routing
│   │   ├── index.css    # Global styles
│   │   └── main.jsx     # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```
