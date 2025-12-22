import React, { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";

const UserSendMoney = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const [form, setForm] = useState({
    receiver: "",
    amount: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const value = Number(form.amount);

    if (!form.receiver)
      return toast.error("Enter receiver phone or email.");
    if (!value || value <= 0)
      return toast.error("Enter a positive amount.");

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
    <section className="max-w-xl space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Send money
        </h1>
        <p
          className={`mt-2 text-sm ${
            dark ? "text-neutral-200" : "text-gray-600"
          }`}
        >
          Transfer funds instantly to another wallet user.
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
          {loading ? "Sending..." : "Send money"}
        </Button>
      </form>
    </section>
  );
};

export default UserSendMoney;
