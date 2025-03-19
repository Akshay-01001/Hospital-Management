import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { columns, fetchAppointments } from "../../Data/AppointmentData";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: "",
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      status: "",
    },
  ]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAppointments(user._id);

      const updatedData = data.map((item, index) => ({
        id: index + 1,
        name: item.doctorId.name,
        email: item.doctorId.email,
        phone: item.doctorId.phone,
        date: new Date(item.date).toLocaleDateString("en-IN"),
        time: item.time,
        status: item.status,
      }));
      console.log(updatedData, "-----> updated data");
      setAppointments(updatedData);
    };
    fetchData();
  }, [user._id]);

  return (
    <div className="h-full rounded-md bg-white/70 overflow-x-scroll">
      <DataGrid
        rows={appointments}
        columns={columns}
        checkboxSelection
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default MyAppointments;
