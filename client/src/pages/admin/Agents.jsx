import { useNavigate } from "react-router-dom";

const Agents = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <div>
          <h1>Agents</h1>
          <p>Manage VoyageAI travel agents.</p>
        </div>

        <button
          type="button"
          className="admin-back-btn"
          onClick={() => navigate("/admin")}
        >
          ← Dashboard
        </button>
      </header>

      <main className="admin-content">
        <div className="admin-empty-card">
          <div className="admin-empty-icon">
            🧑‍💼
          </div>

          <h2>Agent Management</h2>

          <p>
            Travel agents will be displayed here.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Agents;