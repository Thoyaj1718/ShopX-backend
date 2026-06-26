# ShopX 

REST API backend for ShopX, a full-stack e-commerce platform. Built with Node.js, Express, and MongoDB, with JWT authentication and Razorpay payment integration.

**Live API:** [https://shopx-backend-u74h.onrender.com](https://shopx-backend-u74h.onrender.com)
**Frontend Repo:** [ShopX-frontend](https://github.com/Thoyaj1718/ShopX-frontend)

---

## Features

- JWT-based authentication with secure password hashing (bcrypt)
- Cookie-based session handling
- Product catalog with category, search, and sort filters
- Cart management (add, remove, clear, view)
- Order placement and order history
- Razorpay payment integration with server-side order creation and cryptographic signature verification
- MongoDB Atlas for cloud-hosted data persistence

---

## Tech Stack

| Category | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB (Mongoose) |
| Authentication | JWT, bcryptjs, cookie-parser |
| Payments | Razorpay |
| Deployment | Render |

---

## Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Register, login, logout
│   ├── productController.js  # Product listing & details
│   ├── cartController.js     # Cart CRUD operations
│   ├── orderController.js    # Order placement & history
│   └── paymentController.js  # Razorpay order creation & verification
├── middleware/
│   └── authMiddleware.js     # JWT route protection
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js
│   └── Order.js
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   └── paymentRoutes.js
├── server.js
└── .env
```

---

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and receive JWT cookie | No |
| POST | `/api/auth/logout` | Clear session cookie | Yes |
| GET | `/api/products` | Get all products (supports filters) | Yes |
| GET | `/api/products/:id` | Get single product | Yes |
| GET | `/api/cart` | Get current user's cart | Yes |
| POST | `/api/cart` | Add item to cart | Yes |
| DELETE | `/api/cart/:productId` | Remove item from cart | Yes |
| DELETE | `/api/cart` | Clear entire cart | Yes |
| POST | `/api/orders` | Place an order from current cart | Yes |
| GET | `/api/orders` | Get order history | Yes |
| POST | `/api/payment/create-order` | Create Razorpay order | Yes |
| POST | `/api/payment/verify` | Verify Razorpay payment signature | Yes |

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Razorpay account (test mode keys)

### Installation

```bash
git clone https://github.com/Thoyaj1718/ShopX-backend.git
cd ShopX-backend
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Running Locally

```bash
npm run dev
```

Server runs on `http://localhost:5000`.

### Seeding Sample Products

```bash
node config/seedProducts.js
```

---

## Deployment

This API is deployed on **Render** as a web service, with environment variables configured directly in the Render dashboard.

---

## Author

**K Thoyaj Kumar**
[GitHub](https://github.com/Thoyaj1718) | [LinkedIn](https://www.linkedin.com/in/thoyaj-kumar17)
