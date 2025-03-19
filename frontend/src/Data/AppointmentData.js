import axios from "axios";

export const columns = [
  {
    field: "id",
    headerName: "Sr No",
    width: 100,
  },
  {
    field: "name",
    headerName: "Doctor Name",
    width: 180,
  },
  {
    field: "email",
    headerName: "Doctor Email",
    width: 180,
  },
  {
    field: "phone",
    headerName: "Contact Number",
    width: 200,
  },
  {
    field: "date",
    headerName: "Appointment Date",
    width: 220,
  },
  {
    field: "time",
    headerName: "Appointment Time",
    width: 200,
  },
  {
    field: "status",
    headerName: "Appointment Status",
    width: 200,
  },
];

export const fetchAppointments = async (id) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/appointment/get-patient/${id}`,
      {
        withCredentials: true,
      }
    );
    return response?.data?.data || [];
  } catch (error) {
    console.log(error);
  }
};
