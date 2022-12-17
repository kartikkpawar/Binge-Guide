import React, { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Watchlist from "./pages/Watchlist";
import Favourites from "./pages/Favourites";
import ComingSoon from "./pages/ComingSoon";
import FreeWatch from "./pages/FreeWatch";
import { loadHome } from "./app/tabs";
import { signInUser } from "./app/auth";
const App = () => {
  const tabs = useSelector((state) => state.tabs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadHome);

    const auth = localStorage.getItem("userAuth");
    const authVal = auth ? JSON.parse(auth) : false;
    authVal &&
      dispatch(
        signInUser({
          email: authVal.email,
          name: authVal.name,
          userId: authVal.userId,
        })
      );
  }, [dispatch]);

  return (
    <div className="flex bg-black-background">
      <div className="xl:w-2/12 border-r border-gray-600 hidden xl:block">
        <Sidebar />
      </div>
      <div className="w-full xl:w-10/12 text-white h-screen">
        {tabs.home && <Home />}
        {tabs.freeWatch && <FreeWatch />}
        {tabs.discover && <Discover />}
        {tabs.comingSoon && <ComingSoon />}
        {tabs.favourites && <Favourites />}
        {tabs.watchlist && <Watchlist />}
      </div>
    </div>
  );
};

export default App;
