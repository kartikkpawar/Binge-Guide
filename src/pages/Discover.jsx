import React, { useRef } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import MoviesShowsToggle from "../components/MoviesShowsToggle";
import GlobalMovie from "../components/GlobalMovie";
import { useDiscoverMediaQuery, useOttListQuery } from "../app/mediaApi";
import { useSelector } from "react-redux";

import { toast, ToastContainer } from "react-toastify";

const Discover = () => {
  const tabs = useSelector((state) => state.tabs);

  const ottRef = useRef();
  const handelScroll = (direction) => {
    direction === "left" && ottRef.current.scrollBy(-120, 0);
    direction === "right" && ottRef.current.scrollBy(120, 0);
  };

  const { data: searchResults, isLoading: isSearchResultLoading } =
    useDiscoverMediaQuery({
      search: "",
      type: tabs.tvShows ? "tv" : "movie",
    });

  const { data: ottList, isLoading: isOttListLoading } = useOttListQuery(
    tabs.tvShows ? "tv" : "movie"
  );
  const notify = (msg) => {
    return toast.error(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

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
              <div className="p-3 border border-white text-white rounded-full mr-6">
                <BsChevronLeft
                  className="cursor-pointer"
                  onClick={() => {
                    handelScroll("left");
                  }}
                />
              </div>
              <div className="p-3 border border-white text-white rounded-full">
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
            {!isOttListLoading &&
              ottList.results.map(
                (ott) =>
                  ott.display_priority < 10 && (
                    <img
                      src={`https://image.tmdb.org/t/p/original${ott.logo_path}`}
                      alt={ott.provider_name}
                      className="h-max w-max rounded-lg mr-3"
                    />
                  )
              )}
          </div>
        </div>

        <div className="flex flex-wrap mt-12 justify-between pr-8">
          {!isSearchResultLoading &&
            searchResults?.results?.map((show) => (
              <GlobalMovie
                buttons
                type={tabs.tvShows}
                name={show.title || show.name}
                date={tabs.tvShows ? show.first_air_date : show.release_date}
                image={show.poster_path}
                id={show.id}
                func_notify={(msg) => notify(msg)}
              />
            ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Discover;
