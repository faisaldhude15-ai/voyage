import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="admin-page">
      {/* =================================
          HEADER
      ================================= */}

      <header className="admin-header">
        <div>
          <h1>VoyageAI Admin Panel</h1>

          <p>
            Welcome, {user?.name || "Administrator"}
          </p>
        </div>

        <button
          type="button"
          className="admin-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      {/* =================================
          MAIN
      ================================= */}

      <main className="admin-main">
        {/* Welcome Card */}

        <section className="admin-welcome-card">
          <span className="admin-badge">
            ADMIN
          </span>

          <h2>
            VoyageAI Management Dashboard
          </h2>

          <p>
            Manage users, agents, conversations,
            trips, bookings and platform
            analytics from one place.
          </p>
        </section>

        {/* =================================
            STATS
        ================================= */}

        <section className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              👥
            </div>

            <div>
              <strong>0</strong>
              <span>Total Users</span>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              🧑‍💼
            </div>

            <div>
              <strong>0</strong>
              <span>Agents</span>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              💬
            </div>

            <div>
              <strong>0</strong>
              <span>Conversations</span>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              📅
            </div>

            <div>
              <strong>0</strong>
              <span>Bookings</span>
            </div>
          </div>
        </section>

        {/* =================================
            ADMIN MENU
        ================================= */}

        <section className="admin-menu-section">
          <div className="admin-section-heading">
            <h2>Management</h2>

            <p>
              Select an area to manage.
            </p>
          </div>

          <div className="admin-menu-grid">
            {/* Users */}

            <Link
              to="/admin/users"
              className="admin-menu-card"
            >
              <div className="admin-menu-icon">
                👥
              </div>

              <h3>Users</h3>

              <p>
                View and manage VoyageAI
                customers.
              </p>
            </Link>

            {/* Agents */}

            <Link
              to="/admin/agents"
              className="admin-menu-card"
            >
              <div className="admin-menu-icon">
                🧑‍💼
              </div>

              <h3>Agents</h3>

              <p>
                Manage travel support agents.
              </p>
            </Link>

            {/* Conversations */}

            <Link
              to="/admin/conversations"
              className="admin-menu-card"
            >
              <div className="admin-menu-icon">
                💬
              </div>

              <h3>Conversations</h3>

              <p>
                Monitor customer and agent
                conversations.
              </p>
            </Link>

            {/* Trips */}

            <Link
              to="/admin/trips"
              className="admin-menu-card"
            >
              <div className="admin-menu-icon">
                ✈️
              </div>

              <h3>Trips</h3>

              <p>
                Manage travel plans and trips.
              </p>
            </Link>

            {/* Bookings */}

            <Link
              to="/admin/bookings"
              className="admin-menu-card"
            >
              <div className="admin-menu-icon">
                📅
              </div>

              <h3>Bookings</h3>

              <p>
                Manage customer bookings.
              </p>
            </Link>

            {/* Analytics */}

            <Link
              to="/admin/analytics"
              className="admin-menu-card"
            >
              <div className="admin-menu-icon">
                📊
              </div>

              <h3>Analytics</h3>

              <p>
                View VoyageAI platform
                statistics.
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;