import React, { useEffect, useState } from "react";
import api from "../../services/api";
import StatsCards from "../../components/common/StatsCards";
import Card from "../../components/ui/Card";
import SkeletonBlock from "../../components/common/SkeletonBlock";
import { useTheme } from "../../context/ThemeContext";

const AgentDashboard = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [txRes, comRes] = await Promise.all([
          api.get("/wallet/transactions", { params: { page: 1 } }),
          api.get("/agent/commission"),
        ]);

        const tx = txRes.data.transactions || txRes.data;

        setSummary({
          totalTx: tx.length,
          cashIn: tx.filter((t) => t.type === "cash_in").length,
          cashOut: tx.filter((t) => t.type === "cash_out").length,
          commission: comRes.data.total || 0,
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
        { label: "Total handled tx", value: summary.totalTx },
        { label: "Cash in", value: summary.cashIn },
        { label: "Cash out", value: summary.cashOut },
        {
          label: "Total commission",
          value: `₹${summary.commission.toFixed(2)}`,
        },
      ]
    : [];

  return (
    <section className="space-y-8">
      {/* HEADER */}
      <div>
        <h1
          className={`text-2xl font-bold tracking-tight ${
            dark ? "text-white" : "text-black"
          }`}
        >
          Agent overview
        </h1>
        <p
          className={`mt-1 text-sm ${
            dark ? "text-neutral-300" : "text-gray-600"
          }`}
        >
          Monitor your cash operations and earned commissions.
        </p>
      </div>

      {/* STATS */}
      {loading ? (
        <SkeletonBlock height={130} />
      ) : (
        <StatsCards items={stats} />
      )}

      {/* INFO CARD */}
      <Card>
        <h3
          className={`text-lg font-semibold ${
            dark ? "text-white" : "text-black"
          }`}
        >
          Today’s focus
        </h3>
        <p
          className={`mt-2 text-sm ${
            dark ? "text-neutral-200" : "text-gray-700"
          }`}
        >
          Help users deposit and withdraw cash efficiently. Keep an eye on
          pending operations in the Activity section to avoid delays.
        </p>
      </Card>
    </section>
  );
};

export default AgentDashboard;
