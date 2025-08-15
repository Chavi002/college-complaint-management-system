import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f7fa",
  },
  formBox: {
    width: "90%",
    maxWidth: "350px",
    padding: "25px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
    boxSizing: "border-box",
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "22px",
    fontWeight: "bold",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
  },
  registerText: {
    textAlign: "center",
    marginTop: "15px",
    fontSize: "14px",
  },
  successMessage: {
    color: "green",
    textAlign: "center",
    marginTop: "15px",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginTop: "15px",
  },
  clickableLink: {
    color: "blue",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const studentId = localStorage.getItem("studentId");
    const adminId = localStorage.getItem("adminId");

    if (studentId) {
      navigate("/student/dashboard");
    } else if (adminId) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (role === "admin") {
        const response = await axios.post(
          "http://localhost:8080/api/admins/login",
          { email, password }
        );

        localStorage.setItem("adminId", response.data.id);
        localStorage.setItem("adminName", response.data.name);

        setSuccessMessage("Login successful!");

        setTimeout(() => {
          setSuccessMessage("");
          navigate("/admin/dashboard");
        }, 500);
      } else if (role === "student") {
        const response = await axios.post(
          "http://localhost:8080/api/students/login",
          { email, password }
        );

        localStorage.setItem("studentId", response.data.id);
        localStorage.setItem("studentName", response.data.name);

        setSuccessMessage("Login successful!");

        setTimeout(() => {
          setSuccessMessage("");
          navigate("/student/dashboard");
        }, 1000);
      }
    } catch (error) {
      setSuccessMessage("");

      const backendMessage = error?.response?.data;

      if (backendMessage === "Invalid email") {
        setErrorMessage("The email address is not registered.");
      } else if (backendMessage === "Invalid password") {
        setErrorMessage("The password you entered is incorrect.");
      } else {
        setErrorMessage(
          "Login failed. Please check your details and try again."
        );
      }
    }
    setTimeout(() => {
      setErrorMessage("");
    }, 2000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.heading}>Login Page for Students and Admins</h2>

        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
            value={role}
            style={styles.input}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <p style={styles.registerText}>
          New here?{" "}
          <span
            onClick={() => navigate("/student/register")}
            style={styles.clickableLink}
          >
            Register as Student
          </span>
        </p>

        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

        {/* Display success message if any */}
        {successMessage && (
          <p style={styles.successMessage}>{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
