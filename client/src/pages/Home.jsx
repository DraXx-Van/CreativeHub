import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import MovieCard from "../components/MovieCard";
import TheatreCard from "../components/TheatreCard";
import { getMovies } from "../services/movieService";
import { getTheatres } from "../services/theatreService";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [activeTab, setActiveTab] = useState("now");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const movieData = await getMovies();
        const theatreData = await getTheatres();
        setMovies(movieData);
        setTheatres(theatreData);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const nowShowing = movies.filter((movie) => !movie.comingSoon);
  const comingSoon = movies.filter((movie) => movie.comingSoon);
  const displayedMovies = activeTab === "now" ? nowShowing : comingSoon;

  if (isLoading) {
    return (
      <div className="w-full max-w-[390px] min-h-screen bg-bg flex flex-col items-center justify-center pb-20">
        <div className="w-[40px] h-[40px] border-[4px] border-primary border-t-transparent rounded-full animate-spin mb-[16px]"></div>
        <h2 className="text-[16px] font-bold text-text text-center px-[26px]">
          Waking up the server...
        </h2>
        <p className="text-[14px] text-text-muted text-center mt-[8px] px-[40px]">
          Please wait while the Render free-tier backend spins up. This usually takes around 60 seconds!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-bg relative pb-20">
      {/* Hero Image */}
      <div className="relative w-full h-[220px]">
        {movies.length > 0 && (
          <img
            src={movies[1].banner}
            alt={movies[1].title}
            className="w-full h-full object-cover object-center"
          />
        )}
        <button className="absolute top-[39px] right-[22px] w-[28px] h-[28px] text-white flex items-center justify-center">
          <RiSearchLine size={28} />
        </button>
      </div>

      <div className="px-[26px] mt-[24px]">
        {/* Tabs */}
        <div className="flex justify-between items-center h-[20px]">
          <div className="flex gap-[21px] relative h-full">
            <button
              onClick={() => setActiveTab("now")}
              className={`text-[12px] font-bold ${activeTab === "now" ? "text-primary" : "text-text-muted"
                }`}
            >
              Now Showing
            </button>
            <button
              onClick={() => setActiveTab("coming")}
              className={`text-[12px] font-bold ${activeTab === "coming" ? "text-primary" : "text-text-muted"
                }`}
            >
              Coming Soon
            </button>
            {/* Active Tab Indicator */}
            <div
              className={`absolute bottom-[-5px] h-[2px] bg-primary transition-all duration-300 ${activeTab === "now" ? "left-0 w-[81px]" : "left-[102px] w-[79px]"
                }`}
            />
          </div>
          <button className="text-[12px] font-normal text-primary">
            View All
          </button>
        </div>

        {/* Movies Scroll */}
        <div className="flex gap-[9px] overflow-x-auto mt-[19px] pb-[4px] scrollbar-hide">
          {displayedMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>

        {/* Theatres Section */}
        <div className="mt-[29px]">
          <div className="flex justify-between items-center">
            <h2 className="section-title leading-[19px]">
              Movie Theatres
            </h2>
            <button className="text-[12px] font-normal text-primary">
              View All
            </button>
          </div>

          <div className="flex flex-col gap-[8px] mt-[19px]">
            {theatres.map((theatre) => (
              <TheatreCard key={theatre._id} theatre={theatre} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;