import React, { useState, useEffect, useRef } from 'react'

import { Outlet } from 'react-router-dom';

//Importing components
import Navbar from '../sideNavbar/Navbar';
import SideNavbar from '../sideNavbar/SideNavbar';
// import MobileSideNavbar from '../components/MobileSideNavbar';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
};

function MyPatientDashboard() {

    const [toggle, setToggle] = useState(useIsMobile()?false:true)
    const isMobile = useIsMobile()

    const popupRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (isMobile && popupRef.current && !popupRef.current.contains(event.target)) {
            setToggle(false);
          }
        };
    
        if (toggle) {
          document.addEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [toggle]);
    

    return (
        <div className='relative max-w-screen h-[100vh] flex'>
            {/* Side navbar */}
            <SideNavbar toggle={toggle} setToggle={setToggle}></SideNavbar>
            {/* Mobile Side Navbar */}
            {/* <MobileSideNavbar ref={popupRef} toggle={toggle}></MobileSideNavbar> */}
            <div className={`flex ${toggle ? "md:w-[83%]" : "md:w-[94%]"} w-full flex-col`}>
                {/* Navbar  */}
                <Navbar toggle={toggle} setToggle={setToggle}></Navbar>
                <div className='w-full overflow-y-scroll h-full bg-[#F5F5F5]'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}

export default MyPatientDashboard;