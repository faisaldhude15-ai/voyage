import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AgentDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="agent-dashboard">
      <header className="agent-header">
        <div>
          <h1>VoyageAI Agent Panel</h1>
          <p>
            Welcome, {user?.name || "Agent"}
          </p>
        </div>

        <button
          className="agent-logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </header>

      <main className="agent-main">
        <div className="agent-welcome-card">
          <span className="agent-badge">
            AGENT
          </span>

          <h2>Travel Support Center</h2>

          <p>
            Manage customer conversations,
            respond to travelers and resolve
            support requests.
          </p>
        </div>

        <div className="agent-menu-grid">
          <Link
            to="/agent/waiting"
            className="agent-menu-card"
          >
            <div className="agent-menu-icon">
              🕐
            </div>

            <h3>Waiting Chats</h3>

            <p>
              View customers waiting for a
              human travel agent.
            </p>
          </Link>

          <Link
            to="/agent/active"
            className="agent-menu-card"
          >
            <div className="agent-menu-icon">
              💬
            </div>

            <h3>Active Chats</h3>

            <p>
              Continue conversations with
              assigned customers.
            </p>
          </Link>

          <Link
            to="/agent/profile"
            className="agent-menu-card"
          >
            <div className="agent-menu-icon">
              👤
            </div>

            <h3>My Profile</h3>

            <p>
              View your agent account
              information.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AgentDashboard;