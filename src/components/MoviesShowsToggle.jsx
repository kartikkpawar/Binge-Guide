import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeTab } from "../app/tabs";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const MoviesShowsToggle = () => {
  const [tvShows, setTvShows] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();

  const handelTabSwitch = () => {
    setTvShows(!tvShows);
    tvShows
      ? dispatch(changeTab({ tabName: "movies", currTab: "tvShows" }))
      : dispatch(changeTab({ tabName: "tvShows", currTab: "movies" }));
  };

  const navigate = useNavigate();
  const handleSearch = () => {
    const re = new RegExp(" ", "g");
    const str = searchInput.replace(re, "%20");
    navigate(`/search?search=${str}`);
  };

  return (
    <div className="flex h-max pb-3 items-center flex-col-reverse xl:flex-row">
      <div className="flex xl:w-1/2 w-full justify-center mt-5 xl:mt-0 xl:justify-start">
        <span
          className={`xl:ml-8 text-base xl:text-xl font-normal select-none cursor-pointer ${
            tvShows ? "text-white" : "text-gray-500"
          }`}
          onClick={handelTabSwitch}
        >
          Tv Shows
        </span>
        <span
          className={`ml-5 xl:ml-8  text-base xl:text-xl font-normal select-none cursor-pointer ${
            !tvShows ? "text-white" : "text-gray-500"
          }`}
          onClick={handelTabSwitch}
        >
          Movies
        </span>
      </div>

      <div className="flex items-center border-2 rounded-full border-gray-500 xl:w-1/2 w-full justify-center p-0.5">
        <BsSearch className="text-lg xl:text-xl mx-2 text-gray-500" />
        <input
          type="text"
          className="bg-transparent p-2 w-full focus:outline-none text-sm xl:text-md"
          placeholder="Search"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>
    </div>
  );
};

export default MoviesShowsToggle;
