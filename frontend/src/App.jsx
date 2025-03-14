import React, { useEffect } from "react";
import { loginStart, loginFailure, loginSuccess } from "./redux/reducers/authReducer";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import Login from "./pages/Auth/Login";
import MyPatientDashboard from "./components/patient/MyPatientDashboard";
// import Dashboard from "./pages/Dashboard"; // Assuming you have this component

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  return children;
};

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  

  useEffect(() => {
    const validateUser = async () => {
      dispatch(loginStart());
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/auth/validate`,
          {},
          { withCredentials: true }
        );
        dispatch(loginSuccess(response.data));
      } catch (error) {
        dispatch(loginFailure(error.message));
      }
    };

    validateUser();
  }, [dispatch]);

  return (
    <Router>
      <ToastContainer />

      <Routes>
        {/* If user is not logged in, show login page; otherwise, go to their role-specific dashboard */}
        <Route
          path="/"
          element={
            user ? <Navigate to={`/${user.role}/dashboard`} replace /> : <Login />
          }
        />

        {/* Dynamic role-based dashboard routing */}
        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute requiredRole="patient">
              <MyPatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              {/* <Dashboard /> */}
            </ProtectedRoute>
          }
        />

        {/* Catch-all route for unknown pages */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;