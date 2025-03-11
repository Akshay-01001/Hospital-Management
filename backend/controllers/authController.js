import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import userModel from "../models/user.model.js";

const login = async (req, res, next) => {
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
      httpOnly: true,
      secure: process.env.NODE_ENV,
      sameSite: "strict",
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
        domain:
          process.env.NODE_ENV === "production" ? "" : undefined,
      })
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};

export {login}