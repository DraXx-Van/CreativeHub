import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { logout } from '../store/authSlice';
import { PiUser, PiTicket, PiHeart, PiSignOut } from "react-icons/pi";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const user = authState?.user;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  if (!user) {
    return (
      <div className="w-full max-w-[390px] min-h-screen bg-bg relative pb-[100px] flex flex-col items-center justify-center px-[26px]">
        <div className="w-[80px] h-[80px] rounded-full bg-gray-200 flex items-center justify-center mb-[24px]">
          <PiUser size={40} className="text-gray-400" />
        </div>
        <h2 className="text-[20px] font-bold text-text mb-[8px]">Welcome Guest</h2>
        <p className="text-[14px] text-text-muted text-center mb-[32px]">
          Sign in to view your profile, manage your bookings, and access your wishlist.
        </p>
        <button 
          onClick={() => navigate('/auth', { state: { returnUrl: '/profile' } })}
          className="w-full h-[45px] bg-primary rounded-[5px] flex items-center justify-center hover:opacity-90 transition-opacity"
        >
          <span className="text-[14px] font-semibold text-white">Login / Sign Up</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-bg relative pb-[100px] flex flex-col">
      {/* Top Header Section */}
      <div className="px-[23px] pt-[28px] bg-white pb-[30px] shadow-sm rounded-b-[20px] z-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[120px] bg-gradient-to-br from-primary/80 to-primary/40 z-0"></div>
        
        <div className="flex justify-between items-center w-full relative z-10 mb-[20px]">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-[6px] text-white hover:opacity-80 transition-opacity"
          >
            <IoIosArrowBack size={20} />
            <span className="text-[14px] font-normal leading-[17px]">
              Back
            </span>
          </button>
        </div>
        
        <div className="relative z-10 flex flex-col items-center mt-[10px]">
          <div className="w-[90px] h-[90px] rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center overflow-hidden mb-[16px]">
            <span className="text-[36px] font-bold text-primary">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </span>
          </div>
          <h1 className="text-[22px] font-bold text-text">
            {user.name}
          </h1>
          <p className="text-[14px] text-text-muted mt-[4px]">
            {user.email}
          </p>
        </div>
      </div>

      {/* Menu Options */}
      <div className="px-[26px] mt-[30px] flex flex-col gap-[12px]">
        <h2 className="text-[16px] font-bold text-text mb-[8px]">Account Settings</h2>
        
        <button 
          onClick={() => navigate('/my-bookings')}
          className="w-full bg-white p-[16px] rounded-[10px] flex items-center justify-between shadow-sm border border-transparent hover:border-gray-200 transition-colors"
        >
          <div className="flex items-center gap-[12px]">
            <div className="w-[40px] h-[40px] rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
              <PiTicket size={22} />
            </div>
            <span className="text-[15px] font-medium text-text">My Bookings</span>
          </div>
          <IoIosArrowBack size={18} className="text-gray-400 rotate-180" />
        </button>

        <button 
          onClick={() => navigate('/wishlist')}
          className="w-full bg-white p-[16px] rounded-[10px] flex items-center justify-between shadow-sm border border-transparent hover:border-gray-200 transition-colors"
        >
          <div className="flex items-center gap-[12px]">
            <div className="w-[40px] h-[40px] rounded-full bg-red-50 flex items-center justify-center text-red-500">
              <PiHeart size={22} />
            </div>
            <span className="text-[15px] font-medium text-text">Wishlist</span>
          </div>
          <IoIosArrowBack size={18} className="text-gray-400 rotate-180" />
        </button>

        <button 
          onClick={handleLogout}
          className="w-full bg-white p-[16px] rounded-[10px] flex items-center justify-between shadow-sm border border-transparent hover:border-red-100 transition-colors mt-[20px]"
        >
          <div className="flex items-center gap-[12px]">
            <div className="w-[40px] h-[40px] rounded-full bg-gray-50 flex items-center justify-center text-gray-500">
              <PiSignOut size={22} />
            </div>
            <span className="text-[15px] font-medium text-[#ED183E]">Log Out</span>
          </div>
        </button>
      </div>

    </div>
  );
};

export default Profile;
