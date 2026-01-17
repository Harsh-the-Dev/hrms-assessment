import { useEffect, useState } from "react";
import api from "../api/axios";
import Loader from "../components/Loader";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api.get("dashboard/summary/")
      .then(res => setSummary(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!summary) return <Loader />;

  const stats = [
    { title: "Total Employees", value: summary.total_employees, bg: "#6a11cb" },
    { title: "Total Attendance Records", value: summary.total_attendance_records, bg: "#ff416c" },
    { title: "Total Present Days", value: summary.total_present_days, bg: "#00c6ff" },
    { title: "Total Absent Days", value: summary.total_absent_days, bg: "#ff6b6b" },
    { title: "Current Month Present", value: summary.current_month_present, bg: "#28a745" },
    { title: "Current Month Absent", value: summary.current_month_absent, bg: "#dc3545" },
    { title: "Attendance Rate (%)", value: summary.attendance_rate_percentage, bg: "#2575fc" },
  ];

  return (
    <div style={{ padding: "2rem", fontFamily: "'Poppins', sans-serif", backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "2rem", color: "#333" }}>Dashboard Summary</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1.5rem"
      }}>
        {stats.map((stat, idx) => (
          <div key={idx} style={{
            background: stat.bg,
            color: "#fff",
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            textAlign: "center",
            transition: "transform 0.3s, box-shadow 0.3s",
            cursor: "default"
          }}>
            <div style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>{stat.title}</div>
            <div style={{ fontSize: "2rem", fontWeight: "700" }}>{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
