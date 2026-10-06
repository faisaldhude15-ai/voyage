import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="page-container">

      <header className="page-header">
        <div>
          <h1>My Profile</h1>

          <p>
            Manage your VoyageAI account.
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

        <section className="profile-card">

          <div className="profile-avatar">
            {user?.name
              ?.charAt(0)
              ?.toUpperCase() || "U"}
          </div>

          <h2>
            {user?.name || "User"}
          </h2>

          <p className="profile-email">
            {user?.email || "No email available"}
          </p>

          <span className="profile-role">
            {user?.role?.toUpperCase() || "CUSTOMER"}
          </span>

          <div className="profile-details">

            <div className="profile-detail">
              <span>Name</span>
              <strong>
                {user?.name || "Not available"}
              </strong>
            </div>

            <div className="profile-detail">
              <span>Email</span>
              <strong>
                {user?.email || "Not available"}
              </strong>
            </div>

            <div className="profile-detail">
              <span>Account Type</span>
              <strong>
                {user?.role || "customer"}
              </strong>
            </div>

          </div>

          <button
            type="button"
            className="logout-profile-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </section>

      </main>

    </div>
  );
};

export default Profile;