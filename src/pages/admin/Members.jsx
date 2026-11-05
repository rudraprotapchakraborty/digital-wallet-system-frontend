import { useEffect, useState } from "react";
import api from "../../services/api";
import DataTable from "../../components/common/DataTable";
import Pagination from "../../components/common/Pagination";

export default function Members({ agents = false }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({ users: [], totalPages: 1 });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(null);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError("");
    api.get("/admin/users", { params: { role: agents ? "agent" : "user", page, search }, signal: controller.signal })
      .then(({ data }) => setResult(data))
      .catch(err => { if (!controller.signal.aborted) setError(err.response?.data?.message || "Could not load accounts."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [agents, search, page, refresh]);

  async function change(row) {
    setPending(row._id);
    try {
      const route = agents ? `agents/${row.isApproved ? "suspend" : "approve"}/${row._id}` : `wallets/${row.isBlocked ? "unblock" : "block"}/${row.walletId}`;
      await api.patch("/admin/" + route);
      setRefresh(n => n + 1);
    } catch (err) { setError(err.response?.data?.message || "Could not update account."); }
    finally { setPending(null); }
  }
  const columns = [
    { header: "Name", accessor: "name" }, { header: "Phone", accessor: "phone" },
    { header: "Status", render: row => agents ? (row.isApproved ? "Approved" : "Pending / suspended") : (row.isBlocked ? "Blocked" : "Active") },
    { header: "Action", render: row => <button className="chip" disabled={Boolean(pending) || (!agents && !row.walletId)} onClick={() => change(row)}>{agents ? (row.isApproved ? "Suspend" : "Approve") : (row.isBlocked ? "Unblock wallet" : "Block wallet")}</button> },
  ];
  return <section><h1 className="text-4xl font-semibold tracking-tight">{agents ? "Agents" : "Members"}</h1>
    <input className="filter-input my-5 max-w-md" aria-label="Search accounts" placeholder="Search name or phone" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}/>
    {error && <p role="alert" className="form-error">{error}</p>}
    <DataTable columns={columns} data={result.users} loading={loading}/><Pagination page={page} totalPages={result.totalPages} onChange={setPage}/>
  </section>;
}
