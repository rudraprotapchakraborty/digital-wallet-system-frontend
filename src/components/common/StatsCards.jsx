import React from "react";
import { useTheme } from "../../context/ThemeContext";
import Card from "../ui/Card";

const StatsCards = ({ items }) => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      data-tour-id="stats-cards"
    >
      {items.map((stat) => (
        <Card key={stat.label}>
          <p
            className={`text-sm font-medium ${
              dark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {stat.label}
          </p>

          <p
            className={`mt-2 text-2xl font-extrabold tracking-tight ${
              dark ? "text-white" : "text-black"
            }`}
          >
            {stat.value}
          </p>

          {stat.sub && (
            <p
              className={`mt-1 text-xs ${
                dark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {stat.sub}
            </p>
          )}
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
