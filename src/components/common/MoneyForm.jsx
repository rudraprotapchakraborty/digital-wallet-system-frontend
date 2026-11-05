import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import DemoRecipients from "./DemoRecipients";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const operations = {
  send: ["Send money", "/wallet/send", "Receiver phone number", "receiverPhone"],
  deposit: ["Add money", "/wallet/add"],
  withdraw: ["Withdraw", "/wallet/withdraw"],
  cashIn: ["Cash in", "/agent/cash-in", "Member phone number", "phone"],
  cashOut: ["Cash out", "/wallet/cash-out", "Agent phone number", "agentPhone"],
};

export default function MoneyForm({ kind }) {
  const [title, endpoint, label, field] = operations[kind];
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [review, setReview] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(null);
  const request = useRef(null);
  const locked = useRef(false);

  async function submit(event) {
    event.preventDefault();
    if (locked.current) return;
    if (!review) { setNotice(null); setReview(true); return; }
    locked.current = true;
    setBusy(true);
    const body = { amount };
    if (field) body[field] = phone.trim();
    const fingerprint = JSON.stringify(body);
    if (request.current?.fingerprint !== fingerprint) request.current = { fingerprint, id: crypto.randomUUID() };
    try {
      const { data } = await api.post(endpoint, body, { headers: { "Idempotency-Key": request.current.id } });
      setNotice({ text: `Transaction completed. Wallet balance ₹${data.balance.toFixed(2)}.${kind === "cashOut" ? " Show the agent this reference: " + data.reference : ""}` });
      request.current = null;
      setAmount(""); setPhone(""); setReview(false);
    } catch (err) {
      setNotice({ error: true, text: err.response?.data?.message || "Could not confirm the result. Retry this request or check History." });
    } finally { locked.current = false; setBusy(false); }
  }
  return <section><h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
    <div className={field && user.demo ? "demo-send-layout" : undefined}>
    <form className="workspace-panel field-stack" onSubmit={submit}>
      {field && <label>{label}<input type="tel" required pattern="[+]?[0-9]{7,15}" value={phone} readOnly={review} onChange={e => setPhone(e.target.value)}/></label>}
      <label>Amount (₹)<input type="number" inputMode="decimal" min="0.01" max="9999999999.99" step="0.01" required value={amount} readOnly={review} onChange={e => setAmount(e.target.value)}/></label>
      {!review && <div className="amount-presets">{[100, 500, 1000].map(n => <button key={n} type="button" className="chip" onClick={() => setAmount(String(n))}>₹{n}</button>)}</div>}
      {review && <p>Confirm {title.toLowerCase()} for <strong>₹{Number(amount).toFixed(2)}</strong>{phone && <> · {phone}</>}.</p>}
      {review && kind === "cashOut" && <p>Fee ₹0.00. The agent receives ₹{Number(amount).toFixed(2)} and hands you that amount in cash.</p>}
      <button className="pill" disabled={busy}>{busy ? "Processing…" : review ? "Confirm transaction" : "Review transaction"} <ArrowRight size={16}/></button>
      {review && <button type="button" disabled={busy} onClick={() => { setReview(false); setNotice(null); }}>Edit details</button>}
    </form>
    {field && user.demo && <DemoRecipients agents={kind === "cashOut"} agent={user.role === "agent"} phone={phone} disabled={review || busy} onSelect={next => { setPhone(next); setNotice(null); }}/>}
    </div>{notice && <p role="status" className={notice.error ? "form-error" : "form-note"}>{notice.text}</p>}
    <Link className="text-action mt-4" to={"/" + user.role + "/transactions"}>View history <ArrowRight size={15}/></Link>
  </section>;
}
