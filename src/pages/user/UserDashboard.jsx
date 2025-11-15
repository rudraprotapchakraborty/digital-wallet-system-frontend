import React, { useEffect, useState } from "react";
import api from "../../services/api";
import StatsCards from "../../components/common/StatsCards";
import Card from "../../components/ui/Card";
import SkeletonBlock from "../../components/common/SkeletonBlock";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";

const UserDashboard = () => {
  const [wallet, setWallet] = useState(null);
  const [tx, setTx] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [wRes, tRes] = await Promise.all([
          api.get("/wallet/me"),
          api.get("/wallet/transactions", { params: { page: 1 } }),
        ]);
        setWallet(wRes.data);
        const tdata = tRes.data.transactions || tRes.data;
        setTx(tdata);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const stats = [
    {
      label: "Wallet balance",
      value: wallet ? `₹${wallet.balance.toFixed(2)}` : "—",
      sub: "Available balance",
    },
    {
      label: "Transactions (recent)",
      value: tx.length,
      sub: "Last page loaded",
    },
    {
      label: "Completed",
      value: tx.filter((t) => t.status === "completed").length,
      sub: "In recent activity",
    },
  ];

  const byType = ["add_money", "withdraw", "send"].map((type) => ({
    type,
    total: tx
      .filter((t) => t.type === type)
      .reduce((sum, t) => sum + (t.amount || 0), 0),
  }));

  return (
    <div className="page">
      <h1>User overview</h1>
      {loading ? <SkeletonBlock height={130} /> : <StatsCards items={stats} />}

      <div className="chart-grid" data-tour-id="chart-section">
        <Card>
          <h3>Volume by type</h3>
          {loading ? (
            <SkeletonBlock />
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={byType}>
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>
        <Card>
          <h3>Completed vs others</h3>
          {loading ? (
            <SkeletonBlock />
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={[
                    {
                      name: "Completed",
                      value: tx.filter((t) => t.status === "completed").length,
                    },
                    {
                      name: "Pending / reversed",
                      value: tx.filter((t) => t.status !== "completed").length,
                    },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
