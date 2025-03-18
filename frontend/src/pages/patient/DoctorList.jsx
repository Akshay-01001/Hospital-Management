import React, { useEffect, useState } from "react";
import axios from "axios";
import DoctorCard from "../../components/patient/DoctorCard";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    console.log("called");

    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/doctor/get-all`
        );
        setDoctors(data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-5">
        Available Doctors
      </h1>
      <div className="flex flex-wrap gap-6">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))
        ) : (
          <p className="text-gray-600">No doctors available.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorList;
