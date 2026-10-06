import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";

import ProtectedRoute from "./components/ProtectedRoute";
import ChatWidget from "./components/ChatWidget";

// ==========================================
// CUSTOMER PAGES
// ==========================================

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyTrips from "./pages/MyTrips";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";

// ==========================================
// AGENT PAGES
// ==========================================

import AgentDashboard from "./pages/agent/AgentDashboard";
import WaitingChats from "./pages/agent/WaitingChats";
import ActiveChats from "./pages/agent/ActiveChats";
import AgentProfile from "./pages/agent/AgentProfile";

// ==========================================
// ADMIN PAGES
// ==========================================

import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Agents from "./pages/admin/Agents";
import Conversations from "./pages/admin/Conversations";
import Trips from "./pages/admin/Trips";
import AdminBookings from "./pages/admin/Bookings";
import Analytics from "./pages/admin/Analytics";

// ==========================================
// CSS
// ==========================================

import "./App.css";
import "./styles/global.css";
import "./styles/chat.css";
import "./styles/agent.css";
import "./styles/admin.css";

// ==========================================
// APP
// ==========================================

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>

          <Routes>

            {/* ==================================
                PUBLIC ROUTES
            ================================== */}

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            {/* ==================================
                CUSTOMER ROUTES
            ================================== */}

            <Route element={<ProtectedRoute />}>

              <Route
                path="/dashboard"
                element={<Dashboard />}
              />

              <Route
                path="/dashboard/chat"
                element={<Dashboard />}
              />

              <Route
                path="/my-trips"
                element={<MyTrips />}
              />

              <Route
                path="/bookings"
                element={<Bookings />}
              />

              <Route
                path="/profile"
                element={<Profile />}
              />

            </Route>

            {/* ==================================
                AGENT ROUTES
            ================================== */}

            <Route element={<ProtectedRoute />}>

              <Route
                path="/agent"
                element={<AgentDashboard />}
              />

              <Route
                path="/agent/waiting"
                element={<WaitingChats />}
              />

              <Route
                path="/agent/active"
                element={<ActiveChats />}
              />

              <Route
                path="/agent/profile"
                element={<AgentProfile />}
              />

            </Route>

            {/* ==================================
                ADMIN ROUTES
            ================================== */}

            <Route element={<ProtectedRoute />}>

              <Route
                path="/admin"
                element={<AdminDashboard />}
              />

              <Route
                path="/admin/users"
                element={<Users />}
              />

              <Route
                path="/admin/agents"
                element={<Agents />}
              />

              <Route
                path="/admin/conversations"
                element={<Conversations />}
              />

              <Route
                path="/admin/trips"
                element={<Trips />}
              />

              <Route
                path="/admin/bookings"
                element={<AdminBookings />}
              />

              <Route
                path="/admin/analytics"
                element={<Analytics />}
              />

            </Route>

            {/* ==================================
                FALLBACK ROUTE
            ================================== */}

            <Route
              path="*"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />

          </Routes>

          {/* Global customer chat widget */}
          <ChatWidget />

        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;