import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RiStarFill, RiHeartLine, RiHeartFill } from "react-icons/ri";
import { getMovieById } from "../services/movieService";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "../store/wishlistSlice";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedMovie = useSelector( (state) => state.booking.movie);
  const wishlist = useSelector((state) => state.wishlist.movies);
  const movie = selectedMovie;
 
  if (!movie) return <div className="w-full min-h-screen bg-bg">Movie Not Found</div>;

  const isWishlisted = wishlist.some((m) => m._id === movie._id);

  const handleWishlistToggle = () => {
    dispatch(toggleWishlist(movie));
  };

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-bg relative pb-[100px]">
      {/* Hero Image */}
      <div className="relative w-full h-[196px]">
        <img
          src={movie.banner || movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 via-transparent to-transparent"></div>
        
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-[21px] left-[32px] text-[14px] font-semibold text-bg z-10"
        >
          Close
        </button>
        
        <button 
          onClick={handleWishlistToggle} 
          className="absolute top-[21px] right-[32px] z-10 transition-colors"
        >
          {isWishlisted ? (
            <RiHeartFill size={24} className="text-[#ED183E]" />
          ) : (
            <RiHeartLine size={24} className="text-bg" />
          )}
        </button>
      </div>

      <div className="px-[26px] mt-[17px]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[18px]">
            <h1 className="text-[16px] font-semibold text-text leading-[21px] w-[172px] shrink-0">
              {movie.title}
            </h1>
            <div className="px-[4px] border flex items-center border-[#2F81CD] rounded-[5px] shrink-0 mt-[1px]">
              <span className="text-[12px] font-normal text-[#2F81CD] leading-[15px]">
                {movie.ageRating}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-[4px] mt-[2px] shrink-0">
            <RiStarFill className="text-[#080325] text-[14px]" />
            <span className="text-[14px] font-normal text-[#080325] leading-[17px]">
              {movie.rating}
            </span>
          </div>
        </div>

        <p className="text-[14px] font-normal text-text-muted leading-[17px] mt-[4px]">
          {movie.genres?.join(", ")}
        </p>

        <p className="text-[14px] font-normal text-text-muted leading-[21px] mt-[18px]">
          {movie.description}
        </p>

        {/* Format Available */}
        <div className="mt-[22px]">
          <h2 className="section-title leading-[19px]">
            Format Available
          </h2>
          <div className="flex gap-[10px] mt-[12px]">
            {movie.formats.map(format => (
              <div key={format} className="px-[10px] py-[8px] bg-bg border border-border rounded-[5px]">
                <span className="text-[12px] font-semibold text-primary leading-[15px]">{format}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Release Date */}
        <div className="mt-[28px]">
          <h2 className="section-title leading-[19px]">
            Release Date
          </h2>
          <p className="text-[14px] font-normal text-text-muted leading-[21px] mt-[8px]">
            {new Date(movie.releaseDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Cast */}
        <div className="mt-[28px]">
          <h2 className="section-title leading-[19px]">
            Cast
          </h2>
          <div className="flex gap-[9px] overflow-x-auto mt-[15px] pb-[4px] scrollbar-hide">
            {movie.cast && movie.cast.length > 0 ? movie.cast.map((actor, idx) => (
              <div key={idx} className="flex gap-2.25 items-center shrink-0 w-[140px]">
                <img 
                  src={actor.image} 
                  alt={actor.name}
                  className="w-13 h-13 rounded-[5px] object-cover bg-gray-200 shrink-0"
                />
                <div className="flex flex-col justify-center gap-1 w-19.75">
                  <h3 className="text-[14px] font-normal text-text leading-4.25 wrap-break-word line-clamp-2">
                    {actor.name}
                  </h3>
                  {actor.character && (
                    <p className="text-[12px] font-normal text-text-muted leading-3.75 wrap-break-word line-clamp-2">
                      {actor.character}
                    </p>
                  )}
                </div>
              </div>
            ))
          : "No Cast Available"
          }
          </div>
        </div>

        {/* Get Tickets Button */}
        <div className="mt-[44px] flex justify-center mb-[20px]">
          <button 
            onClick={() => navigate(`/theatres/${movie._id}`)}
            className="w-[345px] h-[37px] bg-primary rounded-[5px] flex items-center justify-center"
          >
            <span className="text-[14px] font-semibold text-white leading-4.25">
              Get Tickets
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;