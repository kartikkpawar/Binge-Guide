import React, { useEffect, useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import GlobalMovie from "../components/GlobalMovie";
import { db } from "../firebase";

const Favourites = () => {
  const authState = useSelector((state) => state.auth);
  const [rerender, setRerender] = useState(false);

  const [favs, setFavs] = useState([]);
  useEffect(() => {
    authState.auth.userId &&
      db
        .collection(authState.auth.userId)
        .doc("user")
        .collection("favourites")
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
      <span className=" text-3xl uppercase ml-8 mt-8">Favourites</span>

      <div className="flex w-full h-full flex-wrap mt-12  pr-8 ">
        {authState.auth ? (
          favs.length === 0 ? (
            <div className="ml-8 text-2xl font-thin">
              <span>Look's like there is nothing in your favourites.</span>
            </div>
          ) : (
            favs?.map((item) => (
              <GlobalMovie
                buttons
                remove
                watch
                fab
                fbId={item.id}
                name={item.data.name}
                image={item.data.image_path}
                id={item.data.id}
                type={item.data.type === "tv" ? true : false}
                func_notify={(msg, type) => {
                  notify(msg);
                  type && setRerender(!rerender);
                }}
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

export default Favourites;
