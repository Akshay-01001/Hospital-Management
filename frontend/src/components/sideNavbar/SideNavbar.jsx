import React, { useState } from "react";
import { useSelector } from "react-redux";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import doctor from "../../assets/doctor.png";

const getSideNavbarData = () => {
  const { user } = useSelector((state) => state.auth);
  const [active, setActive] = useState("Dashboard");

  const sideData = [
    "Dashboard",
    "Doctors",
    "Book Appointment",
    "My Appointments",
    "Reports",
    "Medical History",
  ];

  switch (user.role) {
    case "patient":
      return (
        <ul className="flex flex-col gap-5 text-xl text-gray-700">
          {sideData.map((data, index) => (
            <li
              key={index}
              className={`${
                active == data ? "text-blue-700" : ""
              } px-10 flex items-center gap-3 hover:bg-black/10 py-3 cursor-pointer`}
              onClick={() => setActive(data)}
            >
              <SpaceDashboardOutlinedIcon
                style={{ width: "30px", height: "30px" }}
              />
              <p>{data}</p>
            </li>
          ))}
        </ul>
      );
  }
};

const SideNavbar = () => {
  return (
    <div className="bg-[#D7E5F5] w-[20%] h-[88vh] overflow-hidden ">
      <div className="py-10">{getSideNavbarData()}</div>
    </div>
  );
};

export default SideNavbar;