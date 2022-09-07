import React from "react";
import axios from "../axios";
import requests from "../request";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
export default function Banner() {
  var stringTruncate = function (str, length) {
    if (str) {
      var dots = str.length > length ? "..." : "";
      return str.substring(0, length) + dots;
    }
  };
  const [movie, setMovie] = React.useState({});
  const [trailerURL, setTrailerURL] = React.useState("");

  const img_base_url = "https://image.tmdb.org/t/p/original";
  React.useEffect(() => {
    let random;
    axios.get(requests.fetchActionMovies).then((res) => {
      random = Math.floor(Math.random() * res.data.results.length - 1);
      if (random === 0 || random === 16 || random === 10 || random === 19) {
        random = 2;
      }
      return setMovie(res.data.results[random]);
    });
  }, []);
  function handleBannerClick() {
    if (trailerURL) {
      setTrailerURL("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
        .then((url) => {
          console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerURL(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  }
  const opts = {
    height: "150",
    width: "300px",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      color: "#e50914",
    },
  };
  return (
    <header className={trailerURL && "bigger-banner"}>
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
          <button className="banner-button play" onClick={handleBannerClick}>
            <i className="fa-solid fa-play icon"></i>Play
          </button>
          <button className="banner-button list">
            {" "}
            <i className="fa-light fa-plus icon plus-icon"></i> Add to List
          </button>
          {trailerURL && <YouTube videoId={trailerURL} opts={opts} />}
          {!trailerURL && (
            <h5 className="desc">{stringTruncate(movie.overview, 150)}</h5>
          )}
        </div>
      </div>
    </header>
  );
}
