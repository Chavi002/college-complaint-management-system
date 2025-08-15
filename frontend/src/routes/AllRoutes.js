import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import StudentDashboard from "../pages/StudentDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import StudentComplaintForm from "../pages/StudentComplaintForm";
import StudentComplaintsList from "../pages/StudentComplaintsList";
import AdminComplaintsList from "../pages/AdminComplaintsList";
import StudentRegistrationPage from "../pages/StudentRegistrationPage";
import ProtectedRoute from "../components/ProtectedRoute"; // import kiya

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/student/register" element={<StudentRegistrationPage />} />

      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/complaints"
        element={
          <ProtectedRoute role="student">
            <StudentComplaintsList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/complaint"
        element={
          <ProtectedRoute role="student">
            <StudentComplaintForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/complaints"
        element={
          <ProtectedRoute role="admin">
            <AdminComplaintsList />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
