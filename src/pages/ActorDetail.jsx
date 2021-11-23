import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import {
  AiFillFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
} from "react-icons/ai";

import { actorData } from "../actorData";
import { useNavigate } from "react-router";

const looper = new Array(15).fill("1");
const ActorDetail = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-black-background h-screen p-8 hideScrollBar">
      <div
        className="p-3 bg-white bg-opacity-60 text-black rounded-full mr-6 w-max"
        onClick={() => navigate("/")}
      >
        <IoMdArrowBack className="cursor-pointer text-2xl" />
      </div>
      <div className="h-max p-4 flex mt-2 w-full">
        <div className="h-full w-2/12">
          <img
            src="https://image.tmdb.org/t/p/original/5Y41OJCtiYIBc4a8zbYRdNJ7Q4v.jpg"
            alt="Actor Name"
            className="h-96 w-max rounded-lg"
          />
          <div className="text-white flex  mt-5 text-4xl">
            <AiFillFacebook className="mr-3" />
            <AiOutlineTwitter className="mr-3" />
            <AiOutlineInstagram className="mr-3" />
          </div>
          <div className="text-white mt-6 flex flex-col">
            <span className="text-xl">Personal Info</span>
            <div className="flex  flex-col mt-5">
              <span className="font-semibold text-lg">Known For</span>
              <span className="font-thin text-lg -mt-1">
                {actorData.known_for_department}
              </span>
            </div>{" "}
            <div className="flex  flex-col mt-5">
              <span className="font-semibold text-lg">Popularity</span>
              <span className="font-thin text-lg -mt-1">
                {actorData.popularity * 10} %
              </span>
            </div>{" "}
            <div className="flex  flex-col mt-5">
              <span className="font-semibold text-lg">Gender</span>
              <span className="font-thin text-lg -mt-1">
                {actorData.gender === 2 && "Male"}
                {actorData.gender === 1 && "Female"}
              </span>
            </div>{" "}
            <div className="flex  flex-col mt-5">
              <span className="font-semibold text-lg">Birthday</span>
              <span className="font-thin text-lg -mt-1">
                {actorData.birthday}
              </span>
            </div>{" "}
            <div className="flex  flex-col mt-5">
              <span className="font-semibold text-lg">Place of Birth</span>
              <span className="font-thin text-lg -mt-1">
                {actorData.place_of_birth}
              </span>
            </div>{" "}
            <div className="flex  flex-col mt-5">
              <span className="font-semibold text-lg">Also Know As</span>
              {actorData.also_known_as.map((item) => (
                <span className="font-thin text-lg -mt-1">{item}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="w-10/12 ml-5 text-white">
          <span className="text-4xl font-semibold">{actorData.name}</span>
          <div className="flex flex-col mt-10 w-8/12">
            <span className="text-xl font-semibold">Biography</span>
            <p className="mt-5 text-lg">{actorData.biography}</p>
          </div>
          <div className="mt-12">
            <span className="text-2xl font-semibold">Popular For</span>
            <div className="flex mb-3 w-11/12 mt-6 flex-wrap">
              {looper.map((item) => (
                <div className="h-64 w-40 mr-5 mb-8 flex flex-col  items-center">
                  <img
                    src="https://image.tmdb.org/t/p/original/gbp4zM0FE0n23X4UFY5EBlacrog.jpg"
                    alt=""
                    className="h-full w-max rounded-xl mb-1"
                  />
                  <span className="text-white  text-sm">
                    The Vampire Diaries
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorDetail;
