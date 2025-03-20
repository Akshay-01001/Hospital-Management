import axios from "axios";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Tooltip } from "@mui/material";

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

export const doctorColumns = [
  {
    field: "id",
    headerName: "Sr No",
    width: 100,
  },
  {
    field: "name",
    headerName: "Patient Name",
    width: 140,
  },
  {
    field: "email",
    headerName: "Patient Email",
    width: 200,
  },
  {
    field: "phone",
    headerName: "Contact Number",
    width: 180,
  },
  {
    field: "date",
    headerName: "Appointment Date",
    width: 170,
  },
  {
    field: "time",
    headerName: "Appointment Time",
    width: 170,
  },
  {
    field: "status",
    headerName: "Appointment Status",
    width: 160,
  },
  {
    field: "action",
    headerName: "Actions",
    width: 130,

    renderCell: (params) => (
      <div className="w-full flex gap-4 h-full items-center">
        <Tooltip title="Accept Appointment">
          <button className="bg-green-500 hover:bg-green-600 transition-colors duration-300 text-white w-7 h-7 flex justify-center items-center rounded-full cursor-pointer">
            <CheckOutlinedIcon />
          </button>
        </Tooltip>
        <Tooltip title="cancel appointment">
          <button className="bg-red-500 hover:bg-red-600 transition-colors duration-300 text-white w-7 h-7 flex justify-center items-center rounded-full cursor-pointer">
            <CloseOutlinedIcon />
          </button>
        </Tooltip>
      </div>
    ),
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

export const fetchAppointmentsByDoctor = async (id) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/appointment/get-doctor/${id}`,
      {
        withCredentials: true,
      }
    );
    return response?.data?.data || [];
  } catch (error) {
    console.log(error);
  }
};
