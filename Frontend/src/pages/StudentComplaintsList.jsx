import React, { useEffect, useState } from "react";
import axios from "axios";

const styles = {
  container: {
    maxWidth: "800px",
    margin: "auto",
    marginTop: "50px",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "600px",
    whiteSpace: "nowrap",
  },
  tableHeader: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px",
    textAlign: "left",
  },
  tableData: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  filterContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "20px",
    gap: "10px",
  },
  label: {
    fontWeight: "bold",
    fontSize: "14px",
  },
  select: {
    padding: "6px 10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
  },
};

const StudentComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const studentId = localStorage.getItem("studentId");
    if (!studentId) {
      alert("Student ID not found. Please login again.");
      return;
    }

    axios
      .get(`http://localhost:8080/api/complaints/student/${studentId}`)
      .then((response) => {
        setComplaints(response.data);
      })
      .catch((error) => {
        console.error("Error fetching complaints:", error);
        alert("Failed to fetch complaints.");
      });
  }, []);

  // Filter complaints based on selected status
  const filteredComplaints = complaints.filter((complaint) => {
    if (statusFilter === "All") return true;
    return complaint.status === statusFilter;
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Submitted Complaints</h2>

      {/* Filter Dropdown */}
      <div style={styles.filterContainer}>
        <label style={styles.label}>Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={styles.select}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {filteredComplaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>ID</th>
              <th style={styles.tableHeader}>Title</th>
              <th style={styles.tableHeader}>Category</th>
              <th style={styles.tableHeader}>Description</th>
              <th style={styles.tableHeader}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((complaint) => (
              <tr key={complaint.id}>
                <td style={styles.tableData}>{complaint.id}</td>
                <td style={styles.tableData}>{complaint.title}</td>
                <td style={styles.tableData}>{complaint.category}</td>
                <td style={styles.tableData}>{complaint.description}</td>
                <td style={styles.tableData}>{complaint.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentComplaintsList;
