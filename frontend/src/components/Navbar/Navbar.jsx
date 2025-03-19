import React, { useRef, useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import user from "../../assets/user.jpeg";
import DensityMediumOutlinedIcon from "@mui/icons-material/DensityMediumOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = ({ toggle, setToggle }) => {
  const popupRef = useRef(null);
  const [isOpenPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setOpenPopup(false);
      }
    };

    if (isOpenPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenPopup]);

  return (
    <div className="w-full py-4 text-white bg-[#3695EB] flex justify-between items-center transition-all">
      <div
        className={`${
          !toggle ? "w-[25%] px-10" : "flex justify-center items-center w-[7%]"
        } transition-all duration-300`}
      >
        <div className="flex gap-3 items-center">
          <img src={logo} alt="" className="h-10 w-10" />
          {!toggle && (
            <p className="font-semibold text-xl">Medical Dashboard</p>
          )}
        </div>
      </div>

      <div className="w-full h-14 flex items-center justify-between px-8 pt-3 relative">
        <div className="w-10 h-10 cursor-pointer">
          <DensityMediumOutlinedIcon
            style={{ width: "30px", height: "30px" }}
            onClick={() => setToggle(!toggle)}
          />
        </div>

        <div className="h-10 flex gap-5 px-5">
          <NotificationsNoneOutlinedIcon
            style={{ width: "35px", height: "45px" }}
          />
          <MailOutlineOutlinedIcon style={{ width: "35px", height: "45px" }} />
          <div className="h-12 w-12 rounded-full bg-white cursor-pointer">
            <img
              src={user}
              alt="user"
              className="w-full h-full bg-cover rounded-full"
              onClick={() => setOpenPopup(!isOpenPopup)}
            />
          </div>
        </div>

        {isOpenPopup && (
          <div
            className="absolute bg-white h-28 w-40 z-50 right-2 top-17 shadow-md"
            ref={popupRef}
          >
            <div className="h-1/2 w-full hover:bg-black/20 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-2 h-full w-full px-2">
                <img
                  src={user}
                  alt="User"
                  className="h-8 w-8 border border-black rounded-full"
                />
                <p className="text-black text-sm">My Profile</p>
              </div>
            </div>
            <div className="h-1/2 w-full hover:bg-black/20 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-2 h-full w-full px-2">
                <LogoutIcon style={{ color: "red" }} />
                <p className="text-black text-sm">LOGOUT</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
