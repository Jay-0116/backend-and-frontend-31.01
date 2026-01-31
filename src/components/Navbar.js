import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";
import NotificationBell from "./NotificationBell";

export default function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
  <div className="navbar">
    <h3>Helpdesk</h3>
    <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
      <NotificationBell />
      <button onClick={logout}>Logout</button>
    </div>
  </div>
);
}
