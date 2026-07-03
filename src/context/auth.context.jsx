import { createContext, useEffect, useState } from "react";
import authService from "../services/auth.service";

// Context Component
const AuthContext = createContext();

// Wrapper component
const AuthProviderWrapper = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const storeToken = (authToken) => {
    localStorage.setItem("authToken", authToken);
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const authenticateUser = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setIsLoggedIn(false);
      setUser(null);
      setIsLoading(false);
      return;
    }
    try {
      const response = await authService.verify();
      setIsLoggedIn(true);
      setUser({
        _id: response.data._id,
        email: response.data.email,
        name: response.data.name,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const contextsObj = {
    isLoggedIn,
    user,
    authenticateUser,
    storeToken,
    removeToken,
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <AuthContext.Provider value={contextsObj}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProviderWrapper };
