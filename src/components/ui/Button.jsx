import React from "react";

const Button = ({ children, variant = "primary", className = "", ...rest }) => {
  return (
    <button className={`btn btn-${variant} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
