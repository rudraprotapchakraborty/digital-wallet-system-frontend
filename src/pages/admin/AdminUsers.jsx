import React, { useEffect, useState } from "react";
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
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
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
    } catch {
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
    <section
      className={`min-h-screen ${
        dark ? "bg-neutral-950 text-white" : "bg-white text-black"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <h1 className="text-3xl font-extrabold tracking-tight">
          Users
        </h1>

        <p
          className={`mt-2 text-sm ${
            dark ? "text-gray-200" : "text-gray-600"
          }`}
        >
          Manage user accounts, roles, and wallet status.
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

export default AdminUsers;
