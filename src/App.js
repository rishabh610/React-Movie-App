import React, { useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Axios from "axios";
import MovieComponent from './component/MovieComponent';
import MovieInfoComponent from './component/MovieInfoComponent';

export const API_KEY = "bf166563";

function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState(null); // Changed to null for clarity
  const [timeoutId, updateTimeoutId] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (searchString) => {
    if (!searchString) return;
    setLoading(true);
    try {
      const response = await Axios.get(
        `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}` // Fixed URL and protocol
      );
      if (response.data && response.data.Search) {
        updateMovieList(response.data.Search);
      } else {
        updateMovieList([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      updateMovieList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const onTextChange = (e) => {
    onMovieSelect(null); // Clear selection
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <div className="Container">
      <header className="Header bg-dark text-white py-3">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="AppName d-flex align-items-center">
                <img className="MovieImage me-2" src="/movie-icon.svg" alt="Movie Icon" />
                <h3 className="h1 mb-0">Movie App</h3>
              </div>
            </div>
            <div className="col-md-6">
              <div className="SearchBox input-group">
                <span className="input-group-text bg-secondary">
                  <img className="SearchIcon" src="/search.svg" alt="Search" />
                </span>
                <input
                  className="SearchInput form-control"
                  type="text"
                  placeholder="Search Movie"
                  value={searchQuery}
                  onChange={onTextChange}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      {selectedMovie && (
        <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect} />
      )}
      <div className="MovieListContainer container-fluid mt-4">
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : movieList?.length ? (
          <div className="row">
            {movieList.map((movie, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <MovieComponent movie={movie} onMovieSelect={onMovieSelect} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <img className="Placeholder" src="/movie-icon.svg" alt="No movies" />
            <p className="text-white mt-4"><h3>No Movies Found. Try Search Bar!</h3></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
