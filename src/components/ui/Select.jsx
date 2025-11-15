import React from "react";

const Select = ({ label, error, children, ...rest }) => (
  <div className="field">
    {label && <label className="field-label">{label}</label>}
    <select className="field-input" {...rest}>
      {children}
    </select>
    {error && <p className="field-error">{error}</p>}
  </div>
);

export default Select;
