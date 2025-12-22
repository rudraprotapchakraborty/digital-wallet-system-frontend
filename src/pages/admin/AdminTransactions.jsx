import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCcw, 
  Search, 
  FileText, 
  Calendar,
  IndianRupee,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import api from "../../services/api";
import { useTheme } from "../../context/ThemeContext";
import DataTable from "../../components/common/DataTable";
import FiltersBar from "../../components/common/FiltersBar";
import Pagination from "../../components/common/Pagination";
import toast from "react-hot-toast";

const AdminTransactions = () => {
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
      const params = { page, ...filters };
      const res = await api.get("/admin/transactions", { params });
      const data = res.data;

      setItems(data.transactions || data);
      setTotalPages(data.totalPages || 1);
    } catch {
      toast.error("Network synchronization failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [page, JSON.stringify(filters)]);

  const columns = [
    { 
      header: "Timestamp", 
      accessor: "createdAt",
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-bold tracking-tight">
            {new Date(row.createdAt).toLocaleDateString()}
          </span>
          <span className="text-[10px] opacity-40 uppercase font-black">
            {new Date(row.createdAt).toLocaleTimeString()}
          </span>
        </div>
      )
    },
    { 
      header: "Origin/User", 
      accessor: "userPhone",
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${dark ? 'bg-white/5' : 'bg-slate-100'}`}>
            <Search size={14} className="opacity-40" />
          </div>
          <span className="font-mono text-xs">{row.userPhone}</span>
        </div>
      )
    },
    { 
      header: "Type", 
      accessor: "type",
      render: (row) => {
        const isIn = ["add_money", "cash_in"].includes(row.type);
        return (
          <div className="flex items-center gap-2">
            <div className={`h-7 w-7 rounded-full flex items-center justify-center ${
              isIn ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'
            }`}>
              {isIn ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
            </div>
            <span className="text-xs font-black uppercase tracking-widest opacity-80">
              {row.type.replace("_", " ")}
            </span>
          </div>
        );
      }
    },
    {
      header: "Amount",
      accessor: "amount",
      render: (row) => (
        <div className="flex items-center font-black text-sm tracking-tight">
          <IndianRupee size={12} className="mr-0.5 opacity-40" />
          {row.amount ? row.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 }) : "0.00"}
        </div>
      ),
    },
    { 
      header: "Status", 
      accessor: "status",
      render: (row) => {
        const statusMap = {
          completed: { color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20", icon: <CheckCircle2 size={12}/> },
          pending: { color: "text-amber-500 bg-amber-500/10 border-amber-500/20", icon: <Clock size={12}/> },
          failed: { color: "text-rose-500 bg-rose-500/10 border-rose-500/20", icon: <AlertCircle size={12}/> }
        };
        const current = statusMap[row.status] || statusMap.pending;
        return (
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${current.color}`}>
            {current.icon}
            {row.status}
          </div>
        );
      }
    },
  ];

  return (
    <section className={`min-h-screen transition-colors duration-500 ${
      dark ? "bg-neutral-950 text-white" : "bg-slate-50 text-slate-900"
    }`}>
      <div className="mx-auto max-w-7xl px-6 py-10">
        
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-4">
              <FileText size={12} /> Global Ledger
            </div>
            <h1 className="text-4xl font-black tracking-tighter md:text-5xl">
              All <span className="text-blue-500">Transactions</span>
            </h1>
            <p className={`mt-2 text-lg max-w-xl ${dark ? "text-gray-400" : "text-gray-500"}`}>
              Monitor every liquidity movement within the system. Securely audit flows and resolve pending operations.
            </p>
          </motion.div>

          {/* QUICK TOOLBAR */}
          <div className="flex items-center gap-3">
             <button 
              onClick={load}
              className={`p-3 rounded-2xl border transition-all ${
                dark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-black/5 hover:shadow-md'
              }`}
              title="Refresh Data"
             >
               <RefreshCcw size={18} className={loading ? "animate-spin text-blue-500" : "opacity-60"} />
             </button>
             <div className={`p-4 rounded-2xl border flex flex-col items-center min-w-[140px] ${
              dark ? "bg-white/5 border-white/10" : "bg-white border-black/5 shadow-sm"
            }`}>
              <span className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Total Entries</span>
              <span className="text-xl font-black text-blue-500">{items.length}</span>
            </div>
          </div>
        </div>

        {/* SEARCH & FILTERS PANEL */}
        <div className={`p-6 rounded-[2rem] border mb-8 ${
          dark ? "bg-neutral-900/50 border-white/5 backdrop-blur-xl shadow-2xl" : "bg-white border-black/5 shadow-xl shadow-black/[0.02]"
        }`}>
          <div className="flex items-center gap-2 mb-6 opacity-60">
            <Calendar size={18} />
            <span className="text-sm font-black uppercase tracking-widest">Audit Filters</span>
          </div>
          <FiltersBar filters={filters} onChange={setFilters} />
        </div>

        {/* DATA CORE */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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

export default AdminTransactions;