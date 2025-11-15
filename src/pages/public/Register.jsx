import React, { useState } from "react";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register, loading } = useAuth();
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
    if (!form.password || form.password.length < 6)
      e.password = "Password must be at least 6 characters";
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
    <section className="page form-page">
      <h1>Create account</h1>
      <form className="form" onSubmit={handleSubmit}>
        <Input
          label="Full name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />
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
    </section>
  );
};

export default Register;
