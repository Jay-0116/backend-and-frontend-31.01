import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Navigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [stats ,setStats] = useState({
    total: 0,
    open: 0,
    closed: 0,
    notifications: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const total = await axios.get("http://localhost:5000/api/tickets/count");
      const open = await axios.get("http://localhost:5000/api/tickets/open");
      const closed = await axios.get("http://localhost:5000/api/tickets/closed");
      const notify = await axios.get("http://localhost:5000/api/notifications/count");

      setStats({
        total: total.data.count,
        open: open.data.count,
        closed: closed.data.count,
        notifications: notify.data.count,
      });
    };

    fetchData();
  }, []);

  const role = localStorage.getItem("role");

  const cards = [
    { title: "Total Tickets", value: 24 },
    { title: "Open Tickets", value: 10 },
    { title: "Closed Tickets", value: 14 },
    { title: "Notifications", value: 5 },
  ];
  const token = localStorage.getItem("token");
    if (!token)<Navigate to="/login" />;
  return (
    
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-main">
        <h1>Welcome {role} 👋</h1>
        <div>
      <Sidebar />
      <h2>Total: {stats.total}</h2>
    </div>
        <div className="card-grid">
          {cards.map((card, index) => (
            <div key={index} className="card">
              <h3>{card.title}</h3>
              <p>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Role based extra content */}
        {role === "Admin" && <h2>Admin Controls Enabled</h2>}
        {role === "Manager" && <h2>Manager Reports Access</h2>}
        {role === "Support" && <h2>Support Ticket Handling</h2>}
        {role === "User" && <h2>Your Submitted Tickets</h2>}
        {role === "Guest" && <h2>Limited Access</h2>}
      </div>
    </div>
    
  );
  
};

export default Dashboard;
