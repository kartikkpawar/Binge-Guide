import React from "react";
import GlobalMovie from "../components/GlobalMovie";
import MoviesShowsToggle from "../components/MoviesShowsToggle";

const looper = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
const Watchlist = () => {
  return (
    <div className="h-full pt-8 flex w-full flex-col overflow-scroll hideScrollBar">
      <MoviesShowsToggle />
      <span className=" text-3xl uppercase ml-8 mt-8">Watchlist</span>

      <div className="flex w-full h-full flex-wrap mt-12 justify-around ">
        {looper.map((item) => (
          <GlobalMovie buttons remove />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
