import React, { useRef } from "react";
import {
  BsSearch,
  BsChevronLeft,
  BsChevronRight,
  BsChevronUp,
  BsChevronDown,
} from "react-icons/bs";
import MoviesShowsToggle from "../components/MoviesShowsToggle";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import GlobalMovie from "../components/GlobalMovie";

const looper = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
const Discover = () => {
  const ottRef = useRef();
  const handelScroll = (direction) => {
    direction === "left" && ottRef.current.scrollBy(120, 0);
    direction === "right" && ottRef.current.scrollBy(-120, 0);
  };
  const options = ["Action", "Sci-Fi", "Crime"];
  const defaultOption = options[0];
  return (
    <div className="h-full pt-8 flex w-full flex-col">
      <MoviesShowsToggle />

      <div className="pl-8 p-8 h-full w-full overflow-scroll hideScrollBar">
        <div>
          <div className="flex justify-between pr-5">
            <span className="text-2xl select-none">
              Available OTT Platforms
            </span>
            <div className="flex">
              <div className="p-3 bg-white bg-opacity-60 text-black rounded-full mr-6">
                <BsChevronLeft
                  className="cursor-pointer"
                  onClick={() => {
                    handelScroll("left");
                  }}
                />
              </div>
              <div className="p-3 bg-white bg-opacity-60 text-black rounded-full">
                <BsChevronRight
                  className="cursor-pointer"
                  onClick={() => {
                    handelScroll("right");
                  }}
                />
              </div>
            </div>
          </div>
          <div
            className="flex overflow-x-auto hideScrollBar mt-4 select-none"
            ref={ottRef}
          >
            {looper.map((ott) => (
              <img
                src="https://image.tmdb.org/t/p/original/9A1JSVmSxsyaBK4SUFsYVqbAYfW.jpg"
                alt=""
                className="h-max w-max rounded-lg mr-3 border border-white"
              />
            ))}
          </div>
        </div>
        <div className="flex mt-12">
          <div className="flex items-center border-b-2 border-gray-500 w-3/12 p-0.5">
            <BsSearch className="text-xl mx-2 text-gray-500" />
            <input
              type="text"
              className="bg-transparent p-2 w-full focus:outline-none text-md"
              placeholder="Enter keywords"
            />
          </div>

          <div className="flex items-center border-b-2 border-gray-500 w-3/12  p-1 pl-3 ml-6">
            <Dropdown
              options={options}
              value={defaultOption}
              placeholder="Genre"
              className="w-full dropdownStyle"
              arrowClosed={<BsChevronDown />}
              arrowOpen={<BsChevronUp />}
            />
          </div>
          <button className="h-12 ml-6 bg-proj-red rounded-lg text-lg h-max px-6 font-semibold">
            Search
          </button>
        </div>
        <div className="flex flex-wrap mt-12 justify-between pr-8">
          {looper.map((item) => (
            <GlobalMovie buttons />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;
