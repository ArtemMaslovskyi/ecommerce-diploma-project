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
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const handleRegister = (newUser) => {
    const existingUser = users.find((user) => user.email === newUser.email);
    if (existingUser) {
      return { success: false, message: "Email already registered." };
    }
    users.push(newUser);
    setCurrentUser(newUser);
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        setIsLoggedIn,
        handleLogin,
        handleLogout,
        handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
