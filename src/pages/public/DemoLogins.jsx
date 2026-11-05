import { useEffect, useState } from "react";
import { ArrowUpLeft, ShieldCheck, Store, Wallet } from "lucide-react";
import api from "../../services/api";

const roles = { admin: ["Admin", ShieldCheck], agent: ["Agent", Store], user: ["Personal", Wallet] };

export default function DemoLogins({ onChoose }) {
  const [accounts, setAccounts] = useState(null);
  const [chosen, setChosen] = useState("");
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setFailed(false);
    api.get("/auth/demo-accounts", { signal: controller.signal }).then(({ data }) => setAccounts(data))
      .catch(() => { if (!controller.signal.aborted) setFailed(true); });
    return () => controller.abort();
  }, [attempt]);
  return <aside className="demo-logins" aria-label="Test accounts">
    <h2>Try a test account</h2><p>Choose a role to fill in the login form.</p>
    {failed ? <button type="button" className="settings-link" onClick={() => setAttempt(n => n + 1)}>Retry loading accounts</button> :
      accounts === null ? <p role="status">Loading accounts…</p> : !accounts.length ? <p>Test accounts are unavailable.</p> :
      accounts.map(account => {
        const [label, Icon] = roles[account.role];
        return <article className="demo-login" key={account.role}>
          <div className="demo-title"><h3><Icon size={18}/> {label}</h3><button type="button" onClick={() => { onChoose(account); setChosen(account.role); document.querySelector('input[name="identifier"]')?.focus(); }} aria-label={`Use ${label} test account`}>{chosen === account.role ? "Filled in" : "Use login"} <ArrowUpLeft size={14}/></button></div>
          <dl>{[["Email", account.email], ["Phone", account.phone], ["Password", account.password]].map(([name, value]) => <div key={name}><dt>{name}</dt><dd>{value}</dd></div>)}</dl>
        </article>;
      })}
  </aside>;
}
