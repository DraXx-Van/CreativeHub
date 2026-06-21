import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { setSeats, setTotalPrice } from '../store/bookingSlice';

const SeatSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const bookingState = useSelector((state) => state.booking);

  // Redux data with fallbacks
  const screenNumber = bookingState.screen;
  const showTime = bookingState.showTime;

  // Base ticket price
  const ticketPrice = bookingState.theatre.minPrice;

  // Local UI state
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);

  useEffect(() => {
    const fetchOccupied = async () => {
      try {
        const query = new URLSearchParams({
          theatre: bookingState.theatre._id,
          movie: bookingState.movie._id,
          screenNumber: bookingState.screen,
          showDate: bookingState.date,
          showTime: bookingState.showTime,
        });
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_URL}/api/bookings/occupied-seats?${query.toString()}`);
        const data = await res.json();
        if (data.success) {
          setOccupiedSeats(data.occupiedSeats);
        }
      } catch (err) {
        console.error("Failed to fetch occupied seats", err);
      }
    };
    
    if (bookingState.theatre && bookingState.movie) {
      fetchOccupied();
    }
  }, [bookingState]);

  // Grid Dimensions
  const rowLabelsUpper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const rowLabelsLower = ['J', 'K', 'L', 'M'];

  const toggleSeat = (seatId) => {
    if (occupiedSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      if (selectedSeats.length >= 10) {
        alert("You can only select up to 10 seats per transaction.");
        return;
      }
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const totalPrice = selectedSeats.length * ticketPrice;

  const handleClickSummary = () => {
    dispatch(setSeats(selectedSeats));
    dispatch(setTotalPrice(totalPrice));
    navigate(`/summary`);
  }

  const renderSeatRow = (rowLabel, colSzie) => {
    return (
      <div key={rowLabel} className="flex items-center gap-[10px]">
        {/* Left Fixed Row Label */}
        <div className="w-[20px] shrink-0 text-center text-[14px] font-normal text-[#080325]">
          {rowLabel}
        </div>

        {/* Row of Seats */}
        {Array.from({ length: colSzie }).map((_, colIdx) => {
          const seatId = `${rowLabel}${colIdx + 1}`;
          const isOccupied = occupiedSeats.includes(seatId);
          const isSelected = selectedSeats.includes(seatId);

          let btnClass = "w-[23px] h-[23px] shrink-0 rounded-[5px] border flex items-center justify-center text-[12px] font-normal transition-colors";
          let textClass = "";

          if (isOccupied) {
            btnClass += " bg-[#94A3B8] border-[#94A3B8] cursor-not-allowed";
            textClass = "text-white hidden"; // Hide text for occupied
          } else if (isSelected) {
            btnClass += " bg-primary border-primary";
            textClass = "text-white";
          } else {
            btnClass += " bg-white border-[#CED6E0] hover:border-primary";
            textClass = "text-[#64748B]";
          }

          return (
            <button
              key={seatId}
              disabled={isOccupied}
              onClick={() => toggleSeat(seatId)}
              className={btnClass}
            >
              {!isOccupied && <span className={textClass}>{colIdx + 1}</span>}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-bg relative pb-[100px] flex flex-col overflow-hidden">
      {/* --- Top Header Section --- */}
      <div className="px-[26px] pt-[30px]">
        {/* Navigation Bar */}
        <div className="flex justify-between items-center w-full">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-[6px] text-text"
          >
            <IoIosArrowBack size={20} />
            <span className="text-[14px] font-normal leading-[17px]">
              Back
            </span>
          </button>
          <button
            onClick={() => navigate("/")}
            className="text-[14px] font-normal text-text-muted leading-[17px]"
          >
            Cancel
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-[8px] bg-gray-200 rounded-[24px] mt-[25px]">
          <div className="h-full w-[70%] bg-primary rounded-[8px]"></div>
        </div>

        {/* Title */}
        <h1 className="text-[18px] font-bold text-text leading-[22px] mt-[20px]">
          Select Seats
        </h1>

        {/* Dynamic Details & Pricing */}
        <div className="flex justify-between items-center mt-[12px]">
          <div className="flex items-center gap-[10px]">
            <span className="text-[14px] font-semibold text-text">Screen {screenNumber}</span>
            <span className="text-[14px] font-semibold text-primary">{showTime}</span>
          </div>
          <span className="text-[14px] font-semibold text-text">
            ₹{totalPrice}
          </span>
        </div>
      </div>

      {/* --- Seat Matrix Scrollable Section --- */}
      <div className="flex-1 mt-[25px] w-full relative">
        {/* Curved Screen Graphic */}
        <div className="w-full flex flex-col items-center mb-[20px]">
          <svg width="337" height="14" viewBox="0 0 337 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 11.5C110 -2.5 227 -2.5 334.5 11.5" stroke="#CED6E0" strokeWidth="5" strokeLinecap="round" />
          </svg>
          <span className="text-[14px] font-normal text-text-muted mt-[8px] tracking-[2px]">SCREEN</span>
        </div>

        {/* Scrollable Container */}
        <div className="w-full overflow-x-auto pl-[26px] pr-[26px] pb-[20px] scrollbar-hide">
          <div className="flex flex-col gap-[8px] min-w-max pr-[26px]">
            {rowLabelsUpper.map(row => renderSeatRow(row, 8))}

            {/* Walkway Gap */}
            <div className="h-[20px]"></div>

            {rowLabelsLower.map(row => renderSeatRow(row, 12))}
          </div>
        </div>
      </div>

      {/* --- Bottom Fixed Section --- */}
      <div className="mt-auto pt-[10px] px-[26px]">
        {/* Legend */}
        <div className="flex items-center justify-center gap-[20px] mb-[24px]">
          <div className="flex items-center gap-[6px]">
            <div className="w-[17px] h-[17px] rounded-[5px] bg-white border border-[#94A3B8]"></div>
            <span className="text-[14px] font-normal text-text-muted">Available</span>
          </div>
          <div className="flex items-center gap-[6px]">
            <div className="w-[17px] h-[17px] rounded-[5px] bg-[#94A3B8] border border-[#94A3B8]"></div>
            <span className="text-[14px] font-normal text-text-muted">Occupied</span>
          </div>
          <div className="flex items-center gap-[6px]">
            <div className="w-[17px] h-[17px] rounded-[5px] bg-primary border border-primary"></div>
            <span className="text-[14px] font-normal text-primary">Selected</span>
          </div>
        </div>

        {/* Proceed Button */}
        <div className="flex justify-center mb-[20px]">
          <button
            disabled={selectedSeats.length === 0}
            onClick={() => handleClickSummary()}
            className={`w-full h-[37px] rounded-[5px] flex items-center justify-center transition-opacity ${selectedSeats.length === 0 ? 'bg-primary opacity-50 cursor-not-allowed' : 'bg-primary hover:opacity-90'
              }`}
          >
            <span className="text-[14px] font-semibold text-white leading-[17px]">
              View Booking Summary
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;