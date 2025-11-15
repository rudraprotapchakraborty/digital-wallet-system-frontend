import React from "react";
import Card from "../ui/Card";

const StatsCards = ({ items }) => (
  <div className="stats-grid" data-tour-id="stats-cards">
    {items.map((stat) => (
      <Card key={stat.label} className="stats-card">
        <p className="stats-label">{stat.label}</p>
        <p className="stats-value">{stat.value}</p>
        {stat.sub && <p className="stats-sub">{stat.sub}</p>}
      </Card>
    ))}
  </div>
);

export default StatsCards;
