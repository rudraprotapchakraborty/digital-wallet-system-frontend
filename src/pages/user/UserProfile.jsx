import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import EmailCode, { useResendTimer } from "../../components/common/EmailCode";
import Avatar from "../../components/common/Avatar";
import api from "../../services/api";

function Section({ id, title, hint, children }) {
  return <section className="settings-row" aria-labelledby={id}>
    <div><h2 id={id}>{title}</h2><p>{hint}</p></div>
    <div className="settings-controls">{children}</div>
  </section>;
}

async function photoData(file) {
  if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) throw new Error("Choose a JPG, PNG, WebP or GIF photo.");
  if (file.size > 15 * 1024 * 1024) throw new Error("Choose a photo smaller than 15 MB.");
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    try { await img.decode(); } catch { throw new Error("This image could not be read."); }
    const scale = Math.min(1, 512 / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.88);
  } finally { URL.revokeObjectURL(url); }
}

export default function UserProfile() {
  const { user, setUser, acceptSession, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [busy, setBusy] = useState("");
  const locked = useRef(false);
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(null);
  const [code, setCode] = useState("");
  const [seconds, restartTimer] = useResendTimer();
  const [current, setCurrent] = useState("");
  const [deletion, setDeletion] = useState(null);
  const [proof, setProof] = useState("");
  const identifier = user.email || user.phone;

  async function run(section, action) {
    if (locked.current) return;
    locked.current = true;
    setBusy(section); setMessage(null);
    try {
      const text = await action();
      if (text) setMessage({ section, text });
    } catch (err) {
      setMessage({ section, error: true, text: err.response?.data?.message || (err.isAxiosError ? "Could not reach the wallet service. Please retry." : err.message) });
    } finally { locked.current = false; setBusy(""); }
  }
  function feedback(section) {
    if (message?.section !== section) return null;
    return <p role={message.error ? "alert" : "status"} className={message.error ? "form-error" : "form-note"}>{message.text}</p>;
  }
  function submit(section, action) {
    return event => {
      event.preventDefault();
      const form = event.currentTarget;
      run(section, () => action(form));
    };
  }
  async function saveDetails(fields) {
    const { data } = await api.patch("/auth/me", fields);
    setUser(data.user); setName(data.user.name); setPhone(data.user.phone);
    return "Changes saved.";
  }
  async function startChange() {
    const { data } = await api.post("/auth/me/email", { email, currentPassword: current });
    setPending(data.requestId); setCode(""); restartTimer();
    return "A verification code was sent to " + email + ".";
  }
  async function changeEmail() {
    if (!pending) return startChange();
    const { data } = await api.put("/auth/me/email", { requestId: pending, code });
    setPending(null); setCode("");
    acceptSession(data); setEmail(""); setCurrent("");
    return "Your sign-in email has been updated.";
  }
  async function savePassword(form) {
    const fields = Object.fromEntries(new FormData(form));
    if (fields.newPassword !== fields.confirmPassword) throw new Error("The new passwords must match.");
    const { data } = await api.post("/auth/me/password", { currentPassword: fields.currentPassword, newPassword: fields.newPassword });
    acceptSession(data); form.reset();
    return "Password saved.";
  }
  async function openDeletion() {
    const { data } = await api.get("/wallet/me");
    setProof(""); setDeletion({ balance: data.balance });
  }
  async function removeAccount() {
    await api.delete("/auth/me", { data: { confirmation: proof, balance: deletion.balance } });
    logout(); navigate("/", { replace: true });
  }
  return <div className="account-settings"><header><h1>Account settings</h1><p>Manage your profile, sign-in details, and wallet account.</p></header>
    {user.sharedDemo && <p className="form-note mb-4">This shared test account has a read-only profile. Create a personal wallet to edit your settings.</p>}
    <fieldset disabled={Boolean(busy) || user.sharedDemo} className="settings-group">
      <Section id="settings-profile" title="Profile" hint="Choose the photo and name shown on your account.">
        <div className="photo-editor"><Avatar user={user}/><div><div className="settings-actions">
          <label className="settings-outline">{busy === "photo" ? "Updating…" : user.avatar ? "Change photo" : "Upload photo"}
            <input className="sr-only" type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={e => {
              const file = e.target.files?.[0]; e.target.value = "";
              if (file) run("photo", async () => {
                const { data } = await api.post("/auth/me/avatar", { image: await photoData(file) }, { timeout: 25000 });
                setUser(data.user); return "Photo updated.";
              });
            }}/></label>
          {user.avatar && <button type="button" className="settings-link" onClick={() => run("photo", async () => {
            const { data } = await api.delete("/auth/me/avatar"); setUser(data.user); return "Photo removed from profile.";
          })}>Remove photo</button>}
        </div><small>JPG, PNG, WebP or GIF. Up to 15 MB.</small></div></div>
        {feedback("photo")}
        <form className="field-stack" onSubmit={submit("name", () => saveDetails({ name }))}>
          <label>Full name<input autoComplete="name" required maxLength={100} value={name} onChange={e => setName(e.target.value)}/></label>
          <button className="settings-save" disabled={!name.trim() || name.trim() === user.name}>{busy === "name" ? "Saving…" : "Save name"}</button>{feedback("name")}
        </form>
      </Section>
      <Section id="settings-email" title="Email address" hint="Use your email address to sign in and recover your password.">
        <dl className="settings-current"><dt>Current email</dt><dd>{user.email || "No email added"}</dd></dl>
        {!user.hasPassword ? <p><a className="settings-link" href="#settings-password">Set a password</a> before changing your email.</p> :
          <form className="field-stack" onSubmit={submit("email", changeEmail)}>
            {pending ? <EmailCode value={code} onChange={setCode}/> : <><label>New email address<input type="email" autoComplete="email" maxLength={254} required value={email} onChange={e => setEmail(e.target.value)}/></label>
            <label>Current password<input type="password" autoComplete="current-password" required value={current} onChange={e => setCurrent(e.target.value)}/></label></>}
            {user.usesGoogle && <p>Changing your email disconnects Google sign-in. You can sign in with your new email or phone number and password.</p>}
            <div className="settings-actions"><button className="settings-save">{busy === "email" ? "Please wait…" : pending ? "Confirm email" : "Send verification code"}</button>
              {pending && <><button type="button" className="settings-link" disabled={seconds > 0} onClick={() => run("email", startChange)}>{seconds ? `Resend in ${seconds}s` : "Resend code"}</button>
                <button type="button" onClick={() => { setPending(null); setMessage(null); }}>Start over</button></>}
            </div>{feedback("email")}
          </form>}
      </Section>
      <Section id="settings-phone" title="Wallet phone number" hint="People use this number to send money to your wallet.">
        <form className="field-stack" onSubmit={submit("phone", () => saveDetails({ phone }))}>
          <label>Phone number<input type="tel" autoComplete="tel" pattern="[+]?[0-9]{7,15}" required value={phone} onChange={e => setPhone(e.target.value)}/></label>
          <button className="settings-save" disabled={phone.trim() === user.phone}>{busy === "phone" ? "Saving…" : "Save phone number"}</button>{feedback("phone")}
        </form>
      </Section>
      <Section id="settings-password" title="Password" hint={user.hasPassword ? "Choose a new password for your account." : "Add a password to sign in with your email as well as Google."}>
        <form className="field-stack" onSubmit={submit("password", savePassword)}>
          {user.hasPassword && <label>Current password<input name="currentPassword" type="password" required autoComplete="current-password"/></label>}
          {user.hasPassword && <Link to="/forgot-password" className="settings-link">Forgot password?</Link>}
          <label>New password<input type="password" name="newPassword" placeholder="At least 8 characters" required minLength={8} autoComplete="new-password"/></label>
          <label>Confirm new password<input type="password" name="confirmPassword" required autoComplete="new-password"/></label>
          <button className="settings-save">{busy === "password" ? "Saving…" : user.hasPassword ? "Change password" : "Set password"}</button>{feedback("password")}
        </form>
      </Section>
      <Section id="settings-methods" title="Sign-in methods" hint="These are the ways you can access your account.">
        <ul className="method-list">{[["Email or phone and password", user.hasPassword, "Enabled", "Not set"], ["Google", user.usesGoogle, "Connected", "Not connected"]].map(([label, active, yes, no]) =>
          <li key={label}><span>{label}</span><span className={active ? "method-on" : ""}>{active ? yes : no}</span></li>)}</ul>
      </Section>
      <Section id="settings-delete" title="Delete account" hint="Permanently close your account and wallet. Other participants keep their transaction records.">
        {deletion ? <form className="field-stack deletion-panel" onSubmit={submit("delete", removeAccount)}>
          <h3>Permanently delete this wallet?</h3><p>This cannot be undone. Your wallet balance is <strong>{deletion.balance.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</strong>.
          {deletion.balance > 0 && " Deleting it forfeits that balance."}</p>
          <label>Type {identifier} to confirm<input type={user.email ? "email" : "tel"} required autoComplete="off" value={proof} onChange={e => setProof(e.target.value)}/></label>
          <div className="settings-actions"><button className="delete-confirm" disabled={proof.trim().toLowerCase() !== identifier}>{busy === "delete" ? "Deleting…" : "Permanently delete account"}</button>
            <button type="button" onClick={() => { setDeletion(null); setProof(""); setMessage(null); }}>Cancel</button></div>
        </form> : <button className="delete-start" onClick={() => run("delete", openDeletion)}>Delete account</button>}
        {feedback("delete")}
      </Section>
    </fieldset></div>;
}
