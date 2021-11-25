import React, { useRef } from "react";
import { BsSearch, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import MoviesSidebar from "../components/MoviesSidebar";
import PopularShow from "../components/PopularShow";
import PopularArtist from "../components/PopularArtist";
import RecommendeMovies from "../components/RecommendeMovies";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import MoviesShowsToggle from "../components/MoviesShowsToggle";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { useSelector } from "react-redux";
import { usePopularActorQuery } from "../app/actorsApi";
import {
  useMediaPopularQuery,
  useMediaTrendingDayQuery,
  useMediaTrendingQuery,
} from "../app/mediaApi";

const Home = () => {
  const tabs = useSelector((state) => state.tabs);

  const artistRef = useRef();
  const recommendationRef = useRef();

  const handelScroll = (data) => {
    console.log(data[0], data[1]);
    if (data[1] === "artist" && data[0] === "left") {
      artistRef.current.scrollBy(-90, 0);
    } else if (data[1] === "artist" && data[0] === "right") {
      artistRef.current.scrollBy(90, 0);
    } else if (data[1] === "recommendation" && data[0] === "left") {
      recommendationRef.current.scrollBy(-90, 0);
    } else {
      recommendationRef.current.scrollBy(90, 0);
    }
  };

  const { data: popularActors, isLoading: isActorLoading } =
    usePopularActorQuery();
  const { data: trendingMedia, isLoading: isMediaLoading } =
    useMediaTrendingQuery({
      type: tabs.tvShows ? "tv" : "movie",
    });
  const { data: popularMedia, isLoading: isPopularMediaLoading } =
    useMediaPopularQuery({
      type: tabs.tvShows ? "tv" : "movie",
    });
  const { data: trendingDay, isLoading: isTrendingDayLoading } =
    useMediaTrendingDayQuery({
      type: tabs.tvShows ? "tv" : "movie",
    });

  return (
    <div className="h-full flex">
      <div className="flex flex-col justify-between w-9/12 border-r border-gray-600 pt-8 px-16 hideScrollBar">
        <MoviesShowsToggle />
        <div className="h-full p-3">
          {isTrendingDayLoading ? (
            <div className="flex justify-center items-center mb-5 h-2/4">
              <Loader type="Circles" color="#00BFFF" height={50} />
            </div>
          ) : (
            <Carousel
              // autoPlay={true}
              interval={5000}
              transitionTime={5000}
              infiniteLoop={true}
              renderArrowNext={() => false}
              renderArrowPrev={() => false}
              statusFormatter={() => false}
              showIndicators={false}
            >
              {trendingDay.results.map((show) => (
                <PopularShow
                  name={tabs.tvShows ? show.name : show.title}
                  url={show.backdrop_path}
                  populartiy={show.vote_average}
                  type={tabs.tvShows}
                  id={show.id}
                  key={show.id}
                />
              ))}
            </Carousel>
          )}
          <div className="flex flex-col select-none">
            <div className="flex justify-between items-center">
              <span className="my-5 text-2xl">Poplar artist</span>
              <div className="flex">
                <div className="p-3 border border-white text-white rounded-full mr-6">
                  <BsChevronLeft
                    className="cursor-pointer"
                    onClick={() => {
                      handelScroll(["left", "artist"]);
                    }}
                  />
                </div>
                <div className="p-3  border border-white text-white rounded-full">
                  <BsChevronRight
                    className="cursor-pointer"
                    onClick={() => {
                      handelScroll(["right", "artist"]);
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              className="flex justify-between mb-3 overflow-x-scroll hideScrollBar"
              ref={artistRef}
            >
              {isActorLoading ? (
                <div className="flex justify-between">
                  <Loader type="Circles" color="#00BFFF" />
                </div>
              ) : (
                popularActors.results.map(
                  (actor) =>
                    actor.profile_path && (
                      <PopularArtist
                        image={actor?.profile_path}
                        name={actor?.name}
                        gender={actor?.gender}
                        id={actor?.id}
                        key={actor.id}
                      />
                    )
                )
              )}
            </div>
          </div>{" "}
          <div className="flex flex-col select-none">
            <div className="flex justify-between items-center">
              <span className="my-5 text-2xl">
                Trending {tabs.tvShows ? "Tv Shows" : "Movies"}
              </span>

              <div className="flex">
                <div className="p-3 border border-white text-white rounded-full mr-6">
                  <BsChevronLeft
                    className="cursor-pointer"
                    onClick={() => {
                      handelScroll(["left", "recommendation"]);
                    }}
                  />
                </div>
                <div className="p-3 border border-white text-white rounded-full">
                  <BsChevronRight
                    className="cursor-pointer"
                    onClick={() => {
                      handelScroll(["right", "recommendation"]);
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              className="flex justify-between mb-3 overflow-x-scroll hideScrollBar"
              ref={recommendationRef}
            >
              {isMediaLoading ? (
                <div className="flex justify-between">
                  <Loader type="Circles" color="#00BFFF" />
                </div>
              ) : (
                trendingMedia.results.map((show) => (
                  <RecommendeMovies
                    image={show.poster_path}
                    name={tabs.tvShows ? show.name : show.title}
                    type={tabs.tvShows}
                    id={show.id}
                    key={show.id}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-3/12 pt-7 px-12 flex flex-col">
        <div className="flex items-center border-2 rounded-full border-gray-500 w-full p-0.5">
          <BsSearch className="text-xl mx-2 text-gray-500" />
          <input
            type="text"
            className="bg-transparent p-2 w-full focus:outline-none text-md"
            placeholder="Search"
          />
        </div>
        <span className="mt-8 text-xl font-normal">
          Top Rated {tabs.tvShows ? "Tv Shows" : "Movies"}
        </span>
        <div className="mt-5 flex flex-wrap justify-center h-96 hideScrollBar">
          {isPopularMediaLoading ? (
            <div className="flex justify-center mb-5">
              <Loader type="Circles" color="#00BFFF" height={50} />
            </div>
          ) : (
            popularMedia.results.map(
              (show) =>
                show.poster_path && (
                  <MoviesSidebar
                    image={show.poster_path}
                    name={tabs.tvShows ? show.name : show.title}
                    gener={show.gerners}
                    votesAvg={show.vote_average}
                    votes={show.vote_count}
                    type={tabs.tvShows}
                    date={show.first_air_date}
                    id={show.id}
                    key={show.id}
                  />
                )
            )
          )}
        </div>
        <span className="mt-3 text-xl font-normal">Watched</span>
        <div className="mt-5 flex flex-col justify-center"></div>
      </div>
    </div>
  );
};

export default Home;
