import React, { useEffect, useState } from "react";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, JSON.stringify(filters)]);

  const changeStatus = async (agentId, isApproved) => {
    try {
      const url = isApproved
        ? `/admin/agents/suspend/${agentId}`
        : `/admin/agents/approve/${agentId}`;

      await api.patch(url);
      toast.success(isApproved ? "Agent suspended." : "Agent approved.");
      load();
    } catch {
      toast.error("Action failed");
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Phone", accessor: "phone" },
    {
      header: "Approved",
      accessor: "isApproved",
      render: (row) => (row.isApproved ? "Yes" : "No"),
    },
    {
      header: "Actions",
      key: "actions",
      render: (row) => (
        <Button
          variant="outline"
          onClick={() => changeStatus(row._id, row.isApproved)}
        >
          {row.isApproved ? "Suspend" : "Approve"}
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
          Agents
        </h1>

        <p
          className={`mt-2 text-sm ${
            dark ? "text-gray-200" : "text-gray-600"
          }`}
        >
          Review, approve, or suspend agent accounts.
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

export default AdminAgents;
