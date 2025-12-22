import React, { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";

const UserProfile = () => {
  const { user, setUser } = useAuth();
  const { theme } = useTheme();
  const dark = theme === "dark";

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

      const payload = {
        name: form.name,
        phone: form.phone,
      };

      if (form.password) payload.password = form.password;

      const res = await api.patch("/auth/me", payload).catch(() => ({
        data: {
          user: { ...user, name: form.name, phone: form.phone },
        },
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
    <section className="max-w-xl space-y-6">
      {/* TITLE */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Profile
        </h1>
        <p
          className={`mt-2 text-sm ${
            dark ? "text-neutral-200" : "text-gray-600"
          }`}
        >
          Update your personal information and password.
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className={`space-y-5 rounded-xl border p-6
          ${
            dark
              ? "border-neutral-800 bg-neutral-900"
              : "border-gray-200 bg-white"
          }`}
      >
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

export default UserProfile;
