import React from "react";
import { useTheme } from "../../context/ThemeContext";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";

const AdminSettings = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const restartTour = () => {
    localStorage.removeItem("wallet_tour_done");
    toast.success("Guided tour will run again on next visit.");
  };

  return (
    <section
      className={`min-h-screen ${
        dark ? "bg-neutral-950 text-white" : "bg-white text-black"
      }`}
    >
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Heading */}
        <h1 className="text-3xl font-extrabold tracking-tight">
          Settings
        </h1>

        <p
          className={`mt-2 text-sm ${
            dark ? "text-gray-200" : "text-gray-600"
          }`}
        >
          Manage administrative preferences and system tools.
        </p>

        {/* Settings Card */}
        <div className="mt-8 max-w-xl">
          <Card>
            <h3
              className={`text-lg font-semibold ${
                dark ? "text-white" : "text-black"
              }`}
            >
              Guided tour
            </h3>

            <p
              className={`mt-3 text-sm ${
                dark ? "text-gray-100" : "text-gray-700"
              }`}
            >
              Reset the guided tour so it will run again for all roles on the
              next visit.
            </p>

            <div className="mt-5">
              <Button variant="outline" onClick={restartTour}>
                Restart tour
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AdminSettings;
