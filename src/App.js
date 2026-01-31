import { Routes, Route ,Navigate} from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import ManagerDashboard from "./pages/Dashboard/ManagerDashboard";
import SupportDashboard from "./pages/Dashboard/SupportDashboard";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import GuestDashboard from "./pages/Dashboard/GuestDashboard";
import Dashboard from "./pages/Dashboard";
import UserList from "./pages/Users/UserList";
import UserCreate from "./pages/Users/UserCreate";
import TicketList from "./pages/Tickets/TicketList";
import TicketCreate from "./pages/Tickets/TicketCreate";
import TicketDetail from "./pages/Tickets/TicketDetail";
import Notifications from "./pages/Notifications";
import Reports from "./pages/Reports";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
   
      <div style={{ display: "flex" }}>
        

        <div style={{ marginLeft: 220, width: "100%", padding: 20 }}>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />

              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              {/* Role Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/manager" element={<ManagerDashboard />} />
              <Route path="/support" element={<SupportDashboard />} />
              <Route path="/user" element={<UserDashboard />} />
              <Route path="/guest" element={<GuestDashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/create" element={<UserCreate />} />
              <Route path="/tickets" element={<TicketList />} />
              <Route path="/tickets/create" element={<TicketCreate />} />
              <Route path="/tickets/:id" element={<TicketDetail />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/reports" element={<Reports />} />
              
            </Routes>
          
        </div>
      </div>
    
  );
}

export default App;
