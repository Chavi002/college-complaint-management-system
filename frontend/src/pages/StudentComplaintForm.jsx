import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: "600",
    fontSize: "1.8rem",
    color: "#333",
  },
  container: {
    width: "90vw",
    maxWidth: "480px",
    margin: "50px auto",
    padding: "10px",
  },
  formBox: {
    padding: "25px 20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "6px",
    fontWeight: "500",
    color: "#555",
    display: "block",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #bbb",
    boxSizing: "border-box",
    width: "100%",
  },
  textarea: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #bbb",
    boxSizing: "border-box",
    height: "100px",
    resize: "none",
    width: "100%",
  },
  select: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #bbb",
    boxSizing: "border-box",
    width: "100%",
  },
  button: {
    padding: "12px",
    fontSize: "1.1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
  successMessage: {
    marginTop: "20px",
    color: "green",
    fontWeight: "600",
    textAlign: "center",
    fontSize: "1.1rem",
  },
};

const StudentComplaintForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !category.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    const studentId = localStorage.getItem("studentId");
    if (!studentId) {
      alert("Student not logged in properly. Please login again.");
      return;
    }
    const complaintData = {
      student: { id: studentId },
      title,
      description,
      category,
    };
    try {
      await axios.post("http://localhost:8080/api/complaints", complaintData);
      setSuccessMessage("Complaint submitted successfully!");
      setTitle("");
      setDescription("");
      setCategory("");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/student/dashboard");
      }, 1000);
    } catch (error) {
      console.error(
        "Error submitting complaint:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.message ||
          "Failed to submit complaint. Please try again."
      );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.heading}>Register your Complaints</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <select
              style={styles.select}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">-- Select Category --</option>
              <option value="Hostel - Room Issue">Hostel - Room Issue</option>
              <option value="Wi-Fi - Slow Internet">
                Wi-Fi - Slow Internet
              </option>
              <option value="Cafeteria - Food Quality">
                Cafeteria - Food Quality
              </option>
              <option value="Lab - Equipment Problem">
                Lab - Equipment Problem
              </option>
              <option value="Library - Book Unavailable">
                Library - Book Unavailable
              </option>
              <option value="Cleanliness - Washrooms">
                Cleanliness - Washrooms
              </option>
              <option value="Transport - Bus Delay">
                Transport - Bus Delay
              </option>
              <option value="Administration - Staff Behavior">
                Administration - Staff Behavior
              </option>
              <option value="Security - Trespassing">
                Security - Trespassing
              </option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Title:</label>
            <input
              type="text"
              style={styles.input}
              value={title}
              placeholder="Enter complaint title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Description:</label>
            <textarea
              style={styles.textarea}
              value={description}
              placeholder="Describe your issue..."
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>

        {successMessage && (
          <p style={styles.successMessage}>{successMessage}</p>
        )}
      </div>
    </div>
  );
};
export default StudentComplaintForm;
