import { Outlet } from "react-router-dom";
import Navigationbar from "../components/navigation/Navigationbar";
import SideBar from "../components/navigation/SideBar";
import Footer from "../components/navigation/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigationbar />
      <SideBar />

      <main className="flex-1 container mx-auto py-0 place-content-center">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
