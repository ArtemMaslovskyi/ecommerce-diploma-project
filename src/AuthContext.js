import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [currentUser, setCurrentUser] = useState(null);
  const [serverError, setServerError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  const setToken = (newToken) => {
    setToken_(newToken);
  };
  const handleLogin = async (email, password, callback) => {
    axios
      .post("http://localhost:3001/api/users/login", { email, password })
      .then(({ data }) => {
        console.log(data);
        if (data?.user) {
          setCurrentUser(data?.user);
          localStorage.setItem("user", JSON.stringify(data?.user));
        }
        if (data?.token) {
          localStorage.setItem("token", data?.token);
          setIsLoggedIn(true);
          callback && callback();
        }
      })
      .catch((error) => {
        error?.response?.data?.error &&
          setServerError(error?.response.data.error);
        console.error(error);
      });
  };

  const handleRegister = async (newUser, callback) => {
    axios
      .post("/api/users/register", newUser)
      .then(({ data }) => {
        console.log(data);
        if (data?.user) {
          setCurrentUser(data?.user);
          localStorage.setItem("user", JSON.stringify(data?.user));
        }
        if (data?.token) {
          localStorage.setItem("token", data?.token);
          setIsLoggedIn(true);
          callback && callback();
        }
      })
      .catch((error) => {
        error?.response?.data?.error &&
          setServerError(error?.response.data.error);
        console.error(error);
      });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("currentUser");
  };

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      handleRegister,
      serverError,
      setServerError,
      currentUser,
      isLoggedIn,
      setIsLoggedIn,
      handleLogin,
      handleLogout,
    }),
    [token, serverError, currentUser, isLoggedIn]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuth };
