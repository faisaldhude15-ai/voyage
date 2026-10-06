import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import api from "../../services/api";

const Agents = () => {
  const navigate = useNavigate();

  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAgents = async () => {
    try {
      setLoading(true);
      setError("");

      /*
        Admin agents API future mein connect hogi.
        Filhaal users endpoint se data lene ki
        koshish kar rahe hain.
      */

      const response = await api.get(
        "/admin/agents"
      );

      setAgents(
        response.data.agents || []
      );
    } catch (err) {
      console.error(
        "Load agents error:",
        err.response?.data || err.message
      );

      setAgents([]);

      setError(
        err.response?.data?.message ||
          "Agents data could not be loaded."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAgents();
  }, []);

  return (
    <div className="admin-page">

      {/* ==============================
          HEADER
      ============================== */}

      <header className="admin-page-header">
        <div>
          <h1>Agents</h1>

          <p>
            Manage VoyageAI travel support
            agents.
          </p>
        </div>

        <button
          type="button"
          className="admin-back-btn"
          onClick={() =>
            navigate("/admin")
          }
        >
          ← Dashboard
        </button>
      </header>

      {/* ==============================
          CONTENT
      ============================== */}

      <main className="admin-content">

        <div className="admin-toolbar">
          <div>
            <h2>Travel Agents</h2>

            <p>
              View and manage your support
              agents.
            </p>
          </div>

          <button
            type="button"
            className="admin-refresh-btn"
            onClick={loadAgents}
          >
            ↻ Refresh
          </button>
        </div>

        {/* ==============================
            LOADING
        ============================== */}

        {loading && (
          <div className="admin-empty-card">
            <div className="admin-empty-icon">
              ⏳
            </div>

            <h2>Loading Agents...</h2>

            <p>
              Please wait while agents are
              loaded.
            </p>
          </div>
        )}

        {/* ==============================
            ERROR
        ============================== */}

        {!loading && error && (
          <div className="admin-empty-card">
            <div className="admin-empty-icon">
              👥
            </div>

            <h2>Agent Management</h2>

            <p>
              {error}
            </p>

            <button
              type="button"
              className="admin-refresh-btn"
              onClick={loadAgents}
            >
              Try Again
            </button>
          </div>
        )}

        {/* ==============================
            AGENTS
        ============================== */}

        {!loading &&
          !error &&
          agents.length === 0 && (
            <div className="admin-empty-card">
              <div className="admin-empty-icon">
                🧑‍💼
              </div>

              <h2>No Agents Found</h2>

              <p>
                No travel agents are currently
                available.
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          agents.length > 0 && (
            <div className="admin-agents-grid">
              {agents.map((agent) => (
                <div
                  key={agent._id}
                  className="admin-agent-card"
                >
                  <div className="admin-agent-avatar">
                    {agent.name
                      ?.charAt(0)
                      ?.toUpperCase() || "A"}
                  </div>

                  <div className="admin-agent-info">
                    <h3>
                      {agent.name ||
                        "Agent"}
                    </h3>

                    <p>
                      {agent.email || ""}
                    </p>

                    <span
                      className={
                        agent.isOnline
                          ? "agent-online"
                          : "agent-offline"
                      }
                    >
                      {agent.isOnline
                        ? "● Online"
                        : "● Offline"}
                    </span>
                  </div>

                  <span className="admin-agent-role">
                    {agent.role ||
                      "agent"}
                  </span>
                </div>
              ))}
            </div>
          )}
      </main>
    </div>
  );
};

export default Agents;