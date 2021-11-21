import React from "react";

const MoviesSidebar = ({ image, name, gener }) => {
  return (
    <div className="h-20 2xl:h-24 flex w-full p-0.5 items-center mt-3">
      <img
        src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
        alt=""
        className="h-full rounded-lg"
      />
      <div className="flex flex-col ml-2">
        <span className="font-light 2xl:font-normal text-md">
          Avengers Endgame
        </span>
        <span className="text-gray-500 font-light 2xl:font-normal">
          Sci-Fi, Action
        </span>
      </div>
    </div>
  );
};

export default MoviesSidebar;
