import React from "react";
import SkeletonBlock from "./SkeletonBlock";
import { useTheme } from "../../context/ThemeContext";

const DataTable = ({ columns, data, loading }) => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  if (loading) {
    return (
      <div className="space-y-2">
        <SkeletonBlock height={40} />
        <SkeletonBlock height={40} />
        <SkeletonBlock height={40} />
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table
        className={`w-full border-collapse text-sm
          ${dark ? "text-gray-100" : "text-gray-800"}`}
        data-tour-id="table-section"
      >
        {/* HEADER */}
        <thead>
          <tr
            className={`border-b text-left
              ${
                dark
                  ? "border-neutral-800 bg-neutral-900"
                  : "border-gray-200 bg-gray-50"
              }`}
          >
            {columns.map((col) => (
              <th
                key={col.key || col.accessor}
                className="px-4 py-3 font-semibold"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {(!data || data.length === 0) && (
            <tr>
              <td
                colSpan={columns.length}
                className={`px-4 py-6 text-center text-sm
                  ${
                    dark ? "text-neutral-300" : "text-gray-500"
                  }`}
              >
                No records found
              </td>
            </tr>
          )}

          {data &&
            data.map((row) => (
              <tr
                key={row._id || row.id}
                className={`border-b transition
                  ${
                    dark
                      ? "border-neutral-800 hover:bg-neutral-800/50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key || col.accessor}
                    className="px-4 py-3 whitespace-nowrap"
                  >
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
