import React, { useState, useEffect, useRef } from "react";
import SideNavbar from "../sideNavbar/SideNavbar";
import Navbar from "../sideNavbar/Navbar";

function MyPatientDashboard() {
  return (
    <div className="relative max-w-screen h-[100vh]">
      <div>
        <Navbar />
      </div>
      <div className="flex ">
        <SideNavbar />
      </div>
    </div>
  );
}

export default MyPatientDashboard;
