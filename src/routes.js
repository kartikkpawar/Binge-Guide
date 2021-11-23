import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import ActorDetail from "./pages/ActorDetail";
import MovieDetails from "./pages/MovieDetails";
const RoutesManager = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/tv-detail/:id" element={<MovieDetails />} />
          <Route
            exact
            path="/tv-detail/:id/:season"
            element={<MovieDetails />}
          />
          <Route exact path="/movie-detail/:id" element={<MovieDetails />} />
          <Route exact path="/actor-detail/:id" element={<ActorDetail />} />
        </Routes>
      </Router>
    </div>
  );
};

export default RoutesManager;
