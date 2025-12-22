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
import { useTheme } from "../../context/ThemeContext";

const UserDashboard = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

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
        setTx(tRes.data.transactions || tRes.data);
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
      label: "Recent transactions",
      value: tx.length,
      sub: "Loaded activity",
    },
    {
      label: "Completed",
      value: tx.filter((t) => t.status === "completed").length,
      sub: "Successful transfers",
    },
  ];

  const byType = ["add_money", "withdraw", "send"].map((type) => ({
    type,
    total: tx
      .filter((t) => t.type === type)
      .reduce((sum, t) => sum + (t.amount || 0), 0),
  }));

  return (
    <section className="space-y-8">
      {/* TITLE */}
      <h1 className="text-2xl font-bold tracking-tight">
        User overview
      </h1>

      {/* STATS */}
      {loading ? (
        <SkeletonBlock height={130} />
      ) : (
        <StatsCards items={stats} />
      )}

      {/* CHARTS */}
      <div
        className="grid gap-6 md:grid-cols-2"
        data-tour-id="chart-section"
      >
        {/* BAR CHART */}
        <Card>
          <h3 className="mb-4 text-lg font-semibold">
            Volume by type
          </h3>

          {loading ? (
            <SkeletonBlock />
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={byType}>
                <XAxis
                  dataKey="type"
                  stroke={dark ? "#e5e7eb" : "#374151"}
                />
                <YAxis stroke={dark ? "#e5e7eb" : "#374151"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: dark ? "#0a0a0a" : "#ffffff",
                    border: "none",
                    color: dark ? "#ffffff" : "#000000",
                  }}
                />
                <Bar dataKey="total" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>

        {/* PIE CHART */}
        <Card>
          <h3 className="mb-4 text-lg font-semibold">
            Completed vs others
          </h3>

          {loading ? (
            <SkeletonBlock />
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={[
                    {
                      name: "Completed",
                      value: tx.filter(
                        (t) => t.status === "completed"
                      ).length,
                    },
                    {
                      name: "Pending / reversed",
                      value: tx.filter(
                        (t) => t.status !== "completed"
                      ).length,
                    },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                  fill="#3b82f6"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: dark ? "#0a0a0a" : "#ffffff",
                    border: "none",
                    color: dark ? "#ffffff" : "#000000",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>
    </section>
  );
};

export default UserDashboard;
