import React from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const Pricing = () => (
  <section className="page">
    <h1>Simple pricing</h1>
    <div className="pricing-grid">
      <Card>
        <h2>Standard user</h2>
        <p>Perfect for everyday transfers.</p>
        <ul>
          <li>Wallet account: free</li>
          <li>Transfers: from 0.25% per transaction</li>
          <li>Cash in/out: local agent fees</li>
        </ul>
        <Button>Open wallet</Button>
      </Card>
      <Card>
        <h2>Agent</h2>
        <p>For cash-in & cash-out partners.</p>
        <ul>
          <li>Commission on each operation</li>
          <li>Dedicated agent dashboard</li>
          <li>Admin review & approval</li>
        </ul>
        <Button variant="outline">Apply as agent</Button>
      </Card>
    </div>
  </section>
);

export default Pricing;
