import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoClose } from "react-icons/io5";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const bookingState = useSelector((state) => state.booking);
  
  const movie = bookingState?.movie;
  const theatre = bookingState?.theatre;
  const seats = bookingState?.seats;
  const screen = bookingState?.screen;
  const format = bookingState?.format;
  const date = bookingState?.date;
  const time = bookingState?.showTime;
  
  // Calculate total
  const totalPrice = bookingState?.totalPrice;
  const bookingFee = 20;
  const grandTotal = totalPrice + bookingFee;
  
  // Generate mock transaction date
  const now = new Date();
  const transactionDate = now.toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-bg relative pb-[100px] flex flex-col items-center">
      {/* Top Header Section */}
      <div className="w-full px-[26px] pt-[30px] flex justify-end">
        <button
          onClick={() => navigate("/")}
          className="text-[14px] font-normal text-text-muted leading-[17px] hover:opacity-80 transition-opacity"
        >
          Close
        </button>
      </div>

      {/* Success Icon & Message */}
      <div className="flex flex-col items-center mt-[20px]">
        {/* SVG Checkmark */}
        <div className="w-[43px] h-[43px] rounded-full flex items-center justify-center">
          <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 21.5L19 28L31 15" stroke="#0DC599" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="text-[14px] font-normal text-[#454545] mt-[12px] leading-[17px]">
          Payment Successful!
        </h2>
      </div>

      {/* Ticket Details Card */}
      <div className="w-[322px] bg-white rounded-[5px] border border-[#D9D9D9] mt-[24px] flex flex-col overflow-hidden shadow-sm">
        
        {/* Hero Image */}
        <div className="w-full h-[170px]">
          <img 
            src={movie?.banner}
            alt={movie.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info Area */}
        <div className="p-[20px] flex flex-col relative">
          <h3 className="text-[16px] font-bold text-text leading-[19px]">
            {movie.title}
          </h3>

          <div className="flex justify-between mt-[16px]">
            <div className="flex flex-col">
              <span className="text-[14px] font-medium text-text">{theatre.name}</span>
              <span className="text-[14px] font-medium text-text-muted mt-[4px]">{date}</span>
            </div>
            <div className="flex flex-col w-[120px]">
              <span className="text-[14px] font-medium text-text">Screen {screen} - {format}</span>
              <span className="text-[14px] font-medium text-text-muted mt-[4px]">{time}</span>
            </div>
          </div>

          <div className="flex justify-between mt-[16px]">
            <div className="flex flex-col gap-[6px]">
              <span className="text-[14px] font-medium text-text">Seats:</span>
              <div className="flex flex-wrap gap-[10px]">
                {seats.length > 0 ? seats.map((seat, index) => (
                  <div key={index} className="bg-[#64748B] px-[8px] py-[4px] rounded-[5px]">
                    <span className="text-[14px] font-semibold text-white leading-[17px]">{seat}</span>
                  </div>
                )) : (
                  <span className="text-[14px] text-text-muted">None</span>
                )}
              </div>
            </div>
            <div className="flex flex-col w-[120px]">
              <span className="text-[14px] font-medium text-text">Amount Paid:</span>
              <span className="text-[14px] font-medium text-text-muted mt-[4px]">₹{grandTotal}</span>
            </div>
          </div>

          <div className="mt-[40px] flex flex-col">
            <span className="text-[14px] font-normal text-text-muted">Transaction Date:</span>
            <span className="text-[14px] font-normal text-text-muted">{transactionDate}</span>
          </div>

          {/* QR Code */}
          <div className="absolute bottom-[20px] right-[20px] w-[80px] h-[80px]">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TICKET-${movie.title.replace(/\s+/g, '-')}`} 
              alt="QR Code" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      <p className="text-[14px] font-normal text-text-muted text-center mt-[24px] px-[34px]">
        You may view all purchased tickets in the ticket page.
      </p>

    </div>
  );
};

export default PaymentSuccess;
