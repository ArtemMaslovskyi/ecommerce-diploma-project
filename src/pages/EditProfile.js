import React, { useState } from "react";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
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
    console.log("Profile updated", formData);
  };

  return (
    <section className="p-10 h-[800px]">
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-1/3 space-y-4">
          <p>First Name</p>
          <input
            type="text"
            name="firstName"
            className="text-black"
            value={formData.firstName}
            onChange={handleChange}
          />
          <p>Last Name</p>
          <input
            type="text"
            name="lastName"
            className="text-black"
            value={formData.lastName}
            onChange={handleChange}
          />
          <p>Info</p>
          <textarea
            name="info"
            className="text-black"
            value={formData.info}
            onChange={handleChange}
          />
          <p>Avatar</p>
          <input
            type="file"
            name="avatar"
            className="text-black"
            onChange={handleFileChange}
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
