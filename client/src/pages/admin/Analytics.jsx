import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-page">

      <header className="admin-page-header">
        <div>
          <h1>Analytics</h1>

          <p>
            View VoyageAI platform statistics
            and performance.
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

        <section className="admin-welcome-card">
          <span className="admin-badge">
            ANALYTICS
          </span>

          <h2>
            VoyageAI Analytics
          </h2>

          <p>
            Platform analytics and detailed
            statistics will appear here.
          </p>
        </section>

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
              💬
            </div>

            <div>
              <strong>0</strong>
              <span>Conversations</span>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              ✈️
            </div>

            <div>
              <strong>0</strong>
              <span>Total Trips</span>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              📅
            </div>

            <div>
              <strong>0</strong>
              <span>Total Bookings</span>
            </div>
          </div>

        </section>

        <section className="admin-empty-card">

          <div className="admin-empty-icon">
            📊
          </div>

          <h2>
            Analytics Dashboard
          </h2>

          <p>
            Charts, customer activity,
            conversation statistics,
            booking statistics and revenue
            analytics will be connected here.
          </p>

        </section>

      </main>
    </div>
  );
};

export default Analytics;