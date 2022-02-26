import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import GlobalMovie from "../components/GlobalMovie";
import { db } from "../firebase";
import { FiLogIn } from "react-icons/fi";

const Watchlist = () => {
  const [favs, setFavs] = useState([]);
  const authState = useSelector((state) => state.auth);
  const [rerender, setRerender] = useState(false);
  // TODO: UI FIXES For NO MOVIES OR NOT LOGIN

  useEffect(() => {
    authState.auth.userId &&
      db
        .collection(authState.auth.userId)
        .doc("user")
        .collection("watchlist")
        .onSnapshot((snapshot) =>
          setFavs(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
  }, [rerender, authState.auth]);
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
    <div className="h-full pt-8 flex w-full flex-col overflow-scroll hideScrollBar">
      <span className=" text-3xl uppercase ml-8 mt-8">Watchlist</span>

      <div className="flex w-full h-full flex-wrap mt-12  pr-8 ">
        {authState.auth ? (
          favs.length === 0 ? (
            <div className="ml-8 text-2xl font-thin">
              <span>Look's like there is nothing in your watchlist.</span>
            </div>
          ) : (
            favs?.map((item) => (
              <GlobalMovie
                buttons
                remove
                watch
                fbId={item.id}
                name={item.data.name}
                image={item.data.image_path}
                id={item.data.id}
                type={item.data.type === "tv" ? true : false}
                func_notify={(msg) => notify(msg)}
                reRender={() => setRerender(!rerender)}
              />
            ))
          )
        ) : (
          <div className="ml-8 h-full flex items-center justify-center w-full">
            <Link className="text-white -mt-10 flex items-center" to="/signin">
              <FiLogIn className="text-xl 2xl:text-2xl menuIcon mr-4" />
              <span className="text-2xl">Sign In to continue</span>
            </Link>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Watchlist;
