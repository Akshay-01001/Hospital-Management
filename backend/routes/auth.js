import { login,logout,addAdmin} from "../controllers/authController.js";
import express from "express"

const router = express.Router();

router.post('/login',login);
router.post('/logout',logout);
router.post('/create-admin',addAdmin)

export default router;