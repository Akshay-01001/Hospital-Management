import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";

const SideNavbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [active, setActive] = useState("dashboard");

  const sideData = [
    { name: "Dashboard", path: "dashboard" },
    { name: "Doctors", path: "doctors" },
    { name: "Book Appointment", path: "book-appointment" },
    { name: "My Appointments", path: "my-appointments" },
    { name: "Reports", path: "reports" },
    { name: "Medical History", path: "medical-history" },
  ];

  if (user?.role === "patient") {
    return (
      <div className="bg-[#D7E5F5] w-[20%] h-[88vh] overflow-hidden">
        <div className="py-10">
          <ul className="flex flex-col gap-5 text-xl text-gray-700">
            {sideData.map((item, index) => (
              <Link
                to={`${item.path}`}
                key={index}
                onClick={() => setActive(item.path)}
              >
                <li
                  className={`${
                    active === item.path ? "text-blue-700" : ""
                  } px-10 flex items-center gap-3 hover:bg-black/10 py-3 cursor-pointer`}
                >
                  <SpaceDashboardOutlinedIcon
                    style={{ width: "30px", height: "30px" }}
                  />
                  <p>{item.name}</p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return null;
};

export default SideNavbar;
