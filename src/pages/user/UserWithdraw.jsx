import React, { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import api from "../../services/api";
import toast from "react-hot-toast";

const UserWithdraw = () => {
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
    <section className="page form-page">
      <h1>Withdraw money</h1>
      <p>
        Request a withdrawal from your wallet. In production this would
        trigger a cash-out or bank payout.
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <Input
          label="Amount (₹)"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Withdraw"}
        </Button>
      </form>
    </section>
  );
};

export default UserWithdraw;
