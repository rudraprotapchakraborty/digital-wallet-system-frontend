import React, { useEffect, useState } from "react";
import Joyride, { STATUS } from "react-joyride";
import { Sparkles, HelpCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import Button from "../ui/Button";

const DashboardTour = () => {
  const [run, setRun] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    // Small delay to ensure layout is painted before checking tour status
    const timer = setTimeout(() => {
      const done = localStorage.getItem("wallet_tour_done");
      if (!done) {
        setRun(true);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const steps = [
    {
      target: '[data-tour-id="sidebar"]',
      title: "🧭 Smart Navigation",
      content:
        "Switch between your wallet, transactions, and profile effortlessly using this responsive command center.",
      placement: "right",
      disableBeacon: true,
    },
    {
      target: '[data-tour-id="stats-cards"]',
      title: "📊 Live Metrics",
      content:
        "Monitor your real-time balance and daily activity. These cards update instantly as you transact.",
      placement: "bottom",
    },
    {
      target: '[data-tour-id="table-filters"]',
      title: "🔍 Precision Search",
      content:
        "Drill down into your financial history using advanced filters. Find any record in milliseconds.",
      placement: "bottom",
    },
    {
      target: "body",
      title: "🚀 You're all set!",
      content:
        "Your digital workspace is ready. Feel free to explore, or click the 'Tour' button if you ever need a refresher.",
      placement: "center",
    },
  ];

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
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
        showProgress
        scrollToFirstStep
        disableOverlayClose
        spotlightPadding={10}
        callback={handleJoyrideCallback}
        locale={{
          last: "Finish",
          back: "Back",
          next: "Next",
          skip: "Skip Tour"
        }}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: "#3b82f6", // blue-500
            backgroundColor: isDark ? "#171717" : "#ffffff",
            arrowColor: isDark ? "#171717" : "#ffffff",
            textColor: isDark ? "#f5f5f5" : "#111827",
            overlayColor: isDark ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.5)",
          },
          tooltipTitle: {
            fontSize: "18px",
            fontWeight: "900",
            letterSpacing: "-0.025em",
            marginBottom: "8px",
          },
          tooltipContent: {
            fontSize: "14px",
            lineHeight: "1.6",
            opacity: "0.8",
          },
          buttonNext: {
            borderRadius: "12px",
            fontWeight: "700",
            padding: "10px 20px",
          },
          buttonBack: {
            marginRight: "10px",
            fontWeight: "700",
            color: isDark ? "#a3a3a3" : "#6b7280",
          },
          buttonSkip: {
            fontWeight: "700",
            color: "#ef4444",
          },
          spotlight: {
            borderRadius: "16px",
          }
        }}
      />

      <Button
        variant="outline"
        onClick={() => setRun(true)}
        className={`group hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-bold transition-all ${
          isDark 
            ? "border-white/10 hover:bg-white/5" 
            : "border-black/5 hover:bg-black/5"
        }`}
      >
        <Sparkles 
          size={14} 
          className="text-blue-500 group-hover:rotate-12 transition-transform" 
        />
        Tour
      </Button>

      {/* Mobile Icon-only Version */}
      <button
        onClick={() => setRun(true)}
        className="sm:hidden p-2 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Restart tour"
      >
        <HelpCircle size={20} />
      </button>
    </>
  );
};

export default DashboardTour;