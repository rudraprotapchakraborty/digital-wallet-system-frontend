import React, { useEffect, useState } from "react";
import Joyride from "react-joyride";
import Button from "../ui/Button";

const DashboardTour = () => {
  const [run, setRun] = useState(false);

  useEffect(() => {
    const done = localStorage.getItem("wallet_tour_done");
    if (!done) {
      setRun(true);
    }
  }, []);

  const steps = [
    {
      target: '[data-tour-id="nav-menu"]',
      content: "Use the navigation menu to switch between sections.",
    },
    {
      target: '[data-tour-id="stats-cards"]',
      content: "These cards summarize your key wallet stats.",
    },
    {
      target: '[data-tour-id="chart-section"]',
      content: "Charts show how your transactions evolve over time.",
    },
    {
      target: '[data-tour-id="table-filters"]',
      content: "Filter and search through long records quickly.",
    },
    {
      target: '[data-tour-id="theme-toggle"]',
      content: "Toggle between light and dark mode here.",
    },
  ];

  const handleJoyrideCallback = (data) => {
    if (["finished", "skipped"].includes(data.status)) {
      localStorage.setItem("wallet_tour_done", "true");
      setRun(false);
    }
  };

  return (
    <>
      <Joyride
        steps={steps}
        run={run}
        continuous
        showSkipButton
        scrollToFirstStep
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
        callback={handleJoyrideCallback}
      />
      <Button
        variant="ghost"
        onClick={() => setRun(true)}
        title="Restart guided tour"
      >
        ? Tour
      </Button>
    </>
  );
};

export default DashboardTour;
