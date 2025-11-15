# 📘 Digital Wallet System - Frontend

A modern digital wallet frontend application built with **React + Vite**, supporting three distinct user roles: **User**, **Agent**, and **Admin**. The system includes wallet management, cash-in/cash-out operations, money transfers, transaction history, and full admin controls.

---

# 🌍 Live URLs

### 🔗 Frontend (Live Deployment)
https://digital-wallet-system-frontend-topaz.vercel.app/

### 🔗 Backend API (Live Deployment)
https://digital-wallet-system-backend-nine.vercel.app/

---

# 🔐 Test Login Credentials

### Agent
```
Phone: 01700000000
Password: 12345678
```

### Agent
```
Phone: 01700000001
Password: 12345678
```

### User
```
Phone: 01700000002
Password: 12345678
```

---

# 📒 Project Overview

This project simulates a real-world digital wallet system with multiple roles and secure money transactions. It includes:

### 👤 User Features
- View wallet balance  
- Deposit, withdraw, send money  
- Transaction history (with filters + pagination)  
- Profile update  

### 🧾 Agent Features
- Cash-In to user (via phone)  
- Cash-Out from user (via phone)  
- Commission history  

### 🛠 Admin Features
- View system stats (users, transactions, volume)  
- Manage users (block/unblock)  
- Manage agents (approve/suspend)  
- View all transactions (search, filter, paginate)  
- System configuration (optional)  

### 🌐 Public Pages
- Home  
- About  
- Features  
- FAQ  
- Contact  
- Pricing  

---

# 🧰 Technology Stack

### Frontend
- **Vite + React 18**
- React Router v6
- Axios
- JWT Authentication
- React Hot Toast
- React Joyride
- Recharts
- Custom UI components
- Light/Dark theme toggle

### Backend
- Node.js + Express  
- MongoDB (Mongoose)  
- JWT-based Auth  
- Role-based Middleware  

---

# 📦 Project Structure

```
src/
│
├── components/
│   ├── ui/               # Buttons, Inputs, Cards
│   └── charts/           # Chart components
│
├── contexts/
│   └── AuthContext.jsx
│
├── pages/
│   ├── public/           # Home, About, Contact, FAQ
│   ├── auth/             # Login & Register
│   ├── user/             # User dashboard pages
│   ├── agent/            # Cash-In, Cash-Out, Commission
│   └── admin/            # Admin management pages
│
├── layouts/
│   ├── PublicLayout.jsx
│   ├── UserLayout.jsx
│   ├── AgentLayout.jsx
│   └── AdminLayout.jsx
│
├── services/
│   └── api.js            # Axios instance with token interceptor
│
└── App.jsx
```

---

# ⚙️ Setup Instructions

## 1️⃣ Clone the Repository
```bash
git clone <your-repo-url>
cd digital-wallet-system-frontend
```

## 2️⃣ Install Dependencies
```bash
npm install
```

## 3️⃣ Start Development Server
```bash
npm run dev
```

Local Development URL:
```
http://localhost:5173
```

---

# 🔧 Environment Variables

Create a `.env` file:

```
VITE_API_URL=https://digital-wallet-system-backend-nine.vercel.app/api
```

---

# 🔐 Authentication Flow

1. Login returns:  
   ```json
   { "token": "...", "role": "user/agent/admin" }
   ```
2. Token stored in `localStorage`  
3. User role stored in `localStorage`  
4. ProtectedRoute checks both  
5. Unauthorized users are redirected  

---

# 💸 Agent Cash-In / Cash-Out Format

Backend expects:

```json
{
  "phone": "02222222222",
  "amount": 100
}
```

---

# 🧪 Feature Checklist

### User
- View balance  
- Deposit / Withdraw  
- Send money  
- View transaction history  
- Profile settings  

### Agent
- Cash-in  
- Cash-out  
- Commission history  

### Admin
- Manage users  
- Manage agents  
- Manage transactions  
- View analytics  

---

# 🧩 Completed Features

✔ Responsive UI  
✔ Role-based dashboards  
✔ Toast notifications  
✔ Guided tour  
✔ Dark/Light mode  
✔ Error handling  
✔ Pagination  
✔ Charts  
✔ Skeleton loaders  

---

# 🚀 Deployment

### Frontend
Deployed on Vercel  
Automatic builds & environment variables supported.

### Backend
API Base URL:
```
https://digital-wallet-system-backend-nine.vercel.app/api
```

---

# 📄 License
This project is open-source for educational and demonstration purposes.

---
