import React from 'react';
import { RiStarFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMovie } from '../store/bookingSlice';

const MovieCard = ({ movie, fullWidth = false }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(
      setMovie(movie)
    );
    navigate(`/movie/${movie._id}`)
  }

  return (
    <div onClick={handleClick} className={`${fullWidth ? 'w-full' : 'w-[106px] shrink-0'} flex flex-col gap-[5px] cursor-pointer hover:opacity-95 transition-opacity`}>
      <div className={`relative ${fullWidth ? 'w-full aspect-[106/158]' : 'w-[106px] h-[158px]'}`}>
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover rounded-[5px]"
        />
        <div className="absolute bottom-0 right-0 w-[50.52px] h-[21.91px] bg-[#080325] rounded-tl-[5px] rounded-br-[5px] flex items-center justify-center gap-1">
          <RiStarFill className="text-[#F7F8FD] text-[11px]" />
          <span className="text-[#F7F8FD] text-[12px] font-semibold leading-[15px]">{movie.rating}</span>
        </div>
      </div>
      <div className="flex flex-col gap-[3px]">
        <h3 className="text-[14px] font-semibold text-[#454545] leading-[19px] line-clamp-2">
          {movie.title}
        </h3>
        <p className="text-[12px] font-normal text-[#454545] leading-[15px] line-clamp-1">
          {movie.genres?.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
