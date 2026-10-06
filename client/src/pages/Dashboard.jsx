import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-page">

      {/* NAVBAR */}

      <header className="dashboard-navbar">

        <Link to="/" className="brand">
          <div className="brand-icon">✈</div>
          <span>VoyageAI</span>
        </Link>

        <nav className="dashboard-nav">

          <Link
            to="/dashboard"
            className="active"
          >
            Dashboard
          </Link>

          <Link to="/my-trips">
            My Trips
          </Link>

          <Link to="/bookings">
            Bookings
          </Link>

          <Link to="/profile">
            Profile
          </Link>

        </nav>

        <div className="dashboard-user">

          <div className="user-avatar">
            {user?.name?.charAt(0)?.toUpperCase() ||
              "U"}
          </div>

          <div className="user-info">
            <strong>{user?.name || "Traveler"}</strong>
            <span>{user?.role || "customer"}</span>
          </div>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>

      {/* MAIN */}

      <main className="dashboard-main">

        {/* HERO */}

        <section className="dashboard-hero">

          <div>
            <span className="dashboard-label">
              YOUR TRAVEL ASSISTANT
            </span>

            <h1>
              Where will you go next,
              <span> {user?.name || "Traveler"}?</span>
            </h1>

            <p>
              Let VoyageAI help you plan your next
              unforgettable journey.
            </p>
          </div>

          <div className="hero-plane">
            ✈️
          </div>

        </section>

        {/* QUICK ACTIONS */}

        <section className="quick-section">

          <div className="section-title">
            <div>
              <h2>Start planning</h2>
              <p>
                Choose how you want to begin.
              </p>
            </div>
          </div>

          <div className="quick-grid">

            <Link
              to="/dashboard/chat"
              className="quick-card ai-card"
            >
              <div className="quick-icon">
                🤖
              </div>

              <h3>AI Travel Assistant</h3>

              <p>
                Chat with VoyageAI and create your
                personalized travel plan.
              </p>

              <span>
                Start chatting →
              </span>
            </Link>

            <Link
              to="/my-trips"
              className="quick-card"
            >
              <div className="quick-icon">
                🗺️
              </div>

              <h3>My Trips</h3>

              <p>
                View and manage your planned journeys
                in one place.
              </p>

              <span>
                View trips →
              </span>
            </Link>

            <Link
              to="/bookings"
              className="quick-card"
            >
              <div className="quick-icon">
                🎫
              </div>

              <h3>My Bookings</h3>

              <p>
                Check your reservations and booking
                information.
              </p>

              <span>
                View bookings →
              </span>
            </Link>

          </div>

        </section>

        {/* SUGGESTIONS */}

        <section className="suggestions-section">

          <div className="section-title">
            <div>
              <h2>Popular ideas</h2>

              <p>
                Need inspiration? Start with one of
                these.
              </p>
            </div>
          </div>

          <div className="suggestions-grid">

            <div className="suggestion-card">
              <div className="suggestion-image">
                🏙️
              </div>

              <div className="suggestion-content">
                <span>POPULAR</span>
                <h3>Dubai Adventure</h3>
                <p>
                  Luxury, shopping and unforgettable
                  experiences.
                </p>
              </div>
            </div>

            <div className="suggestion-card">
              <div className="suggestion-image">
                🏔️
              </div>

              <div className="suggestion-content">
                <span>ADVENTURE</span>
                <h3>Mountain Escape</h3>
                <p>
                  Discover nature and peaceful
                  mountain destinations.
                </p>
              </div>
            </div>

            <div className="suggestion-card">
              <div className="suggestion-image">
                🏖️
              </div>

              <div className="suggestion-content">
                <span>RELAX</span>
                <h3>Beach Holiday</h3>
                <p>
                  Relax by the sea and enjoy a
                  refreshing getaway.
                </p>
              </div>
            </div>

          </div>

        </section>

        {/* AI SUPPORT */}

        <section className="support-banner">

          <div className="support-icon">
            ✦
          </div>

          <div>
            <h2>
              Need help planning your trip?
            </h2>

            <p>
              VoyageAI is available 24/7. If you
              need a human expert, you can request
              an agent anytime.
            </p>
          </div>

          <Link
            to="/dashboard/chat"
            className="support-button"
          >
            Chat with AI
          </Link>

        </section>

      </main>

      {/* FOOTER */}

      <footer className="dashboard-footer">
        <div>
          <strong>VoyageAI</strong>
          <span>
            Your intelligent travel assistant.
          </span>
        </div>

        <p>
          © {new Date().getFullYear()} VoyageAI.
          All rights reserved.
        </p>
      </footer>

    </div>
  );
};

export default Dashboard;