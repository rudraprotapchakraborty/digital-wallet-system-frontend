import React, { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";

const UserWithdraw = () => {
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
      await api.post("/wallet/withdraw", { amount: value });
      toast.success("Withdraw request submitted.");
      setAmount("");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Withdraw failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-xl space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Withdraw money
        </h1>
        <p
          className={`mt-2 text-sm ${
            dark ? "text-neutral-200" : "text-gray-600"
          }`}
        >
          Request a withdrawal from your wallet. In production this would
          trigger a cash-out or bank payout.
        </p>
      </div>

      {/* FORM */}
      <Card>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            label="Amount (₹)"
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Processing..." : "Withdraw"}
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default UserWithdraw;
