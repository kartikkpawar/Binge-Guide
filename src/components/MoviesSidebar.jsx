import React from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import moment from "moment";
import SimplifyNumber from "simplify-number";
import { useNavigate } from "react-router";

const MoviesSidebar = ({
  image,
  name,
  gener,
  votesAvg,
  votes,
  date,
  type,
  id,
}) => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    if (type) {
      return navigate(`/tv-detail/${id}`);
    }
    return navigate(`/movie-detail/${id}`);
  };
  return (
    <div
      className="h-24 2xl:h-28 flex w-full p-0.5 items-center mt-3 cursor-pointer"
      onClick={onClickHandler}
    >
      <img
        src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${image}`}
        alt=""
        className="h-full rounded-lg"
      />
      <div className="flex flex-col ml-2 text-white h-full">
        <span className="font-light 2xl:font-normal text-md">{name}</span>
        {/* <span className="text-gray-500 font-light 2xl:font-normal">
          Sci-Fi, Action
        </span> */}
        <div className="h-full mt-1 flex items-center">
          <div className="h-10 w-10">
            <CircularProgressbarWithChildren
              value={votesAvg * 10}
              background={false}
              styles={buildStyles({
                trailColor: "#080405",
                pathColor: "#e21717",
              })}
            >
              <span className="text-white font-bold text-xs">
                {Math.round(votesAvg * 10)}%
              </span>
            </CircularProgressbarWithChildren>
          </div>
          <div className="flex justify-center ml-3 flex-col">
            <span className="font-thin text-sm">
              {SimplifyNumber(votes)} Votes
            </span>
            <span className="font-thin text-sm">
              {moment(date).format("YYYY")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesSidebar;
