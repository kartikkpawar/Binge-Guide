import React from "react";
import { useNavigate } from "react-router";

const PopularArtist = ({ image, name, gender, id }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/actor-detail/${id}`)}
      className="cursor-pointer"
    >
      <div className="h-36 xl:h-52 2xl:h-60 w-24 xl:w-36 2xl:w-44 mr-3 relative group">
        <img
          src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${image}`}
          alt=""
          className="h-full w-full rounded-lg"
        />
        <div className="absolute bg-black-background bg-opacity-50 h-full w-full top-0 left-0 p-3 flex flex-col opacity-0	 group-hover:opacity-100">
          <span className="text-base xl:text-lg font-semibold text-proj-red">
            Actor
          </span>

          <span className="text-base xl:text-lg font-md">{name}</span>
          <span className="text-sm xl:text-md font-thin">
            {gender === 2 ? "Male" : "Female"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PopularArtist;
