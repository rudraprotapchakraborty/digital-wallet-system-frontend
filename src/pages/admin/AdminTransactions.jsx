import React, { useEffect, useState } from "react";
import api from "../../services/api";
import DataTable from "../../components/common/DataTable";
import FiltersBar from "../../components/common/FiltersBar";
import Pagination from "../../components/common/Pagination";

const AdminTransactions = () => {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const load = async () => {
    setLoading(true);
    const params = { page, ...filters };
    const res = await api.get("/admin/transactions", { params });
    const data = res.data;
    setItems(data.transactions || data);
    setTotalPages(data.totalPages || 1);
    setLoading(false);
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
    <section className="page">
      <h1>All transactions</h1>
      <FiltersBar filters={filters} onChange={setFilters} />
      <DataTable columns={columns} data={items} loading={loading} />
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </section>
  );
};

export default AdminTransactions;
