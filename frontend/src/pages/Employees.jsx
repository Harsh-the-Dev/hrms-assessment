import { useEffect, useState } from "react";
import api from "../api/axios";
import Loader from "../components/Loader";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await api.get("employees/present-days/");
      setEmployees(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) return <Loader />;

  return (
    <div style={{ padding: "2rem", fontFamily: "'Poppins', sans-serif", backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "2rem", color: "#333" }}>Employees</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1.5rem"
      }}>
        {employees.length === 0 ? (
          <p style={{ color: "#666" }}>No employees found.</p>
        ) : (
          employees.map(emp => (
            <div key={emp.id} style={{
              backgroundColor: "#fff",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}>
              <h3 style={{ marginBottom: "0.5rem" }}>{emp.full_name}</h3>
              <p style={{ margin: "0.3rem 0" }}>ID: {emp.employee_id}</p>
              <p style={{ margin: "0.3rem 0" }}>Department: {emp.department}</p>
              <p style={{ margin: "0.3rem 0" }}>Present Days: <strong>{emp.total_present_days}</strong></p>
              <p style={{ margin: "0.3rem 0" }}>Absent Days: <strong>{emp.total_absent_days}</strong></p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
