import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import WalletArtwork from "../../components/layout/WalletArtwork";
import api from "../../services/api";
import EmailCode, { useResendTimer } from "../../components/common/EmailCode";
import DemoLogins from "./DemoLogins";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function AuthPage({ signup = false }) {
  const { user, login, register, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [credential, setCredential] = useState(null);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [pending, setPending] = useState(null);
  const [code, setCode] = useState("");
  const [seconds, restartTimer] = useResendTimer();
  const [draft, setDraft] = useState(null);
  const setup = Boolean(credential);
  const destination = account => {
    const from = location.state?.from;
    return from?.pathname?.split("/")[1] === account.role ? from.pathname + (from.search || "") : "/" + account.role;
  };
  if (user) return <Navigate to={destination(user)} replace/>;

  async function handle(task) {
    setBusy(true); setError("");
    try { await task(); }
    catch (err) { setError(err.response?.data?.message || "Could not reach the wallet service. Please try again."); }
    finally { setBusy(false); }
  }
  async function google(token, phone) {
    const account = await googleLogin(token, phone);
    if (account.requiresPhone) setCredential(token);
    else navigate(destination(account), { replace: true });
  }
  async function sendCode(fields) {
    const { data } = await api.post("/auth/register/start", fields);
    setDraft(fields); setPending(data.requestId); setCode(""); restartTimer();
  }
  function submit(event) {
    event.preventDefault();
    const fields = Object.fromEntries(new FormData(event.currentTarget));
    handle(async () => {
      if (credential) return google(credential, fields.phone);
      if (signup) {
        if (!pending) return sendCode(fields);
        await register({ requestId: pending, code });
        navigate("/login", { state: { ...location.state, registered: fields.role || "user" } });
      } else {
        const account = await login(identifier, password);
        navigate(destination(account), { replace: true });
      }
    });
  }
  return <section className="auth-page"><div className="frame auth-grid">
    <div className="auth-form"><h1>{setup ? "Finish your wallet" : pending ? "Verify your email" : signup ? "Create your wallet" : "Welcome back"}<em>.</em></h1>
      <p>{pending ? "Enter the six-digit code sent to " + draft.email + "." : setup ? "Choose the phone number people will use to send you money." : signup ? "Use your email and phone number to create your wallet." : "Sign in to your DigiPay wallet."}</p>
      {location.state?.reset && <div className="form-note" role="status">Password reset. Sign in with your new password.</div>}
      {location.state?.registered && <div className="form-note" role="status">{location.state.registered === "agent" ? "Account created. You can sign in after agent approval." : "Account created. Sign in with your email or phone number."}</div>}
      {error && <div className="form-error" role="alert">{error}</div>}
      <form key={setup ? "setup" : pending ? "verify" : "identity"} onSubmit={submit} className="field-stack">
        {pending ? <EmailCode value={code} onChange={setCode}/> : setup ? <>
          <label>Wallet phone number<input name="phone" type="tel" autoComplete="tel" required pattern="[+]?[0-9]{7,15}" placeholder="Enter your wallet phone number"/></label>
        </> : <>
          {signup && <><label>Full name<input name="name" defaultValue={draft?.name || ""} autoComplete="name" required maxLength={100}/></label>
            <label>Account type<select name="role" value={role} onChange={e => setRole(e.target.value)}><option value="user">Personal wallet</option><option value="agent">Agent account</option></select></label></>}
          {signup ? <>
            <label>Email address<input name="email" defaultValue={draft?.email || ""} type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com"/></label>
            <label>Wallet phone number<input name="phone" type="tel" defaultValue={draft?.phone || ""} autoComplete="tel" pattern="[+]?[0-9]{7,15}" required placeholder="Enter your phone number"/></label>
          </> : <label>Email or phone number<input name="identifier" autoComplete="username" autoCapitalize="none" required value={identifier} onChange={e => setIdentifier(e.target.value)} placeholder="Email address or wallet phone number"/></label>}
          <label>Password<input name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete={signup ? "new-password" : "current-password"} required minLength={signup ? 8 : undefined} placeholder={signup ? "At least 8 characters" : "Enter your password"}/></label>
          {!signup && <Link className="settings-link" to="/forgot-password">Forgot password?</Link>}
        </>}
        <button className="pill" disabled={busy}>{busy ? "Please wait…" : pending ? "Verify and create account" : setup ? "Finish setup" : signup ? "Continue" : "Log in"} <ArrowRight size={16}/></button>
      </form>
      {pending ? <div className="settings-actions mt-4">
        <button type="button" className="settings-link" disabled={busy || seconds > 0} onClick={() => handle(() => sendCode(draft))}>{seconds ? `Resend in ${seconds}s` : "Resend code"}</button>
        <button type="button" disabled={busy} onClick={() => { setPending(null); setError(""); }}>Edit registration details</button>
      </div> : setup ? <button className="settings-link mt-4" disabled={busy} onClick={() => { setCredential(null); setError(""); }}>Back to sign-in details</button>
        : role === "user" && clientId && <div className="google-option"><span>or</span><GoogleOAuthProvider clientId={clientId} onScriptLoadError={() => setError("Google sign-in could not load. Use email or refresh to retry.")}>
          <GoogleLogin onSuccess={r => handle(() => google(r.credential))} onError={() => setError("Google sign-in was interrupted. Try again.")} shape="pill" text="continue_with"/>
        </GoogleOAuthProvider></div>}
      <p className="auth-switch">{signup ? "Already have a wallet?" : "New to DigiPay?"} <Link state={{ from: location.state?.from }} to={signup ? "/login" : "/register"}>{signup ? "Log in" : "Create a wallet"}</Link></p>
    </div>{signup || setup ? <WalletArtwork/> : <DemoLogins onChoose={account => { setIdentifier(account.email); setPassword(account.password); setError(""); }}/>}
  </div></section>;
}
