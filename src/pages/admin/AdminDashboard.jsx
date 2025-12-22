import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useTheme } from "../../context/ThemeContext";
import StatsCards from "../../components/common/StatsCards";
import Card from "../../components/ui/Card";
import SkeletonBlock from "../../components/common/SkeletonBlock";

const AdminDashboard = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

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
      } catch (err) {
        console.error(err);
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
    <section
      className={`min-h-screen ${
        dark ? "bg-neutral-950 text-white" : "bg-white text-black"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Heading */}
        <h1 className="text-3xl font-extrabold tracking-tight">
          Admin overview
        </h1>

        <p
          className={`mt-2 text-sm ${
            dark ? "text-gray-200" : "text-gray-600"
          }`}
        >
          Monitor platform activity, users, and transactions in real time.
        </p>

        {/* Stats */}
        <div className="mt-8">
          {loading ? (
            <SkeletonBlock height={130} />
          ) : (
            <StatsCards items={stats} />
          )}
        </div>

        {/* Info Card */}
        <div className="mt-8 max-w-3xl">
          <Card>
            <h3
              className={`text-lg font-semibold ${
                dark ? "text-white" : "text-black"
              }`}
            >
              Network health
            </h3>

            <p
              className={`mt-3 text-sm ${
                dark ? "text-gray-100" : "text-gray-700"
              }`}
            >
              Use the Users, Agents, and Transactions sections to review
              suspicious activity, approve new agents, and monitor overall
              system stability.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
