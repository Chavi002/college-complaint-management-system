import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    maxWidth: "400px",
    margin: "100px auto",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "30px",
  },
  button: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  logoutButton: {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#e74c3c",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

const StudentDashboard = () => {
  const navigate = useNavigate();
  const studentName = localStorage.getItem("studentName");
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    if (!studentId) {
      alert("Unauthorized access. Please login as Student.");
      navigate("/login");
    }
  }, [studentId, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Welcome, {studentName || "Student"}!</h2>

      <button
        style={styles.button}
        onClick={() => navigate("/student/complaint")}
      >
        File New Complaint
      </button>

      <button
        style={styles.button}
        onClick={() => navigate("/student/complaints")}
      >
        View My Complaints
      </button>

      <button style={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default StudentDashboard;
