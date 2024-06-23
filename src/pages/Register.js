import React, { useContext, useState } from "react"

import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../AuthContext"


export default function Register() {
  // const { handleRegister } = useContext(AuthContext);
  const { setIsLoggedIn, handleRegister, serverError, setServerError } = useContext(AuthContext);
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    // avatar: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      // avatar: e.target.files[0],
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
        handleRegister({
          email: formData.email,
          name: formData.name,
          password: formData.password,
          // avatar: formData.avatar,
        }, () => {
          navigate("/register", { replace: true });
        });
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
            name="email"
            className="text-black"
            value={formData.email}
            onChange={handleChange}
          />
          <p>Username</p>
          <input
            type="text"
            name="name"
            className="text-black"
            value={formData.name}
            onChange={handleChange}
          />
          <p>Password</p>
          <input
            type="password"
            name="password"
            className="text-black"
            value={formData.password}
            onChange={handleChange}
          />
          <p>Confirm Password</p>
          <input
            type="password"
            name="confirmPassword"
            className="text-black"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword}</p>
          )}
          <p>Avatar</p>
          <input
            type="file"
            name="avatar"
            className="text-black"
            onChange={handleFileChange}
          />
          {serverError && <p className="text-red-500">{serverError}</p>}
        </div>
        <div className="space-x-4">
          <button
            type="submit"
            className="p-2 mx-10 my-4 text-lg duration-150 delay-75 border-2 rounded-md hover:bg-white hover:text-black hover:border-black "
          >
            Register
          </button>
        </div>
      </form>
    </section>
  );
}
