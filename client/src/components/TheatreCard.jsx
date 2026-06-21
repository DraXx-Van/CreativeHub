import React from 'react';
import { RiMapPinLine } from 'react-icons/ri';

const TheatreCard = ({ theatre,onSelect }) => {
  return (
    <div onClick={onSelect} className="flex gap-[12px] w-full">
      <img
        src={theatre.logo}
        alt={theatre.name}
        className="w-[73px] h-[73px] rounded-[5px] object-cover bg-white"
      />
      <div className="flex flex-col flex-1 justify-center relative">
        <h3 className="text-[14px] font-semibold text-[#121212] leading-[17px]">
          {theatre.name}
        </h3>
        <p className="flex items-center gap-1 text-[12px] font-normal text-[#64748B] leading-[15px] mt-[4px]">
          <RiMapPinLine className="text-[14px]" />
          {theatre.location}
        </p>
        <p className="text-[14px] font-semibold text-[#64748B] leading-[17px] mt-[8px]">
          ₹{theatre.minPrice} - ₹{theatre.maxPrice}
        </p>
      </div>
    </div>
  );
};

export default TheatreCard;
