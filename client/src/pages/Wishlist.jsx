import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import MovieCard from '../components/MovieCard';

const Wishlist = () => {
  const navigate = useNavigate();
  const wishlistMovies = useSelector((state) => state.wishlist.movies);

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-bg relative pb-[100px] flex flex-col">
      {/* Top Header Section */}
      <div className="px-[23px] pt-[28px] bg-white pb-[20px] shadow-sm z-10">
        <div className="flex items-center w-full">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-[6px] text-text hover:opacity-80 transition-opacity"
          >
            <IoIosArrowBack size={20} />
            <span className="text-[14px] font-normal leading-[17px]">
              Back
            </span>
          </button>
        </div>
        
        <h1 className="text-[20px] font-bold text-text mt-[20px]">
          My Wishlist
        </h1>
        <p className="text-[14px] text-text-muted mt-[4px]">
          {wishlistMovies.length} movies saved
        </p>
      </div>

      {/* Wishlist Grid */}
      <div className="flex-1 px-[26px] pt-[24px]">
        {wishlistMovies.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-[100px]">
            <p className="text-[16px] font-medium text-text-muted mb-[16px]">Your wishlist is empty</p>
            <button 
              onClick={() => navigate("/")}
              className="px-[24px] py-[10px] bg-primary rounded-[5px] text-white text-[14px] font-semibold hover:opacity-90 transition-opacity"
            >
              Explore Movies
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-[15px] gap-y-[24px]">
            {wishlistMovies.map((movie) => (
              <div key={movie._id} className="w-full">
                <MovieCard movie={movie} fullWidth={true} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
