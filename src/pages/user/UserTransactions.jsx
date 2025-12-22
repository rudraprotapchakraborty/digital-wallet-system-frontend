import React, { useEffect, useState } from "react";
import api from "../../services/api";
import DataTable from "../../components/common/DataTable";
import Pagination from "../../components/common/Pagination";
import FiltersBar from "../../components/common/FiltersBar";
import Card from "../../components/ui/Card";
import { useTheme } from "../../context/ThemeContext";

const UserTransactions = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const params = { page, ...filters };
      const res = await api.get("/wallet/transactions", { params });
      const data = res.data;
      setTransactions(data.transactions || data);
      setTotalPages(data.totalPages || 1);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, JSON.stringify(filters)]);

  const columns = [
    { header: "Date", accessor: "createdAt" },
    { header: "Type", accessor: "type" },
    {
      header: "Amount (₹)",
      accessor: "amount",
      render: (row) => (row.amount ? row.amount.toFixed(2) : "0.00"),
    },
    { header: "Status", accessor: "status" },
  ];

  return (
    <section className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Transaction history
        </h1>
        <p
          className={`mt-2 text-sm ${
            dark ? "text-neutral-200" : "text-gray-600"
          }`}
        >
          View and filter all your wallet transactions.
        </p>
      </div>

      {/* FILTERS */}
      <Card>
        <FiltersBar filters={filters} onChange={setFilters} />
      </Card>

      {/* TABLE */}
      <Card className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={transactions}
          loading={loading}
        />
      </Card>

      {/* PAGINATION */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={setPage}
      />
    </section>
  );
};

export default UserTransactions;
