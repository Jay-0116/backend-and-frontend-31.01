import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    API.get("/notifications")
      .then((res) => setNotifications(res.data))
      .catch(() => {});
  }, []);

  const markRead = async (id) => {
    await API.patch(`/notifications/${id}/read`);
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      )
    );
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Notifications</h2>

      {notifications.length === 0 && <p>No notifications</p>}

      {notifications.map((n) => (
        <div
          key={n.id}
          style={{
            background: n.isRead ? "#eee" : "#fff",
            padding: 15,
            marginBottom: 10,
            borderLeft: n.isRead ? "4px solid gray" : "4px solid green",
          }}
        >
          <p>{n.message}</p>
          {!n.isRead && (
            <button onClick={() => markRead(n.id)}>Mark as read</button>
          )}
        </div>
      ))}
    </div>
  );
}
