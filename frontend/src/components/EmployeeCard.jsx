import "../pages.css";
export default function EmployeeCard({ emp, onDelete }) {
  return (
    <div className="employee-card">
      <div>
        <p className="font-semibold">{emp.full_name} ({emp.department})</p>
        <p>{emp.email}</p>
      </div>
      <button className="btn btn-danger" onClick={() => onDelete(emp.id)}>Delete</button>
    </div>
  );
}
