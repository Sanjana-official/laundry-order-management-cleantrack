# laundry-order-management-cleantrack 🧺

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

# FILE MAP

cleantrack/ <br>
├── package.json &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← dependencies & npm scripts<br>
├── .env.example&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← environment variable template<br>
├── .gitignore<br>
├── README.md&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← full setup + deployment guide<br>
│<br>
├── server/<br>
│   ├── index.js&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← Express app entry point<br>
│   ├── db.js&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← MongoDB/Mongoose connection<br>
│   ├── seed.js&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← seeds demo users + orders<br>
│   ├── middleware/<br>
│   │   └── auth.js&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← JWT protect() + adminOnly()<br>
│   ├── models/<br>
│   │   ├── User.js&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← User schema (bcrypt, roles)<br>
│   │   └── Order.js&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← Order schema (garments, delivery, status)<br>
│   └── routes/<br>
│       ├── auth.js&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← login / register / me<br>
│       └── orders.js&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← full CRUD + search + dashboard<br>
│<br>
├── client/public/<br>
│   └── index.html&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← entire frontend (auth + app)<br>
│<br>
├── render.yaml&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← Render.com deploy config<br>
├── railway.toml&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← Railway deploy config<br>
└── Dockerfile&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← Docker / AWS / GCP<br>


## 🛠️ Tech Stack
🎨 Frontend: HTML, CSS, JavaScript (Vanilla)<br>
🟢 Backend: Node.js, Express.js<br>
🍃 Database: MongoDB (Mongoose)<br>
🔐 Auth: JWT, bcrypt.js<br>
🌐 Deployment: Render / Railway<br>

## Features Implemented

🔐 User Authentication (JWT + bcrypt)<br>
👥 Role-based access (Admin / Staff)<br>
📦 Order Management (Create, Read, Update, Delete)<br>
🔍 Search & Filter orders<br>
📊 Dashboard (order stats & revenue)<br>
⏱️ Estimated delivery tracking<br>
🌐 Full-stack integration (frontend + backend)<br>

## ⭐ Bonus Features Implemented

🌐 Built a full frontend using HTML/CSS/JavaScript (Vanilla)<br>
🔐 Implemented JWT-based authentication system<br>
🗄️ Integrated MongoDB for persistent storage of users and orders<br>
🔍 Added search functionality (by customer name, phone, and garment type)<br>
📅 Implemented estimated delivery date tracking<br>
🚀 Deployed the application on Render (deployment-ready full-stack setup)<br>

---

## 🤖 AI Usage Report

### Tools Used:

* ChatGPT (debugging, backend structure, API design)
* VS Code extensions
* Claude AI (code suggestions, logic improvements, and refactoring ideas)

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
<br>
<img width="1302" height="842" alt="image" src="https://github.com/user-attachments/assets/1ac17304-4870-421b-b093-7ff1fb5fd3c8" />
<br>
<img width="1312" height="832" alt="image" src="https://github.com/user-attachments/assets/aa22f7c4-b95a-4840-a74a-6877557614fc" />
<img width="1322" height="616" alt="image" src="https://github.com/user-attachments/assets/355a7ec3-dde8-445b-a83f-927300a212e4" />
<br>
<img width="1311" height="875" alt="image" src="https://github.com/user-attachments/assets/475e3d4c-7d11-4bd9-91af-8be7cd55180b" />


---

## 🌍 Live Demo

(After deployment)

```
https://your-app.onrender.com
```


## My Message

During this project, I went beyond the minimum requirements by building a fully functional full-stack system instead of just implementing isolated features. I focused on making the application realistic and usable, including authentication, database integration, and a complete order management workflow.

I also ensured proper separation between frontend and backend, handled API design issues, and debugged real integration problems between the UI and server. When issues appeared (such as authentication response mismatches and MongoDB connection errors), I didn’t rely only on AI suggestions—I analyzed, tested, and corrected them manually.

Additionally, I improved the user experience by adding search functionality, status tracking, and delivery date handling, which made the project closer to a real-world business system rather than just a basic CRUD app.

Overall, I treated this project as a product, not just an assignment, and focused on making it stable, usable, and deployment-ready.
