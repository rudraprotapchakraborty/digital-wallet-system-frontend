import React from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";

const AdminSettings = () => {
  const restartTour = () => {
    localStorage.removeItem("wallet_tour_done");
    toast.success("Guided tour will run again on next visit.");
  };

  return (
    <section className="page">
      <h1>Settings</h1>
      <Card>
        <h3>Guided tour</h3>
        <p>
          Reset the guided tour so that it will run again for all roles on the
          next visit.
        </p>
        <Button variant="outline" onClick={restartTour}>
          Restart tour
        </Button>
      </Card>
    </section>
  );
};

export default AdminSettings;
