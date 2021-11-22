import React from "react";
import GlobalMovie from "../components/GlobalMovie";
import MoviesShowsToggle from "../components/MoviesShowsToggle";

const looper = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
const ComingSoon = () => {
  return (
    <div className="h-full pt-8 flex w-full flex-col overflow-scroll hideScrollBar pr-8">
      <MoviesShowsToggle />
      <div className="flex w-full h-full flex-wrap mt-12 justify-between pr-8">
        {looper.map((item) => (
          <GlobalMovie />
        ))}
      </div>
    </div>
  );
};

export default ComingSoon;
