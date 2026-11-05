import { Link } from "react-router-dom";
import { ArrowDownLeft, ArrowRight, ArrowUpRight, History, MoveUpRight, Plus } from "lucide-react";
import WalletArtwork from "../../components/layout/WalletArtwork";
import { useAuth } from "../../context/AuthContext";

const actions = [
  { title: "Send money", text: "Transfer to another wallet using a phone number.", icon: MoveUpRight, to: "/user/send", color: "mint" },
  { title: "Add money", text: "Top up your balance for your next transfer.", icon: Plus, to: "/user/deposit", color: "lilac" },
  { title: "Withdraw", text: "Take money out and see your updated balance.", icon: ArrowDownLeft, to: "/user/withdraw", color: "peach" },
  { title: "Track activity", text: "Find your transfers and check their status.", icon: History, to: "/user/transactions", color: "butter" },
];

export default function Home() {
  const { user } = useAuth();
  return <div className="landing"><div className="frame">
    <section className="home-hero"><div className="hero-copy">
      <div className="eyeline"><i/> PERSONAL DIGITAL WALLET</div>
      <h1>Money moves.<br/><em>Made simple.</em></h1>
      <p>Send, receive, and manage your money from one digital wallet. Your balance and every transfer, all in one place.</p>
      <div className="hero-actions"><Link className="pill" to={user ? "/" + user.role : "/register"}>{user ? "Open my wallet" : "Create a wallet"} <ArrowUpRight size={19}/></Link><Link className="text-action" to="/features">Explore features <ArrowRight size={16}/></Link></div>
    </div><WalletArtwork/></section>
    <section className="action-section"><div className="section-head"><h2>Everyday essentials<span>.</span></h2><Link className="text-action" to="/features">All features <ArrowUpRight size={16}/></Link></div>
      <div className="action-grid">{actions.map(({title,text,icon:Icon,to,color}) => <Link className="action-tile" to={user && user.role !== "user" ? "/" + user.role : to} key={title}>
        <span className={`tile-icon ${color}`}><Icon size={25}/></span><ArrowUpRight className="tile-arrow" size={16}/><h3>{title}</h3><p>{text}</p>
      </Link>)}</div>
    </section>
  </div></div>;
}
