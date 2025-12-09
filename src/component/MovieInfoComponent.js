import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_KEY } from "../App";

const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const { selectedMovie } = props;

  useEffect(() => {
    if (!selectedMovie) return;
    setLoading(true);
    Axios.get(
      `https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}` 
    )
      .then((response) => {
        setMovieInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movie info:", error);
        setMovieInfo(null);
      })
      .finally(() => setLoading(false));
  }, [selectedMovie]);

  return (
    <div className="Container bg-dark text-white py-4">
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : movieInfo ? (
          <div className="row">
            <div className="col-md-4">
              <img className="CoverImage img-fluid" src={movieInfo?.Poster} alt={movieInfo?.Title} />
            </div>
            <div className="col-md-8">
              <div className="InfoColumn">
                <h2 className="MovieName mb-3">
                  {movieInfo?.Type}: <span>{movieInfo?.Title}</span>
                </h2>
                <p className="MovieInfo">IMDB Rating: <span>{movieInfo?.imdbRating}</span></p>
                <p className="MovieInfo">Year: <span>{movieInfo?.Year}</span></p>
                <p className="MovieInfo">Language: <span>{movieInfo?.Language}</span></p>
                <p className="MovieInfo">Rated: <span>{movieInfo?.Rated}</span></p>
                <p className="MovieInfo">Released: <span>{movieInfo?.Released}</span></p>
                <p className="MovieInfo">Runtime: <span>{movieInfo?.Runtime}</span></p>
                <p className="MovieInfo">Genre: <span>{movieInfo?.Genre}</span></p>
                <p className="MovieInfo">Director: <span>{movieInfo?.Director}</span></p>
                <p className="MovieInfo">Actors: <span>{movieInfo?.Actors}</span></p>
                <p className="MovieInfo">Plot: <span>{movieInfo?.Plot}</span></p>
              </div>
              <button
                className="Close btn btn-danger mt-3"
                onClick={() => props.onMovieSelect(null)}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center">No movie selected or error loading data.</p>
        )}
    </div>
  );
};

export default MovieInfoComponent;
