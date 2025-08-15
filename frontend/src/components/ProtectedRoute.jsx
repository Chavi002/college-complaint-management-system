import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  if (role === "student") {
    const studentId = localStorage.getItem("studentId");
    if (!studentId) {
      alert("Access Denied! Please login as Student.");
      return <Navigate to="/login" replace />;
    }
  }

  if (role === "admin") {
    const adminId = localStorage.getItem("adminId");
    if (!adminId) {
      alert("Access Denied! Please login as Admin.");
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};
export default ProtectedRoute;
