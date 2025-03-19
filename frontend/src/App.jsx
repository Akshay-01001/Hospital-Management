import React, { useEffect } from "react";
import {
  loginStart,
  loginFailure,
  loginSuccess,
} from "./redux/reducers/authReducer";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import axios from "axios";
import Login from "./pages/Auth/Login";
import MyPatientDashboard from "./components/patient/MyPatientDashboard";
import DoctorList from "./pages/patient/DoctorList";
import MyAppointments from "./components/patient/MyAppointments";
import Dashboard from "./components/patient/Dashboard";

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/" replace />;
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  return children;
};

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

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
        {/* Redirect logged-in users to their respective dashboards */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate to={`/${user.role}/dashboard`} replace />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute requiredRole="patient">
              <MyPatientDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="doctors" element={<DoctorList />} />
          <Route path="book-appointment" element={<DoctorList />} />
          <Route path="my-appointments" element={<MyAppointments />} />
          <Route path="reports" element={<DoctorList />} />
          <Route path="medical-history" element={<DoctorList />} />
        </Route>

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
