import React, { useState } from "react";
import SideNavbar from "../../components/Navbar/SideNavbar";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const MyDoctorDashboard = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="relative max-w-screen h-screen flex flex-col border border-red-500">
      <Navbar toggle={toggle} setToggle={setToggle} />
      <div className={"flex flex-grow"}>
        <SideNavbar toggle={toggle} />
        <div
          className={`flex-grow overflow-hidden p-6 ${
            !toggle ? "w-[93%]" : "w-[80%] "
          }
             bg-gray-200`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MyDoctorDashboard;
