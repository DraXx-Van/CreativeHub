import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { RiBuilding4Fill, RiCalendarEventLine } from "react-icons/ri";
import { setGrandTotal } from '../store/bookingSlice';

const BookingSummary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const bookingState = useSelector((state) => state.booking);
  const authState = useSelector((state) => state.auth);

  const movie = bookingState.movie;
  const theatre = bookingState.theatre;
  const selectedDate = bookingState.date;
  const screenNumber = bookingState.screen;
  const showTime = bookingState.showTime;
  const format = bookingState.format;
  const totalPrice = bookingState.totalPrice;

  // Array of selected seats
  const selectedSeats = bookingState.seats;

  // Pricing Calculations
  const bookingFee = 20;
  const grandTotal = totalPrice + bookingFee;

  const handleProceed = () => {
    dispatch(setGrandTotal(grandTotal));
    if (authState?.user) {
      navigate('/checkout');
    } else {
      navigate('/auth', { state: { returnUrl: '/checkout' } });
    }
  };

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-bg relative pb-[100px] flex flex-col">
      {/* Top Header Section */}
      <div className="px-[26px] pt-[30px]">
        {/* Navigation Bar */}
        <div className="flex justify-between items-center w-full">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-[6px] text-text hover:opacity-80 transition-opacity"
          >
            <IoIosArrowBack size={20} />
            <span className="text-[14px] font-normal leading-[17px]">
              Back
            </span>
          </button>
          <button
            onClick={() => navigate("/")}
            className="text-[14px] font-normal text-text-muted leading-[17px] hover:opacity-80 transition-opacity"
          >
            Cancel
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-[8px] bg-gray-200 rounded-[24px] mt-[25px]">
          <div className="h-full w-[80%] bg-primary rounded-[8px]"></div>
        </div>

        {/* Title */}
        <h1 className="text-[18px] font-bold text-text leading-[22px] mt-[20px]">
          Booking Summary
        </h1>
      </div>

      {/* Main Content Area */}
      <div className="px-[26px] mt-[20px] flex flex-col">
        {/* Hero Image */}
        <div className="w-full h-[192px] rounded-[5px] overflow-hidden mb-[20px]">
          <img
            src={movie.banner}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Movie Info */}
        <h2 className="text-[20px] font-bold text-text leading-[27px] mb-[12px]">
          {movie.title}
        </h2>

        <div className="flex items-center gap-[18px] mb-[20px]">
          <div className="flex items-center gap-[6px]">
            <RiBuilding4Fill className="text-text-muted text-[14px]" />
            <span className="text-[14px] font-semibold text-text-muted leading-[17px]">
              {theatre.name}
            </span>
          </div>
          <div className="flex items-center gap-[6px]">
            <RiCalendarEventLine className="text-text-muted text-[14px]" />
            <span className="text-[14px] font-semibold text-text-muted leading-[17px]">
              {selectedDate}
            </span>
          </div>
        </div>

        {/* Screen, Time, Format Details */}
        <div className="flex items-center gap-[24px] mb-[12px]">
          <span className="text-[14px] font-semibold text-text">Screen {screenNumber}</span>
          <span className="text-[14px] font-semibold text-text-muted">{showTime}</span>
          <span className="text-[14px] font-semibold text-text-muted">{format}</span>
        </div>

        {/* Seats List */}
        <div className="flex items-start gap-[24px] mb-[40px]">
          <span className="text-[14px] font-semibold text-text mt-[5px]">Seats</span>
          <div className="flex flex-wrap gap-[10px]">
            {selectedSeats.map(seat => (
              <div
                key={seat}
                className="px-[8px] py-[4px] bg-[#94A3B8] rounded-[5px] flex items-center justify-center"
              >
                <span className="text-[14px] font-semibold text-white leading-[17px]">
                  {seat}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Summary Breakdown */}
        <div className="flex flex-col gap-[10px]">
          {/* Tickets Price */}
          <div className="flex justify-between items-center">
            <span className="text-[14px] font-normal text-text">
              {selectedSeats.length}x Tickets
            </span>
            <span className="text-[14px] font-normal text-text">
              ₹{totalPrice}
            </span>
          </div>

          {/* Booking Fee */}
          <div className="flex justify-between items-center">
            <span className="text-[14px] font-normal text-text">
              Booking Fee
            </span>
            <span className="text-[14px] font-normal text-text">
              ₹{bookingFee}
            </span>
          </div>

          {/* Divider */}
          <hr className="w-full border-t border-[#D9D9D9] mt-[8px] mb-[8px]" />

          {/* Grand Total */}
          <div className="flex justify-between items-center">
            <span className="text-[16px] font-bold text-text">
              Total
            </span>
            <span className="text-[16px] font-bold text-text">
              ₹{grandTotal}
            </span>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Section */}
      <div className="mt-auto px-[23px] flex justify-center mb-[20px]">
        <button
          onClick={handleProceed}
          className="w-full h-[37px] bg-primary rounded-[5px] flex items-center justify-center transition-opacity hover:opacity-90"
        >
          <span className="text-[14px] font-semibold text-white leading-[17px]">
            Proceed to Payment
          </span>
        </button>
      </div>
    </div>
  );
};

export default BookingSummary;