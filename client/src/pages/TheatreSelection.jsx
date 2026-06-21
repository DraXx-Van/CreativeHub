import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { getTheatres } from '../services/theatreService';
import TheatreCard from '../components/TheatreCard';
import { useDispatch, useSelector } from 'react-redux';
import { setDate, setTheatre } from '../store/bookingSlice';

const TheatreSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movie = useSelector(state => state.booking.movie);
  const [theatres, setTheatres] = useState([]);

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);

    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate(),
      fullDate: date,
    };
  });

  const [activeDate, setActiveDate] = useState(dates[0]);

  useEffect(() => {
    async function loadTheatres() {
      const theatres = await getTheatres();
      setTheatres(theatres);
    }
    loadTheatres();
    dispatch(setDate(dates[0].fullDate.toLocaleDateString()));
  }, []);

  const handleDateSelect = (date) => {
    setActiveDate(date);
    dispatch(setDate(date.fullDate.toLocaleDateString()));
  }

  const handleTheatreSelect = (theatre) => {
    navigate(`/schedule/${movie._id}`);
    dispatch(setTheatre(theatre));
  }

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-bg relative pb-[100px]">
      {/* Hero Image / Header */}
      <div className="relative w-full h-[173px]">
        {/* Placeholder background representing movie banner */}
        <img
          className="w-full h-full object-cover"
          src={movie.banner}
        />
        {/* Blur overlay */}
        <div className="absolute inset-0 bg-[#151130]/70 backdrop-blur-[0.5px]"></div>

        {/* Top bar (Back / Cancel) */}
        <div className="absolute top-[44px] px-[23px] w-full flex justify-between items-center z-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-[6px] text-bg hover:opacity-80 transition-opacity">
            <IoIosArrowBack size={20} />
            <span className="text-[14px] font-semibold leading-[17px]">Back</span>
          </button>
          <button onClick={() => navigate('/')} className="text-[14px] font-semibold text-bg leading-[17px] hover:opacity-80 transition-opacity">
            Cancel
          </button>
        </div>

        {/* Movie Info */}
        <div className="absolute top-[98px] px-[26px] z-10">
          <h1 className="text-[20px] font-bold text-bg leading-[27px]">
            {movie.title}
          </h1>
          <p className="text-[14px] font-normal text-bg leading-[17px] mt-[4px]">
            {movie.genres.join(",")}
          </p>
        </div>
      </div>

      {/* Main Content Group */}
      <div className="px-[26px]">
        {/* Progress Bar */}
        <div className="w-full h-[8px] bg-gray-200 rounded-[24px] mt-[18px]">
          <div className="h-full w-[25%] bg-primary rounded-[8px]"></div>
        </div>

        {/* Page Title */}
        <h2 className="text-[18px] font-bold text-text leading-[22px] mt-[17px]">
          Select Movie Theatre
        </h2>

        {/* Dates Row */}
        <div className="mt-[18px] flex px-2 justify-between overflow-x-auto scrollbar-hide pb-[4px]">
          {dates.map((d, i) => {
            const isActive = activeDate.date === d.date; // Mocking the first date as active
            return (
              <div onClick={() => handleDateSelect(d)} key={i} className="flex flex-col items-center gap-[6px] shrink-0 cursor-pointer">
                <span className={`text-[12px] font-semibold uppercase leading-[15px] transition-colors ${isActive ? 'text-primary' : 'text-text-muted'}`}>
                  {d.day}
                </span>
                <div className={`w-[27px] h-[26px] flex items-center justify-center rounded-[5px] border transition-colors ${isActive ? 'bg-primary border-primary' : 'bg-bg border-border'}`}>
                  <span className={`text-[14px] font-semibold leading-[17px] ${isActive ? 'text-bg' : 'text-text-muted'}`}>
                    {d.date}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Separator Line */}
      <hr className="mx-[23px] mt-[29px] border-t border-border" />

      <div className="mt-[28px] px-[18px] flex flex-col gap-[8px]">
        {theatres.map((theatre) => (
          <TheatreCard key={theatre._id} theatre={theatre} onSelect={() => { handleTheatreSelect(theatre) }}
          />
        ))}
      </div>
    </div>
  );
};

export default TheatreSelection;