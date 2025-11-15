import React, { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import api from "../../services/api";
import toast from "react-hot-toast";

const AgentCashOut = () => {
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

      await api.post("/agent/cash-out", {
        phone: form.phone,   // ← FIXED
        amount: value,       // ← FIXED
      });

      toast.success("Cash out successful.");
      setForm({ phone: "", amount: "" });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Cash out failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page form-page">
      <h1>Cash Out</h1>

      <form className="form" onSubmit={handleSubmit}>
        <Input
          label="User Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <Input
          label="Amount (₹)"
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Cash Out"}
        </Button>
      </form>
    </section>
  );
};

export default AgentCashOut;
