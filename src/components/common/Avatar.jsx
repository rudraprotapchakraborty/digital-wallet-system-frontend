import { useState } from "react";

export default function Avatar({ user, size = 56 }) {
  const [failed, setFailed] = useState("");
  const initials = (user.name || "Wallet member").trim().split(/\s+/).slice(0, 2).map(part => Array.from(part)[0]).join("").toUpperCase();
  return <span aria-hidden="true" className="account-avatar" style={{ width: size, height: size, fontSize: size * 0.36 }}>
    {user.avatar && user.avatar !== failed ? <img src={user.avatar} alt="" referrerPolicy="no-referrer" onError={() => setFailed(user.avatar)}/> : initials}
  </span>;
}
