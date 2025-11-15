import React, { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import api from "../../services/api";
import toast from "react-hot-toast";

const UserDeposit = () => {
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
    <section className="page form-page">
      <h1>Deposit money</h1>
      <p>
        This simulates a deposit operation. In a real setup, this would be
        triggered by a payment gateway or agent cash-in.
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
          {loading ? "Processing..." : "Deposit"}
        </Button>
      </form>
    </section>
  );
};

export default UserDeposit;
