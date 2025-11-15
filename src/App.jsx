import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Public pages
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Features from "./pages/public/Features";
import Pricing from "./pages/public/Pricing";
import Contact from "./pages/public/Contact";
import FAQ from "./pages/public/FAQ";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";

// Layout
import DashboardLayout from "./components/layout/DashboardLayout";

// User
import UserDashboard from "./pages/user/UserDashboard";
import UserTransactions from "./pages/user/UserTransactions";
import UserSendMoney from "./pages/user/UserSendMoney";
import UserDeposit from "./pages/user/UserDeposit";
import UserWithdraw from "./pages/user/UserWithdraw";
import UserProfile from "./pages/user/UserProfile";

// Agent
import AgentDashboard from "./pages/agent/AgentDashboard";
import AgentCashIn from "./pages/agent/AgentCashIn";
import AgentCashOut from "./pages/agent/AgentCashOut";
import AgentTransactions from "./pages/agent/AgentTransactions";
import AgentProfile from "./pages/agent/AgentProfile";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminAgents from "./pages/admin/AdminAgents";
import AdminTransactions from "./pages/admin/AdminTransactions";
import AdminSettings from "./pages/admin/AdminSettings";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User dashboard */}
          <Route
            path="/user"
            element={
              <ProtectedRoute roles={["user"]}>
                <DashboardLayout role="user" />
              </ProtectedRoute>
            }
          >
            <Route index element={<UserDashboard />} />
            <Route path="transactions" element={<UserTransactions />} />
            <Route path="send" element={<UserSendMoney />} />
            <Route path="deposit" element={<UserDeposit />} />
            <Route path="withdraw" element={<UserWithdraw />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>

          {/* Agent dashboard */}
          <Route
            path="/agent"
            element={
              <ProtectedRoute roles={["agent"]}>
                <DashboardLayout role="agent" />
              </ProtectedRoute>
            }
          >
            <Route index element={<AgentDashboard />} />
            <Route path="cash-in" element={<AgentCashIn />} />
            <Route path="cash-out" element={<AgentCashOut />} />
            <Route path="transactions" element={<AgentTransactions />} />
            <Route path="profile" element={<AgentProfile />} />
          </Route>

          {/* Admin dashboard */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <DashboardLayout role="admin" />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="agents" element={<AdminAgents />} />
            <Route path="transactions" element={<AdminTransactions />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
