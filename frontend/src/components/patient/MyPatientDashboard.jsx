import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "../sideNavbar/SideNavbar";
import Navbar from "../sideNavbar/Navbar";

function MyPatientDashboard() {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="relative max-w-screen h-screen flex flex-col">
      <Navbar toggle={toggle} setToggle={setToggle} />
      <div className={"flex flex-grow"}>
        <SideNavbar toggle={toggle} />
        <div
          className={`flex-grow overflow-hidden p-6 ${!toggle ? "w-[93%]" : "w-[80%] "}
           bg-gray-200`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MyPatientDashboard;
