import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">

      <header className="page-header">
        <div>
          <h1>My Bookings</h1>

          <p>
            View and manage your travel bookings.
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
            📅
          </div>

          <h2>No Bookings Yet</h2>

          <p>
            Your travel bookings will appear here
            once you make a booking.
          </p>

          <button
            type="button"
            className="primary-button"
            onClick={() => navigate("/dashboard")}
          >
            Start Planning
          </button>

        </section>

      </main>

    </div>
  );
};

export default Bookings;