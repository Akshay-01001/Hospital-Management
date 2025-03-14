import React, { useState } from "react";
import login from "../../assets/login.webp";
import {
  loginSuccess,
  loginFailure,
  loginStart,
} from "../../redux/reducers/authReducer";
import axios from "axios";
import { useDispatch ,useSelector} from "react-redux";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(loginStart());

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/auth/login`,
        formData,
        {withCredentials: true}
      );
      console.log(response);
      dispatch(loginSuccess(response.data?.data));
    } catch (error) {
      console.log(error);
      loginFailure(error.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Section with Image (Hidden on Small Screens) */}
        <div className="md:w-1/2 hidden md:flex items-center justify-center">
          <img src={login} alt="Login Illustration" className="bg-cover" />
        </div>

        {/* Right Section with Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">
            Welcome to CareConnect
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Login to your account
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 outline-none border border-gray-300 rounded-lg  transition"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 outline-none border border-gray-300 rounded-lg  transition"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-between items-center text-sm">
              <a
                href="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 cursor-pointer text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
            >
              Login
            </button>
          </form>

          {/* Sign Up Suggestion */}
          <p className="text-center text-gray-600 mt-4 text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
