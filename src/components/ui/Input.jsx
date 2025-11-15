import React from "react";

const Input = ({ label, error, ...rest }) => (
  <div className="field">
    {label && <label className="field-label">{label}</label>}
    <input className="field-input" {...rest} />
    {error && <p className="field-error">{error}</p>}
  </div>
);

export default Input;
