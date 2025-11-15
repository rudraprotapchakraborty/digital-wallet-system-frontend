import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <p>© {new Date().getFullYear()} digiPay Wallet. All rights reserved.</p>
      <div className="footer-links">
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
