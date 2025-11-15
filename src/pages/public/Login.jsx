import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ phone: "", password: "" });
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
    <section className="page form-page">
      <h1>Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        <Input
          label="Phone number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </section>
  );
};

export default Login;
