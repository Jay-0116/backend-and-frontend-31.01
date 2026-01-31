import { useEffect, useState } from "react";
import API from "../../api/axios";
import "./Tickets.css";
import { Link } from "react-router-dom";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    API.get("/tickets")
      .then((res) => setTickets(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="ticket-container">
      <h2>Tickets</h2>

      <Link to="/tickets/create">
        <button>Create Ticket</button>
      </Link>

      <br /><br />

      {tickets.map((t) => (
        <div key={t.id} className={`ticket-card ${t.status}`}>
          <h4>{t.subject}</h4>
          <p>Status: {t.status}</p>
          <p>Priority: {t.priority}</p>
          <Link to={`/tickets/${t.id}`}>View</Link>
        </div>
      ))}
    </div>
  );
}
