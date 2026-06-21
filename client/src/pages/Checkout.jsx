import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const bookingState = useSelector((state) => state.booking);
  const authState = useSelector((state) => state.auth);
  
  // Data for Summary
  const numTickets = bookingState?.seats?.length || 2;
  const totalPrice = bookingState?.totalPrice || 560;
  const bookingFee = 20;
  const grandTotal = totalPrice + bookingFee;

  // Form states
  const [paymentMethod, setPaymentMethod] = useState("card"); // 'card' | 'wallet'
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [saveDetails, setSaveDetails] = useState(false);
  
  // Validation / Loading states
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Simple validation logic
  const validateForm = () => {
    let newErrors = {};
    if (paymentMethod === "card") {
      if (!nameOnCard.trim()) newErrors.name = "Name is required";
      if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) newErrors.card = "Card must be 16 digits";
      if (!/^\d{2}\/\d{2}$/.test(expiry)) newErrors.expiry = "Use MM/YY format";
      if (!/^\d{3,4}$/.test(cvc)) newErrors.cvc = "Invalid CVC";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    let parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/bookings/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState?.user?.token}`,
        },
        body: JSON.stringify({
          movie: bookingState.movie?._id,
          theatre: bookingState.theatre?._id,
          screenNumber: bookingState.screen || 1,
          showDate: bookingState.date,
          showTime: bookingState.showTime,
          format: bookingState.format || "2D",
          seats: bookingState.seats,
          totalPrice: grandTotal,
          paymentStatus: "paid",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsProcessing(false);
        navigate('/payment-success');
      } else {
        setIsProcessing(false);
        console.error("Booking Error:", data.message);
        alert(`Booking Failed: ${data.message}`);
        setShowErrorModal(true);
      }
    } catch (error) {
      setIsProcessing(false);
      console.error(error);
      alert("Network error: failed to create booking");
      setShowErrorModal(true);
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
          <div className="h-full w-full bg-primary rounded-[8px]"></div>
        </div>

        {/* Title */}
        <h1 className="text-[18px] font-bold text-text leading-[22px] mt-[20px]">
          Checkout
        </h1>
      </div>

      {/* Main Content Area */}
      <div className="px-[26px] mt-[20px] flex flex-col">
        
        {/* Summary Breakdown */}
        <h2 className="text-[16px] font-bold text-text leading-[19px] mb-[17px]">Summary</h2>
        
        <div className="flex flex-col gap-[6px]">
          <div className="flex justify-between items-center">
            <span className="text-[14px] font-normal text-text">{numTickets}x Tickets</span>
            <span className="text-[14px] font-normal text-text">₹{totalPrice}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[14px] font-normal text-text">Booking Fee</span>
            <span className="text-[14px] font-normal text-text">₹{bookingFee}</span>
          </div>

          <hr className="w-full border-t border-[#D9D9D9] mt-[9px] mb-[9px]" />

          <div className="flex justify-between items-center">
            <span className="text-[16px] font-bold text-text">Total</span>
            <span className="text-[16px] font-bold text-text">₹{grandTotal}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <h2 className="text-[16px] font-bold text-text leading-[19px] mt-[38px] mb-[20px]">
          Choose payment method
        </h2>

        <div className="flex items-center gap-[46px] mb-[25px]">
          {/* Credit Card Radio */}
          <label className="flex items-center gap-[12px] cursor-pointer">
            <div className={`w-[22px] h-[22px] rounded-full border-[2px] border-primary flex items-center justify-center bg-white`}>
              {paymentMethod === "card" && <div className="w-[12px] h-[12px] rounded-full bg-primary"></div>}
            </div>
            <input 
              type="radio" 
              name="payment" 
              value="card" 
              className="hidden"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            <span className="text-[14px] font-normal text-black leading-[17px]">Credit/Debit Card</span>
          </label>

          {/* Wallet Radio */}
          <label className="flex items-center gap-[12px] cursor-pointer">
            <div className={`w-[22px] h-[22px] rounded-full border-[2px] border-primary flex items-center justify-center bg-white`}>
              {paymentMethod === "wallet" && <div className="w-[12px] h-[12px] rounded-full bg-primary"></div>}
            </div>
            <input 
              type="radio" 
              name="payment" 
              value="wallet" 
              className="hidden"
              checked={paymentMethod === "wallet"}
              onChange={() => setPaymentMethod("wallet")}
            />
            <span className="text-[14px] font-normal text-black leading-[17px]">Mobile Wallet</span>
          </label>
        </div>

        {/* Payment Form Fields */}
        {paymentMethod === "card" && (
          <div className="flex flex-col gap-[18px]">
            {/* Name */}
            <div className="flex flex-col gap-[12px]">
              <label className="text-[14px] font-normal text-black leading-[17px]">Name on card</label>
              <input 
                type="text"
                placeholder="Name on card"
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
                className={`w-full h-[37px] rounded-[5px] border ${errors.name ? 'border-red-500' : 'border-[#CED6E0]'} bg-white px-[16px] text-[14px] text-text outline-none focus:border-primary`}
              />
              {errors.name && <span className="text-[12px] text-red-500 mt-[-8px]">{errors.name}</span>}
            </div>

            {/* Card Number */}
            <div className="flex flex-col gap-[12px]">
              <label className="text-[14px] font-normal text-black leading-[17px]">Card number</label>
              <input 
                type="text"
                maxLength={19}
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                className={`w-full h-[37px] rounded-[5px] border ${errors.card ? 'border-red-500' : 'border-[#CED6E0]'} bg-white px-[16px] text-[14px] text-text outline-none focus:border-primary`}
              />
              {errors.card && <span className="text-[12px] text-red-500 mt-[-8px]">{errors.card}</span>}
            </div>

            {/* Expiry & CVC row */}
            <div className="flex items-center gap-[18px]">
              <div className="flex flex-col gap-[12px] w-[149px]">
                <label className="text-[14px] font-normal text-black leading-[17px]">Expiry date</label>
                <input 
                  type="text"
                  maxLength={5}
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  className={`w-full h-[37px] rounded-[5px] border ${errors.expiry ? 'border-red-500' : 'border-[#CED6E0]'} bg-white px-[16px] text-[14px] text-text outline-none focus:border-primary`}
                />
                {errors.expiry && <span className="text-[12px] text-red-500 mt-[-8px]">{errors.expiry}</span>}
              </div>

              <div className="flex flex-col gap-[12px] w-[166px]">
                <label className="text-[14px] font-normal text-black leading-[17px]">CVC/CVV</label>
                <input 
                  type="password"
                  maxLength={4}
                  placeholder="CVC"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, ''))}
                  className={`w-full h-[37px] rounded-[5px] border ${errors.cvc ? 'border-red-500' : 'border-[#CED6E0]'} bg-white px-[16px] text-[14px] text-text outline-none focus:border-primary`}
                />
                {errors.cvc && <span className="text-[12px] text-red-500 mt-[-8px]">{errors.cvc}</span>}
              </div>
            </div>

            {/* Save Details Checkbox */}
            <label className="flex items-center gap-[6px] mt-[10px] cursor-pointer">
              <div className={`w-[21px] h-[20px] rounded-[5px] border-[2px] border-primary flex items-center justify-center ${saveDetails ? 'bg-primary' : 'bg-transparent'}`}>
                {saveDetails && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <input 
                type="checkbox"
                className="hidden"
                checked={saveDetails}
                onChange={() => setSaveDetails(!saveDetails)}
              />
              <span className="text-[14px] font-normal text-black leading-[17px]">
                Save payment details for the next purchase
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Fixed Bottom Section */}
      <div className="mt-[30px] px-[28px] flex justify-center mb-[20px]">
        <button 
          onClick={handlePayment}
          disabled={isProcessing}
          className={`w-[334px] h-[37px] bg-primary rounded-[5px] flex items-center justify-center transition-opacity ${isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`}
        >
          <span className="text-[14px] font-semibold text-white leading-[17px]">
            {isProcessing ? "Processing..." : "Complete Payment"}
          </span>
        </button>
      </div>

      {/* Error Modal Overlay */}
      {showErrorModal && (
        <div className="absolute inset-0 bg-black/40 z-50 flex items-center justify-center px-[26px]">
          <div className="bg-white w-full rounded-[10px] p-[24px] flex flex-col items-center">
            <div className="w-[50px] h-[50px] rounded-full bg-red-100 flex items-center justify-center mb-[16px]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </div>
            <h3 className="text-[18px] font-bold text-text mb-[8px]">Payment Failed</h3>
            <p className="text-[14px] text-text-muted text-center mb-[24px]">
              We couldn't process your payment. Please check your card details and try again.
            </p>
            <button 
              onClick={() => setShowErrorModal(false)}
              className="w-full h-[37px] bg-primary rounded-[5px] text-white font-semibold text-[14px]"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;