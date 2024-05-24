import React, { createContext, useState } from "react";
import users from "./usersData";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (email, password) => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true); // Встановлюємо isLoggedIn на true після успішної аутентифікації
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false); // Встановлюємо isLoggedIn на false після виходу
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isLoggedIn, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
