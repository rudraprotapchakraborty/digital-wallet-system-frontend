import React from "react";

const FiltersBar = ({ filters, onChange }) => {
  const handleChange = (e) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="filters-bar" data-tour-id="table-filters">
      <input
        name="search"
        placeholder="Search by phone, email, or reference"
        value={filters.search || ""}
        onChange={handleChange}
      />
      <select name="type" value={filters.type || ""} onChange={handleChange}>
        <option value="">All types</option>
        <option value="add_money">Add money</option>
        <option value="withdraw">Withdraw</option>
        <option value="send">Send money</option>
        <option value="cash_in">Cash in</option>
        <option value="cash_out">Cash out</option>
      </select>
      <select
        name="status"
        value={filters.status || ""}
        onChange={handleChange}
      >
        <option value="">All status</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
        <option value="reversed">Reversed</option>
      </select>
      <input
        type="date"
        name="from"
        value={filters.from || ""}
        onChange={handleChange}
      />
      <input
        type="date"
        name="to"
        value={filters.to || ""}
        onChange={handleChange}
      />
    </div>
  );
};

export default FiltersBar;
