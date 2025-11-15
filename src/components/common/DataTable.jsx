import React from "react";
import SkeletonBlock from "./SkeletonBlock";

const DataTable = ({ columns, data, loading }) => {
  if (loading) {
    return (
      <div>
        <SkeletonBlock height={40} />
        <SkeletonBlock height={40} />
        <SkeletonBlock height={40} />
      </div>
    );
  }

  return (
    <table className="data-table" data-tour-id="table-section">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key || col.accessor}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {(!data || data.length === 0) && (
          <tr>
            <td colSpan={columns.length} style={{ textAlign: "center" }}>
              No records found
            </td>
          </tr>
        )}
        {data &&
          data.map((row) => (
            <tr key={row._id || row.id}>
              {columns.map((col) => (
                <td key={col.key || col.accessor}>
                  {col.render ? col.render(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default DataTable;
