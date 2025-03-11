import userModel from "../models/user.model.js";
import doctorModel from "../models/doctor.model.js";
import bcryptjs, { hash } from "bcryptjs";

export const registerDoctor = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      specialization,
      experience,
      availableDays,
      age,
      gender,
    } = req.body;
    const image = req.file?.path;

    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !specialization ||
      !experience ||
      !availableDays ||
      !age ||
      !gender
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Details" });
    }

    const existDoctor = await userModel.findOne({ email });

    if (existDoctor) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor Already Exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const createdUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "doctor",
      image,
    });

    const createdDoctor = await doctorModel.create({
      userId: createdUser._id,
      specialization,
      experience,
      availableDays,
      age,
      gender,
    });

    const doctorWithUser = await doctorModel
      .findById(createdDoctor._id)
      .populate("userId", "name email phone image");

    if (createdDoctor) {
      return res.status(200).json({
        success: true,
        message: "doctor created successfully",
        data: {
          doctorWithUser,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await doctorModel
      .find()
      .populate("userId", "name email phone image");

    if (doctors.length == 0) {
      return res.status(200).json({
        success: false,
        message: "No Doctors Found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "doctors fetched succesfully",
      data: doctors,
    });
  } catch (error) {
    next(error);
  }
};

export const getDoctorById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const doctor = await doctorModel
      .findById(id)
      .populate("userId", "name email phone image");

    if (!doctor) {
      return res.status(200).json({
        success: false,
        message: "No Doctors Found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "doctors fetched succesfully",
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDoctor = async (req, res, next) => {
  try {
    const { id } = req.params; // This is the userId
    const { name, email, phone, ...otherData } = req.body;

    // Find the user first
    const existUser = await userModel.findById(id);
    if (!existUser) {
      return res
        .status(400)
        .json({ success: false, message: "User Does Not Exist" });
    }

    const existDoctor = await doctorModel
      .findOne({ userId: id })
      .populate("userId", "name email phone image");

    if (existDoctor && (name || email || phone)) {
      const updateUser = await userModel.findByIdAndUpdate(
        id,
        { name, email, phone },
        { new: true }
      );
    }

    let updatedDoctor = {}
    if (Object.keys(otherData).length > 0) {
      updatedDoctor = await doctorModel.findByIdAndUpdate(
        existDoctor._id,
        { ...otherData },
        { new: true }
      ).populate("userId","name email phone");
    }

    return res.status(200).json({
      success: true,
      message: "Doctor Updated Successfully",
      data: updatedDoctor,
    });
  } catch (error) {
    next(error)
  }
};