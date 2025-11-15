import React, { useEffect, useState } from "react";
import api from "../../services/api";
import StatsCards from "../../components/common/StatsCards";
import Card from "../../components/ui/Card";
import SkeletonBlock from "../../components/common/SkeletonBlock";

const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [usersRes, walletsRes, txRes] = await Promise.all([
          api.get("/admin/users"),
          api.get("/admin/wallets"),
          api.get("/admin/transactions"),
        ]);
        const users = usersRes.data.users || usersRes.data;
        const wallets = walletsRes.data.wallets || walletsRes.data;
        const tx = txRes.data.transactions || txRes.data;
        const volume = tx.reduce((sum, t) => sum + (t.amount || 0), 0);
        setSummary({
          users: users.length,
          wallets: wallets.length,
          txCount: tx.length,
          volume,
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const stats = summary
    ? [
        { label: "Total users", value: summary.users },
        { label: "Wallets", value: summary.wallets },
        { label: "Transactions", value: summary.txCount },
        { label: "Volume (₹)", value: summary.volume.toFixed(2) },
      ]
    : [];

  return (
    <section className="page">
      <h1>Admin overview</h1>
      {loading ? <SkeletonBlock height={130} /> : <StatsCards items={stats} />}
      <Card>
        <h3>Network health</h3>
        <p>
          Use the Users, Agents, and Transactions sections to review
          suspicious activity and approve new agents.
        </p>
      </Card>
    </section>
  );
};

export default AdminDashboard;
