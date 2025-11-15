import React, { useEffect, useState } from "react";
import api from "../../services/api";
import StatsCards from "../../components/common/StatsCards";
import Card from "../../components/ui/Card";
import SkeletonBlock from "../../components/common/SkeletonBlock";

const AgentDashboard = () => {
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
        {
          label: "Total handled tx",
          value: summary.totalTx,
        },
        {
          label: "Cash in",
          value: summary.cashIn,
        },
        {
          label: "Cash out",
          value: summary.cashOut,
        },
        {
          label: "Total commission",
          value: `₹${summary.commission.toFixed(2)}`,
        },
      ]
    : [];

  return (
    <section className="page">
      <h1>Agent overview</h1>
      {loading ? <SkeletonBlock height={130} /> : <StatsCards items={stats} />}
      <Card>
        <h3>Today’s focus</h3>
        <p>
          Help users deposit and withdraw cash efficiently. Keep an eye on
          pending operations in the Activity section.
        </p>
      </Card>
    </section>
  );
};

export default AgentDashboard;
