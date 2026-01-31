import { useEffect, useState } from "react";
import API from "../../api/axios";
import { useParams } from "react-router-dom";
import "./Tickets.css";

export default function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("");
  const [agentId, setAgentId] = useState("");
  const [file, setFile] = useState(null);

  // Get ticket details
  useEffect(() => {
    API.get(`/tickets/${id}`)
      .then((res) => {
        setTicket(res.data);
        setStatus(res.data.status);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Get users (agents)
  useEffect(() => {
    API.get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!ticket) return <p>Loading...</p>;

  // Update status
  const updateStatus = async () => {
    await API.patch(`/tickets/${id}/status`, { status });
    alert("Status updated");
  };

  // Assign ticket
  const assignTicket = async () => {
    await API.patch(`/tickets/${id}/assign`, { agentId });
    alert("Ticket assigned");
  };
  const uploadFile = async () => {
  if (!file) {
    alert("Select a file first");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  await API.post(`/tickets/${id}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  alert("File uploaded");
};

  return (
    <div className="ticket-container">
      <h2>{ticket.subject}</h2>
      <p>{ticket.description}</p>

      <p><b>Status:</b> {ticket.status}</p>
      <p><b>Priority:</b> {ticket.priority}</p>

      <hr />

      {/* STATUS UPDATE */}
      <h4>Update Status</h4>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="OPEN">Open</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="WAITING_FOR_CUSTOMER">Waiting for Customer</option>
        <option value="RESOLVED">Resolved</option>
        <option value="CLOSED">Closed</option>
      </select>
      <br /><br />
      <button onClick={updateStatus}>Update Status</button>

      <hr />

      {/* ASSIGN TICKET */}
      <h4>Assign to Agent</h4>
      <select onChange={(e) => setAgentId(e.target.value)}>
        <option value="">Select Agent</option>
        {users
          .filter((u) => u.role === "AGENT")
          .map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
      </select>
      <br /><br />
      <button onClick={assignTicket}>Assign Ticket</button>
      <hr />

        <h4>Attach File</h4>
        <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        />
        <br /><br />
        <button onClick={uploadFile}>Upload File</button>
      <hr />

<h4>Attachments</h4>

{ticket.attachments && ticket.attachments.length === 0 && (
  <p>No attachments</p>
)}

{ticket.attachments &&
  ticket.attachments.map((f, index) => (
    <div key={index}>
      <a
        href={`http://localhost:5000/uploads/${f.filename}`}
        target="_blank"
        rel="noreferrer"
      >
        {f.originalname}
      </a>
    </div>
  ))}

    </div>
    
  );
  
}

