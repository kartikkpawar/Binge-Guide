import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeTab } from "../app/tabs";

const MoviesShowsToggle = () => {
  const [tvShows, setTvShows] = useState(true);
  const dispatch = useDispatch();

  const handelTabSwitch = () => {
    setTvShows(!tvShows);
    tvShows
      ? dispatch(changeTab({ tabName: "movies", currTab: "tvShows" }))
      : dispatch(changeTab({ tabName: "tvShows", currTab: "movies" }));
  };

  return (
    <div className="flex h-max pb-3">
      <span
        className={`ml-8 text-xl font-normal select-none cursor-pointer ${
          tvShows ? "text-white" : "text-gray-500"
        }`}
        onClick={handelTabSwitch}
      >
        Tv Shows
      </span>
      <span
        className={`ml-8 text-xl font-normal select-none cursor-pointer ${
          !tvShows ? "text-white" : "text-gray-500"
        }`}
        onClick={handelTabSwitch}
      >
        Movies
      </span>
    </div>
  );
};

export default MoviesShowsToggle;
