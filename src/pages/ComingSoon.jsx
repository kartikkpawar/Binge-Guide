import React from "react";
import { useUpComingMediaQuery } from "../app/mediaApi";
import GlobalMovie from "../components/GlobalMovie";
import Loader from "react-loader-spinner";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";

const ComingSoon = () => {
  const { data, isLoading } = useUpComingMediaQuery({
    type: "movie",
  });
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
                  name={show.title}
                  date={moment(show.release_date).format("ll")}
                  image={show.poster_path}
                  buttons
                  func_notify={(msg) => notify(msg)}
                />
              )
          )
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ComingSoon;
