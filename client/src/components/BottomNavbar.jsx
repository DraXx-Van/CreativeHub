import React from 'react';
import { PiHouse, PiTicket, PiHeart, PiUser } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const BottomNavbar = () => {
  const navClass = ({ isActive }) =>
    `flex items-center justify-center text-[29px] transition-colors ${
      isActive ? "text-[#4F46E5]" : "text-[#94A3B8]"
    }`;

  return (
    <div className="fixed bottom-0 w-full max-w-[390px] h-[73px] bg-[#FFFFFF] flex items-start justify-between pt-[12px] px-[52px] pb-[32px] z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <NavLink to="/" className={navClass}>
        <PiHouse />
      </NavLink>
      <NavLink to="/my-bookings" className={navClass}>
        <PiTicket />
      </NavLink>
      <NavLink to="/wishlist" className={navClass}>
        <PiHeart />
      </NavLink>
      <NavLink to="/profile" className={navClass}>
        <PiUser />
      </NavLink>
    </div>
  );
};

export default BottomNavbar;
