import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import userModel from "../models/user.model.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Details" });
    }

    const existUser = await userModel.findOne({ email });

    if (!existUser) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Exists" });
    }

    const isMatch = await bcryptjs.compare(password, existUser.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Password Is Incorrect" });
    }

    const token = jwt.sign(
      { id: existUser._id, role: existUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    
    res.cookie("token", token, {
      // origin: process.env.NODE_ENV === "production" ? "" : "http://localhost:5173",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: existUser._id,
        email: existUser.email,
        phone: existUser.phone,
        role: existUser.role,
        image: existUser.image,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        domain: process.env.NODE_ENV === "production" ? "" : undefined,
      })
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};

export const addAdmin = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    const role = "admin";

    const existAdmin = await userModel.findOne({ email });

    if (existAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "Admin Already Exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const createdAdmin = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
    });

    return res.status(200).json({
      success: true,
      message: "Admin Created Successfully",
      data: {
        id: createdAdmin._id,
        name: createdAdmin.name,
        phone: createdAdmin.phone,
        role: createdAdmin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const validateUser = async (req, res, next) => {
  console.log("called");

  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }

    const { name, email, role, phone } = user._doc;

    return res.status(200).json({ success: true, name, email, role, phone });
  } catch (error) {
    next(error);
  }
};
