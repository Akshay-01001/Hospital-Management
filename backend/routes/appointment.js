import express from "express";
import {
  bookAppointment,
  availableSlots,
  getAllAppointments,
  getAppointmentsByDoctor
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/book-appointment/:patientId/:doctorId", bookAppointment);
router.post("/available-slots/:doctorId", availableSlots);
router.get('/get-all', getAllAppointments);
router.get('/get/:doctorId', getAppointmentsByDoctor);

export default router;