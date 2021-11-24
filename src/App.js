import React from "react";
import Sidebar from "./components/Sidebar";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Watchlist from "./pages/Watchlist";
import Favourites from "./pages/Favourites";
import ComingSoon from "./pages/ComingSoon";
import FreeWatch from "./pages/FreeWatch";
const App = () => {
  const tabs = useSelector((state) => state.tabs);

  return (
    <div className="flex bg-black-background">
      <div className="w-2/12 border-r border-gray-600">
        <Sidebar />
      </div>
      <div className="w-10/12 text-white h-screen">
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
