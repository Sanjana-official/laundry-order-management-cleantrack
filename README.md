# laundry-order-management-cleantrack

# CleanTrack 🧺

### Dry Cleaning Order Management System

---

## 🚀 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/Sanjana-official/cleantrack.git
cd cleantrack
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create `.env` file:

```
MONGODB_URI = your_mongodb_connection
JWT_SECRET = your_secret
PORT = 5000
```

### 4. Seed database (demo data)

```bash
node server/seed.js
```

### 5. Run the project

```bash
npm run dev
```

Open:

```
http://localhost:5000
```

---

## ✨ Features Implemented

* 🔐 User Authentication (JWT + bcrypt)
* 👥 Role-based access (Admin / Staff)
* 📦 Order Management (Create, Read, Update, Delete)
* 🔍 Search & Filter orders
* 📊 Dashboard (order stats & revenue)
* ⏱️ Estimated delivery tracking
* 🌐 Full-stack integration (frontend + backend)

---

## 🤖 AI Usage Report

### Tools Used:

* ChatGPT (debugging, backend structure, API design)
* VS Code extensions

### Sample Prompts:

* "How to implement JWT authentication in Node.js"
* "Fix MongoDB connection error ECONNREFUSED"
* "Connect frontend fetch API with Express backend"

### What AI Got Wrong:

* Initial API responses didn’t match frontend expectations
* Required manual debugging of auth response structure

### Improvements Made:

* Fixed backend response format
* Integrated frontend with API properly
* Added role-based access logic

---

## ⚖️ Tradeoffs

* Basic UI (focused more on functionality)
* No advanced error handling UI
* Limited validation on frontend

### With more time, I would:

* Improve UI/UX (animations, better design)
* Add notifications system
* Implement payment tracking
* Add multi-user dashboard

---

## 📸 Demo

* Screenshots of login, dashboard, orders
<img width="1478" height="873" alt="image" src="https://github.com/user-attachments/assets/e4c5c7bd-d87c-427c-8686-5d55d0135a1c" />
<img width="1051" height="822" alt="image" src="https://github.com/user-attachments/assets/25975203-85d3-4562-a8de-62e9e67f0095" />

<img width="1302" height="842" alt="image" src="https://github.com/user-attachments/assets/1ac17304-4870-421b-b093-7ff1fb5fd3c8" />
<img width="1312" height="832" alt="image" src="https://github.com/user-attachments/assets/aa22f7c4-b95a-4840-a74a-6877557614fc" />
<img width="1288" height="672" alt="image" src="https://github.com/user-attachments/assets/635f6663-26c0-4f2d-bfda-cd02913bf995" />
<img width="1311" height="875" alt="image" src="https://github.com/user-attachments/assets/475e3d4c-7d11-4bd9-91af-8be7cd55180b" />


---

## 🌍 Live Demo

(After deployment)

```
https://your-app.onrender.com
```
