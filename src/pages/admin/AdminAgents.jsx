import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserCheck, 
  UserX, 
  ShieldCheck, 
  UserPlus, 
  Search, 
  Filter, 
  Users,
  AlertCircle,
  CheckCircle2,
  XCircle
} from "lucide-react";
import api from "../../services/api";
import { useTheme } from "../../context/ThemeContext";
import DataTable from "../../components/common/DataTable";
import FiltersBar from "../../components/common/FiltersBar";
import Pagination from "../../components/common/Pagination";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";

const AdminAgents = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const load = async () => {
    try {
      setLoading(true);
      const params = { page, ...filters, role: "agent" };
      const res = await api.get("/admin/users", { params });
      const data = res.data;

      setItems(data.users || data);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      toast.error("Failed to load agents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [page, JSON.stringify(filters)]);

  const changeStatus = async (agentId, isApproved) => {
    try {
      const url = isApproved
        ? `/admin/agents/suspend/${agentId}`
        : `/admin/agents/approve/${agentId}`;

      await api.patch(url);
      toast.success(isApproved ? "Agent suspended successfully." : "Agent approved for operation.");
      load();
    } catch {
      toast.error("Status update failed. Please check permissions.");
    }
  };

  const columns = [
    { 
      header: "Identity", 
      accessor: "name",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-black ${
            dark ? "bg-white/5 text-blue-400" : "bg-blue-50 text-blue-600"
          }`}>
            {row.name?.charAt(0)}
          </div>
          <div>
            <p className="font-bold tracking-tight">{row.name}</p>
            <p className="text-[10px] uppercase tracking-widest opacity-40">Agent ID: {row._id.slice(-6)}</p>
          </div>
        </div>
      )
    },
    { 
      header: "Phone Number", 
      accessor: "phone",
      render: (row) => <span className="font-mono text-xs opacity-70">{row.phone}</span>
    },
    {
      header: "Status",
      accessor: "isApproved",
      render: (row) => (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
          row.isApproved 
            ? (dark ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-emerald-50 text-emerald-600 border border-emerald-100")
            : (dark ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-amber-50 text-amber-600 border border-amber-100")
        }`}>
          {row.isApproved ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
          {row.isApproved ? "Approved" : "Pending"}
        </div>
      ),
    },
    {
      header: "Management",
      key: "actions",
      render: (row) => (
        <Button
          variant="outline"
          onClick={() => changeStatus(row._id, row.isApproved)}
          className={`h-9 px-4 text-[11px] font-black uppercase tracking-widest transition-all ${
            row.isApproved 
              ? "hover:bg-red-500 hover:text-white hover:border-red-500" 
              : "hover:bg-blue-600 hover:text-white hover:border-blue-600"
          }`}
        >
          {row.isApproved ? (
            <div className="flex items-center gap-2"><UserX size={14} /> Suspend</div>
          ) : (
            <div className="flex items-center gap-2"><UserCheck size={14} /> Approve</div>
          )}
        </Button>
      ),
    },
  ];

  return (
    <section className={`min-h-screen transition-colors duration-500 ${
      dark ? "bg-neutral-950 text-white" : "bg-slate-50 text-slate-900"
    }`}>
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-4">
              <ShieldCheck size={12} /> Network Oversight
            </div>
            <h1 className="text-4xl font-black tracking-tighter">
              Agent <span className="text-blue-500">Directory</span>
            </h1>
            <p className={`mt-2 text-lg max-w-xl ${dark ? "text-gray-400" : "text-gray-500"}`}>
              Review applicant credentials, manage regional cash-flow partners, and maintain ecosystem trust.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className={`p-4 rounded-2xl border flex flex-col items-center min-w-[120px] ${
              dark ? "bg-white/5 border-white/10" : "bg-white border-black/5 shadow-sm"
            }`}>
              <span className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Total Agents</span>
              <span className="text-2xl font-black text-blue-500">{items.length}</span>
            </div>
          </div>
        </div>

        {/* UTILITY BAR */}
        <div className={`p-6 rounded-[2rem] border mb-8 flex flex-col gap-6 ${
          dark ? "bg-neutral-900/50 border-white/5 backdrop-blur-xl" : "bg-white border-black/5 shadow-xl shadow-black/[0.02]"
        }`}>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-blue-500" />
            <span className="text-sm font-black uppercase tracking-widest opacity-60">Search & Filters</span>
          </div>
          <FiltersBar filters={filters} onChange={setFilters} />
        </div>

        {/* DATA CORE */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <DataTable columns={columns} data={items} loading={loading} />
        </motion.div>

        {/* NAVIGATION */}
        <div className="mt-10">
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        </div>
      </div>
    </section>
  );
};

export default AdminAgents;