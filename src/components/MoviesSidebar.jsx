import React from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";

const MoviesSidebar = ({ image, name, gener }) => {
  return (
    <div className="h-24 2xl:h-28 flex w-full p-0.5 items-center mt-3">
      <img
        src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
        alt=""
        className="h-full rounded-lg"
      />
      <div className="flex flex-col ml-2 text-white h-full">
        <span className="font-light 2xl:font-normal text-md">
          Avengers Endgame
        </span>
        <span className="text-gray-500 font-light 2xl:font-normal">
          Sci-Fi, Action
        </span>
        <div className="h-full mt-1 flex items-center">
          <div className="h-8 w-8">
            <CircularProgressbarWithChildren
              value={77}
              background={false}
              styles={buildStyles({
                trailColor: "#080405",
                pathColor: "#e21717",
              })}
            >
              <span className="text-white font-bold text-sm">{77}</span>
            </CircularProgressbarWithChildren>
          </div>
          <div className="flex justify-center ml-3 flex-col">
            <span className="font-thin text-sm">35.4k Votes</span>
            <span className="font-thin text-sm">2015</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesSidebar;
