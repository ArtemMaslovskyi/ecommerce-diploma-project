import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <section className="transition-colors duration-500 dark:to-my-dark-gradient-0 font-roboto text-neutral-950 dark:bg-slate-950 dark:text-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </section>
  );
}
