import express from "express"
import cors from "cors";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/dbConnection.js";

// importing routes
import patientRoute from "./routes/patient.js"
import authRoute from "./routes/auth.js"
import doctorRoute from "./routes/doctor.js"
import appointmentRoute from "./routes/appointment.js"

const app = express();

// configure env file
configDotenv();

// import port
const PORT = process.env.PORT;

const corsOrigines = (origin, callback) => {
  const allowedOrigines = ["http://localhost:5173", "http://localhost:5174"];
  if (!origin || allowedOrigines.includes(origin)) {
    return callback(null, true);
  } else {
    return callback(new Error("Not Allowed By Cors 👎"), true);
  }
};

app.use(
  cors({
    origin: corsOrigines,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use(cookieParser())
app.use(express.json({limit : "20Mb"}))
app.use('/uploads', express.static('uploads'));

// error middleware 
app.use((err,req,res,next)=>{
    const errStatus = err.status || 500
    const errMessage = err.message || "something went wrong"
    
    return res.status(errStatus).json({
        success : false,
        message : errMessage,
        stack : err.stack
    })
})

await connectDB();

app.use('/api/patient',patientRoute);
app.use('/api/auth',authRoute)
app.use('/api/doctor',doctorRoute)
app.use('/api/appointment',appointmentRoute)

app.listen(PORT, () => {
  console.log(`server running at : http://localhost:${PORT}`);
});