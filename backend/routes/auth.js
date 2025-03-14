import { login,logout,addAdmin,validateUser} from "../controllers/authController.js";
import express from "express"

const router = express.Router();

router.post('/login',login);
router.post('/logout',logout);
router.post('/create-admin',addAdmin)
router.post('/validate',validateUser)

export default router;