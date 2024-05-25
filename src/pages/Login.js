import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);
  const { setIsLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleLogin(email, password)) {
      setIsLoggedIn(true);
      navigate("/Profile");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <section className="p-10 h-[800px]">
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-1/3 space-y-4">
          <p className="">Email</p>
          <input
            type="email"
            className="text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <p className="">Password</p>
          <input
            type="password"
            className="text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
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
