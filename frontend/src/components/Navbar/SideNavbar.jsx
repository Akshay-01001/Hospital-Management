import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";

const SideNavbar = ({ toggle }) => {
  const { user } = useSelector((state) => state.auth);
  const [active, setActive] = useState("dashboard");

  if (!user) return null; // Hide sidebar if user is not logged in

  const menuItems = {
    patient: [
      {
        name: "Dashboard",
        path: "dashboard",
        icon: <SpaceDashboardOutlinedIcon />,
      },
      {
        name: "Book Appointment",
        path: "book-appointment",
        icon: <AssignmentTurnedInOutlinedIcon />,
      },
      {
        name: "My Appointments",
        path: "my-appointments",
        icon: <AssignmentTurnedInOutlinedIcon />,
      },
      {
        name: "Reports",
        path: "reports",
        icon: <SummarizeOutlinedIcon />,
      },
      {
        name: "Medical History",
        path: "medical-history",
        icon: <MedicalServicesOutlinedIcon />,
      },
    ],
    doctor: [
      {
        name: "Dashboard",
        path: "dashboard",
        icon: <SpaceDashboardOutlinedIcon />,
      },
      {
        name: "Appointments",
        path: "appointments",
        icon: <AssignmentTurnedInOutlinedIcon />,
      },
      {
        name: "Medical Records",
        path: "medical-records",
        icon: <SummarizeOutlinedIcon />,
      },
    ],
    admin: [
      { name: "Dashboard", path: "dashboard" },
      { name: "Manage Users", path: "manage-users" },
      { name: "Appointments", path: "appointments" },
      { name: "Reports", path: "reports" },
      { name: "System Settings", path: "settings" },
    ],
  };

  const sideData = menuItems[user.role] || [];

  return (
    <div
      className={`bg-[#D7E5F5] ${
        !toggle ? "w-[20%]" : "w-[7%]"
      } h-[88vh]  transition-all duration-300`}
    >
      <div className="py-10">
        <ul className="flex flex-col gap-5 text-xl text-gray-700">
          {sideData.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              onClick={() => setActive(item.path)}
            >
              <li
                className={`${
                  active === item.path ? "text-blue-700" : ""
                } px-10 flex items-center gap-3 hover:bg-black/10 py-3 cursor-pointer`}
              >
                {item.icon}
                {!toggle && <p>{item.name}</p>}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideNavbar;
