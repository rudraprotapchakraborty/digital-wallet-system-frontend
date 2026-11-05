export default function DataTable({ columns, data, loading }) {
  if (loading) return <p role="status" className="py-6">Loading records…</p>;
  if (!data.length) return <p className="workspace-panel">No records to show.</p>;
  return <div className="overflow-x-auto rounded-xl border border-[var(--line)] bg-[var(--surface)]"><table className="w-full text-left text-sm">
    <thead><tr>{columns.map(col => <th key={col.header} scope="col" className="p-4 font-semibold">{col.header}</th>)}</tr></thead>
    <tbody>{data.map(row => <tr key={row._id} className="border-t border-[var(--line)]">{columns.map(col => <td className="p-4" key={col.header}>{col.render ? col.render(row) : row[col.accessor]}</td>)}</tr>)}</tbody>
  </table></div>;
}
