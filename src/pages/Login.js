import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { handleLogin } = React.useContext(AuthContext);

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //JS for succes login in
    handleLogin();
  };

  return (
    <section className="p-10 h-[800px]">
      <form className="flex flex-col items-center justify-center">
        <div className="flex flex-col w-1/3 space-y-4">
          <p className="">Email</p>
          <input type="email" className="text-black"></input>
          <p className="">Password</p>
          <input type="password" className="text-black"></input>
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
