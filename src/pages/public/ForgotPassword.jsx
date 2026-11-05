import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

export default function ForgotPassword() {
  const [token] = useState(() => new URLSearchParams(window.location.hash.slice(1)).get("token"));
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) window.history.replaceState(window.history.state, "", window.location.pathname);
  }, [token]);
  async function submit(event) {
    event.preventDefault();
    const fields = Object.fromEntries(new FormData(event.currentTarget));
    setBusy(true); setStatus(null);
    try {
      if (token) {
        if (fields.newPassword !== fields.confirmPassword) throw new Error("The passwords must match.");
        await api.post("/auth/reset-password", { token, newPassword: fields.newPassword });
        logout(); navigate("/login", { replace: true, state: { reset: true } });
      } else {
        await api.post("/auth/forgot-password", { email: fields.email });
        setStatus({ text: "If this email has a password account, a single-use reset link is on its way." });
      }
    } catch (err) { setStatus({ error: true, text: err.response?.data?.message || (err.isAxiosError ? "Could not reach the wallet service." : err.message) }); }
    finally { setBusy(false); }
  }
  return <section className="auth-page"><div className="frame py-12"><div className="auth-form"><h1>Reset password<em>.</em></h1>
    <form className="field-stack" onSubmit={submit}>
      {token ? <><label>New password<input type="password" name="newPassword" required minLength={8} autoComplete="new-password"/></label>
        <label>Confirm new password<input type="password" name="confirmPassword" required autoComplete="new-password"/></label></> :
        <label>Email address<input name="email" type="email" autoComplete="email" required/></label>}
      {status && <p className={status.error ? "form-error" : "form-note"} role={status.error ? "alert" : "status"}>{status.text}</p>}
      <button className="pill" disabled={busy}>{busy ? "Please wait…" : token ? "Reset password" : "Send reset link"}</button>
    </form><Link className="settings-link mt-5" to="/login">Back to login</Link></div></div></section>;
}
