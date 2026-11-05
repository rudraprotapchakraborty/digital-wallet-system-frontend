import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import DataTable from "./DataTable";
import FiltersBar from "./FiltersBar";
import Pagination from "./Pagination";

export default function TransactionHistory() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [rows, setRows] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError("");
    api.get(user.role === "admin" ? "/admin/transactions" : "/wallet/transactions", { params: { page, ...filters }, signal: controller.signal })
      .then(({ data }) => { setRows(data.transactions); setTotalPages(data.totalPages); })
      .catch(err => { if (!controller.signal.aborted) setError(err.response?.data?.message || "Could not load activity."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [user.role, page, filters]);
  const columns = [
    { header: "When", render: row => new Date(row.createdAt).toLocaleString() },
    { header: "Type", render: row => row.type === "send_money" && row.to === user.id ? "Received" : row.type.replaceAll("_", " ") },
    { header: "Amount", render: row => row.amount.toLocaleString("en-IN", { style: "currency", currency: "INR" }) },
    ...(user.role === "agent" ? [{ header: "Commission", render: row => "₹" + row.commission.toFixed(2) }] : []),
    ...(user.role === "admin" ? [{ header: "Participants", render: row => [row.from?.phone, row.to?.phone].filter(Boolean).join(" → ") }] : []),
    { header: "Status", accessor: "status" }, { header: "Reference", accessor: "_id" },
  ];
  return <section><h1 className="mb-6 text-4xl font-semibold tracking-tight">Transaction history</h1>
    <FiltersBar filters={filters} onChange={next => { setFilters(next); setPage(1); }}/>
    {error ? <p className="form-error" role="alert">{error}</p> : <DataTable columns={columns} data={rows} loading={loading}/>}
    <Pagination page={page} totalPages={totalPages} onChange={setPage}/>
  </section>;
}
