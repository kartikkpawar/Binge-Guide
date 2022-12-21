import React from "react";
import { useSelector } from "react-redux";
import { useFreeToWatchQuery } from "../app/mediaApi";
import GlobalMovie from "../components/GlobalMovie";
import MoviesShowsToggle from "../components/MoviesShowsToggle";
import Loader from "react-loader-spinner";

const FreeWatch = () => {
  const tabs = useSelector((state) => state.tabs);

  const { data, isLoading } = useFreeToWatchQuery({
    type: tabs.tvShows ? "tv" : "movie",
  });
  console.log(data);
  return (
    <div className="h-full pt-8 flex w-full flex-col overflow-scroll hideScrollBar xl:pr-8">
      <MoviesShowsToggle />
      <div className="flex w-full h-full flex-wrap mt-12  justify-around xl:justify-between pr-8">
        {isLoading ? (
          <div className="flex justify-center items-center mb-5 h-full w-full">
            <Loader type="Circles" color="#00BFFF" height={50} />
          </div>
        ) : (
          data.results.map(
            (show) =>
              show.poster_path && (
                <GlobalMovie
                  key={show.id}
                  id={show.id}
                  type={tabs.tvShows}
                  name={tabs.tvShows ? show.name : show.title}
                  date={tabs.tvShows ? show.first_air_date : show.release_date}
                  image={show.poster_path}
                />
              )
          )
        )}
      </div>
    </div>
  );
};

export default FreeWatch;
