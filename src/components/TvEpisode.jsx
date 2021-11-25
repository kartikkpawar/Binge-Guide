import React from "react";
import moment from "moment";

const TvEpisode = ({ name, date, overview, num, image }) => {
  function truncateString(str, num) {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }
  return (
    <div className="w-full h-36 mb-4 p-2 flex cursor-pointer bg-gray-900 bg-opacity-80 rounded-lg">
      <img
        src={`https://image.tmdb.org/t/p/original${image}`}
        alt=""
        className="h-full rounded-md"
      />
      <div className="pl-5 flex flex-col">
        <span className="text-white text-xl font-semibold">
          {num}. {name}
        </span>
        <span className="text-white text-sm font-thin">
          {moment(date).format("LL")}
        </span>
        <p className="text-white text-sm font-thin mt-3">
          {truncateString(overview, 250)}
        </p>
      </div>
    </div>
  );
};

export default TvEpisode;
