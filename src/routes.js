import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import ActorDetail from "./pages/ActorDetail";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import MovieDetails from "./pages/MovieDetails";
import ShowDetails from "./pages/ShowDetails";
const RoutesManager = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route
            exact
            path="/tv-detail/:id/:season"
            element={<ShowDetails />}
          />{" "}
          <Route exact path="/movie-detail/:id" element={<MovieDetails />} />
          <Route exact path="/actor-detail/:id" element={<ActorDetail />} />
          <Route exact path="/" element={<App />} />
        </Routes>
      </Router>
    </div>
  );
};

export default RoutesManager;
