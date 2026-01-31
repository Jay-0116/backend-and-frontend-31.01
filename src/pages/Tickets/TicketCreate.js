import { useState } from "react";
import API from "../../api/axios";
import "./Tickets.css";
import { useNavigate } from "react-router-dom";

export default function TicketCreate() {
  const [form, setForm] = useState({
    subject: "",
    description: "",
    priority: "LOW",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/tickets", form);
    navigate("/tickets");
  };

  return (
    <div className="ticket-container">
      <h2>Create Ticket</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="subject"
          placeholder="Subject"
          onChange={handleChange}
        /><br /><br />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        /><br /><br />

        <select name="priority" onChange={handleChange}>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select><br /><br />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
