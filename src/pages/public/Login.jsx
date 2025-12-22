import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login, loading } = useAuth();
  const { theme } = useTheme();
  const dark = theme === "dark";

  const [form, setForm] = useState({
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.phone) e.phone = "Phone is required";
    if (!form.password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const user = await login(form.phone, form.password);

    const redirect =
      location.state?.from?.pathname ||
      (user.role === "admin"
        ? "/admin"
        : user.role === "agent"
        ? "/agent"
        : "/user");

    navigate(redirect, { replace: true });
  };

  return (
    <section
      className={`min-h-screen pt-32 ${
        dark ? "bg-neutral-950" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-md px-6 pb-20">
        {/* Heading */}
        <h1
          className={`text-4xl font-extrabold tracking-tight ${
            dark ? "text-white" : "text-black"
          }`}
        >
          Login
        </h1>

        <p
          className={`mt-4 text-lg ${
            dark ? "text-gray-100" : "text-gray-700"
          }`}
        >
          Sign in to access your wallet and manage your transactions.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <Input
              label="Phone number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <Input
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password}
              </p>
            )}
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Login;
