import React,{useState} from "react";
import BookAppointment from "./BookAppointment";

const DoctorCard = ({ doctor }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-lg p-5 w-80 border border-gray-200">
      {/* Doctor Image */}
      <img
        src={`${import.meta.env.VITE_APP_BASE_URL}/${doctor.userId.image}`}
        alt={doctor.userId.name}
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
      />

      {/* Doctor Info */}
      <h2 className="text-xl font-semibold text-gray-800 text-center">
        {doctor.userId.name}
      </h2>
      <p className="text-gray-500 text-center">
        {doctor.specialization} Specialist
      </p>
      <p className="text-gray-600 text-sm text-center">{doctor.userId.email}</p>

      {/* Experience */}
      <p className="text-gray-600 mt-2 text-sm">
        <strong>Experience:</strong> {doctor.experience} years
      </p>

      {/* Available Days */}
      <div className="mt-2">
        <strong className="text-gray-700">Available Days:</strong>
        <p className="text-gray-600 text-sm">
          {doctor.availableDays.join(", ")}
        </p>
      </div>

      {/* Available Slots */}
      <div className="mt-2">
        <strong className="text-gray-700">Available Time:</strong>
        {doctor.availableSlots.map((slot, index) => (
          <div key={index} className="text-gray-600 text-sm">
            <strong>{slot.day}:</strong> {slot.slots.join(", ")}
          </div>
        ))}
      </div>

      {/* Book Appointment Button */}
      {/* <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full hover:bg-blue-600 cursor-pointer"
        onClick={() => setOpenModal(true)}
      >
        Book Appointment
      </button> */}

      <BookAppointment
        doctor={doctor}
        open={openModal}
        setOpen={setOpenModal}
      />
    </div>
  );
};

export default DoctorCard;
