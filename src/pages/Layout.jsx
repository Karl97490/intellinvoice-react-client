import { Outlet } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import SideBar from "../components/navigation/SideBar";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <SideBar />

      <main className="flex-1 container mx-auto px-4 py-0 place-content-center">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
