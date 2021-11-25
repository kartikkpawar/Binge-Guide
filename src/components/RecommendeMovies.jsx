import React from "react";
import { useSelector } from "react-redux";
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
    <div onClick={onClickHandler} className="cursor-pointer">
      <div className="h-52 2xl:h-60 w-36 2xl:w-44 mr-3 relative group">
        <img
          src={`https://image.tmdb.org/t/p/original${image}`}
          alt={name}
          className="h-full w-full rounded-lg"
        />
        <div className="absolute bg-black-background bg-opacity-50 h-full w-full top-0 left-0 p-3 flex flex-col opacity-0	 group-hover:opacity-100">
          <span className="text-lg font-semibold text-proj-red">
            {type ? "Tv Show" : "Movie"}
          </span>
          <span className="text-lg font-thin">{name}</span>
        </div>
      </div>
    </div>
  );
};

export default RecommendeMovies;
