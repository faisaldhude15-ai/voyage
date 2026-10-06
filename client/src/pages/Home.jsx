import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">

      {/* NAVBAR */}
      <nav className="home-navbar">
        <div className="brand">
          <div className="brand-icon">✈</div>
          <span>VoyageAI</span>
        </div>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#about">About</a>
        </div>

        <div className="nav-actions">
          {user ? (
            <Link to="/dashboard" className="btn btn-primary">
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>

              <Link to="/register" className="btn btn-primary">
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section">

        <div className="hero-content">
          <div className="hero-badge">
            ✨ AI-powered travel planning
          </div>

          <h1>
            Your intelligent
            <span> travel assistant</span>
          </h1>

          <p>
            Plan your perfect journey with VoyageAI.
            Get instant travel recommendations, personalized
            itineraries and 24/7 assistance — even when your
            travel team is offline.
          </p>

          <div className="hero-actions">
            <Link
              to={user ? "/dashboard" : "/register"}
              className="hero-btn primary"
            >
              Start Planning →
            </Link>

            <a
              href="#how-it-works"
              className="hero-btn secondary"
            >
              How it works
            </a>
          </div>

          <div className="hero-trust">
            <div className="trust-item">
              <strong>24/7</strong>
              <span>AI Assistance</span>
            </div>

            <div className="trust-item">
              <strong>100+</strong>
              <span>Destinations</span>
            </div>

            <div className="trust-item">
              <strong>AI + Human</strong>
              <span>Support</span>
            </div>
          </div>
        </div>

        {/* HERO CARD */}
        <div className="hero-visual">
          <div className="travel-card">

            <div className="travel-card-header">
              <div>
                <small>YOUR NEXT ADVENTURE</small>
                <h3>Dubai, UAE</h3>
              </div>

              <div className="destination-icon">
                🌴
              </div>
            </div>

            <div className="travel-image">
              🏙️
            </div>

            <div className="travel-details">
              <div>
                <span>Duration</span>
                <strong>5 Days</strong>
              </div>

              <div>
                <span>Travelers</span>
                <strong>2 People</strong>
              </div>

              <div>
                <span>Budget</span>
                <strong>$1,500</strong>
              </div>
            </div>

            <div className="ai-message">
              <div className="ai-avatar">✦</div>

              <div>
                <strong>VoyageAI</strong>
                <p>
                  I've prepared your personalized
                  Dubai itinerary. Ready to explore?
                </p>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* FEATURES */}
      <section id="features" className="features-section">

        <div className="section-heading">
          <span>POWERFUL FEATURES</span>

          <h2>
            Everything you need to travel smarter
          </h2>

          <p>
            VoyageAI combines artificial intelligence
            with human expertise to make travel planning
            simple.
          </p>
        </div>

        <div className="features-grid">

          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Travel Assistant</h3>
            <p>
              Get instant answers and personalized
              travel recommendations 24/7.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🗺️</div>
            <h3>Smart Itineraries</h3>
            <p>
              Build personalized trip plans based on
              your destination, budget and interests.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👨‍💼</div>
            <h3>Human Support</h3>
            <p>
              Need a real person? Connect with a travel
              agent whenever you need expert help.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3>Real-time Updates</h3>
            <p>
              Stay updated with notifications about
              your conversations, trips and bookings.
            </p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="how-section"
      >

        <div className="section-heading">
          <span>HOW IT WORKS</span>

          <h2>
            Plan your journey in three simple steps
          </h2>
        </div>

        <div className="steps-grid">

          <div className="step-card">
            <div className="step-number">01</div>

            <h3>Tell us your plans</h3>

            <p>
              Tell VoyageAI where you want to go,
              when you want to travel and your budget.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">02</div>

            <h3>AI creates your plan</h3>

            <p>
              Our AI creates a personalized travel
              plan according to your preferences.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">03</div>

            <h3>Travel with confidence</h3>

            <p>
              Chat with AI anytime or request a human
              travel expert when you need assistance.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section id="about" className="cta-section">

        <div>
          <span>READY TO EXPLORE?</span>

          <h2>
            Your next adventure starts here.
          </h2>

          <p>
            Let VoyageAI take care of the planning.
          </p>
        </div>

        <Link
          to={user ? "/dashboard" : "/register"}
          className="cta-button"
        >
          Start Your Journey →
        </Link>

      </section>

      {/* FOOTER */}
      <footer className="home-footer">

        <div className="footer-brand">
          <div className="brand">
            <div className="brand-icon">✈</div>
            <span>VoyageAI</span>
          </div>

          <p>
            Your intelligent travel assistant.
          </p>
        </div>

        <div className="footer-copy">
          © {new Date().getFullYear()} VoyageAI.
          All rights reserved.
        </div>

      </footer>

    </div>
  );
};

export default Home;