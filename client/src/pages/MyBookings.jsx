import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { RiHome5Line, RiTicketLine, RiHeartLine, RiUserLine } from "react-icons/ri";

const MyBookings = () => {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  
  const [activeTab, setActiveTab] = useState("my-bookings");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!authState?.user?.token) {
        navigate('/auth');
        return;
      }
      
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_URL}/api/bookings/my`, {
          headers: {
            Authorization: `Bearer ${authState.user.token}`
          }
        });
        const data = await res.json();
        if (data.success) {
          setBookings(data.bookings);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [authState, navigate]);

  const handleCancel = async (id) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/bookings/${id}/cancel`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authState.user.token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        // Update local state to show it's cancelled
        setBookings(bookings.map(b => b._id === id ? { ...b, bookingStatus: "cancelled" } : b));
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Failed to cancel booking");
    }
  };

  const activeBookings = bookings.filter(b => b.bookingStatus === "active");
  const pastBookings = bookings.filter(b => b.bookingStatus === "cancelled");
  
  const displayBookings = activeTab === "my-bookings" ? activeBookings : pastBookings;

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-bg relative pb-[100px] flex flex-col">
      {/* Top Header Section */}
      <div className="px-[23px] pt-[28px]">
        {/* Navigation Bar */}
        <div className="flex items-center w-full mb-[24px]">
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

        {/* Tabs */}
        <div className="flex gap-[20px] border-b-[2px] border-transparent relative">
          <button 
            onClick={() => setActiveTab("my-bookings")}
            className={`pb-[5px] text-[12px] font-bold leading-[15px] ${activeTab === "my-bookings" ? 'text-primary' : 'text-[#64748B]'}`}
          >
            My Bookings
          </button>
          <button 
            onClick={() => setActiveTab("past")}
            className={`pb-[5px] text-[12px] font-bold leading-[15px] ${activeTab === "past" ? 'text-primary' : 'text-[#64748B]'}`}
          >
            Past Bookings
          </button>
          
          {/* Active indicator line */}
          <div 
            className="absolute bottom-[-2px] h-[2px] bg-primary transition-all duration-300"
            style={{ 
              left: activeTab === "my-bookings" ? '0px' : '96px', 
              width: activeTab === "my-bookings" ? '76px' : '84px' 
            }}
          />
        </div>
      </div>

      {/* Bookings List */}
      <div className="flex flex-col items-center mt-[20px] px-[26px] gap-[20px]">
        {loading ? (
          <p className="text-center mt-10 text-text-muted font-medium">Fetching secure tickets...</p>
        ) : displayBookings.length === 0 ? (
          <p className="text-center mt-10 text-text-muted font-medium">No {activeTab === "past" ? "past" : "active"} bookings found.</p>
        ) : (
          displayBookings.map((booking) => (
            <div key={booking._id} className="w-[337px] rounded-[5px] overflow-hidden flex flex-col relative shadow-sm border border-[#D9D9D9]">
              
              {/* Hero Image */}
              <div className="w-full h-[168px] relative">
                <img 
                  src={booking.movie?.banner || "https://via.placeholder.com/400x200"} 
                  alt="Movie" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details Section */}
              <div className="w-full bg-white p-[18px] relative">
                <h3 className="text-[16px] font-bold text-[#121212] leading-[19px] mb-[12px]">
                  {booking.movie?.title}
                </h3>

                <div className="flex justify-between mb-[16px]">
                  <div className="flex flex-col gap-[4px] w-[50%]">
                    <span className="text-[14px] font-medium text-[#121212]">{booking.theatre?.name}</span>
                    <span className="text-[14px] font-medium text-[#64748B]">{booking.showDate}</span>
                  </div>
                  <div className="flex flex-col gap-[4px] w-[50%]">
                    <span className="text-[14px] font-medium text-[#121212]">Screen {booking.screenNumber} - {booking.format}</span>
                    <span className="text-[14px] font-medium text-[#64748B]">{booking.showTime}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-[24px]">
                  <div className="flex flex-col w-[50%]">
                    <span className="text-[14px] font-medium text-[#121212] mb-[8px]">Seats:</span>
                    <div className="flex flex-wrap gap-[6px]">
                      {booking.seats.map(seat => (
                        <div key={seat} className="bg-[#64748B] rounded-[5px] px-[8px] py-[4px] flex items-center justify-center">
                          <span className="text-[14px] font-semibold text-white">{seat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col w-[50%]">
                    <span className="text-[14px] font-medium text-[#121212]">Amount Paid:</span>
                    <span className="text-[14px] font-medium text-[#64748B]">₹{booking.totalPrice}</span>
                  </div>
                </div>

                {/* QR and Cancel Button Area */}
                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    {booking.bookingStatus === "active" ? (
                      <button 
                        onClick={() => handleCancel(booking._id)}
                        className="w-[111px] h-[31px] bg-[#F7F8FD] border border-[#CED6E0] rounded-[5px] flex items-center justify-center mb-[12px] transition-colors hover:bg-gray-100"
                      >
                        <span className="text-[12px] font-semibold text-[#ED183E]">Cancel Booking</span>
                      </button>
                    ) : (
                      <div className="w-[111px] h-[31px] bg-[#F7F8FD] border border-[#CED6E0] rounded-[5px] flex items-center justify-center mb-[12px]">
                        <span className="text-[12px] font-semibold text-[#64748B]">Cancelled</span>
                      </div>
                    )}
                    
                    <span className="text-[12px] text-[#64748B] max-w-[140px] leading-[15px]">
                      Transaction Date:<br/>
                      {new Date(booking.createdAt).toLocaleString()}
                    </span>
                  </div>

                  {/* Mock QR Code */}
                  <div className="w-[84px] h-[84px] bg-white p-1">
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=CreativeUpaay_${booking._id}`} alt="QR" className="w-full h-full object-contain" />
                  </div>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 w-full max-w-[390px] h-[73px] bg-white flex justify-between items-start px-[52px] pt-[12px] z-50">
        <button onClick={() => navigate("/")} className="flex flex-col items-center gap-[4px] text-[#94A3B8] hover:text-primary transition-colors">
          <RiHome5Line size={24} />
        </button>
        <button onClick={() => navigate("/my-bookings")} className="flex flex-col items-center gap-[4px] text-primary transition-colors">
          <RiTicketLine size={24} />
        </button>
        <button className="flex flex-col items-center gap-[4px] text-[#94A3B8] hover:text-primary transition-colors">
          <RiHeartLine size={24} />
        </button>
        <button className="flex flex-col items-center gap-[4px] text-[#94A3B8] hover:text-primary transition-colors">
          <RiUserLine size={24} />
        </button>
      </div>

    </div>
  );
};

export default MyBookings;