import React from "react";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const Dashboard = () => {
  return (
    <div className="flex flex-wrap justify-evenly">
      <div className="w-[30%] h-48 bg-white shadow-md rounded-md flex flex-col items-center justify-center">
        <CalendarMonthOutlinedIcon fontSize="large" className="text-blue-500" />
        <h2 className="text-xl font-semibold mt-2">Total Appointments</h2>
        <p className="text-3xl font-bold">120</p>
      </div>

      <div className="w-[30%] h-48 bg-white shadow-md rounded-md flex flex-col items-center justify-center">
        <PendingActionsOutlinedIcon fontSize="large" className="text-blue-500" />
        <h2 className="text-xl font-semibold mt-2">Pending Appointments</h2>
        <p className="text-3xl font-bold text-yellow-500">30</p>
      </div>

      <div className="w-[30%] h-48 bg-white shadow-md rounded-md flex flex-col items-center justify-center">
        <CheckCircleOutlineOutlinedIcon fontSize="large" className="text-blue-500" />
        <h2 className="text-xl font-semibold mt-2">Completed Appointments</h2>
        <p className="text-3xl font-bold text-green-500">90</p>
      </div>
    </div>
  );
};

export default Dashboard;