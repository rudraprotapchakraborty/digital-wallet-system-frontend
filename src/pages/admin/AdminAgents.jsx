import React, { useEffect, useState } from "react";
import api from "../../services/api";
import DataTable from "../../components/common/DataTable";
import FiltersBar from "../../components/common/FiltersBar";
import Pagination from "../../components/common/Pagination";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";

const AdminAgents = () => {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const load = async () => {
    setLoading(true);
    const params = { page, ...filters };
    const res = await api.get("/admin/users", { params: { ...params, role: "agent" } });
    const data = res.data;
    setItems(data.users || data);
    setTotalPages(data.totalPages || 1);
    setLoading(false);
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
    } catch (err) {
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
    <section className="page">
      <h1>Agents</h1>
      <FiltersBar filters={filters} onChange={setFilters} />
      <DataTable columns={columns} data={items} loading={loading} />
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </section>
  );
};

export default AdminAgents;
