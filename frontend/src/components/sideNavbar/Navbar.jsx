import React, { useState, useEffect, useRef } from 'react'
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
//Importing icons
import { ListCollapse } from 'lucide-react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import axios from 'axios';
import { toast } from 'react-toastify'

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

function Navbar({ toggle, setToggle }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  const popupRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/logoutAdmin`, {}, { withCredentials: true })
      dispatch({ type: 'LOGOUT' });
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.")
      console.log(err)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target)
      ) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div className='h-[91px] sticky z-40 border-b flex justify-between items-center px-4'>
      {
        isMobile ?
          toggle ? <ArrowRightAltIcon style={{ fontSize: '1.8rem' }} onClick={() => setToggle(false)} className='cursor-pointer'></ArrowRightAltIcon> : <ListCollapse style={{ fontSize: '1.8rem' }} onClick={() => setToggle(true)} className='cursor-pointer'></ListCollapse>
          : toggle ? <ListCollapse style={{ fontSize: '1.8rem' }} onClick={() => setToggle(false)} className='cursor-pointer'></ListCollapse> : <ArrowRightAltIcon style={{ fontSize: '1.8rem' }} onClick={() => setToggle(true)} className='cursor-pointer'></ArrowRightAltIcon>
      }
      <div className="relative flex justify-center items-center px-10">
        <img onClick={() => setIsVisible((prev) => (!prev))} src={"https://static.toiimg.com/photo/80387978.cms"} alt='profile' className='w-10 h-10 rounded-full cursor-pointer'></img>
        {
          isVisible &&
          <div ref={popupRef} className='absolute right-0 top-[120%] flex flex-col bg-white w-[200px] shadow border rounded-md'>
            <div className='flex items-center gap-2 border-b p-2'>
              <img src={"https://static.toiimg.com/photo/80387978.cms"} alt='profile' className='w-10 h-10 rounded-full cursor-pointer'></img>
              <div className='flex flex-col'>
                <h1>Harhit Gadhiya</h1>
                <span className='text-sm text-blue-600'>Admin</span>
              </div>
            </div>
            <div onClick={handleLogout} className='p-2 flex gap-3 cursor-pointer transition-colors duration-300 hover:bg-slate-50'>
              <span className='text-red-500'><LogoutIcon></LogoutIcon></span>
              <span>Logout</span>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar