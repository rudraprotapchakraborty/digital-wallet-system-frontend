import { useId } from "react";
export default function Input({ label, name, error, icon: Icon, className = "", id, ...props }) {
  const generated = useId();
  const inputId = id || generated;
  return <div className={`field-stack single-field ${className}`}>
    {label && <label htmlFor={inputId}>{label}</label>}
    <div className="relative">{Icon && <Icon aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" size={17}/>}
      <input id={inputId} name={name} aria-invalid={Boolean(error)} aria-describedby={error ? inputId + "-error" : undefined} style={Icon ? { paddingLeft: 39 } : undefined} {...props}/>
    </div>{error && <small id={inputId + "-error"} className="text-red-600">{error}</small>}
  </div>;
}
