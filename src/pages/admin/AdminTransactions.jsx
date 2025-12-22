import React, { useEffect, useState } from "react";
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
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, JSON.stringify(filters)]);

  const columns = [
    { header: "Date", accessor: "createdAt" },
    { header: "User", accessor: "userPhone" },
    { header: "Type", accessor: "type" },
    {
      header: "Amount (₹)",
      accessor: "amount",
      render: (row) => (row.amount ? row.amount.toFixed(2) : "0.00"),
    },
    { header: "Status", accessor: "status" },
  ];

  return (
    <section
      className={`min-h-screen ${
        dark ? "bg-neutral-950 text-white" : "bg-white text-black"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <h1 className="text-3xl font-extrabold tracking-tight">
          All transactions
        </h1>

        <p
          className={`mt-2 text-sm ${
            dark ? "text-gray-200" : "text-gray-600"
          }`}
        >
          Review all platform transactions with filters and pagination.
        </p>

        {/* Filters */}
        <div className="mt-6">
          <FiltersBar filters={filters} onChange={setFilters} />
        </div>

        {/* Table */}
        <div className="mt-6">
          <DataTable columns={columns} data={items} loading={loading} />
        </div>

        {/* Pagination */}
        <div className="mt-6">
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
