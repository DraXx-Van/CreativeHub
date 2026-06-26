import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { RiBuilding4Fill, RiCalendarEventLine } from "react-icons/ri";

import {
  setFormat,
  setScreen,
  setShowTime,
} from "../store/bookingSlice";

import { schedules } from "../data/schedules";

const ScheduleSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const bookingState = useSelector((state) => state.booking);

  const movie = bookingState?.movie;
  const theatre = bookingState?.theatre;
  const selectedDate = bookingState?.date;

  const theatreFormats = [
    ...new Set(
      theatre?.screens?.flatMap((screen) => screen.formats) || []
    ),
  ];

  const availableFormats = movie.formats.filter((format) =>
    theatreFormats.includes(format)
  );

  const [activeFormat, setActiveFormat] = useState(availableFormats[0]);

  const [activeScreen, setActiveScreen] = useState(null);
  const [activeTime, setActiveTime] = useState(null);

  const availableScreens = theatre.screens.filter((screen) =>
    screen.formats.includes(activeFormat)
  );

  const slots = schedules[activeFormat] || [];

  const handleFormatSelect = (format) => {
    setActiveFormat(format);

    setActiveScreen(null);
    setActiveTime(null);
  };

  const handleTimeSelect = (screen, time) => {
    setActiveScreen(screen.screenNumber);
    setActiveTime(time);
  };

  const handleProceed = () => {
    dispatch(setFormat(activeFormat));
    dispatch(setScreen(activeScreen));
    dispatch(setShowTime(activeTime));

    navigate(`/seats/${movie._id}`);
  };

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-bg relative pb-[100px]">
      {/* Hero */}
      <div className="relative w-full h-[173px]">
        <img
          className="w-full h-full object-cover"
          src={movie.banner}
          alt={movie.title}
        />

        <div className="absolute inset-0 bg-[#151130]/70 backdrop-blur-[0.5px]" />

        <div className="absolute top-[44px] px-[23px] w-full flex justify-between items-center z-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-[6px] text-bg"
          >
            <IoIosArrowBack size={20} />
            <span className="text-[14px] font-semibold">
              Back
            </span>
          </button>

          <button
            onClick={() => navigate("/")}
            className="text-[14px] font-semibold text-bg"
          >
            Cancel
          </button>
        </div>

        <div className="absolute top-[98px] px-[26px] z-10 w-full">
          <h1 className="text-[20px] font-bold text-bg">
            {movie.title}
          </h1>

          <div className="flex items-center gap-[18px] mt-[12px]">
            <div className="flex items-center gap-[6px]">
              <RiBuilding4Fill className="text-bg text-[14px]" />

              <span className="text-[14px] text-bg">
                {theatre.name}
              </span>
            </div>

            <div className="flex items-center gap-[6px]">
              <RiCalendarEventLine className="text-bg text-[14px]" />

              <span className="text-[14px] text-bg">
                {selectedDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-[26px] flex flex-col">
        <div className="w-full h-[8px] bg-gray-200 rounded-[24px] mt-[17px]">
          <div className="h-full w-[50%] bg-primary rounded-[8px]" />
        </div>

        <h2 className="text-[18px] font-bold text-text mt-[17px]">
          Choose Schedule
        </h2>

        {/* Format */}
        <div className="mt-[30px] flex items-center justify-between">
          <div className="flex items-center gap-[18px]">
            <span className="text-[14px] font-semibold text-text">
              Format
            </span>

            <div className="flex gap-[10px]">
              {availableFormats.map((format) => (
                <button
                  key={format}
                  onClick={() =>
                    handleFormatSelect(format)
                  }
                  className={`px-[10px] py-[8px] rounded-[5px] text-[12px] font-semibold border
                  ${
                    activeFormat === format
                      ? "bg-primary border-primary text-white"
                      : "bg-bg border-border text-primary"
                  }`}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>

          <span className="text-[14px] font-semibold text-text-muted">
            {`₹${theatre.minPrice} - ₹${theatre.maxPrice}`}
          </span>
        </div>
      </div>

      <hr className="mx-[24px] mt-[13px] border-t border-border" />

      {/* Screens */}
      <div className="px-[26px] mt-[19px] flex flex-col gap-[25px]">
        {availableScreens.map((screen) => (
          <div
            key={screen.screenNumber}
            className="flex flex-col gap-[12px]"
          >
            <h3 className="text-[14px] font-semibold text-text">
              Screen {screen.screenNumber}
            </h3>

            <div className="flex flex-wrap gap-[10px]">
              {slots.map((time) => (
                <button
                  key={time}
                  onClick={() =>
                    handleTimeSelect(screen, time)
                  }
                  className={`px-[10px] py-[8px] rounded-[5px] text-[12px] font-semibold border
                  ${
                    activeTime === time &&
                    activeScreen ===
                      screen.screenNumber
                      ? "bg-primary border-primary text-white"
                      : "bg-bg border-border text-primary"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="mt-[44px] px-[23px] flex justify-center mb-[20px]">
        <button
          disabled={!activeTime}
          onClick={handleProceed}
          className={`w-full h-[37px] rounded-[5px] flex items-center justify-center
          ${
            !activeTime
              ? "bg-primary opacity-50 cursor-not-allowed"
              : "bg-primary"
          }`}
        >
          <span className="text-[14px] font-semibold text-white">
            Get Tickets
          </span>
        </button>
      </div>
    </div>
  );
};

export default ScheduleSelection;