import React, { useState } from "react";
import { Modal } from "flowbite-react";

export default function Lots() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <section className="mx-6 my-4">
      <button className="p-2 mx-10 my-4 text-lg border-2 rounded-md hover:bg-white hover:text-black hover:border-black">
        Create lot
      </button>
      <div className="mx-8 max-h-[500px] w-[600px] text-wrap truncate">
        <div className="flex p-2">
          <div className="w-32 h-32 bg-white rounded-lg">picture div</div>
          <div className="flex flex-col justify-between gap-1 mx-6 border-b-2 border-white border-opacity-70">
            <div className="flex items-center justify-between gap-4">
              <p className="text-2xl font-bold">[PH]Lot Name</p>
              <button
                className="p-2 border-2 rounded-md hover:bg-white hover:text-black hover:border-black"
                onClick={() => setOpenModal(true)}
              >
                More info
              </button>
            </div>
            <p className="opacity-90">[PH]Lot Description</p>
            <div className="flex justify-between gap-2 *:opacity-90">
              <p>Category: {}</p>
              <p>Stating price: {}</p>
            </div>
          </div>
        </div>
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className="bg-slate-800">[PH]Lot Name</Modal.Header>
        <Modal.Body className="bg-slate-800">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white aspect-square w-[300px] rounded-sm"></div>
              <div className="*:text-white grid grid-cols-2 gap-2 justify-around w-full text-center *:h-fit">
                <div className="border-e-2">
                  <h3>Price</h3>
                  <p>12312</p>
                </div>
                <div>
                  <h3>Date</h3>
                  <p>213231</p>
                </div>
              </div>
            </div>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
              debitis placeat totam consequuntur suscipit tenetur ullam quisquam
              consequatur delectus minus nostrum iure, architecto corporis
              perspiciatis libero sequi natus soluta nam tempore officiis
              similique doloremque. Ipsa, minima. Repellendus rem quod molestias
              maxime, ea, aliquam incidunt nesciunt quidem, eos aspernatur
              molestiae cum quo alias harum. Inventore molestias culpa tempora,
              nam cumque mollitia deleniti harum velit nihil repellendus, saepe
              necessitatibus sit esse, expedita sint error assumenda commodi
              quisquam? Totam ex voluptatem veniam ipsum veritatis, dolores
              aliquam repellendus quas possimus? Molestiae corporis quibusdam
              repellat odio iure nulla voluptatem. Exercitationem pariatur ex
              animi voluptate facilis.
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
}
