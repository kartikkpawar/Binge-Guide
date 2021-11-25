import React, { useState } from "react";
import { videosData } from "../trailerData";
import { IoMdArrowBack } from "react-icons/io";
import { BsFillPlayFill } from "react-icons/bs";
import { AiTwotoneHeart } from "react-icons/ai";
import { FaShareAlt } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SimplifyNumber from "simplify-number";
import moment from "moment";
import humanizeDuration from "humanize-duration";
import MoviesSidebar from "../components/MoviesSidebar";
import Modal from "@mui/material/Modal";
import { useNavigate, useParams } from "react-router";
import {
  useMediaCastQuery,
  useMediaDetailsQuery,
  useMediaVideosQuery,
  useMediaWatchProvidersQuery,
  useSimilarMediaQuery,
} from "../app/mediaApi";

const MovieDetails = () => {
  const recommendationMessage = (vote) => {
    if (vote * 10 > 70) {
      return (
        <span className="text-white text-md font-medium">
          Our Users Are Recommending It
        </span>
      );
    }
    return (
      <span className="text-white text-md font-medium">You Might Love It</span>
    );
  };
  const shortEnglishHumanizer = humanizeDuration.humanizer({
    language: "shortEn",
    languages: {
      shortEn: {
        h: () => "h",
        m: () => "min",
        s: () => "s",
      },
    },
  });
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const { data: details, isLoading: isDetailsLoading } = useMediaDetailsQuery({
    type: "movie",
    id: params.id,
  });
  const { data: watchProviders, isLoading: isWatchProvidersLoading } =
    useMediaWatchProvidersQuery({ type: "movie", id: params.id });
  const { data: cast, isLoading: isCastLoading } = useMediaCastQuery({
    type: "movie",
    id: params.id,
  });
  const { data: similarMedia, isLoading: isSimilarMediaLoading } =
    useSimilarMediaQuery({
      type: "movie",
      id: params.id,
    });
  const { data: moviesVideos, isLoading: isMoviesVideosLoading } =
    useMediaVideosQuery({
      type: "movie",
      id: params.id,
    });
  const Trailer =
    !isMoviesVideosLoading &&
    moviesVideos.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

  return (
    !isDetailsLoading && (
      <div className="bg-black-background h-screen w-full overflow-scroll hideScrollBar">
        <div
          className="h-4/6 rounded-bl-3xl rounded-br-3xl p-8 bg-cover bg-center"
          style={{
            background: `linear-gradient(180deg, rgba(255,255,255,0.50) 0%, rgba(212,212,220,0) 0%, rgba(0,0,0,0.8) 91%), url(https://image.tmdb.org/t/p/original${details.backdrop_path})`,
          }}
        >
          <div className="flex items-center">
            <div
              className="p-3 bg-white bg-opacity-60 text-black rounded-full mr-6 w-max"
              onClick={() => navigate("/")}
            >
              <IoMdArrowBack className="cursor-pointer text-2xl" />
            </div>
            <div className="flex items-center justify-between w-full">
              <span className="text-white text-2xl font-medium">
                {details.title}
              </span>
              <div className=" py-2 bg-white bg-opacity-30 text-black rounded-full mr-6 w-max px-5">
                <span className="text-white text-xl font-medium">Movies</span>
              </div>
            </div>
          </div>
          <div className="h-full flex items-end pb-8 ">
            <div className="w-7/12 flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-20 w-20">
                  <CircularProgressbarWithChildren
                    value={details.vote_average * 10}
                    background={false}
                    styles={buildStyles({
                      trailColor: "#080405",
                      pathColor: "#e21717",
                    })}
                  >
                    <span className="text-white font-bold text-xl">
                      {details.vote_average}
                    </span>
                  </CircularProgressbarWithChildren>
                </div>
                <div className="ml-3 flex flex-col">
                  <span className="text-white text-lg font-semibold uppercase">
                    {SimplifyNumber(details.vote_count)} Votes
                  </span>
                  {recommendationMessage(details.vote_average)}
                </div>
              </div>
              <div
                className=" group hover:bg-white flex items-center border rounded-full border-white w-52 h-12 justify-center px-10 text-proj-red cursor-pointer select-none text-xl"
                onClick={() => setModalOpen(true)}
              >
                <BsFillPlayFill className="text-2xl" />
                <span className="ml-3 text-white font-semibold group-hover:text-proj-red">
                  Trailer
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-12 h-full bg-black-background flex px-8">
          <div className="w-1/5 flex flex-col h-full items-center">
            <div className="h-96 mr-3">
              <img
                src={`https://image.tmdb.org/t/p/original${details.poster_path}`}
                alt=""
                className="h-full rounded-md"
              />
            </div>
            <div className="w-72 mt-8 flex flex-col">
              <span className="text-white text-4xl">
                {moment(details.release_date).format("YYYY")}
              </span>{" "}
              <span className="text-white text-4xl mt-1 uppercase">
                {shortEnglishHumanizer(details.runtime * 1000 * 60)}
              </span>
            </div>
            <div className="w-72 mt-8">
              <span className="text-white text-4xl mt-1 uppercase font-thin">
                Available On
              </span>
              {!isWatchProvidersLoading && (
                <div className="flex mt-3 flex-wrap">
                  {watchProviders.results["US"].buy.map((provider) => (
                    <img
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name}
                      className="h-16 mr-4 rounded-md mb-3"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="w-3/5 px-5">
            <span className="text-white text-4xl font-semibold">
              {details.title}
            </span>
            <div className="flex mt-5 flex-wrap">
              {details.genres.map((genre) => (
                <div className="flex items-center border rounded-full mb-3  border-red-300 w-40 px-3 h-10 justify-center text-white select-none text-md mr-3 font-semibold">
                  <span className="text-red-300">{genre.name}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center">
              <div
                className="group flex items-center rounded-full  w-52 h-16 justify-center px-10 text-white hover:text-proj-red hover:bg-white cursor-pointer select-none text-2xl bg-proj-red"
                onClick={() => setModalOpen(true)}
              >
                <BsFillPlayFill className="text-2xl" />
                <span className="ml-3 font-semibold">Watch</span>
              </div>
              <div className="group flex items-center border-2 rounded-full border-gray-300 hover:border-red-600 w-max p-4 justify-center text-white select-none text-2xl mx-3 font-semibold">
                <span className="text-red-600 group-hover:text-white">
                  <AiTwotoneHeart />
                </span>
              </div>{" "}
              <div className="group flex items-center border-2 rounded-full border-gray-300 hover:border-red-600 w-max p-4 justify-center text-white select-none text-2xl mx-3 font-semibold">
                <span className="text-red-600 group-hover:text-white">
                  <FaShareAlt />
                </span>
              </div>{" "}
              <div className="group flex items-center border-2 rounded-full border-gray-300 hover:border-red-600 w-max p-4 justify-center text-white select-none text-2xl mx-3 font-semibold">
                <span className="text-red-600 group-hover:text-white">
                  <BsPlusLg />
                </span>
              </div>
            </div>
            <div className="mt-10">
              <span className="text-white text-xl font-semibold uppercase">
                Storyline
              </span>
              <p className="text-white mt-3 text-xl font-thin">
                {details.overview}
              </p>
            </div>
            <div className="mt-12">
              <span className="text-white text-xl font-semibold uppercase">
                Cast
              </span>
              {!isCastLoading && (
                <div className="flex mt-8 flex-wrap h-96 overflow-scroll hideScrollBar justify-between ">
                  {cast.cast.map(
                    (mem) =>
                      mem.profile_path && (
                        <div className="flex items-center ml-6 mb-5 w-1/3">
                          <img
                            src={`https://image.tmdb.org/t/p/original${mem.profile_path}`}
                            alt={mem.name}
                            className="h-28 rounded-md "
                          />
                          <div className="ml-4">
                            <span className="text-white text-xl font-md">
                              {mem.character}
                            </span>
                            <br />
                            <span className="text-white text-xl font-thin">
                              {mem.name}
                            </span>
                          </div>
                        </div>
                      )
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="w-1/5">
            {" "}
            <span className="mt-8 text-xl font-normal">More Like This</span>
            {!isSimilarMediaLoading && (
              <div className="mt-5 flex flex-wrap justify-center h-2/4 hideScrollBar">
                {similarMedia.results.map(
                  (show) =>
                    show.poster_path && (
                      <MoviesSidebar
                        image={show.poster_path}
                        name={show.title}
                        gener={show.geners}
                        votesAvg={show.vote_average}
                        votes={show.vote_count}
                        type={false}
                        id={show.id}
                      />
                    )
                )}
              </div>
            )}
          </div>
        </div>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="flex "
        >
          <div className="mx-auto my-auto w-3/4 h-3/4 outline-none">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${Trailer.key}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        </Modal>
      </div>
    )
  );
};

export default MovieDetails;
