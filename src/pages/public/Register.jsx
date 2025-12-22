import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const { register, loading } = useAuth();
  const { theme } = useTheme();
  const dark = theme === "dark";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
    role: "user",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.name) e.name = "Name is required";
    if (!form.phone) e.phone = "Phone is required";
    if (!form.password || form.password.length < 6) {
      e.password = "Password must be at least 6 characters";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await register(form);
    navigate("/login");
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
          Create account
        </h1>

        <p
          className={`mt-4 text-lg ${
            dark ? "text-gray-100" : "text-gray-700"
          }`}
        >
          Set up your wallet and start making digital payments in minutes.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <Input
              label="Full name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <Input
              label="Phone number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
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

          <Select
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="agent">Agent</option>
          </Select>

          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Register;
