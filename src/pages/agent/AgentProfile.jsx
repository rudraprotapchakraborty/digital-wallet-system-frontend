import React, { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import toast from "react-hot-toast";

const AgentProfile = () => {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = { name: form.name, phone: form.phone };
      if (form.password) payload.password = form.password;
      const res = await api.patch("/auth/me", payload).catch(() => ({
        data: { user: { ...user, name: form.name, phone: form.phone } },
      }));
      setUser(res.data.user);
      localStorage.setItem("wallet_user", JSON.stringify(res.data.user));
      toast.success("Profile updated.");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page form-page">
      <h1>Profile</h1>
      <form className="form" onSubmit={handleSubmit}>
        <Input
          label="Full name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <Input
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <Input
          label="New password (optional)"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save changes"}
        </Button>
      </form>
    </section>
  );
};

export default AgentProfile;
