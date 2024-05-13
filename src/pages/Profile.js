import React from "react";
import { MdPhotoCamera } from "react-icons/md";

export default function Profile() {
  return (
    <section className="p-10 space-y-4">
      <div className="grid grid-cols-2">
        {/*main div*/}
        <div className="flex items-center justify-center bg-white rounded-full size-52">
          <MdPhotoCamera color="black" size={80} />
        </div>
        <div className="space-y-6">
          <div className="flex space-x-4 *:font-bold *:text-3xl">
            <p>Frist Name</p>
            <p>Last Name</p>
          </div>
          <p>Date of Birth: {}</p>
          <p>Info: </p>
        </div>
      </div>
      <div>
        <h2 className="text-5xl font-bold text-center">Your Lots</h2>
        {/*some JS later */}
        <div className="mx-8 max-h-[500px] w-[600px] text-wrap truncate">
          <div className="flex p-2">
            <div className="w-32 h-32 bg-white rounded-lg">picture div</div>
            <div className="flex flex-col justify-between gap-1 mx-6 border-b-2 border-white border-opacity-70">
              <div className="flex items-center justify-between gap-4">
                <p className="text-2xl font-bold">[PH]Lot Name</p>
              </div>
              <p className="opacity-90">[PH]Lot Description</p>
              <div className="flex justify-between gap-2 *:opacity-90">
                <p>Category: {}</p>
                <p>Stating price: {}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
