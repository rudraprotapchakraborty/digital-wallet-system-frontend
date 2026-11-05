import { Link } from "react-router-dom";

export function Mark() {
  return <svg width="32" height="32" viewBox="0 0 34 34" fill="currentColor" aria-hidden="true">
    <path d="M4 4h12a13 13 0 0 1 0 26H4l5-8h7a5 5 0 1 0 0-10H0z"/><path d="M5 15h12l-4 5H2z"/>
  </svg>;
}

export default function Brand() {
  return <Link to="/" aria-label="DigiPay home" className="brand"><Mark />DigiPay</Link>;
}
