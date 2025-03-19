import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { doctorColumns, fetchAppointmentsByDoctor } from "../../Data/AppointmentData.js";

const DoctorAppointment = () => {
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
      const data = await fetchAppointmentsByDoctor(user._id);

      const updatedData = data.map((item, index) => ({
        id: index + 1,
        name: item.patientId.name,
        email: item.patientId.email,
        phone: item.patientId.phone,
        date: new Date(item.date).toLocaleDateString("en-IN"),
        time: item.time,
        status: item.status,
      }));
      setAppointments(updatedData);
    };
    fetchData();
  }, [user._id]);

  return (
    <div className="h-full rounded-md bg-white/70 overflow-x-scroll">
      <DataGrid
        rows={appointments}
        columns={doctorColumns}
        checkboxSelection
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default DoctorAppointment;
