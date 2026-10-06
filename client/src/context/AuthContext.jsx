import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // GET CURRENT USER
  // ==========================================

  const getCurrentUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/auth/me");

      setUser(response.data.user);
    } catch (error) {
      console.error(
        "Get current user error:",
        error.response?.data || error.message
      );

      localStorage.removeItem("token");
      localStorage.removeItem("conversationId");

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOGIN
  // ==========================================

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", {
        email: email.trim().toLowerCase(),
        password,
      });

      const token = response.data.token;

      if (!token) {
        throw new Error(
          "Login successful but token was not received."
        );
      }

      localStorage.setItem("token", token);

      setUser(response.data.user);

      return response.data;
    } catch (error) {
      console.error(
        "Login API error:",
        error.response?.data || error.message
      );

      throw error;
    }
  };

  // ==========================================
  // REGISTER
  // ==========================================

  const register = async (
    name,
    email,
    password
  ) => {
    try {
      const response = await api.post(
        "/auth/register",
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
        }
      );

      const token = response.data.token;

      if (!token) {
        throw new Error(
          "Registration successful but token was not received."
        );
      }

      localStorage.setItem("token", token);

      setUser(response.data.user);

      return response.data;
    } catch (error) {
      console.error(
        "Register API error:",
        error.response?.data || error.message
      );

      throw error;
    }
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("conversationId");

    setUser(null);
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        getCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ==========================================
// USE AUTH
// ==========================================

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};

export default AuthContext;