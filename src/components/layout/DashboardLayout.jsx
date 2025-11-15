import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";
import DashboardTour from "../common/DashboardTour";

const DashboardLayout = ({ role }) => {
  const { logout } = useAuth();

  return (
    <div className="dashboard">
      <Sidebar role={role} />
      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <div />
          <div className="dashboard-topbar-actions">
            <DashboardTour />
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        </header>
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
