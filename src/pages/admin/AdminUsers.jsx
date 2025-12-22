import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Users as UsersIcon, 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Search, 
  Filter,
  UserCircle,
  Mail,
  Smartphone
} from "lucide-react";
import api from "../../services/api";
import { useTheme } from "../../context/ThemeContext";
import DataTable from "../../components/common/DataTable";
import FiltersBar from "../../components/common/FiltersBar";
import Pagination from "../../components/common/Pagination";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";

const AdminUsers = () => {
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
      const res = await api.get("/admin/users", { params });
      const data = res.data;

      setItems(data.users || data);
      setTotalPages(data.totalPages || 1);
    } catch {
      toast.error("Cloud synchronization failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [page, JSON.stringify(filters)]);

  const toggleBlock = async (walletId, isBlocked) => {
    try {
      const url = isBlocked
        ? `/admin/wallets/unblock/${walletId}`
        : `/admin/wallets/block/${walletId}`;

      await api.patch(url);
      toast.success(isBlocked ? "Identity access restored." : "Account access restricted.", {
        icon: isBlocked ? <Unlock size={16} /> : <Lock size={16} />
      });
      load();
    } catch {
      toast.error("Operation restricted by protocol");
    }
  };

  const columns = [
    { 
      header: "Member", 
      accessor: "name",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-black shadow-inner ${
            dark ? "bg-white/5 text-blue-400" : "bg-slate-100 text-blue-600"
          }`}>
            {row.name?.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="font-bold tracking-tight text-sm">{row.name}</p>
            <p className="text-[10px] uppercase font-black tracking-widest opacity-40">Member since 2024</p>
          </div>
        </div>
      )
    },
    { 
      header: "Contact", 
      accessor: "phone",
      render: (row) => (
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 text-xs font-medium opacity-80">
            <Smartphone size={12} className="opacity-40" /> {row.phone}
          </div>
          <div className="flex items-center gap-1.5 text-[10px] opacity-40 italic">
            <Mail size={10} /> {row.email || "no-email@system.com"}
          </div>
        </div>
      )
    },
    { 
      header: "Access Level", 
      accessor: "role",
      render: (row) => (
        <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest border ${
          row.role === 'admin' 
            ? 'border-purple-500/20 bg-purple-500/10 text-purple-500' 
            : 'border-blue-500/20 bg-blue-500/10 text-blue-500'
        }`}>
          {row.role}
        </span>
      )
    },
    {
      header: "Security Status",
      accessor: "isBlocked",
      render: (row) => (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
          !row.isBlocked 
            ? (dark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600")
            : (dark ? "bg-rose-500/10 text-rose-400" : "bg-rose-50 text-rose-600")
        }`}>
          <div className={`h-1.5 w-1.5 rounded-full ${!row.isBlocked ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
          {!row.isBlocked ? "Active" : "Blocked"}
        </div>
      ),
    },
    {
      header: "Management",
      key: "actions",
      render: (row) => (
        <Button
          variant="outline"
          onClick={() => toggleBlock(row.walletId, row.isBlocked)}
          className={`h-9 px-4 text-[10px] font-black uppercase tracking-widest transition-all ${
            row.isBlocked 
              ? "border-emerald-500/50 text-emerald-500 hover:bg-emerald-500 hover:text-white" 
              : "border-rose-500/50 text-rose-500 hover:bg-rose-500 hover:text-white"
          }`}
        >
          {row.isBlocked ? (
             <span className="flex items-center gap-2"><Unlock size={14} /> Restore</span>
          ) : (
             <span className="flex items-center gap-2"><Lock size={14} /> Restrict</span>
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
        
        {/* EXECUTIVE HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-4">
              <ShieldCheck size={12} /> Identity Governance
            </div>
            <h1 className="text-4xl font-black tracking-tighter md:text-5xl">
              User <span className="text-blue-500">Registry</span>
            </h1>
            <p className={`mt-2 text-lg max-w-xl ${dark ? "text-gray-400" : "text-gray-500"}`}>
              Oversee account lifecycle, manage security restrictions, and monitor role distribution across the network.
            </p>
          </motion.div>

          {/* QUICK ANALYTICS WIDGET */}
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-3xl border flex flex-col min-w-[140px] ${
              dark ? "bg-white/5 border-white/10" : "bg-white border-black/5 shadow-sm"
            }`}>
              <span className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Total Members</span>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-black">{items.length}</span>
                <span className="text-xs text-emerald-500 font-bold mb-1">+4 today</span>
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH & DISCOVERY BAR */}
        <div className={`p-6 rounded-[2.5rem] border mb-8 ${
          dark ? "bg-neutral-900/50 border-white/5 backdrop-blur-xl shadow-2xl shadow-black/20" : "bg-white border-black/5 shadow-xl shadow-black/[0.02]"
        }`}>
          <div className="flex items-center gap-3 mb-6 opacity-60">
            <Search size={18} className="text-blue-500" />
            <span className="text-sm font-black uppercase tracking-widest">Identify Members</span>
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

export default AdminUsers;