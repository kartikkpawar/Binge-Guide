import React from "react";
import { MdOutlineFavorite } from "react-icons/md";
import { BsEye } from "react-icons/bs";

const PopularShow = ({ name, url }) => {
  return (
    <div
      className="h-full p-4 w-11/12 rounded-3xl"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${url})`,
      }}
    >
      <div className="mt-28 2xl:mt-48 ml-12 bg-black w-max px-4 py-4 rounded-xl bg-opacity-60">
        <span className="uppercase text-2xl 2xl:text-4xl font-semibold">
          {name}
        </span>
        <div className="uppercase mt-3">
          <span className="font-normal text-sm 2xl:text-base text-gray-400 ">
            Action, Adventure, Sci-Fi
          </span>
          <span className="ml-2 text-gray-200">%98 Match</span>
        </div>

        <div className="mt-3 flex items-center">
          <button className="h-10 2xl:h-12 bg-proj-red rounded-md text-md 2xl:text-lg h-max w-max px-6 font-semibold ">
            Watchlist
          </button>
          <button className="bg-gray-500 bg-opacity-50  rounded-md text-md 2xl:text-lg h-10 2xl:h-12 w-max px-4 ml-3">
            <MdOutlineFavorite className="" />
          </button>
          <button className="bg-gray-500 bg-opacity-50  rounded-md text-md 2xl:text-lg h-10 2xl:h-12 w-max px-4 ml-3">
            <BsEye />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopularShow;
