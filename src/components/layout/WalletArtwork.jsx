import { Check, Nfc } from "lucide-react";
import { Mark } from "./Brand";

function Engraving() {
  return <svg viewBox="0 0 360 220" preserveAspectRatio="none" className="engraving" aria-hidden="true">
    {Array.from({length: 52}, (_, i) => <path key={i} d={`M ${130 + i * 3} -32 C ${435 + i * 2} 58, ${30 + i * 2} 108, ${225 + i * 4} 260`}/>)}
  </svg>;
}

export default function WalletArtwork() {
  return <div className="art-panel" role="img" aria-label="DigiPay wallet preview with two illustrated cards and an example transfer of 850 rupees">
    <div className="art-caption"><span className="status-dot"/> WALLET PREVIEW</div>
    <div className="art-stage" aria-hidden="true">
      <div className="art-card back-card"><Engraving/><div className="card-brand"><Mark/> DigiPay</div><span className="back-lines">DIGITAL WALLET</span></div>
      <div className="art-card front-card"><Engraving/><div className="card-top"><span className="card-brand"><Mark/> DigiPay</span><Nfc size={25}/></div>
        <div className="card-bottom"><span>PERSONAL WALLET</span><b>•••• &nbsp; •••• &nbsp; 2048</b></div><div className="card-rings"><i/><i/></div>
      </div>
      <div className="art-receipt"><i><Check size={19}/></i><div><b>Money sent</b><small>Wallet transfer</small></div><strong>₹850.00</strong></div>
    </div>
  </div>;
}
