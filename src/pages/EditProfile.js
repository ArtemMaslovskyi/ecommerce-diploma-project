import React, { useState } from "react";
import { AuthContext } from "../AuthContext";

export default function EditProfile() {
  const { updateUser } = React.useContext(AuthContext);
  const { currentUser } = React.useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    info: "",
    avatar: null,
  });

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
      avatar: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...currentUser,
      username: formData.username,
      info: formData.info,
      avatar: formData.avatar,
    };
    updateUser(updatedUser);
    console.log("Profile updated", updatedUser);
  };

  return (
    <section className="p-10 h-[800px]">
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-1/3 space-y-4">
          <p>Username</p>
          <input
            type="text"
            name="username"
            className="text-black"
            value={formData.username}
            onChange={handleChange}
          />
          <p>Info</p>
          <textarea
            name="info"
            className="text-black"
            value={formData.info}
            onChange={handleChange}
          />
        </div>
        <div className="space-x-4">
          <button
            type="submit"
            className="p-2 mx-10 my-4 text-lg duration-150 delay-75 border-2 rounded-md hover:bg-white hover:text-black hover:border-black"
          >
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
}
