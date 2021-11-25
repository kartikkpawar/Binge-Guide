import React from "react";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineFavorite } from "react-icons/md";
import { CgRemoveR } from "react-icons/cg";
import { useNavigate } from "react-router";

const GlobalMovie = ({ buttons, remove, type, name, date, image, id }) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    if (type) {
      return navigate(`/tv-detail/${id}/1`);
    }
    return navigate(`/movie-detail/${id}`);
  };
  return (
    <div
      className="h-96 ml-6 mb-6 relative movieHoverContainer cursor-pointer"
      onClick={handleOnClick}
    >
      <img
        src={`https://image.tmdb.org/t/p/original${image}`}
        alt=""
        className="h-full w-full rounded-sm"
      />
      <div className="absolute top-0 bg-black bg-opacity-30 h-full w-full movieDetails">
        <div className="flex flex-col ml-2 mt-2">
          <span className="uppercase text-md font-semibold movieCategory">
            {type ? "Tv Show" : "Movie"}
          </span>
          <span className="text-xl font-normal -mt-1 movieName">{name}</span>{" "}
          <span className="text-lg font-thin movieDirector">
            Release Date: {date}
          </span>
        </div>
        {buttons && (
          <div className="h-full w-full -mt-3 moviesButton">
            {remove ? (
              <button className="bg-gray-500 bg-opacity-70  rounded-md text-md 2xl:text-lg h-10 2xl:h-12 w-max px-4 ml-3">
                <CgRemoveR />
              </button>
            ) : (
              <>
                <button className="bg-gray-500 bg-opacity-70  rounded-md text-md 2xl:text-lg h-10 2xl:h-12 w-max px-4 ml-3">
                  <MdOutlineFavorite className="" />
                </button>
                <button className="bg-gray-500 bg-opacity-70  rounded-md text-md 2xl:text-lg h-10 2xl:h-12 w-max px-4 ml-3">
                  <IoMdAdd />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalMovie;
