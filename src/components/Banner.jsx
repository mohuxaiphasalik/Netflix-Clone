import React from "react";
import axios from "../axios";
import requests from "../request";
export default function Banner() {
  const [movie, setMovie] = React.useState({});
  const img_base_url = "https://image.tmdb.org/t/p/original";
  React.useEffect(() => {
    axios
      .get(requests.fetchTopRated)
      .then((res) =>
        setMovie(
          res.data.results[
            Math.floor(Math.random() * res.data.results.length - 1)
          ]
        )
      );
  }, []);
  console.log(movie);
  return (
    <header>
      <div className="banner">
        <img
          src={`${img_base_url}${movie?.backdrop_path}`}
          alt={movie?.title}
          className="img-banner"
        />
        <div className="text">
          <h1 className="title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <button className="banner-button play">
            <i className="fa-solid fa-play icon"></i>Play
          </button>
          <button className="banner-button list">
            {" "}
            <i className="fa-light fa-plus icon plus-icon"></i> Add to List
          </button>
          <h5 className="desc">{movie.overview}</h5>
        </div>
      </div>
    </header>
  );
}
