import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="landing">
      <div className="hero">
        <div className="hero-text">
          <h1>Instant digital wallet for everyday payments.</h1>
          <p>
            digiPay lets you send, receive, and manage money in seconds. Cash in
            via local agents, pay friends, and track every transaction from a
            clean, real-time dashboard.
          </p>
          <div className="hero-actions">
            <Button onClick={() => navigate("/register")}>
              Create free wallet
            </Button>
            <Button variant="outline" onClick={() => navigate("/features")}>
              View features
            </Button>
          </div>
          <p className="hero-note">
            No card required · Works on any device · Secure and compliant
          </p>
        </div>
        <div className="hero-visual">
          <Card>
            <h3>Live wallet snapshot</h3>
            <ul>
              <li>Balance: ₹5,420.00</li>
              <li>Today’s transfers: 7</li>
              <li>Average processing time: 3.2 seconds</li>
            </ul>
          </Card>
        </div>
      </div>

      <section className="landing-section">
        <h2>Why digiPay?</h2>
        <div className="landing-grid">
          <Card>
            <h3>Agent-assisted cash in</h3>
            <p>
              Top up your wallet at any partner agent with cash. Funds appear in
              your account as soon as the agent confirms the transaction.
            </p>
          </Card>
          <Card>
            <h3>Real-time transfers</h3>
            <p>
              Send money to any verified digiPay user using their phone number
              or email. Track status and fees instantly.
            </p>
          </Card>
          <Card>
            <h3>Admin-grade controls</h3>
            <p>
              Built-in tools for admins to approve agents, manage fee rules, and
              monitor network-wide activity.
            </p>
          </Card>
        </div>
      </section>
    </section>
  );
};

export default Home;
