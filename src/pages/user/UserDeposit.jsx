import React, { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";

const UserDeposit = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const value = Number(amount);
    if (!value || value <= 0) {
      return toast.error("Enter a positive amount.");
    }

    try {
      setLoading(true);
      await api.post("/wallet/add", { amount: value });
      toast.success("Deposit simulated successfully.");
      setAmount("");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Deposit failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-xl space-y-6">
      {/* TITLE */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Deposit money
        </h1>
        <p
          className={`mt-2 text-sm ${
            dark ? "text-neutral-200" : "text-gray-600"
          }`}
        >
          This simulates a deposit operation. In a real setup, this would be
          triggered by a payment gateway or agent cash-in.
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
          label="Amount (₹)"
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Deposit"}
        </Button>
      </form>
    </section>
  );
};

export default UserDeposit;
