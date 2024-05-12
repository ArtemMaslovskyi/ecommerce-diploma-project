import React from "react";
import { Link } from "react-router-dom";
import { IoIosSunny } from "react-icons/io";
import { IoIosMoon } from "react-icons/io";
import mainLogo from "../mainLogo.png";

export default function Navbar() {
  //Dark mode setter
  const [darkMode, setDarkMode] = React.useState(
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  React.useEffect(() => {
    if (darkMode) {
      //if set dark mode add class dark and save it in local storage
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      //else remove class dark and set light in local storage
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prevIsDarkMode) => !prevIsDarkMode);
  };

  return (
    <nav className="flex items-center py-4 mx-4 *:mx-4 justify-between border-2 border-t-0 border-opacity-80">
      <div className="*:mx-2 flex items-center">
        <Link to="/">
          <div className="flex">
            <img className="w-16" src={mainLogo} alt="logo"></img>
            <button className="text-4xl font-bold text-main-yellow">
              Corgi-Wallet Bazaar
            </button>
          </div>
        </Link>
        <Link to="/About">
          <button className="text-[28px] opacity-80 dark:text-white">
            About
          </button>
        </Link>
        <Link to="/Contact">
          <button className="text-[28px] opacity-80 dark:text-white">
            FAQ
          </button>
        </Link>
      </div>
      <div className="*:mx-2 flex items-center">
        <Link to="/Profile">
          <button className="text-[28px] opacity-80 dark:text-white">
            Profile
          </button>
        </Link>
        <button onClick={toggleTheme}>
          {" "}
          {darkMode ? (
            <IoIosSunny size={32} color="white" />
          ) : (
            <IoIosMoon size={32} color="373737" />
          )}
        </button>
      </div>
    </nav>
  );
}
