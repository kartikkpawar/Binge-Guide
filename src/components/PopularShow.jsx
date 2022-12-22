import React from "react";
import { MdOutlineFavorite } from "react-icons/md";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { db } from "../firebase";

const PopularShow = ({
  name,
  url,
  populartiy,
  type,
  id,
  geners,
  poster,
  func_notify,
}) => {
  const authState = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const handleOnClick = () => {
    if (type) {
      return navigate(`/tv-detail/${id}/1`, { replace: true });
    }
    return navigate(`/movie-detail/${id}`, { replace: true });
  };

  const handleWatchlist = (typeS) => {
    if (!authState.auth) {
      return func_notify("SignIn to Continue");
    }
    handleDuplicate("w", id)
      .then((res) => {
        if (!res) {
          authState.auth.userId &&
            db
              .collection(authState.auth.userId)
              .doc("user")
              .collection("watchlist")
              .add({
                id,
                name,
                type: typeS,
                image_path: poster,
              })
              .then((res) => func_notify("Added to watchlist"))
              .catch((err) => func_notify("Something went wrong"));
        } else {
          return func_notify("Already Added");
        }
      })
      .catch((err) => func_notify("Something went wrong"));
  };
  const handleFavourites = (typeS) => {
    if (!authState.auth) {
      return func_notify("SignIn to Continue");
    }

    handleDuplicate("f", id)
      .then((res) => {
        if (!res) {
          authState.auth.userId &&
            db
              .collection(authState.auth.userId)
              .doc("user")
              .collection("favourites")
              .add({
                id,
                name,
                type: typeS,
                image_path: poster,
              })
              .then((res) => func_notify("Added to favourites"))
              .catch((err) => func_notify("Something went wrong"));
        } else {
          return func_notify("Already Added");
        }
      })
      .catch((err) => func_notify("Something went wrong"));
  };

  const handleDuplicate = async (fType, mediaId) => {
    return await db
      .collection(authState.auth.userId)
      .doc("user")
      .collection(fType === "w" ? "watchlist" : "favourites")
      .where("id", "==", mediaId)
      .get()
      .then((snapshot) => {
        return snapshot.docs.length > 0 ? true : false;
      })
      .catch((err) => func_notify("Something went wrong"));
  };
  return (
    <div
      className="h-full p-4 w-full xl:w-11/12 rounded-3xl aspect-video flex items-end"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${url})`,
      }}
    >
      <div className="2xl:mt-72 bg-black  px-4 py-4 rounded-xl bg-opacity-50 xl:bg-opacity-60 xl:mt-28 xl:ml-12 w-5/6 xl:w-max mx-auto">
        <span className="uppercase text-base xl:text-2xl 2xl:text-4xl font-semibold">
          {name}
        </span>
        <div className="uppercase mt-3">
          <span className="font-light xl:font-normal text-xs xl:text-sm 2xl:text-base text-gray-400 ">
            {geners.map((g) => g + ", ")}
          </span>
          <br className="xl:hidden" />
          <span className="ml-2 text-gray-200 font-light xl:font-normal">
            %{Math.round(populartiy * 100) / 10} Match
          </span>
        </div>

        <div className="mt-3 flex items-center mx-auto w-max xl:w-full xl:mx-0">
          <button
            className="h-10 2xl:h-12 bg-proj-red rounded-md text-md 2xl:text-lg xl:h-max w-max px-6 font-semibold "
            onClick={() => handleWatchlist(type ? "tv" : "movies")}
          >
            Watchlist
          </button>
          <button
            className="bg-gray-500 bg-opacity-50  rounded-md text-md 2xl:text-lg h-10 2xl:h-12 w-max px-4 ml-3"
            onClick={() => handleFavourites(type ? "tv" : "movies")}
          >
            <MdOutlineFavorite className="" />
          </button>
          <button
            className="bg-gray-500 bg-opacity-50  rounded-md text-md 2xl:text-lg h-10 2xl:h-12 w-max px-4 ml-3"
            onClick={handleOnClick}
          >
            <BsEye />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopularShow;
