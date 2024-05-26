import React, { createContext, useContext, useState } from "react";
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
    setIsLoggedIn(true);
    return { success: true };
  };

  const updateUser = (updatedUser) => {
    const updatedUsers = users.map((user) => {
      if (user.email === currentUser.email) {
        return updatedUser;
      }
      return user;
    });
    setCurrentUser(updatedUser);
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
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuth };
