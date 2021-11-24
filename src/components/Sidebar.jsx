import React, { useState } from "react";
import Logo from "../assets/Logo.svg";
import { RiHome2Fill, RiCompassDiscoverLine } from "react-icons/ri";
import { BiCameraMovie } from "react-icons/bi";
import { BsViewList, BsFillStarFill } from "react-icons/bs";
import { IoStopwatchSharp } from "react-icons/io5";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { changeTab } from "../app/tabs";
import { signOutUSer } from "../app/auth";
import { useNavigate } from "react-router";

const Sidebar = () => {
  const authState = useSelector((state) => state.auth);
  console.log(authState);
  const navigate = useNavigate();

  const [tabs, setTabs] = useState({
    home: true,
    freeWatch: false,
    discover: false,
    comingSoon: false,
    favourites: false,
    watchlist: false,
  });
  const dispatch = useDispatch();

  const tabHandler = (tabName) => {
    for (const tab in tabs) {
      if (tabs[tab] === true) {
        const data = {
          tabName,
          currTab: tab,
        };
        dispatch(changeTab(data));
      }
    }

    tabName === "home" &&
      setTabs((prevstate) => ({
        ...prevstate,
        home: true,
        freeWatch: false,
        discover: false,
        comingSoon: false,
        favourites: false,
        watchlist: false,
      }));
    tabName === "freeWatch" &&
      setTabs((prevstate) => ({
        ...prevstate,
        home: false,
        freeWatch: true,
        discover: false,
        comingSoon: false,
        favourites: false,
        watchlist: false,
      }));
    tabName === "discover" &&
      setTabs((prevstate) => ({
        ...prevstate,
        home: false,
        freeWatch: false,
        discover: true,
        comingSoon: false,
        favourites: false,
        watchlist: false,
      }));
    tabName === "comingSoon" &&
      setTabs((prevstate) => ({
        ...prevstate,
        home: false,
        freeWatch: false,
        discover: false,
        comingSoon: true,
        favourites: false,
        watchlist: false,
      }));
    tabName === "favourites" &&
      setTabs((prevstate) => ({
        ...prevstate,
        home: false,
        freeWatch: false,
        discover: false,
        comingSoon: false,
        favourites: true,
        watchlist: false,
      }));
    tabName === "watchlist" &&
      setTabs((prevstate) => ({
        ...prevstate,
        home: false,
        freeWatch: false,
        discover: false,
        comingSoon: false,
        favourites: false,
        watchlist: true,
      }));
  };

  return (
    <div className="min-h-screen  bg-black-background p-2 select-none">
      <div className="flex justify-center items-center mt-5 ">
        <img src={Logo} alt="" className="h-10 2xl:h-12" />
        <span className="text-white font-semibold xl:text-xl 2xl:text-3xl ml-4">
          BingeGuide<span className="text-proj-red">.</span>
        </span>
      </div>
      <div className="mt-10 mx-auto">
        <span className="text-lg 2xl:text-xl text-gray-400 ml-6 font-medium uppercase">
          Menu
        </span>
        <div className=" ml-4 2xl:ml-5 mt-4 2xl:mt-6">
          <div
            className={`text-lg 2xl:text-xl flex items-center justify-between  menuHover ${
              !tabs.home && "text-gray-500"
            }`}
            onClick={() => tabHandler("home")}
          >
            <div className="flex items-center">
              {" "}
              <RiHome2Fill
                className={`text-xl 2xl:text-2xl menuIcon ${
                  tabs.home && "text-proj-red"
                }`}
              />
              <span
                className={`ml-2 text-lg 2xl:text-xl font-semibold menuText ${
                  tabs.home && "text-white"
                }`}
              >
                Home
              </span>
            </div>
            {tabs.home && <div className="h-6 w-1 bg-proj-red rounded" />}
          </div>{" "}
          <div
            className={`text-lg 2xl:text-xl flex items-center justify-between mt-4 2xl:mt-6 menuHover ${
              !tabs.freeWatch && "text-gray-500"
            }`}
            onClick={() => tabHandler("freeWatch")}
          >
            <div className="flex items-center">
              <BiCameraMovie
                className={`text-xl 2xl:text-2xl menuIcon ${
                  tabs.freeWatch && "text-proj-red"
                }`}
              />
              <span
                className={`ml-2 text-lg 2xl:text-xl font-semibold menuText ${
                  tabs.freeWatch && "text-white"
                }`}
              >
                Free to watch
              </span>
            </div>
            {tabs.freeWatch && <div className="h-6 w-1 bg-proj-red rounded" />}
          </div>{" "}
          <div
            className={`text-lg 2xl:text-xl flex items-center justify-between mt-4 2xl:mt-6 menuHover ${
              !tabs.discover && "text-gray-500"
            }`}
            onClick={() => tabHandler("discover")}
          >
            <div className="flex items-center">
              <RiCompassDiscoverLine
                className={`text-xl 2xl:text-2xl menuIcon ${
                  tabs.discover && "text-proj-red"
                }`}
              />
              <span
                className={`ml-2 text-lg 2xl:text-xl font-semibold menuText ${
                  tabs.discover && "text-white"
                }`}
              >
                Discover
              </span>
            </div>
            {tabs.discover && <div className="h-6 w-1 bg-proj-red rounded" />}
          </div>{" "}
          <div
            className={`text-lg 2xl:text-xl flex items-center justify-between mt-4 2xl:mt-6 menuHover ${
              !tabs.comingSoon && "text-gray-500"
            }`}
            onClick={() => tabHandler("comingSoon")}
          >
            <div className="flex items-center">
              {" "}
              <IoStopwatchSharp
                className={`text-xl 2xl:text-2xl menuIcon ${
                  tabs.comingSoon && "text-proj-red"
                }`}
              />
              <span
                className={`ml-2 text-lg 2xl:text-xl font-semibold menuText ${
                  tabs.comingSoon && "text-white"
                }`}
              >
                Coming Soon
              </span>{" "}
            </div>
            {tabs.comingSoon && <div className="h-6 w-1 bg-proj-red rounded" />}
          </div>
        </div>
      </div>
      <div className="mt-8 2xl:mt-10 mx-auto">
        <span className="text-lg 2xl:text-xl text-gray-400 ml-6 font-medium uppercase">
          My Stuff
        </span>
        <div className="ml-5 mt-4 2xl:mt-6">
          <div
            className={`text-lg 2xl:text-xl flex items-center justify-between menuHover ${
              !tabs.favourites && "text-gray-500"
            }`}
            onClick={() => tabHandler("favourites")}
          >
            <div className="flex items-center">
              {" "}
              <BsFillStarFill
                className={`text-xl 2xl:text-2xl menuIcon ${
                  tabs.favourites && "text-proj-red"
                }`}
              />
              <span
                className={`ml-2 text-lg 2xl:text-xl font-semibold menuText ${
                  tabs.favourites && "text-white"
                }`}
              >
                Favourites
              </span>{" "}
            </div>
            {tabs.favourites && <div className="h-6 w-1 bg-proj-red rounded" />}
          </div>{" "}
          <div
            className={`text-lg 2xl:text-xl flex items-center justify-between mt-4 2xl:mt-6 menuHover ${
              !tabs.watchlist && "text-gray-500"
            }`}
            onClick={() => tabHandler("watchlist")}
          >
            <div className="flex items-center">
              {" "}
              <BsViewList
                className={`text-xl 2xl:text-2xl menuIcon ${
                  tabs.watchlist && "text-proj-red"
                }`}
              />
              <span
                className={`ml-2 text-lg 2xl:text-xl font-semibold menuText ${
                  tabs.watchlist && "text-white"
                }`}
              >
                My Watchlist
              </span>{" "}
            </div>
            {tabs.watchlist && <div className="h-6 w-1 bg-proj-red rounded" />}
          </div>{" "}
        </div>
      </div>
      <div className="mt-8 2xl:mt-10 mx-auto">
        <span className="text-lg 2xl:text-xl text-gray-400 ml-6 font-medium uppercase">
          Profile
        </span>
        <div className="ml-5 mt-4 2xl:mt-6">
          <div className="text-lg 2xl:text-xl text-gray-500 flex items-center mt-6 menuHover">
            {authState.auth ? (
              <div className="flex" onClick={() => dispatch(signOutUSer())}>
                <FiLogOut className="text-xl 2xl:text-2xl menuIcon" />
                <span className="ml-2 text-lg 2xl:text-xl font-semibold menuText">
                  Sign Out
                </span>
              </div>
            ) : (
              <div className="flex" onClick={() => navigate("/signin")}>
                <FiLogIn className="text-xl 2xl:text-2xl menuIcon" />
                <span className="ml-2 text-lg 2xl:text-xl font-semibold menuText">
                  Sign In
                </span>
              </div>
            )}
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
