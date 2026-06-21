import { Outlet } from "react-router-dom";
import BottomNavbar from "../components/BottomNavbar";

const AppLayout = () => {
  return (
    <>
      <Outlet />
      <BottomNavbar />
    </>
  );
};

export default AppLayout;