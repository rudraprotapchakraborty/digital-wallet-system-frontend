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
      target: '[data-tour-id="sidebar"]',
      content:
        "This sidebar lets you navigate between dashboard sections based on your role.",
      placement: "right",
    },
    {
      target: '[data-tour-id="stats-cards"]',
      content:
        "These cards give you a quick overview of important metrics and activity.",
      placement: "bottom",
    },
    {
      target: '[data-tour-id="table-filters"]',
      content:
        "Use filters and search to quickly find records in large tables.",
      placement: "bottom",
    },
    {
      target: "body",
      content:
        "That’s it! You can explore the dashboard freely. You can restart this tour anytime.",
      placement: "center",
    },
  ];

  const handleJoyrideCallback = (data) => {
    if (data.status === "finished" || data.status === "skipped") {
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
        disableOverlayClose
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: "#2563eb",
            textColor: "#111827",
          },
        }}
        callback={handleJoyrideCallback}
      />

      <Button
        variant="outline"
        onClick={() => setRun(true)}
        title="Restart guided tour"
      >
        Tour
      </Button>
    </>
  );
};

export default DashboardTour;
