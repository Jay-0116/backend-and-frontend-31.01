import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Reports() {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    closed: 0,
  });

  useEffect(() => {
    API.get("/tickets/reports/stats")
      .then((res) => {
        const tickets = res.data;

        const total = tickets.length;
        const open = tickets.filter(t => t.status === "Open").length;
        const closed = tickets.filter(t => t.status === "Closed").length;

        setStats({ total, open, closed });
      })
      .catch(() => {});
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h2>Reports Dashboard</h2>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        
        <div style={cardStyle}>
          <h3>Total Tickets</h3>
          <p style={numberStyle}>{stats.total}</p>
        </div>

        <div style={cardStyle}>
          <h3>Open Tickets</h3>
          <p style={numberStyle}>{stats.open}</p>
        </div>

        <div style={cardStyle}>
          <h3>Closed Tickets</h3>
          <p style={numberStyle}>{stats.closed}</p>
        </div>

      </div>
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  padding: 20,
  width: 200,
  borderRadius: 8,
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const numberStyle = {
  fontSize: 32,
  fontWeight: "bold",
};
