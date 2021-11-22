import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import MovieDetails from "./pages/MovieDetails";
const RoutesManager = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/show-detail/:id" element={<MovieDetails />} />
          <Route exact path="/movie-detail/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
    </div>
  );
};

export default RoutesManager;
