import React from "react";
import moment from "moment";

const TvEpisode = () => {
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
        src="https://image.tmdb.org/t/p/original/zaVO5tSSSjgLLSXRBvDDCzyBqfX.jpg"
        alt=""
        className="h-full rounded-md"
      />
      <div className="pl-5 flex flex-col">
        <span className="text-white text-xl font-semibold">1. Pilot</span>
        <span className="text-white text-sm font-thin">
          {moment("2009-09-17").format("LL")}
        </span>
        <p className="text-white text-sm font-thin mt-3">
          {truncateString(
            `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam,
          facere suscipit. Magnam perspiciatis mollitia dolor quis quam ea
          deserunt maiores eos exercitationem eius tempora, fugit quo est autem
          cupiditate error esse voluptas natus totam quibusdam ipsa. Dolorum
          impedit modi sit quod quaerat totam voluptatibus eligendi. Consectetur
          doloremque, laborum molestias nam pariatur accusamus perspiciatis
          sint? Animi atque incidunt et. Fugit, maxime?`,
            250
          )}
        </p>
      </div>
    </div>
  );
};

export default TvEpisode;
