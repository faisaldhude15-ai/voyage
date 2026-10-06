import { useNavigate } from "react-router-dom";

const MyTrips = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">

      <header className="page-header">
        <div>
          <h1>My Trips</h1>

          <p>
            View and manage your planned trips.
          </p>
        </div>

        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Dashboard
        </button>
      </header>

      <main className="page-content">

        <section className="empty-page-card">

          <div className="empty-page-icon">
            ✈️
          </div>

          <h2>No Trips Yet</h2>

          <p>
            Your planned trips will appear here
            once you create a travel plan.
          </p>

          <button
            type="button"
            className="primary-button"
            onClick={() => navigate("/dashboard")}
          >
            Plan a Trip
          </button>

        </section>

      </main>

    </div>
  );
};

export default MyTrips;