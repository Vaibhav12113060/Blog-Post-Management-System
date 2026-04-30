import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Initial check is loading
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // The interceptor will add the token to the header
          const res = await API.get("/auth/me");
          setUser(res.data.user);
        } catch (error) {
          console.error(
            "Session expired or token is invalid. Please log in again.",
          );
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    setUser(userData);
    navigate("/dashboard");
  };

  const logout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
    }
  };

  const value = { user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
