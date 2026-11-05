import React, { lazy, Suspense } from "react";
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
const Login = lazy(() => import("./pages/public/Login"));
const ForgotPassword = lazy(() => import("./pages/public/ForgotPassword"));
const Register = lazy(() => import("./pages/public/Register"));

// Layout
const DashboardLayout = lazy(() => import("./components/layout/DashboardLayout"));

// User
const UserDashboard = lazy(() => import("./pages/user/UserDashboard"));
const UserTransactions = lazy(() => import("./pages/user/UserTransactions"));
const UserSendMoney = lazy(() => import("./pages/user/UserSendMoney"));
const UserDeposit = lazy(() => import("./pages/user/UserDeposit"));
const UserWithdraw = lazy(() => import("./pages/user/UserWithdraw"));
const UserProfile = lazy(() => import("./pages/user/UserProfile"));

// Agent
const AgentDashboard = lazy(() => import("./pages/agent/AgentDashboard"));
const AgentCashIn = lazy(() => import("./pages/agent/AgentCashIn"));
const AgentCashOut = lazy(() => import("./pages/agent/AgentCashOut"));
const AgentTransactions = lazy(() => import("./pages/agent/AgentTransactions"));
const AgentProfile = lazy(() => import("./pages/agent/AgentProfile"));

// Admin
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminAgents = lazy(() => import("./pages/admin/AdminAgents"));
const AdminTransactions = lazy(() => import("./pages/admin/AdminTransactions"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />

      <main className="flex-1">
        <Suspense fallback={<p role="status" className="frame py-12">Loading wallet…</p>}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
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
            <Route path="profile" element={<UserProfile />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};


export default App;
