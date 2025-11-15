import React, { useEffect, useState } from "react";
import api from "../../services/api";
import DataTable from "../../components/common/DataTable";
import FiltersBar from "../../components/common/FiltersBar";
import Pagination from "../../components/common/Pagination";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";

const AdminUsers = () => {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const load = async () => {
    setLoading(true);
    const params = { page, ...filters };
    const res = await api.get("/admin/users", { params });
    const data = res.data;
    setItems(data.users || data);
    setTotalPages(data.totalPages || 1);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, JSON.stringify(filters)]);

  const toggleBlock = async (walletId, isBlocked) => {
    try {
      const url = isBlocked
        ? `/admin/wallets/unblock/${walletId}`
        : `/admin/wallets/block/${walletId}`;
      await api.patch(url);
      toast.success(isBlocked ? "Wallet unblocked." : "Wallet blocked.");
      load();
    } catch (err) {
      toast.error("Action failed");
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Phone", accessor: "phone" },
    { header: "Role", accessor: "role" },
    {
      header: "Status",
      accessor: "isBlocked",
      render: (row) => (row.isBlocked ? "Blocked" : "Active"),
    },
    {
      header: "Actions",
      key: "actions",
      render: (row) => (
        <Button
          variant="outline"
          onClick={() => toggleBlock(row.walletId, row.isBlocked)}
        >
          {row.isBlocked ? "Unblock" : "Block"}
        </Button>
      ),
    },
  ];

  return (
    <section className="page">
      <h1>Users</h1>
      <FiltersBar filters={filters} onChange={setFilters} />
      <DataTable columns={columns} data={items} loading={loading} />
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </section>
  );
};

export default AdminUsers;
