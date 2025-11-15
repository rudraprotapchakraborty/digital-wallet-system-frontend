import React, { useEffect, useState } from "react";
import api from "../../services/api";
import DataTable from "../../components/common/DataTable";
import Pagination from "../../components/common/Pagination";
import FiltersBar from "../../components/common/FiltersBar";

const AgentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});

  const fetchTransactions = async () => {
    setLoading(true);
    const params = { page, ...filters };
    const res = await api.get("/wallet/transactions", { params });
    const data = res.data;
    setTransactions(data.transactions || data);
    setTotalPages(data.totalPages || 1);
    setLoading(false);
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
    <section className="page">
      <h1>Activity</h1>
      <FiltersBar filters={filters} onChange={setFilters} />
      <DataTable columns={columns} data={transactions} loading={loading} />
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </section>
  );
};

export default AgentTransactions;
