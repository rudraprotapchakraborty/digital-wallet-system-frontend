import { useState } from "react";
import api from "../../services/api";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setBusy(true);
    try {
      await api.post("/support", Object.fromEntries(new FormData(form)));
      setStatus("Your message has been saved for the wallet team.");
      form.reset();
    } catch (err) { setStatus(err.response?.data?.message || "Could not submit your message. Try again."); }
    finally { setBusy(false); }
  }
  return <section className="info-page"><div className="frame info-body"><h1>Contact us<em>.</em></h1><p>Send the wallet team a question about your account or a transfer.</p>
    <form className="field-stack max-w-lg" onSubmit={submit}>
      <label>Name<input name="name" required maxLength={100} autoComplete="name"/></label>
      <label>Email<input type="email" name="email" required maxLength={254} autoComplete="email"/></label>
      <label>Message<textarea name="message" required rows={4} maxLength={2000}/></label>
      <button className="pill" disabled={busy}>{busy ? "Sending…" : "Send message"}</button>
      {status && <p role="status">{status}</p>}
    </form></div></section>;
}
