import React from "react";
import { useSelector } from "react-redux";
import { useUpComingMediaQuery } from "../app/mediaApi";
import GlobalMovie from "../components/GlobalMovie";
import Loader from "react-loader-spinner";
import moment from "moment";

const ComingSoon = () => {
  const tabs = useSelector((state) => state.tabs);

  const { data, isLoading } = useUpComingMediaQuery({
    type: "movie",
  });
  console.log(data);
  return (
    <div className="h-full pt-8 flex w-full flex-col overflow-scroll hideScrollBar pr-8">
      <div className="flex w-full h-full flex-wrap mt-12 justify-between pr-8">
        {isLoading ? (
          <div className="flex justify-center items-center mb-5 h-full w-full">
            <Loader type="Circles" color="#00BFFF" height={50} />
          </div>
        ) : (
          data?.results?.map(
            (show) =>
              show.poster_path && (
                <GlobalMovie
                  key={show.id}
                  id={show.id}
                  type={false}
                  name={tabs.tvShows ? show.name : show.title}
                  date={moment(show.release_date).format("ll")}
                  image={show.poster_path}
                  buttons
                />
              )
          )
        )}
      </div>
    </div>
  );
};

export default ComingSoon;
