import React from "react";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineFavorite } from "react-icons/md";
import { CgRemoveR } from "react-icons/cg";
import { useNavigate } from "react-router";
import { db } from "../firebase";
import { useSelector } from "react-redux";

const GlobalMovie = ({
  buttons,
  remove,
  type,
  name,
  date,
  image,
  id,
  fab,
  watch,
  fbId,
  func_notify,
  white,
}) => {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  const handleOnClick = () => {
    if (type) {
      return navigate(`/tv-detail/${id}/1`, { replace: true });
    }
    return navigate(`/movie-detail/${id}`, { replace: true });
  };
  const handleRemove = (e) => {
    e.stopPropagation();
    fab &&
      db
        .collection(authState.auth.userId)
        .doc("user")
        .collection("favourites")
        .doc(fbId)
        .delete()
        .then((res) => func_notify("Removed Successfully", true))
        .catch((err) => func_notify("Something went wrong", false));
    watch &&
      db
        .collection(authState.auth.userId)
        .doc("user")
        .collection("watchlist")
        .doc(fbId)
        .delete()
        .then((res) => func_notify("Removed Successfully", true))
        .catch((err) => func_notify("Something went wrong", false));
  };
  const handleAdd = (e, types) => {
    e.stopPropagation();
    if (!authState.auth) {
      return func_notify("SignIn to Continue");
    }
    handleDuplicate(type, id)
      .then((res) => {
        if (!res) {
          authState.auth.userId &&
            db
              .collection(authState.auth.userId)
              .doc("user")
              .collection(types === "w" ? "watchlist" : "favourites")
              .add({
                id,
                name,
                type: types ? "tv" : "movie",
                image_path: image,
              })
              .then((res) =>
                func_notify(
                  `Added to ${types === "w" ? "Watchlist" : "Favourites"}`
                )
              )
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
      className="h-96 w-64 ml-6 mb-6 sm:mb-3 xl:mb-0 relative movieHoverContainer cursor-pointer"
      onClick={handleOnClick}
    >
      <img
        src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${image}`}
        alt=""
        className="h-full w-full rounded-sm"
      />
      <div className="absolute top-0 bg-black bg-opacity-30 h-full w-full movieDetails">
        <div className="flex flex-col ml-2 mt-2">
          <span
            className={`uppercase text-md font-semibold movieCategory ${
              white && "text-white"
            }`}
          >
            {type ? "Tv Show" : "Movie"}
          </span>
          <span
            className={`text-xl font-normal -mt-1 movieName ${
              white && "text-white"
            }`}
          >
            {name}
          </span>{" "}
          {date && (
            <span className="text-lg font-thin movieDirector">
              Release Date: {date}
            </span>
          )}
        </div>
        {buttons && (
          <div className="h-full w-full -mt-3 moviesButton">
            {remove ? (
              <button
                className="bg-gray-500 bg-opacity-70  rounded-md text-md 2xl:text-lg h-10 2xl:h-12 w-max px-4 ml-3"
                onClick={handleRemove}
              >
                <CgRemoveR />
              </button>
            ) : (
              <>
                <button
                  className="bg-gray-500 bg-opacity-70  rounded-md text-md 2xl:text-lg h-10 2xl:h-12 w-max px-4 ml-3"
                  onClick={(e) => handleAdd(e, "f")}
                >
                  <MdOutlineFavorite className="" />
                </button>
                <button
                  className="bg-gray-500 bg-opacity-70  rounded-md text-md 2xl:text-lg h-10 2xl:h-12 w-max px-4 ml-3"
                  onClick={(e) => handleAdd(e, "w")}
                >
                  <IoMdAdd />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalMovie;
