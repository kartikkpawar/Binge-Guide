import React from "react";

import { useNavigate } from "react-router";

const RecommendeMovies = ({ image, name, type, id }) => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    if (type) {
      return navigate(`/tv-detail/${id}/1`);
    }
    return navigate(`/movie-detail/${id}`);
  };

  return (
    <div
      onClick={onClickHandler}
      className="cursor-pointer mt-2 xl:mt-0 overflow-y-hidden flex-shrink-0"
    >
      <div className="h-36 xl:h-52 2xl:h-60 w-24 xl:w-36 2xl:w-44 mr-3 relative group">
        <img
          src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${image}`}
          alt={name}
          className="h-full w-full rounded-lg"
        />
        <div className="absolute bg-black-background bg-opacity-50 h-full w-full top-0 left-0 p-3 flex flex-col opacity-0	 group-hover:opacity-100">
          <span className="text-lg font-semibold text-proj-red">
            {type ? "Tv Show" : "Movie"}
          </span>
          <span className="text-base xl:text-lg font-md">{name}</span>
        </div>
      </div>
    </div>
  );
};

export default RecommendeMovies;
