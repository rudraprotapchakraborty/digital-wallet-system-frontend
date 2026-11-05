export default function FiltersBar({ filters, onChange }) {
  const field = name => ({ name, value: filters[name] || "", onChange: e => onChange({ ...filters, [name]: e.target.value }) });
  return <div className="field-stack mb-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
    <label>Search<input type="search" placeholder="Phone or reference" {...field("search")}/></label>
    <label>Transaction type<select {...field("type")}><option value="">All types</option>{["add_money", "withdraw", "send_money", "cash_in", "cash_out", "commission"].map(t => <option key={t} value={t}>{t.replaceAll("_", " ")}</option>)}</select></label>
    <label>Status<select {...field("status")}><option value="">All statuses</option>{["completed", "pending", "reversed"].map(s => <option key={s}>{s}</option>)}</select></label>
    <label>From (UTC)<input type="date" {...field("from")}/></label><label>To (UTC)<input type="date" {...field("to")}/></label>
    {Object.values(filters).some(Boolean) && <button className="chip" onClick={() => onChange({})}>Clear filters</button>}
  </div>;
}
