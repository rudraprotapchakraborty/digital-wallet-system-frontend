import { Link } from "react-router-dom";
import Brand from "./Brand";

export default function Footer() {
  return <footer className="site-footer"><div className="frame footer-inner">
    <Brand /><small>© {new Date().getFullYear()} DigiPay</small>
    <nav aria-label="Footer"><Link to="/about">About</Link><Link to="/pricing">Fees</Link><Link to="/faq">FAQ</Link><Link to="/contact">Contact</Link></nav>
  </div></footer>;
}
