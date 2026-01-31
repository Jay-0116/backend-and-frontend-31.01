import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2 className="logo">HelpDesk</h2>

      <NavLink to="/dashboard">Dashboard</NavLink>

      {(role === "Admin" || role === "Support" || role === "Manager") && (
        <NavLink to="/tickets">Tickets</NavLink>
      )}

      {role === "Admin" && <NavLink to="/users">Users</NavLink>}

      {(role === "Admin" || role === "Manager") && (
        <NavLink to="/reports">Reports</NavLink>
      )}

      <NavLink to="/notifications">Notifications</NavLink>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    
  


      <NavLink to="/tickets" className="menu">
        Tickets
      </NavLink>

      <NavLink to="/reports" className="menu">
        Reports
      </NavLink>

      <NavLink to="/notifications" className="menu">
        Notifications
      </NavLink>
    </div>
  );
}
export default Sidebar;