import React from "react";

const MovieComponent = (props) => {
  const { Title, Year, imdbID, Type, Poster } = props.movie;

  return (
    <div
      className="MovieContainer card bg-dark text-white h-100"
      onClick={() => {
        props.onMovieSelect(imdbID);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      style={{ cursor: "pointer" }}
    >
      <img className="CoverImage card-img-top" src={Poster} alt={Title} />
      <div className="card-body">
        <h5 className="MovieName card-title">{Title}</h5>
        <div className="InfoColumn">
          <p className="MovieInfo mb-1">Year: {Year}</p>
          <p className="MovieInfo mb-0">Type: {Type}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieComponent;