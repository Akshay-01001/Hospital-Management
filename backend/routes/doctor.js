import { registerDoctor,getAllDoctors,getDoctorById,updateDoctor } from "../controllers/doctorController.js";
import { uploadProfilePic } from "../middlewares/multerMiddleware.js";
import express from "express";

const router = express.Router();

router.post('/register-doctor',uploadProfilePic,registerDoctor);
router.get('/get-all',getAllDoctors);
router.get('/get/:id',getDoctorById);
router.put('/update/:id',updateDoctor)

export default router;