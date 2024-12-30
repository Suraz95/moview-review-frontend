import { useState, useEffect, useContext, createContext } from "react";
import { getIsAuth, userSignIn } from "../api/auth";
import { useNotificationContext } from "./NotiContext";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(undefined);

const initialAuthState = {
  profile: null,
  isLoggedIn: false,
  isLoading: false,
  error: "",
};

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authInfo, setAuthInfo] = useState({ ...initialAuthState });
  const { updateNotification } = useNotificationContext();

  // Sign in
  async function handleSignIn(email, password) {
    setAuthInfo({ ...authInfo, isLoading: true });
    try {
      const response = await userSignIn({ email, password });
      if (response.error) {
        updateNotification("error", response.error);
        setAuthInfo({ ...authInfo, isLoading: false, error: response.error });
        return;
      }
      navigate("/", { replace: true });
      setAuthInfo({
        profile: { ...response.data },
        isLoggedIn: true,
        isLoading: false,
        error: "",
      });
      localStorage.setItem("auth-token", response.data.token);
      updateNotification("success", `Welcome back ${response?.data?.name}`);
    } catch (error) {
      updateNotification("error", "An error occurred during sign-in.");
      setAuthInfo({ ...authInfo, isLoading: false, error: error.message });
    }
  }

  // Checking if user is authenticated and skip Sign In part
  async function isUserAuth() {
    const token = localStorage.getItem("auth-token");
    if (!token) return;

    setAuthInfo({ ...authInfo, isLoading: true });
    try {
      const { data, error } = await getIsAuth(token);
      if (error) {
        updateNotification("error", error);
        setAuthInfo({ ...authInfo, isLoading: false, error: error });
        return;
      }
      setAuthInfo({
        ...authInfo,
        profile: { ...data },
        isLoggedIn: true,
        isLoading: false,
        error: "",
      });
    } catch (error) {
      updateNotification("error", "Failed to verify authentication.");
      setAuthInfo({ ...authInfo, isLoading: false, error: error.message });
    }
  }

  // Handle Logout
  function handleLogOut() {
    localStorage.removeItem("auth-token");
    navigate("/");
    setAuthInfo({ ...initialAuthState });
  }

  // Checking user auth state
  useEffect(() => {
    isUserAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authInfo, handleSignIn, isUserAuth, handleLogOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
