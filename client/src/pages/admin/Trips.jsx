import { useNavigate } from "react-router-dom";

const Trips = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <div>
          <h1>Trips</h1>
          <p>
            Manage VoyageAI travel plans and
            trips.
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
            ✈️
          </div>

          <h2>Trip Management</h2>

          <p>
            Customer travel plans and trips will
            appear here.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Trips;