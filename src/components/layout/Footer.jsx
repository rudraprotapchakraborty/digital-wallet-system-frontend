import { ArrowUpRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Brand from "./Brand";

export default function Footer() {
  return <footer className="site-footer"><div className="frame footer-inner">
    <Brand /><small>© {new Date().getFullYear()} DigiPay</small>
    <nav aria-label="Footer"><Link to="/about">About</Link><Link to="/pricing">Fees</Link><Link to="/faq">FAQ</Link><Link to="/contact">Contact</Link></nav>
    <a className="made-by" href="https://rudraprotapchakraborty.com" target="_blank" rel="noopener noreferrer" aria-label="Made by Rudra Protap Chakraborty (opens his portfolio)">
      <Heart aria-hidden size={14} /><span>Made by <b>Rudra Protap Chakraborty</b></span><ArrowUpRight aria-hidden size={14} />
    </a>
  </div></footer>;
}
