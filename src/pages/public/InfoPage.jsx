import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const pages = {
  features: { title: "Wallet features", intro: "The tools for moving money and keeping track of it.", items: [
    ["Send and receive", "Send to another personal wallet by phone number. Both wallets share a record of the transfer."],
    ["Manage your balance", "Add money, withdraw funds, and see the result in your balance."],
    ["Search your activity", "Find a transaction by reference, type, status, or date."],
    ["Agent services", "Approved agents can handle cash-in and cash-out requests and track their commissions."],
  ] },
  about: { title: "About DigiPay", intro: "DigiPay is a digital wallet project for personal transfers and agent-assisted cash services.", items: [
    ["Personal wallets", "Members can manage balances, send money, and review their transaction history."],
    ["Agent accounts", "Agents help members with cash-in and cash-out after an administrator approves their account."],
    ["Administration", "Administrators review activity, manage wallet access, and approve or suspend agents."],
  ] },
  pricing: { title: "Fees and commissions", intro: "See how each operation affects your wallet balance.", items: [
    ["Personal transfers", "Your balance decreases by the amount you send. The recipient receives the same amount."],
    ["Deposits and withdrawals", "The amount entered is the amount credited or deducted. There is no additional wallet fee."],
    ["Agent commission", "Cash-in and cash-out transactions record a 1% commission for the agent, rounded to the nearest paisa."],
  ] },
};

const questions = [
  ["How do I open a wallet?", "Enter your name, email, wallet phone number, and password, then verify the six-digit code sent to your email. Where Google sign-in is enabled, you can also sign in with Google and choose a wallet phone number."],
  ["How do I send money?", "Open Send money from your wallet. Enter the recipient’s wallet phone number and the amount, then review and confirm the transfer."],
  ["Where can I find a transfer?", "Open History in your dashboard. Use the transaction reference, date range, or type to narrow the list."],
  ["How are agents approved?", "Choose Agent account during registration. An administrator reviews the account before an agent can sign in."],
  ["How do I add or withdraw money?", "Choose Add money or Withdraw in your personal wallet. For physical cash, choose Cash out, enter an approved agent’s number, and confirm before collecting cash."],
];

export default function InfoPage({ page }) {
  const info = pages[page];
  return <section className="info-page"><div className="frame info-body">
    {info ? <><h1>{info.title}<em>.</em></h1><p>{info.intro}</p><div className="info-grid">{info.items.map(([title, text]) => <article className="info-card" key={title}><h2>{title}</h2><p>{text}</p></article>)}</div><Link className="pill" to="/register">Create a wallet <ArrowUpRight size={16}/></Link></> :
    <><h1>Wallet questions<em>.</em></h1><p>Find help with accounts, transfers, and agent services.</p>{questions.map(([q, a]) => <details className="faq-item" key={q}><summary>{q}</summary><p>{a}</p></details>)}</>}
  </div></section>;
}
