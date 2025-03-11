import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import userModel from "../models/user.model.js";
import patientModel from "../models/patient.models.js";

const registerPatient = async (req, res, next) => {
  try {
    const { name, email, password, phone, age, gender } = req.body;
    const role = "patient";

    if (!name || !email || !password || !phone || !age || !gender) {
      return res.status(400).json({
        success: false,
        message: "Missing details",
      });
    }

    const existPatient = await userModel.findOne({ email });
    if (existPatient) {
      return res
        .status(400)
        .json({ success: false, message: "Patient already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const createdPatient = await userModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    if (!createdPatient) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to register user" });
    }

    const newPatient = await patientModel.create({
      userId: createdPatient._id,
      gender,
      age,
    });

    const populatedPatient = await patientModel
      .findById(newPatient._id)
      .populate("userId", "name email phone");

    const token = jwt.sign(
      { id: createdPatient._id, role: createdPatient.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // Token expires in 7 days
    );

    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side access
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: populatedPatient,
      token,
    });
  } catch (error) {
    console.error("Error in registerPatient:", error);
    next(error);
  }
};

const getAllPatients = async (req, res, next) => {
  try {
    const patients = await patientModel
      .find()
      .populate("userId", "name email phone image");

    if (patients.length == 0) {
      return res
        .status(202)
        .json({ success: true, message: "No Patients Found" });
    }

    return res.status(200).json({
      success: true,
      message: "Patients Fetched Successfully",
      data: patients,
    });
  } catch (error) {
    next(error);
  }
};

const updatePatient = async (req, res, next) => {
  try {
    const { id } = req.params; // This is the userId
    const { age, gender, ...otherData } = req.body;

    // Find the user first
    const existUser = await userModel.findById(id);
    if (!existUser) {
      return res
        .status(400)
        .json({ success: false, message: "User Does Not Exist" });
    }

    const existPatient = await patientModel
      .findOne({ userId: id })
      .populate("userId", "name email phone image");

    if (existPatient && (age || gender)) {
      const updatedPatient = await patientModel.findOneAndUpdate(
        { userId: id },
        { age, gender },
        { new: true }
      );
    }

    if (Object.keys(otherData).length > 0) {
      console.log("here");

      const updatedUser = await userModel.findByIdAndUpdate(
        id,
        { ...otherData },
        { new: true }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Patient Updated Successfully",
      data: existPatient,
    });
  } catch (error) {
    next(error);
  }
};

export { registerPatient, getAllPatients, updatePatient };