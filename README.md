<div align="center">

# 🌿 Evergreen Nursery — Backend Server

**Enterprise REST API & Database Engine for the Evergreen Nursery Botanical Platform.**  
*Scalable TypeScript backend built with Express.js, MongoDB (Mongoose), JWT Authentication, Zod Request Validation, Stripe Checkout, and Cloudinary Media Management.*

[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.21-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.9-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Zod](https://img.shields.io/badge/Zod-3.24-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)
[![Stripe](https://img.shields.io/badge/Stripe-API-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

[🚀 Live API Server](https://evergreen-nursery-server.vercel.app/) • [🌐 Live Frontend Client](https://evergreen-nursery-client.vercel.app/)

</div>

---

## 📑 Table of Contents
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Key Modules](#-key-modules)
- [Environment Configuration](#-environment-configuration)
- [Installation & Setup](#-installation--setup)
- [API Endpoints](#-api-endpoints)
- [Scripts](#-scripts)
- [License](#-license)

---

## 🏗 Architecture & Tech Stack

The server utilizes a modular 3-layer architecture (**Controller ──> Service ──> Model/Schema**) ensuring high maintainability and testability:
- **Express.js & TypeScript**: Type-safe HTTP request routing and middleware pipeline.
- **MongoDB & Mongoose**: Strongly typed models with schema indexes for high-speed queries.
- **Zod Validation**: Strict schema enforcement validating request bodies before hitting controllers.
- **JWT & Bcrypt**: Token-based authorization with HTTP-only cookies and bcrypt password hashing.
- **Stripe SDK**: Payment intent creation, order fulfillment, and transaction logging.
- **Cloudinary**: Cloud image uploads with Multer storage engines.

---

## 🔐 Environment Configuration

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/evergreen_nursery?retryWrites=true&w=majority

BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=your_jwt_access_secret_key_here
JWT_ACCESS_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here
JWT_REFRESH_EXPIRES_IN=30d

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
```

---

## 🚀 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Utsho11/evergreen-nursery-server.git
cd evergreen-nursery-server

# Install dependencies
npm install

# Start development server with auto-reload
npm run dev
```

---

## 📡 API Endpoints

Base URL: `/api/v1`

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Register customer account | Public |
| `POST` | `/auth/login` | Login user & issue JWT | Public |
| `GET` | `/plants` | Get all plants (filterable/paginated) | Public |
| `GET` | `/plants/:id` | Get plant by ID | Public |
| `POST` | `/plants` | Create new plant | Admin |
| `PATCH` | `/plants/:id` | Update plant details | Admin |
| `DELETE` | `/plants/:id` | Remove plant | Admin |
| `GET` | `/categories` | Fetch category list | Public |
| `POST` | `/categories` | Add new category | Admin |
| `POST` | `/orders/create-payment-intent` | Stripe payment intent | Authenticated |
| `GET` | `/orders/my-orders` | User order history | Customer |
| `GET` | `/orders` | All transactions | Admin |
| `GET` | `/blogs` | Get published articles | Public |
| `POST` | `/blogs` | Publish new blog | Authenticated |

---

## 📜 Scripts

- `npm run dev` — Starts local dev server with `ts-node-dev`.
- `npm run build` — Compiles TypeScript into JavaScript inside `dist/`.
- `npm run start` — Runs the compiled production code.
- `npm run lint:fix` — Formats and fixes ESLint warnings.

---

## 📄 License
This project is licensed under the **MIT License**.
