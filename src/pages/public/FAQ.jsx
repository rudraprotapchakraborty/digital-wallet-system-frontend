import React from "react";

const FAQ = () => (
  <section className="page">
    <h1>Frequently asked questions</h1>
    <details>
      <summary>How do I add money to my wallet?</summary>
      <p>
        After logging in, go to Deposit. You can simulate a direct deposit or
        ask an agent to perform a cash-in on your behalf.
      </p>
    </details>
    <details>
      <summary>Can I use Digital Wallet System without a bank account?</summary>
      <p>
        Yes. You can operate entirely with cash through approved agents who
        handle cash in and cash out.
      </p>
    </details>
    <details>
      <summary>How are agents approved?</summary>
      <p>
        Admins review each agent profile. Once approved, agents can start
        performing cash operations with transparent tracking.
      </p>
    </details>
  </section>
);

export default FAQ;
