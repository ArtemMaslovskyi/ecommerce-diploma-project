import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handleLogin(email, password);
      console.log("Login response:", response);
      if (response.token) {
        navigate("/Profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="p-10 h-[800px]">
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-1/3 space-y-4">
          <p>Email</p>
          <input
            type="email"
            className="text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Password</p>
          <input
            type="password"
            className="text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="space-x-4">
          <button
            type="button"
            onClick={handleRegisterClick}
            className="p-2 mx-10 my-4 text-lg duration-150 delay-75 border-2 rounded-md hover:bg-white hover:text-black hover:border-black"
          >
            Register
          </button>
          <button
            type="submit"
            className="p-2 mx-10 my-4 text-lg duration-150 delay-75 border-2 rounded-md hover:bg-white hover:text-black hover:border-black "
          >
            Login
          </button>
        </div>
      </form>
    </section>
  );
}
