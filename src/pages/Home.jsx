import React, { useRef } from "react";
import { BsSearch, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import MoviesSidebar from "../components/MoviesSidebar";
import PopularShow from "../components/PopularShow";
import PopularArtist from "../components/PopularArtist";
import RecommendeMovies from "../components/RecommendeMovies";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import MoviesShowsToggle from "../components/MoviesShowsToggle";
import { useSelector } from "react-redux";

const looper = [
  { name: "The Vampire Diaries", url: "/cJYLon9ejKJV7ua03ab8Tj9u067.jpg" },
  { name: "Suits", url: "/eVV2A3PYJLmHdXpiveiU6Lk7jbV.jpg" },
];
const looperArtist = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
const Home = () => {
  const tabs = useSelector((state) => state.tabs);
  const artistRef = useRef();
  const recommendationRef = useRef();

  const handelScroll = (data) => {
    console.log(data[0], data[1]);
    if (data[1] === "artist" && data[0] === "left") {
      artistRef.current.scrollBy(90, 0);
    } else if (data[1] === "artist" && data[0] === "right") {
      artistRef.current.scrollBy(-90, 0);
    } else if (data[1] === "recommendation" && data[0] === "left") {
      recommendationRef.current.scrollBy(90, 0);
    } else {
      recommendationRef.current.scrollBy(-90, 0);
    }
  };

  return (
    <div className="h-full flex">
      <div className="flex flex-col justify-between w-9/12 border-r border-gray-600 pt-8 px-16 hideScrollBar">
        <MoviesShowsToggle />
        <div className="h-full p-3">
          <Carousel
            // autoPlay={true}
            infiniteLoop={true}
            renderArrowNext={() => false}
            renderArrowPrev={() => false}
            statusFormatter={() => false}
          >
            {looper.map((item) => (
              <PopularShow name={item.name} url={item.url} />
            ))}
          </Carousel>
          <div className="flex flex-col select-none">
            <div className="flex justify-between items-center">
              <span className="my-5 text-2xl">Poplar artist</span>
              <div className="flex">
                <div className="p-3 bg-white bg-opacity-60 text-black rounded-full mr-6">
                  <BsChevronLeft
                    className="cursor-pointer"
                    onClick={() => {
                      handelScroll(["left", "artist"]);
                    }}
                  />
                </div>
                <div className="p-3 bg-white bg-opacity-60 text-black rounded-full">
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
              {" "}
              {looperArtist.map((item) => (
                <PopularArtist />
              ))}
            </div>
          </div>{" "}
          <div className="flex flex-col select-none">
            <div className="flex justify-between items-center">
              <span className="my-5 text-2xl">Recommendations</span>

              <div className="flex">
                <div className="p-3 bg-white bg-opacity-60 text-black rounded-full mr-6">
                  <BsChevronLeft
                    className="cursor-pointer"
                    onClick={() => {
                      handelScroll(["left", "recommendation"]);
                    }}
                  />
                </div>
                <div className="p-3 bg-white bg-opacity-60 text-black rounded-full">
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
              {" "}
              {looperArtist.map((item) => (
                <RecommendeMovies />
              ))}
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
          Popular {tabs.tvShows ? "Tv Shows" : "Movies"}
        </span>
        <div className="mt-5 flex flex-col justify-center">
          {looper.map((item) => (
            <MoviesSidebar />
          ))}
          <button className="h-12 bg-proj-red rounded-xl text-lg h-max ">
            See More
          </button>
        </div>
        <span className="mt-3 text-xl font-normal">My Lists</span>
        <div className="mt-5 flex flex-col justify-center"></div>
      </div>
    </div>
  );
};

export default Home;
