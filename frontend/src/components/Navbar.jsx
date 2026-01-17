import { Link, useLocation } from "react-router-dom";
import "../pages.css";
import { useEffect, useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="logo-container">
          <div className="logo-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" />
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <div className="logo-text">
            <span className="logo-primary font-bold text-xl">HRMS</span>
            <span className="logo-secondary font-medium">Lite</span>
          </div>
        </div>

        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive("/")}`}>
            <span className="nav-icon">📊</span>
            Dashboard
            <span className="nav-indicator"></span>
          </Link>
          <Link to="/employees" className={`nav-link ${isActive("/employees")}`}>
            <span className="nav-icon">👥</span>
            Employees
            <span className="nav-indicator"></span>
          </Link>
          <Link to="/attendance" className={`nav-link ${isActive("/attendance")}`}>
            <span className="nav-icon">⏱️</span>
            Attendance
            <span className="nav-indicator"></span>
          </Link>
        </div>

        <div className="navbar-actions">
          <button className="notification-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="notification-badge">3</span>
          </button>
          <div className="user-profile">
            <div className="avatar">
              <span>AD</span>
            </div>
            <div className="user-info">
              <span className="user-name">Admin User</span>
              <span className="user-role">HR Manager</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}