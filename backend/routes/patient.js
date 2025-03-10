import {registerPatient,getAllPatients, updatePatient} from "../controllers/patientController.js";
import express from "express"

const router = express.Router();

router.post('/register-patient',registerPatient)
router.get('/get-all',getAllPatients)
router.put('/update-patient/:id',updatePatient)

export default router