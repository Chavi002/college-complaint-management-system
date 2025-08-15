import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    width: "100%",
    maxWidth: "500px",
    margin: "50px auto",
    padding: "25px",
    borderRadius: "10px",
    backgroundColor: "#f0f0f0",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    boxSizing: "border-box",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  successMessage: {
    textAlign: "center",
    color: "green",
    backgroundColor: "#e6ffea",
    padding: "10px",
    borderRadius: "5px",
    marginTop: "15px",
    border: "1px solid #a3d9a5",
  },
  errorMessage: {
    textAlign: "center",
    color: "red",
    backgroundColor: "#ffe6e6",
    padding: "10px",
    borderRadius: "5px",
    marginTop: "15px",
    border: "1px solid #f5aaaa",
  },
};

const StudentRegistrationPage = () => {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    password: "",
    branch: "",
    contactNumber: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (student.contactNumber.length !== 10) {
      setErrorMessage("Contact number must be exactly 10 digits.");
      setSuccessMessage("");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/students/register", student);
      setSuccessMessage("Registration successful!");
      setErrorMessage("");

      setStudent({
        name: "",
        email: "",
        password: "",
        branch: "",
        contactNumber: "",
      });

      setTimeout(() => {
        setSuccessMessage("");
        navigate("/login");
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Registration failed.");
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
      setSuccessMessage("");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={student.name}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={student.password}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="branch"
          placeholder="Branch"
          value={student.branch}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="number"
          name="contactNumber"
          placeholder="Contact Number"
          value={student.contactNumber}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>

      {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
      {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default StudentRegistrationPage;
