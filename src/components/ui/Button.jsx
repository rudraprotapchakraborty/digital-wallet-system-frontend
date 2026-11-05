export default function Button({ children, variant = "primary", className = "", type = "button", ...props }) {
  return <button type={type} {...props} className={`inline-flex items-center justify-center rounded-xl px-5 py-2 font-semibold transition disabled:opacity-50 disabled:cursor-wait ${variant === "outline" ? "border border-current" : "bg-blue-600 text-white hover:bg-blue-700"} ${className}`}>{children}</button>;
}
