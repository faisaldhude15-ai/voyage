import { useNavigate } from "react-router-dom";

const Conversations = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <div>
          <h1>Conversations</h1>
          <p>
            Monitor customer and agent
            conversations.
          </p>
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
            💬
          </div>

          <h2>
            Conversation Management
          </h2>

          <p>
            Customer conversations will appear
            here for admin monitoring.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Conversations;