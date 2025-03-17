import appointmentModel from "../models/appointment.model.js";
import doctorModel from "../models/doctor.model.js";
import patientModel from "../models/patient.models.js";

export const bookAppointment = async (req, res, next) => {
  try {
    const { patientId, doctorId } = req.params;
    const { date, time } = req.body;

    if (!patientId || !doctorId || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const doctor = await doctorModel.findOne({ userId: doctorId });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const patient = await patientModel.findOne({ userId: patientId });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const dayOfWeek = new Date(date).toLocaleString("en-IN", {
      weekday: "long",
    });
    const doctorSchedule = doctor.availableSlots.find(
      (s) => s.day === dayOfWeek.toLowerCase()
    );
    console.log(doctorSchedule);
    console.log(time);

    if (!doctorSchedule || !doctorSchedule.slots.includes(time)) {
      return res.status(400).json({ message: "Invalid slot" });
    }

    const existingAppointments = await appointmentModel.countDocuments({
      doctorId,
      date: new Date(date),
      time,
      status: { $ne: "cancelled" },
    });

    if (existingAppointments >= 4) {
      return res.status(400).json({ message: "Slot is fully booked" });
    }

    await appointmentModel.create({
      patientId,
      doctorId,
      date,
      time,
      status: "pending",
    });

    res
      .status(201)
      .json({ success: true, message: "Appointment booked successfully" });
  } catch (error) {
    next(error);
  }
};

export const availableSlots = async (req, res, next) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const dayOfWeek = new Date(date).toLocaleString("en-IN", {
      weekday: "long",
    });

    const doctorSchedule = doctor.availableSlots.find(
      (s) => s.day === dayOfWeek.toLocaleLowerCase()
    );

    if (!doctorSchedule) {
      return res.json({ availableSlots: [] });
    }

    let availableSlots = doctorSchedule.slots;

    const bookedAppointments = await appointmentModel.find({
      doctorId,
      date: new Date(date),
      status: { $ne: "cancelled" },
    });

    const slotCounts = {};
    bookedAppointments.forEach((appointment) => {
      slotCounts[appointment.time] = (slotCounts[appointment.time] || 0) + 1;
    });

    const filteredSlots = availableSlots.filter((slot) => {
      return !slotCounts[slot] || slotCounts[slot] < 4;
    });

    res.json({ availableSlots: filteredSlots });
  } catch (error) {
    next(error);
  }
};

export const getAllAppointments = async (req, res, next) => {
  try {
    const appointments = await appointmentModel
      .find()
      .populate("doctorId", "name email")
      .populate("patientId", "name email");
    return res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    next(error);
  }
};

export const getAppointmentsByDoctor = async (req, res, next) => {
  try {
    const { doctorId } = req.params;
    const appointments = await appointmentModel
      .find({ doctorId })
      .populate("doctorId", "name email")
      .populate("patientId", "name email");
    return res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    next(error);
  }
};