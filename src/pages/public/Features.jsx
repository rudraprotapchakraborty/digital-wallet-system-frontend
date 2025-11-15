import React from "react";
import Card from "../../components/ui/Card";

const Features = () => (
  <section className="page">
    <h1>Features</h1>
    <div className="landing-grid">
      <Card>
        <h3>Wallet dashboard</h3>
        <p>
          See your balance, recent transfers, and activity timeline in one
          place, with real-time updates and charts.
        </p>
      </Card>
      <Card>
        <h3>User & agent roles</h3>
        <p>
          Separate dashboards for users, agents, and admins with tailored
          actions and navigation.
        </p>
      </Card>
      <Card>
        <h3>Advanced filters</h3>
        <p>
          Find any transaction by type, amount, status, or date range with
          powerful filter options.
        </p>
      </Card>
      <Card>
        <h3>Security by design</h3>
        <p>
          JWT authentication, secure password storage, and role-based
          permissions built-in.
        </p>
      </Card>
    </div>
  </section>
);

export default Features;
