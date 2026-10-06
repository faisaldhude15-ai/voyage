import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AgentProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="agent-page">
      <header className="agent-page-header">
        <div>
          <h1>Agent Profile</h1>
          <p>Your VoyageAI account.</p>
        </div>

        <button
          className="agent-back-btn"
          onClick={() =>
            navigate("/agent")
          }
        >
          ← Dashboard
        </button>
      </header>

      <main className="profile-content">
        <div className="agent-profile-card">
          <div className="profile-avatar">
            {user?.name
              ?.charAt(0)
              ?.toUpperCase() || "A"}
          </div>

          <h2>{user?.name}</h2>

          <p>{user?.email}</p>

          <span className="profile-role">
            {user?.role?.toUpperCase()}
          </span>
        </div>
      </main>
    </div>
  );
};

export default AgentProfile;