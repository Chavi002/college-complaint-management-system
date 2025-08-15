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
  },
  tableHeader: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "10px",
    textAlign: "left",
    whiteSpace: "nowrap",
  },
  tableData: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    whiteSpace: "normal",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  button: {
    marginLeft: "10px",
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
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

const AdminComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [updateStatusMap, setUpdateStatusMap] = useState({});
  const [error, setError] = useState("");

  const fetchComplaints = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/complaints");
      const allComplaints = response.data;

      if (statusFilter === "All") {
        setComplaints(allComplaints);
      } else {
        const filtered = allComplaints.filter((complaint) => {
          const status = complaint.status
            ? complaint.status.trim().toLowerCase()
            : "";
          const filterStatus = statusFilter.trim().toLowerCase();

          if (
            filterStatus === "pending" &&
            (status === "" || status === null)
          ) {
            return true;
          }

          return status === filterStatus;
        });
        setComplaints(filtered);
      }
    } catch (err) {
      console.error("Error fetching complaints:", err);
      setError("Failed to fetch complaints.");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [statusFilter]);

  const handleStatusChange = (id, newStatus) => {
    setUpdateStatusMap((prev) => ({
      ...prev,
      [id]: newStatus,
    }));
  };

  const updateComplaintStatus = async (id) => {
    const newStatus = updateStatusMap[id];

    if (!newStatus || newStatus === "") {
      alert("Please select status to update.");
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/complaints/${id}/status`, {
        status: newStatus,
      });
      alert("Updated successfully!");
      fetchComplaints();
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update complaint status.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>All Submitted Complaints</h2>

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

      {error && <p style={{ color: "red" }}>{error}</p>}

      {complaints.length === 0 ? (
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
              <th style={styles.tableHeader}>Enrollment No</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.id}>
                <td style={styles.tableData}>{complaint.id}</td>
                <td style={styles.tableData}>{complaint.title}</td>
                <td style={styles.tableData}>{complaint.category}</td>
                <td style={styles.tableData}>{complaint.description}</td>
                <td style={styles.tableData}>
                  <select
                    value={updateStatusMap[complaint.id] || complaint.status}
                    onChange={(e) =>
                      handleStatusChange(complaint.id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <button
                    style={styles.button}
                    onClick={() => updateComplaintStatus(complaint.id)}
                  >
                    Update
                  </button>
                </td>
                <td style={styles.tableData}>
                  {complaint.student?.enrollmentNumber || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminComplaintsList;
