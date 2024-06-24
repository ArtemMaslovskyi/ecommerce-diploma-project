import axios from "axios";
import { Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { getPaginationRange } from "./pagination";
export default function Lots() {
  const { currentUser } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [openCreateMenu, setOpenCreateMenu] = useState(false);
  const [selectedLot, setSelectedLot] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const lotsPerPage = 10;
  const [lots, setLots] = useState([]);
  const { isLoggedIn } = useAuth();
  const [error, setError] = useState("");

  const [newLot, setNewLot] = useState({
    title: "",
    description: "",
    price: "",
    favorite: false,
    // image: "",
  });

  const createLot = async (newLot) => {
    try {
      if (!currentUser) {
        throw new Error("User not authenticated");
      }

      axios
        .post("/api/lots/create", newLot)
        .then((resp) => {
          console.log(resp);
          if (resp?.data) {
            setLots((prevLots) => [...prevLots, resp?.data]);
            setNewLot({
              title: "",
              description: "",
              price: "",
              favorite: false,
              // image: "",
            });
            setOpenCreateMenu(false);
          }
        })
        .catch((err) => {
          console.error(err);
          throw new Error(`HTTP error! status: ${err?.response?.data?.error}`);
        });
    } catch (error) {
      console.error("Full error object:", error);
      setError(error.message);
    }
  };

  console.log(currentUser.token);
  // console.log(currentUser._id);
  // console.log(currentUser);

  useEffect(() => {
    const fetchLots = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/lots/list",
          {
            headers: {
              "x-auth-token": currentUser.token,
            },
          }
        );
        const data = response.data;
        console.log(data);
        if (Array.isArray(data)) {
          setLots(data);
        } else {
          console.error("API did not return an array of lots");
        }
      } catch (error) {
        console.error("Error fetching lots:", error);
      }
    };
    fetchLots();
  }, []);

  const handleMoreInfo = (lot) => {
    setSelectedLot(lot);
    setOpenModal(true);
  };

  const indexOfLastLot = currentPage * lotsPerPage;
  const indexOfFirstLot = indexOfLastLot - lotsPerPage;
  const currentLots = lots.slice(indexOfFirstLot, indexOfLastLot);

  const totalPages = Math.ceil(lots.length / lotsPerPage);
  const paginationRange = getPaginationRange(currentPage, totalPages);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setNewLot((prevNewLot) => ({
      ...prevNewLot,
      [name]:
        type === "radio"
          ? value === "true"
          : name === "price"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewLot((prevNewLot) => ({
        ...prevNewLot,
        image: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newLot.title || !newLot.price) {
      setError("Title and price are required");
      return;
    }
    createLot(newLot);
  };

  const handleCreateClick = () => {
    if (isLoggedIn) {
      setOpenCreateMenu(true);
      setError("");
    } else {
      setError("You must be logged in to create a lot.");
    }
  };

  return (
    <section className="mx-6 my-4">
      <button
        className="p-2 mx-10 my-4 text-lg border-2 rounded-md hover:bg-white hover:text-black hover:border-black"
        onClick={handleCreateClick}
      >
        Create lot
      </button>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-2 mx-8 truncate text-wrap *:w-[600px]">
        {currentLots.map((lot, index) => (
          <div className="flex p-2" key={index}>
            <div className="w-32 h-32 bg-white rounded-lg">
              <img
                src={lot.avatarURL}
                alt={lot.title}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-between gap-1 mx-6 border-b-2 border-white border-opacity-70">
              <div className="flex items-center justify-between gap-4">
                <p className="text-2xl font-bold">{lot.title}</p>
                <button
                  className="p-2 border-2 rounded-md hover:bg-white hover:text-black hover:border-black"
                  onClick={() => handleMoreInfo(lot)}
                >
                  More info
                </button>
              </div>
              <p className="truncate opacity-90 w-[400px]">{lot.description}</p>
              <div className="flex justify-between gap-2 opacity-90">
                <p>Category: {lot.category}</p>
                <p>Price: {lot.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedLot && (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header className="bg-slate-800">
            {selectedLot.name}
          </Modal.Header>
          <Modal.Body className="bg-slate-800">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white aspect-square w-[300px] rounded-sm">
                  <img
                    src={selectedLot.avatarURL}
                    alt={selectedLot.title}
                    className="object-cover w-full h-full rounded-sm"
                  />
                </div>
                <div className="grid justify-around w-full grid-cols-2 gap-2 text-center text-white">
                  <div className="">
                    <h3>Price</h3>
                    <p>{selectedLot.price}</p>
                  </div>
                </div>
              </div>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {selectedLot.description}
              </p>
            </div>
          </Modal.Body>
        </Modal>
      )}
      <Modal show={openCreateMenu} onClose={() => setOpenCreateMenu(false)}>
        <Modal.Header className="uppercase bg-slate-900">
          Create your lot
        </Modal.Header>
        <Modal.Body className="bg-slate-900">
          <div className="space-y-6">
            <div className="flex justify-between gap-3">
              <form onSubmit={handleSubmit}>
                <div className="flex justify-between gap-3">
                  {/*<label htmlFor="file-upload">
                    <input
                      id="file-upload"
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <div className="flex items-center justify-center bg-white rounded-md cursor-pointer size-48">
                      <CiImport size={"160px"} />
                    </div>
                  </label>*/}
                  <div className="space-y-2 w-[300px] bg-transparent border-t-0 border-b-2 border-x-0 text-white">
                    <input
                      type="text"
                      placeholder="Enter your lot title"
                      name="title"
                      value={newLot.title}
                      onChange={handleInputChange}
                      className="w-full text-black"
                    />
                    <textarea
                      placeholder="Enter lot description"
                      name="description"
                      value={newLot.description}
                      onChange={handleInputChange}
                      className="w-full text-black"
                    ></textarea>
                    <div className="flex items-center gap-2 mb-2 text-black bg-transparent border-t-0 border-b-2 border-x-0">
                      <input
                        type="number"
                        name="price"
                        value={newLot.price}
                        onChange={handleInputChange}
                        placeholder="Price"
                        className="w-full text-black"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <label>
                        <input
                          type="radio"
                          name="favorite"
                          value="true"
                          checked={newLot.favorite === true}
                          onChange={handleInputChange}
                        />
                        Favorite
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="favorite"
                          value="false"
                          checked={newLot.favorite === false}
                          onChange={handleInputChange}
                        />
                        Not Favorite
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="p-6 m-4 font-bold text-white transition-colors duration-150 delay-75 bg-black rounded-lg hover:bg-white hover:text-black"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className="flex justify-center mt-4">
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === "...") {
            return (
              <span key={index} className="p-2 mx-1">
                ...
              </span>
            );
          }
          return (
            <button
              key={index}
              className={`p-2 mx-1 border-2 rounded-md ${
                currentPage === pageNumber
                  ? "bg-gray-200 text-black"
                  : "hover:bg-white hover:text-black hover:border-black"
              }`}
              onClick={() => paginate(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
    </section>
  );
}
