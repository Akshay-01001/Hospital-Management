import React from "react";
import logo from "../../assets/logo.png";
import user from "../../assets/user.jpeg";
import DensityMediumOutlinedIcon from "@mui/icons-material/DensityMediumOutlined";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';

const Navbar = () => {
  return (
    <div className="w-full py-4 text-white bg-[#3695EB] flex justify-between items-center">
      <div className="px-10 w-[25%]">
        <div className="flex gap-3 items-center">
          <img src={logo} alt="" className="h-10 w-10" />
          <p className="font-semibold text-xl">Medical Dashboard</p>
        </div>
      </div>

      <div className="w-full h-14 flex items-center justify-between px-4 pt-3">
        <div className="w-10 h-10 cursor-pointer">
          <DensityMediumOutlinedIcon style={{width:"30px", height:"30px"}} />
        </div>

        <div className="h-10 flex gap-5 px-5">
          <NotificationsNoneOutlinedIcon style={{width:"35px", height:"45px"}} />
          <MailOutlineOutlinedIcon style={{width:"35px", height:"45px"}} />
          <div className="h-12 w-12 rounded-full bg-white">
            <img src={user} alt="user" className="w-full h-full bg-cover rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
