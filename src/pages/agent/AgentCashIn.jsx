import React, { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";

const AgentCashIn = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const [form, setForm] = useState({ phone: "", amount: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const value = Number(form.amount);
    if (!form.phone) return toast.error("Enter user phone.");
    if (!value || value <= 0) return toast.error("Enter a positive amount.");

    try {
      setLoading(true);
      await api.post("/agent/cash-in", {
        phone: form.phone,
        amount: value,
      });

      toast.success("Cash in successful.");
      setForm({ phone: "", amount: "" });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Cash in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-xl">
      {/* TITLE */}
      <h1
        className={`text-2xl font-bold tracking-tight ${
          dark ? "text-white" : "text-black"
        }`}
      >
        Cash In
      </h1>

      <p
        className={`mt-1 text-sm ${
          dark ? "text-neutral-300" : "text-gray-600"
        }`}
      >
        Add money to a user wallet using their phone number.
      </p>

      {/* FORM CARD */}
      <div
        className={`mt-6 rounded-xl border p-6
          ${
            dark
              ? "border-neutral-800 bg-neutral-900"
              : "border-gray-200 bg-white"
          }`}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="User phone number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="01XXXXXXXXX"
          />

          <Input
            label="Amount (₹)"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            placeholder="Enter amount"
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Processing..." : "Cash In"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AgentCashIn;
