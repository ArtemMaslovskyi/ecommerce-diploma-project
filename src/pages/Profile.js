import { Modal } from "flowbite-react"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../AuthContext"
import lotData from "./lotData"

export default function Profile() {
  const { currentUser, handleLogout } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingLot, setEditingLot] = useState(null);
  const [lots, setLots] = useState(lotData);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = currentUser?.token;
        if (!token) return;

        const response = await fetch(
          "http://localhost:3001/api/users/current",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error.message);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleSendVerificationEmail = async () => {
    try {
      const token = currentUser?.token;
      if (!token) {
        throw new Error("User token is missing");
      }

      const email = currentUser?.email;
      if (!email) {
        throw new Error("User email is missing");
      }

      const response = await fetch("http://localhost:3001/api/users/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send verification email");
      }

      console.log("Verification email sent successfully");
    } catch (error) {
      console.error("Error sending verification email:", error.message);
    }
  };
  const handleLogoutClick = () => {
    handleLogout();
    navigate("/", { replace: true });
  };

  const handleEditLot = (lot) => {
    setEditingLot({ ...lot });
    setShowEditModal(true);
  };

  const handleSaveEditedLot = (e) => {
    e.preventDefault();
    const updatedLots = lots.map((lot) =>
      lot.id === editingLot.id ? editingLot : lot
    );
    setLots(updatedLots);
    setShowEditModal(false);
    setEditingLot(null);
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const userLots = lots.filter((lot) => lot.name === currentUser.name);

  // console.log(toString(currentUser._id));
  // console.log(currentUser._id);
  console.log(currentUser);

  return (
    <section className="h-screen p-10 space-y-4">
      <div className="grid grid-cols-2">
        {/*main div*/}
        <div className="flex items-center justify-center bg-white rounded-full *:rounded-full size-52">
          <img
            className="w-[90%]"
            src={currentUser.avatarURL}
            alt="userAvatar"
          ></img>{" "}
        </div>
        <div className="space-y-6">
          <div className="flex space-x-4 *:font-bold *:text-3xl">
            <p>{currentUser.name}</p>
          </div>
          <p>Info: {currentUser.info}</p>
          <div className="space-x-4">
            <button
              onClick={
                currentUser
                  ? handleSendVerificationEmail
                  : () => console.log("User data is not available")
              }
              className="p-2 mt-4 text-lg duration-150 delay-75 border-2 rounded-md hover:bg-white hover:text-black hover:border-black"
            >
              Verify email
            </button>
            <Link to="/EditProfile">
              <button className="p-2 mt-4 text-lg duration-150 delay-75 border-2 rounded-md hover:bg-white hover:text-black hover:border-black">
                Edit Profile
              </button>
            </Link>
            <button
              className="p-2 mt-4 text-lg duration-150 delay-75 border-2 rounded-md hover:bg-white hover:text-black hover:border-black"
              onClick={handleLogoutClick}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-5xl font-bold text-center">Your Lots</h2>
        <div className="mx-8 max-h-[500px] w-[600px] text-wrap truncate">
          {userLots.map((lot, index) => (
            <div key={index} className="flex p-2">
              <div className="w-32 h-32 bg-white rounded-lg">
                <img
                  src={lot.image}
                  alt={lot.name}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-between gap-1 mx-6 border-b-2 border-white border-opacity-70">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-2xl font-bold">{lot.name}</p>
                  <button
                    className="p-2 text-sm duration-150 delay-75 border-2 rounded-md hover:bg-white hover:text-black hover:border-black"
                    onClick={() => handleEditLot(lot)}
                  >
                    Edit
                  </button>
                </div>
                <p className="opacity-90">{lot.description}</p>
                <div className="flex justify-between gap-2 *:opacity-90">
                  <p>Category: {lot.category}</p>
                  <p>Starting price: {lot.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
          <Modal.Header className="uppercase bg-slate-900">
            Edit Lot
          </Modal.Header>
          <Modal.Body className="bg-slate-900">
            {editingLot && (
              <div className="space-y-6">
                <div className="flex justify-between gap-3">
                  <form onSubmit={handleSaveEditedLot}>
                    <div className="flex justify-between gap-3">
                      <label htmlFor="file-upload">
                        <input
                          id="file-upload"
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          className="hidden"
                          onChange={(e) =>
                            setEditingLot({
                              ...editingLot,
                              image: e.target.files[0],
                            })
                          }
                        />
                        <div className="flex items-center justify-center bg-white rounded-md cursor-pointer size-48">
                          <img
                            src={editingLot.image}
                            alt={editingLot.name}
                            className="object-cover w-full h-full rounded-md"
                          />
                        </div>
                      </label>
                      <div className="space-y-2 w-[300px] bg-transparent border-t-0 border-b-2 border-x-0 text-white">
                        <input
                          type="text"
                          placeholder="Enter your lot name"
                          className="text-black"
                          name="name"
                          value={editingLot.name}
                          onChange={(e) =>
                            setEditingLot({
                              ...editingLot,
                              name: e.target.value,
                            })
                          }
                        />
                        <textarea
                          placeholder="Enter lot description"
                          className="text-black"
                          name="description"
                          value={editingLot.description}
                          onChange={(e) =>
                            setEditingLot({
                              ...editingLot,
                              description: e.target.value,
                            })
                          }
                        ></textarea>
                        <div className="flex items-center gap-2 mb-2 text-black bg-transparent border-t-0 border-b-2 border-x-0">
                          <input
                            type="number"
                            className="w-[140px] text-black"
                            placeholder="Price"
                            name="price"
                            value={editingLot.price}
                            onChange={(e) =>
                              setEditingLot({
                                ...editingLot,
                                price: e.target.value,
                              })
                            }
                          ></input>
                          <input
                            type="date"
                            className="w-[140px] text-black"
                            name="date"
                            value={editingLot.date}
                            onChange={(e) =>
                              setEditingLot({
                                ...editingLot,
                                date: e.target.value,
                              })
                            }
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="p-6 m-4 font-bold text-white transition-colors duration-150 delay-75 bg-black rounded-lg hover:bg-white hover:text-black"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </section>
  );
}
