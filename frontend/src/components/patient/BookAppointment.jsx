import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import {toast} from "react-toastify"

const BookAppointment = ({ doctor }) => {
//   console.log(doctor);
  const { user } = useSelector((state) => state.auth);
//   console.log(user);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [availableDates, setAvailableDates] = useState([]);

  const availableSlots = doctor.availableSlots || [];

  useEffect(() => {
    // Function to calculate next available dates
    const getNextAvailableDates = () => {
      const today = new Date();
      const daysOfWeek = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ];
      let dates = [];

      for (let i = 0; i < 6; i++) {
        let date = new Date();
        date.setDate(today.getDate() + i);
        let dayName = daysOfWeek[date.getDay()].toLowerCase();
        console.log(dayName,"-------> dayname");
        

        let slot = availableSlots.find((s) => s.day === dayName);
        console.log(slot,"--------> slot");
        
        if (slot) {
          dates.push({
            date: date.toLocaleDateString("en-CA"),
            day: dayName,
            slots: slot.slots,
          });
        }

        if (dates.length >= 4) break; // Get only the next 4 available dates
      }
      console.log(dates,"----> dqtes");
      
      return dates;
    };

    setAvailableDates(getNextAvailableDates());
  }, [doctor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/appointment/book-appointment/${
          user._id
        }/${doctor.userId?._id}`,
        {
          date: selectedDate,
          time: selectedTime,
        },
        {
          withCredentials: true,
        }
      );
      toast.success(response?.data?.message)
    } catch (error) {
        toast.error(error?.response?.data?.message)
      console.log(error);
    }
    setOpen(false);
  };

  return (
    <div className="py-2">
      {/* Open Modal Button */}
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Book Appointment
      </Button>

      {/* MUI Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 450,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Book Appointment with {doctor.userId.name}
          </Typography>

          {/* Date Selection Row */}
          <Box display="flex" gap={1} flexWrap="wrap" my={2}>
            {availableDates.map((slot, index) => (
              <Button
                key={index}
                variant={selectedDate === slot.date ? "contained" : "outlined"}
                color="success"
                sx={{
                  bgcolor: selectedDate === slot.date ? "green" : "white",
                  color: selectedDate === slot.date ? "white" : "black",
                }}
                onClick={() => {
                  setSelectedDate(slot.date);
                  setSelectedTime(""); // Reset time on date change
                }}
              >
                {slot.date}
              </Button>
            ))}
          </Box>

          {/* Time Slot Selection */}
          {selectedDate && (
            <>
              <Typography variant="body1" gutterBottom>
                Select a time:
              </Typography>
              <Select
                fullWidth
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                displayEmpty
                required
              >
                <MenuItem value="" disabled>
                  Select a time
                </MenuItem>
                {availableDates
                  .find((slot) => slot.date === selectedDate)
                  ?.slots.map((time, index) => (
                    <MenuItem key={index} value={time}>
                      {time}
                    </MenuItem>
                  ))}
              </Select>
            </>
          )}

          {/* Buttons */}
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={() => setOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ ml: 2 }}
              onClick={handleSubmit}
              disabled={!selectedDate || !selectedTime}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default BookAppointment;
