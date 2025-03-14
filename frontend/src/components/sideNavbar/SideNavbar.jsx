import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

// Importing icons
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { Ellipsis, Users } from "lucide-react";
import { SquarePen } from "lucide-react";
import { Contact } from "lucide-react";
import { Handshake } from "lucide-react";
import { FolderOpenDot } from "lucide-react";
import { MessageSquareCode } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import logo from "../../assets/logo.png";

function SideNavbar({ toggle }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [innerToggle, setInnerToggle] = useState(toggle);
  const [blogDropDown, setBlogDropDown] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
  };

  useEffect(() => {
    setInnerToggle(toggle);
  }, [toggle]);

  const isActive = (pathname) => {
    if (location.pathname.includes(pathname)) {
      console.log(pathname, "done");
      return true;
    } else {
      console.log(pathname, "not done");
      return false;
    }
  };

  const mouseIn = () => {
    if (!toggle) {
      setInnerToggle(true);
    }
  };

  const mouseOut = () => {
    if (!toggle) {
      setInnerToggle(false);
    }
  };

  return (
    <div
      className={`${
        toggle ? "w-[17%]" : "w-[6%]"
      } md:block hidden overflow-y-hidden transition-all duration-300 h-full border`}
    >
      <div className="h-20 px-4 w-full border-b flex justify-start items-center">
        {toggle ? (
        //   <h1 className="font-bold font-mono text-3xl">Care Connect</h1>
          <img src={logo} alt="logo" srcset="" className="bg-white h-16 w-40" />
        ) : (
          <div className="w-full flex justify-center items-center">
            <span className="font-mono bg-blue-500 text-white font-bold text-2xl w-10 h-10 flex justify-center items-center rounded-md">
              C
            </span>
          </div>
        )}
      </div>
      {/* Navigation Div */}
      <div
        onMouseEnter={mouseIn}
        onMouseLeave={mouseOut}
        className={`${
          innerToggle ? "w-[200px] absolute" : "w-auto"
        } h-[89%] flex bg-white flex-col z-50 transition-all duration-500 px-4 py-6`}
      >
        <div className="flex flex-col gap-4">
          {toggle || innerToggle ? (
            <span className="text-xs text-gray-500 font-semibold">
              NAVIGATION
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <Ellipsis></Ellipsis>
            </span>
          )}
          {toggle || innerToggle ? (
            <div
              onClick={() => handleNavigate("dashboard")}
              className={`flex ${
                isActive("dashboard") && "bg-gray-100"
              } hover:bg-gray-100 cursor-pointer transition-all duration-300 rounded-md p-2 items-center gap-2`}
            >
              <span>
                <SpaceDashboardOutlinedIcon
                  style={{ fontSize: "1.4rem" }}
                ></SpaceDashboardOutlinedIcon>
              </span>
              <span className="text-sm font-semibold">Dashboard</span>
            </div>
          ) : (
            <div
              onClick={() => handleNavigate("dashboard")}
              className={`flex ${
                isActive("dashboard") && "bg-gray-100"
              } hover:bg-gray-100 cursor-pointer transition-all duration-300  p-1.5 rounded-md  justify-center items-center`}
            >
              <span>
                <SpaceDashboardOutlinedIcon
                  style={{ fontSize: "1.8rem", fontWeight: "200" }}
                ></SpaceDashboardOutlinedIcon>
              </span>
            </div>
          )}
          {toggle || innerToggle ? (
            <div className="flex flex-col gap-.5">
              <div
                onClick={() => setBlogDropDown((prev) => !prev)}
                className={`flex ${
                  isActive("blogs") && "bg-gray-100"
                } hover:bg-gray-100 cursor-pointer transition-all justify-between duration-300 rounded-md p-2 items-center gap-2`}
              >
                <div className="flex items-center gap-2">
                  <span className="">
                    <SquarePen></SquarePen>
                  </span>
                  <span className="text-sm font-semibold">Blogs</span>
                </div>
                {blogDropDown ? (
                  <ChevronDown className="w-4 h-4"></ChevronDown>
                ) : (
                  <ChevronUp className="w-4 h-4"></ChevronUp>
                )}
              </div>
              {blogDropDown && (
                <div className="flex pl-10 flex-col py-2 gap-1">
                  <div
                    onClick={() => handleNavigate("blogs/allblogs")}
                    className={`flex ${
                      isActive("blogs/allblogs") && "bg-gray-100"
                    } rounded-md cursor-pointer p-1 hover:bg-gray-100 items-center gap-1.5`}
                  >
                    <span className="font-semibold">
                      <ListOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      ></ListOutlinedIcon>
                    </span>
                    <span className="text-sm font-semibold">All Blogs</span>
                  </div>
                  <div
                    onClick={() => handleNavigate("blogs/category")}
                    className={`flex ${
                      isActive("blogs/category") && "bg-gray-100"
                    } rounded-md cursor-pointer p-1 hover:bg-gray-100 items-center gap-1.5`}
                  >
                    <span className="font-semibold">
                      <CategoryOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      ></CategoryOutlinedIcon>
                    </span>
                    <span className="text-sm font-semibold">Category</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              className={`flex ${
                isActive("blogs") && "bg-gray-100"
              } hover:bg-gray-100 cursor-pointer transition-all duration-300  p-1.5 rounded-md  justify-center items-center`}
            >
              <span>
                <SquarePen
                  style={{ fontSize: "1.8rem", fontWeight: "200" }}
                ></SquarePen>
              </span>
            </div>
          )}
          {toggle || innerToggle ? (
            <div
              onClick={() => handleNavigate("contactus")}
              className={`flex ${
                isActive("contactus") && "bg-gray-100"
              } hover:bg-gray-100 cursor-pointer transition-all duration-300 rounded-md p-2 items-center gap-2`}
            >
              <span>
                <Contact style={{ fontSize: "1.4rem" }}></Contact>
              </span>
              <span className="text-sm font-semibold">Contact</span>
            </div>
          ) : (
            <div
              onClick={() => handleNavigate("contactus")}
              className={`flex ${
                isActive("contactus") && "bg-gray-100"
              } hover:bg-gray-100 cursor-pointer transition-all duration-300  p-1.5 rounded-md  justify-center items-center`}
            >
              <span>
                <Contact
                  style={{ fontSize: "1.8rem", fontWeight: "200" }}
                ></Contact>
              </span>
            </div>
          )}
          {toggle || innerToggle ? (
            <div
              onClick={() => handleNavigate("consultant")}
              className={`flex ${
                isActive("consultant") && "bg-gray-100"
              } hover:bg-gray-100 cursor-pointer transition-all duration-300 rounded-md p-2 items-center gap-2`}
            >
              <span>
                <Handshake style={{ fontSize: "1.4rem" }}></Handshake>
              </span>
              <span className="text-sm font-semibold">Consultancy</span>
            </div>
          ) : (
            <div
              onClick={() => handleNavigate("consultant")}
              className={`flex ${
                isActive("consultant") && "bg-gray-100"
              } hover:bg-gray-100 cursor-pointer transition-all duration-300  p-1.5 rounded-md  justify-center items-center`}
            >
              <span>
                <Handshake
                  style={{ fontSize: "1.8rem", fontWeight: "200" }}
                ></Handshake>
              </span>
            </div>
          )}

          {toggle || innerToggle ? (
            <div
              onClick={() => {
                console.log("Navigating to projects/allprojects");
                handleNavigate("projects/allprojects");
              }}
              className={`flex ${
                isActive("projects/allprojects") && "bg-gray-100"
              } hover:bg-gray-100 cursor-pointer transition-all duration-300 rounded-md p-2 items-center gap-2`}
            >
              <span>
                <FolderOpenDot style={{ fontSize: "1.4rem" }}></FolderOpenDot>
              </span>
              <span className="text-sm font-semibold">Projects</span>
            </div>
          ) : (
            <div
              onClick={() => {
                console.log("Navigating to projects/allprojects");
                handleNavigate("projects/allprojects");
              }}
              className={`flex ${
                isActive("projects/allprojects") && "bg-gray-100"
              } hover:bg-gray-100 cursor-pointer transition-all duration-300  p-1.5 rounded-md  justify-center items-center`}
            >
              <span>
                <FolderOpenDot
                  style={{ fontSize: "1.8rem", fontWeight: "200" }}
                ></FolderOpenDot>
              </span>
            </div>
          )}

          {toggle || innerToggle ? (
            <div
              onClick={() => {
                console.log("Navigating to feedback");
                handleNavigate("feedback");
              }}
              className={`flex ${
                isActive("feedback") && "bg-gray-100"
              } hover:bg-gray-100 cursor-pointer transition-all duration-300 rounded-md p-2 items-center gap-2`}
            >
              <span>
                <MessageSquareCode
                  style={{ fontSize: "1.4rem" }}
                ></MessageSquareCode>
              </span>
              <span className="text-sm font-semibold">Feedback</span>
            </div>
          ) : (
            <div
              onClick={() => {
                console.log("Navigating to feedback");
                handleNavigate("feedback");
              }}
              className={`flex ${
                isActive("feedback") && "bg-gray-100"
              } hover:bg-gray-100 cursor-pointer transition-all duration-300  p-1.5 rounded-md  justify-center items-center`}
            >
              <span>
                <MessageSquareCode
                  style={{ fontSize: "1.8rem", fontWeight: "200" }}
                ></MessageSquareCode>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SideNavbar;
