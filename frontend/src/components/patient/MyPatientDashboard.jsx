import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "../sideNavbar/SideNavbar";
import Navbar from "../sideNavbar/Navbar";

function MyPatientDashboard() {
  return (
    <div className="relative max-w-screen h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow">
        <SideNavbar />
        <div className="flex-grow p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MyPatientDashboard;