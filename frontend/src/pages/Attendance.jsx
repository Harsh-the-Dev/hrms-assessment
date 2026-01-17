import { useEffect, useState } from "react";
import api from "../api/axios";
import Loader from "../components/Loader";

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form for adding attendance
  const [formData, setFormData] = useState({
    employee: "",
    date: "",
    status: "PRESENT", // for UI, will convert to backend format
  });

  // Filters for HR report
  const [filterData, setFilterData] = useState({
    employee_name: "",
    month: "",
    year: new Date().getFullYear(),
  });

  // Fetch all employees for dropdown
  const fetchEmployees = async () => {
    try {
      const res = await api.get("employees/");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch attendance report
  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filterData.employee_name) params.employee_name = filterData.employee_name;
      if (filterData.month) params.month = filterData.month;
      if (filterData.year) params.year = filterData.year;

      const res = await api.get("hr/attendance-report/", { params });
      setAttendanceData(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, []);

  // Handle add attendance input change
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle filter input change
  const handleFilterChange = (e) => {
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
  };

  // Add attendance record
  const handleAddAttendance = async (e) => {
    e.preventDefault();

    if (!formData.employee || !formData.date || !formData.status) return;

    const payload = {
      employee: parseInt(formData.employee), // send as number
      date: formData.date,
      status: formData.status === "PRESENT" ? "Present" : "Absent", // match backend
    };

    try {
      await api.post("attendance/", payload);
      alert("Attendance added successfully!");
      setFormData({ employee: "", date: "", status: "PRESENT" });
      fetchAttendance(); // refresh report
    } catch (err) {
      console.error(err.response ? err.response.data : err);
      alert(
        "Error adding attendance. Make sure no duplicate exists for this employee on the same date."
      );
    }
  };

  // Apply filters
  const handleFilter = (e) => {
    e.preventDefault();
    fetchAttendance();
  };

  if (loading || !attendanceData) return <Loader />;

  const { summary, employee_summary } = attendanceData;

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          marginBottom: "2rem",
          color: "#333",
        }}
      >
        Attendance
      </h2>

      {/* Add Attendance Form */}
      <div
        style={{
          background: "#fff",
          padding: "1.5rem",
          borderRadius: "12px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
          marginBottom: "2rem",
        }}
      >
        <h3 style={{ marginBottom: "1rem", fontWeight: "600" }}>Mark Attendance</h3>
        <form
          onSubmit={handleAddAttendance}
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          }}
        >
          <select
            name="employee"
            value={formData.employee}
            onChange={handleFormChange}
            required
            style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid #ccc" }}
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.full_name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleFormChange}
            required
            style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid #ccc" }}
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleFormChange}
            required
            style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid #ccc" }}
          >
            <option value="PRESENT">Present</option>
            <option value="ABSENT">Absent</option>
          </select>

          <button
            type="submit"
            style={{
              padding: "0.8rem 1.5rem",
              borderRadius: "8px",
              background: "#2575fc",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Add Attendance
          </button>
        </form>
      </div>

      {/* Filters */}
      <form
        onSubmit={handleFilter}
        style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}
      >
        <input
          type="text"
          name="employee_name"
          placeholder="Employee Name / ID"
          value={filterData.employee_name}
          onChange={handleFilterChange}
          style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid #ccc" }}
        />
        <input
          type="number"
          name="month"
          placeholder="Month (1-12)"
          min="1"
          max="12"
          value={filterData.month}
          onChange={handleFilterChange}
          style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid #ccc" }}
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={filterData.year}
          onChange={handleFilterChange}
          style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          style={{
            padding: "0.8rem 1.5rem",
            borderRadius: "8px",
            background: "#2575fc",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Filter
        </button>
      </form>

      {/* Summary Cards */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2rem" }}>
        {[
          { title: "Total Employees", value: summary.total_employees_in_report },
          { title: "Total Records", value: summary.total_attendance_records },
          { title: "Overall Present", value: summary.overall_present, color: "#28a745" },
          { title: "Overall Absent", value: summary.overall_absent, color: "#dc3545" },
          { title: "Attendance Rate (%)", value: summary.overall_attendance_rate + "%" },
        ].map((card, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: "#fff",
              padding: "1rem 1.5rem",
              borderRadius: "12px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
              flex: "1",
              minWidth: "200px",
            }}
          >
            <h4>{card.title}</h4>
            <p style={{ fontWeight: "700", fontSize: "1.5rem", color: card.color || "#333" }}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Employee Attendance Table */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
          }}
        >
          <thead style={{ backgroundColor: "#2575fc", color: "#fff" }}>
            <tr>
              <th style={{ padding: "0.8rem 1rem" }}>Employee</th>
              <th style={{ padding: "0.8rem 1rem" }}>Present</th>
              <th style={{ padding: "0.8rem 1rem" }}>Absent</th>
              <th style={{ padding: "0.8rem 1rem" }}>Attendance Rate (%)</th>
            </tr>
          </thead>
          <tbody>
            {employee_summary.length === 0 && (
              <tr>
                <td colSpan="4" style={{ padding: "1rem", textAlign: "center", color: "#666" }}>
                  No data available
                </td>
              </tr>
            )}
            {employee_summary.map((emp) => (
              <tr key={emp.employee_info.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "0.8rem 1rem" }}>{emp.employee_info.full_name}</td>
                <td style={{ padding: "0.8rem 1rem", color: "#28a745", fontWeight: "600" }}>
                  {emp.total_present}
                </td>
                <td style={{ padding: "0.8rem 1rem", color: "#dc3545", fontWeight: "600" }}>
                  {emp.total_absent}
                </td>
                <td style={{ padding: "0.8rem 1rem" }}>{emp.attendance_rate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
