import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpRight } from "lucide-react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const currency = value => value.toLocaleString("en-IN", { style: "currency", currency: "INR" });
const labels = { add_money: "Deposits", withdraw: "Withdrawals", send_money: "Transfers", cash_in: "Cash in", cash_out: "Cash out", commission: "Commission" };

async function loadSummary(role, signal) {
  const get = async path => (await api.get(path, { signal })).data;
  if (role === "admin") {
    const [members, wallets, transactions] = await Promise.all([get("/admin/users"), get("/admin/wallets"), get("/admin/transactions")]);
    return { transactions, metrics: [["Members", members.length], ["Wallets", wallets.length], ["Transaction volume", currency(transactions.reduce((n, row) => n + row.amount, 0))]] };
  }
  const [transactions, account] = await Promise.all([get("/wallet/transactions"), get(role === "agent" ? "/agent/commission" : "/wallet/me")]);
  const metrics = role === "agent" ? [["Commission earned", currency(account.total)], ["Cash in", transactions.filter(t => t.type === "cash_in").length], ["Cash out", transactions.filter(t => t.type === "cash_out").length]] :
    [["Available balance", currency(account.balance)], ["Transactions", transactions.length], ["Wallet status", account.isBlocked ? "Blocked" : "Active"]];
  return { transactions, metrics };
}

export default function WalletOverview() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setError("");
    loadSummary(user.role, controller.signal).then(setData).catch(err => {
      if (!controller.signal.aborted) setError(err.response?.data?.message || "Could not load your dashboard.");
    });
    return () => controller.abort();
  }, [user.role, attempt]);
  if (error) return <p className="form-error" role="alert">{error} <button className="underline" onClick={() => setAttempt(n => n + 1)}>Retry</button></p>;
  if (!data) return <p role="status">Loading overview…</p>;
  const totals = new Map();
  data.transactions.forEach(row => totals.set(row.type, (totals.get(row.type) || 0) + row.amount));
  const chart = Array.from(totals, ([type, total]) => ({ name: labels[type] || type, total }));
  return <section><h1 className="text-4xl font-semibold tracking-tight">Wallet overview</h1>
    <div className="overview-metrics">{data.metrics.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
    <div className="overview-details"><article className="info-card"><div className="section-head"><h2>Recent activity</h2><Link className="text-action" to={`/${user.role}/transactions`}>History <ArrowUpRight size={15}/></Link></div>
      {data.transactions.length ? data.transactions.slice(0, 5).map(t => <div className="activity-line" key={t._id}><div><b>{t.type.replaceAll("_", " ")}</b><small>{new Date(t.createdAt).toLocaleString()}</small></div><strong>{currency(t.amount)}</strong></div>) : <p>Your transactions will appear here after your first wallet operation.</p>}
    </article><article className="info-card"><h2>Volume by type</h2>{chart.length ? <div className="mt-4 h-48"><ResponsiveContainer width="100%" height="100%"><BarChart data={chart}><XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0}/><Tooltip formatter={value => [currency(Number(value)), "Volume"]}/><Bar dataKey="total" fill="#438a67" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer></div> : <p>Activity totals will appear here when funds move.</p>}</article></div>
  </section>;
}
