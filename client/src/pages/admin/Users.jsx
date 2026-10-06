import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <div>
          <h1>Users</h1>
          <p>Manage VoyageAI customers.</p>
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
            👥
          </div>

          <h2>User Management</h2>

          <p>
            Registered VoyageAI customers will
            appear here.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Users;