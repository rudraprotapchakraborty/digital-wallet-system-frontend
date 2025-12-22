import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  History, 
  ArrowUpRight, 
  ArrowDownLeft, 
  IndianRupee, 
  Calendar, 
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCcw
} from "lucide-react";
import api from "../../services/api";
import DataTable from "../../components/common/DataTable";
import Pagination from "../../components/common/Pagination";
import FiltersBar from "../../components/common/FiltersBar";
import { useTheme } from "../../context/ThemeContext";

const AgentTransactions = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const params = { page, ...filters };
      const res = await api.get("/wallet/transactions", { params });
      const data = res.data;
      setTransactions(data.transactions || data);
      setTotalPages(data.totalPages || 1);
    } catch (e) {
      console.error("Ledger Sync Error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page, JSON.stringify(filters)]);

  const columns = [
    { 
      header: "Timestamp", 
      accessor: "createdAt",
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-bold tracking-tight text-sm">
            {new Date(row.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
          </span>
          <span className="text-[10px] opacity-40 uppercase font-black">
            {new Date(row.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      )
    },
    { 
      header: "Operation", 
      accessor: "type",
      render: (row) => {
        const isCashIn = row.type === "cash_in";
        return (
          <div className="flex items-center gap-3">
            <div className={`h-8 w-8 rounded-xl flex items-center justify-center ${
              isCashIn ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'
            }`}>
              {isCashIn ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
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
          failed: { color: "text-rose-500 bg-rose-500/10 border-rose-500/20", icon: <XCircle size={12}/> }
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
    <section className="space-y-8">
      {/* HEADER AREA */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-4">
            <History size={12} /> Audit Trail
          </div>
          <h1 className={`text-4xl font-black tracking-tighter ${dark ? "text-white" : "text-slate-900"}`}>
            Recent <span className="text-blue-500">Activity</span>
          </h1>
          <p className={`mt-2 text-lg ${dark ? "text-neutral-400" : "text-slate-500"}`}>
            Comprehensive ledger of your regional cash flow operations.
          </p>
        </div>

        <button 
          onClick={fetchTransactions}
          className={`group p-4 rounded-2xl border transition-all ${
            dark ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white border-black/5 hover:shadow-md"
          }`}
        >
          <RefreshCcw size={18} className={`transition-transform duration-700 ${loading ? "animate-spin text-blue-500" : "opacity-40 group-hover:rotate-180"}`} />
        </button>
      </motion.div>

      {/* FILTER HUB */}
      <div className={`p-6 rounded-[2rem] border transition-all duration-500 ${
        dark ? "bg-neutral-900/50 border-white/5 backdrop-blur-xl shadow-2xl shadow-black/20" : "bg-white border-black/5 shadow-xl shadow-black/[0.02]"
      }`}>
        <div className="flex items-center gap-2 mb-6 opacity-40">
          <Search size={18} />
          <span className="text-xs font-black uppercase tracking-widest">Identify Transactions</span>
        </div>
        <FiltersBar filters={filters} onChange={setFilters} />
      </div>

      {/* DATA CORE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`rounded-[2rem] overflow-hidden border transition-all duration-500 ${
          dark ? "bg-neutral-900/30 border-white/5 shadow-2xl" : "bg-white border-black/5 shadow-sm"
        }`}
      >
        <DataTable columns={columns} data={transactions} loading={loading} />
      </motion.div>

      {/* PAGINATION */}
      <div className="flex justify-center py-4">
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </section>
  );
};

export default AgentTransactions;