import React, { useState } from "react";
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
import { useLocation, useNavigate, useParams } from "react-router";
import TvEpisode from "../components/TvEpisode";
import {
  useMediaDetailsQuery,
  useMediaVideosQuery,
  useMediaWatchProvidersQuery,
  useSimilarMediaQuery,
  useTvSeasonDetailsQuery,
} from "../app/mediaApi";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { toast, ToastContainer } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ShowDetails = () => {
  const appUrl = process.env.REACT_APP_WEB_URL;
  const authState = useSelector((state) => state.auth);
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
    type: "tv",
    id: params.id,
  });
  const filterSeasons =
    !isDetailsLoading &&
    details.seasons.filter((season) => season.season_number !== 0);

  const [defaultoption] = useState(
    !isDetailsLoading &&
      details.seasons.find((season) => season.season_number === params.season)
  );

  const { data: watchProviders, isLoading: isWatchProvidersLoading } =
    useMediaWatchProvidersQuery({ type: "tv", id: params.id });

  const { data: seasonDetails, isLoading: isSeasonDetailsLoading } =
    useTvSeasonDetailsQuery({ id: params.id, seasonNumber: params.season });
  const { data: similarMedia, isLoading: isSimilarMediaLoading } =
    useSimilarMediaQuery({
      type: "tv",
      id: params.id,
    });

  const { data: moviesVideos, isLoading: isMoviesVideosLoading } =
    useMediaVideosQuery({
      type: "tv",
      id: params.id,
    });
  const Trailer =
    !isMoviesVideosLoading &&
    moviesVideos.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
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

  const handleWatchlist = (id, name, type, poster) => {
    console.log(id, name, type, poster);
    authState.auth.userId
      ? db
          .collection(authState.auth.userId)
          .doc("user")
          .collection("watchlist")
          .add({
            id,
            name,
            type,
            image_path: poster,
          })
          .then((res) => notify("Added to Watchlist"))
          .catch((err) => notify("Something went wrong"))
      : notify("Sign In to continue");
  };
  const handleFavourites = (id, name, type, poster) => {
    authState.auth.userId
      ? db
          .collection(authState.auth.userId)
          .doc("user")
          .collection("favourites")
          .add({
            id,
            name,
            type,
            image_path: poster,
          })
          .then((res) => notify("Added to Favourites"))
          .catch((err) => notify("Something went wrong"))
      : notify("Sign In to continue");
  };
  const location = useLocation();
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
                {details.name || details.title}
              </span>
              <div className=" py-2 bg-white bg-opacity-30 text-black rounded-full mr-6 w-max px-5">
                <span className="text-white text-xl font-medium">Tv Show</span>
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
            {watchProviders?.results["US"]?.flatrate ? (
              <div className="w-72 mt-8">
                <span className="text-white text-4xl mt-1 uppercase font-thin">
                  Available On
                </span>
                <div className="flex mt-3 flex-wrap">
                  {!isWatchProvidersLoading && (
                    <div className="flex mt-3 flex-wrap">
                      {watchProviders?.results["US"]?.flatrate?.map(
                        (provider) => (
                          <img
                            src={`https://image.tmdb.org/t/p/original${provider?.logo_path}`}
                            alt={provider?.provider_name}
                            className="h-16 mr-4 rounded-md mb-3"
                          />
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-72 mt-8">
                <span className="text-white text-4xl mt-1 uppercase font-thin">
                  Networks
                </span>
                <div className="flex mt-3 flex-wrap">
                  {!isWatchProvidersLoading && (
                    <div className="flex mt-3 flex-wrap">
                      {details.networks.map((provider) => (
                        <div className="bg-white p-2 rounded-md flex justify-center items-center mb-2">
                          <img
                            src={`https://image.tmdb.org/t/p/original${provider?.logo_path}`}
                            alt={provider?.provider_name}
                            className="h-10 mr-4 mb-3"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="w-3/5 px-5">
            <span className="text-white text-4xl font-semibold">
              {details.name || details.title}
            </span>
            <div className="flex mt-5">
              {details.genres.map((genre) => (
                <div className="flex items-center border rounded-full border-red-300 w-40 min-w-max px-3 h-10 justify-center text-white select-none text-md mr-3 font-semibold">
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
              <div
                className="group flex items-center border-2 rounded-full border-gray-300 hover:border-red-600 w-max p-4 justify-center text-white select-none text-2xl mx-3 font-semibold"
                onClick={() => {
                  handleFavourites(
                    details.id,
                    details.name || details.title,
                    "tv",
                    details.poster_path
                  );
                }}
              >
                <span className="text-red-600 group-hover:text-white">
                  <AiTwotoneHeart />
                </span>
              </div>{" "}
              <div className="group flex items-center border-2 rounded-full border-gray-300 hover:border-red-600 w-max p-4 justify-center text-white select-none text-2xl mx-3 font-semibold">
                <span className="text-red-600 group-hover:text-white">
                  <CopyToClipboard
                    text={`${appUrl}${location.pathname}`}
                    onCopy={() => notify("Copied Successfully")}
                  >
                    <FaShareAlt />
                  </CopyToClipboard>
                </span>
              </div>{" "}
              <div
                className="group flex items-center border-2 rounded-full border-gray-300 hover:border-red-600 w-max p-4 justify-center text-white select-none text-2xl mx-3 font-semibold"
                onClick={() =>
                  handleWatchlist(
                    details.id,
                    details.name || details.title,
                    "tv",
                    details.poster_path
                  )
                }
              >
                <span className="text-red-600 group-hover:text-white">
                  <BsPlusLg />
                </span>
              </div>
              <div className="flex items-center border-2 border-gray-500 w-max p-1 pl-3 ml-6">
                <select
                  className="bg-transparent text-white focus:outline-none text-xl p-2"
                  value={defaultoption?.id}
                  onChange={(e) =>
                    navigate(`/tv-detail/${params.id}/${e.target.value}`)
                  }
                >
                  {filterSeasons.map((season) => (
                    <option
                      value={season.season_number}
                      key={season.id}
                      className="text-black"
                    >
                      {season.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col">
                <div className="mt-10 pr-8">
                  <span className="text-white text-xl font-semibold uppercase">
                    Storyline
                  </span>
                  <p className="text-white mt-3 text-xl font-thin">
                    {details.overview}
                  </p>
                </div>
                <div className="mt-8">
                  <span className="text-white text-xl font-semibold uppercase">
                    Episodes
                  </span>
                  {!isSeasonDetailsLoading && (
                    <div className="h-96 hideScrollBar mt-4">
                      {seasonDetails.episodes.map((episode) => (
                        <TvEpisode
                          key={episode.id}
                          name={episode.name}
                          date={episode.air_date}
                          overview={episode.overview}
                          num={episode.episode_number}
                          image={episode.still_path}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/5">
            {" "}
            <span className="mt-8 text-xl font-normal">More Like This</span>
            {!isSimilarMediaLoading && (
              <div className="mt-5 flex flex-wrap justify-center h-2/4 hideScrollBar">
                {similarMedia?.results.map(
                  (show) =>
                    show.poster_path && (
                      <MoviesSidebar
                        image={show.poster_path}
                        name={show.title || show.name}
                        gener={show.geners}
                        votesAvg={show.vote_average}
                        votes={show.vote_count}
                        type={true}
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
        <ToastContainer />
      </div>
    )
  );
};

export default ShowDetails;
