# JDDesigns E-Commerce Platform

Full-stack MERN e-commerce platform for custom metal design products, featuring a modern UI, secure payments, and a scalable backend architecture.

---

## 🚀 Overview

JDDesigns is a production-style e-commerce application built to handle custom metal product sales.  
It includes product management, cart functionality, secure checkout, and a complete backend API.

---

## ✨ Key Features

- 🛒 Product browsing and dynamic catalog
- 🧺 Shopping cart with Redux state management
- 💳 Secure payments with Stripe Checkout
- 👤 User-friendly checkout flow
- 🧾 Order creation and tracking
- 🛠️ Admin-ready backend structure (CRUD APIs)
- 📦 RESTful API with Express & MongoDB
- ⚡ Responsive frontend with modern UI

---

## 🧠 Architecture

### Frontend
- React (SPA)
- Redux for global state management (cart, UI state)
- Axios for API communication

### Backend
- Node.js + Express
- MongoDB with Mongoose
- REST API structure (controllers, routes, models)
- Error handling & middleware

### Payments
- Stripe Checkout integration
- Order persistence before payment
- Secure redirect flow with success/cancel handling

---

## 🔄 Application Flow

1. User browses products
2. Adds items to cart (Redux state)
3. Proceeds to checkout
4. Order is created in backend
5. Stripe session is generated
6. User completes payment via Stripe
7. Redirect to success page with order confirmation

---

## 🧰 Tech Stack

- **Frontend:** React, Redux, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Payments:** Stripe
- **Styling:** CSS / Tailwind (if used)

---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/rebeizantoine/jddesigns-ecommerce-platform.git
cd jddesigns-ecommerce-platform
