import React, { useState } from "react";
import { Modal } from "flowbite-react";
import { CiImport } from "react-icons/ci";
import lotData from "./lotData";
import { getPaginationRange } from "./pagination";

export default function Lots() {
  const [openModal, setOpenModal] = useState(false);
  const [openCreateMenu, setOpenCreateMenu] = useState(false);
  const [selectedLot, setSelectedLot] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const lotsPerPage = 10;

  const handleMoreInfo = (lot) => {
    setSelectedLot(lot);
    setOpenModal(true);
  };

  const indexOfLastLot = currentPage * lotsPerPage;
  const indexOfFirstLot = indexOfLastLot - lotsPerPage;
  const currentLots = lotData.slice(indexOfFirstLot, indexOfLastLot);

  const totalPages = Math.ceil(lotData.length / lotsPerPage);
  const paginationRange = getPaginationRange(currentPage, totalPages);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="mx-6 my-4">
      <button
        className="p-2 mx-10 my-4 text-lg border-2 rounded-md hover:bg-white hover:text-black hover:border-black"
        onClick={() => setOpenCreateMenu(true)}
      >
        Create lot
      </button>
      <div className="grid grid-cols-2 mx-8 truncate text-wrap">
        {currentLots.map((lot, index) => (
          <div className="flex p-2" key={index}>
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
                  className="p-2 border-2 rounded-md hover:bg-white hover:text-black hover:border-black"
                  onClick={() => handleMoreInfo(lot)}
                >
                  More info
                </button>
              </div>
              <p className="opacity-90">{lot.description}</p>
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
                    src={selectedLot.image}
                    alt={selectedLot.name}
                    className="object-cover w-full h-full rounded-sm"
                  />
                </div>
                <div className="grid justify-around w-full grid-cols-2 gap-2 text-center text-white">
                  <div className="border-e-2">
                    <h3>Price</h3>
                    <p>{selectedLot.price}</p>
                  </div>
                  <div>
                    <h3>Date</h3>
                    <p>{selectedLot.date}</p>
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
              <form>
                <div className="flex justify-between gap-3">
                  <label htmlFor="file-upload">
                    <input
                      id="file-upload"
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      className="hidden"
                    />
                    <div className="flex items-center justify-center bg-white rounded-md cursor-pointer size-48">
                      <CiImport size={"160px"} />
                    </div>
                  </label>
                  <div className="space-y-2 w-[300px] bg-transparent border-t-0 border-b-2 border-x-0 text-white">
                    <input
                      type="text"
                      placeholder="Enter your lot name"
                      className=""
                    />
                    <textarea placeholder="Enter lot description"></textarea>
                    <div className="flex items-center gap-2 mb-2 text-white bg-transparent border-t-0 border-b-2 border-x-0">
                      <input
                        type="number"
                        className="w-[140px]"
                        placeholder="Price"
                      ></input>
                      <input type="date" className="w-[140px]"></input>
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
