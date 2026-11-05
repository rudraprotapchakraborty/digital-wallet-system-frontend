import { useEffect, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import api from "../../services/api";
import Avatar from "./Avatar";

export default function DemoRecipients({ phone, onSelect, disabled }) {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError(false);
    api.get("/wallet/demo-recipients", { signal: controller.signal })
      .then(({ data }) => setPeople(data))
      .catch(() => { if (!controller.signal.aborted) setError(true); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [attempt]);

  return <aside className="recipient-panel" aria-label="Demo recipients">
    <h2>Demo recipients</h2><p>Choose a wallet to fill in the receiver’s number.</p>
    {loading ? <p role="status">Loading recipients…</p> : error ?
      <button type="button" className="settings-link" onClick={() => setAttempt(n => n + 1)}>Retry loading recipients</button> :
      people.length ? <div>{people.map(person => <button type="button" className="recipient-row" key={person.phone}
        aria-pressed={phone === person.phone} disabled={disabled} onClick={() => onSelect(person.phone)}>
        <Avatar user={person} size={36}/><span><b>{person.name}</b><small>{person.phone}</small></span>
        {phone === person.phone ? <Check size={17}/> : <ArrowUpRight size={16}/>}
      </button>)}</div> : <p>No demo recipients are available.</p>}
  </aside>;
}
