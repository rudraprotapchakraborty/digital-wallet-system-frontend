import React, { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import api from "../../services/api";
import toast from "react-hot-toast";

const UserSendMoney = () => {
  const [form, setForm] = useState({ receiver: "", amount: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = Number(form.amount);
    if (!form.receiver) return toast.error("Enter receiver phone or email.");
    if (!value || value <= 0) return toast.error("Enter a positive amount.");
    try {
      setLoading(true);
      await api.post("/wallet/send", {
        receiver: form.receiver,
        amount: value,
      });
      toast.success("Money sent successfully.");
      setForm({ receiver: "", amount: "" });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page form-page">
      <h1>Send money</h1>
      <form className="form" onSubmit={handleSubmit}>
        <Input
          label="Receiver phone or email"
          name="receiver"
          value={form.receiver}
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
          {loading ? "Sending..." : "Send"}
        </Button>
      </form>
    </section>
  );
};

export default UserSendMoney;
