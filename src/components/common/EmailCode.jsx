import { useEffect, useState } from "react";

export function useResendTimer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (!seconds) return;
    const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);
  return [seconds, () => setSeconds(60)];
}

export default function EmailCode({ value, onChange }) {
  return <label>Verification code<input autoComplete="one-time-code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6}
    required placeholder="000000" value={value} onChange={e => onChange(e.target.value.replace(/\D/g, ""))}/></label>;
}
