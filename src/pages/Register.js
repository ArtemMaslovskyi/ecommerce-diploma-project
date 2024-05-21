import React from "react";

export default function Register() {
  return (
    <section className="p-10 h-[800px]">
      <form className="flex flex-col items-center justify-center">
        <div className="flex flex-col w-1/3 space-y-4">
          <p className="">Email</p>
          <input type="email" className="text-black"></input>
          <p className="">Password</p>
          <input type="password" className="text-black"></input>
          <p className="">Confirm Password</p>
          <input type="password" className="text-black"></input>
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
