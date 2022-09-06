import React from "react";
import movieTrailer from "movie-trailer";
import axios from "../axios";
import YouTube from "react-youtube";
export default function Row(props) {
  const [movies, setMovies] = React.useState([]);
  const [trailerURL, setTrailerURL] = React.useState("");
  React.useEffect(() => {
    axios.get(props.fetch).then((res) => setMovies(res.data.results));
  }, [props.fetch]);
  const img_base_url = "https://image.tmdb.org/t/p/original";
  const opts = {
    height: "550px",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      color: "#e50914",
    },
  };
  function handleClick(movie) {
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
  return (
    <>
      <div className="row">
        <h1 className="row-title">{props.title}</h1>
        <div className="row-posters">
          {movies.map((movie) => {
            return (
              <img
                key={movie.id}
                onClick={() => handleClick(movie)}
                className={
                  props.isOriginal ? "row-poster larger-poster" : "row-poster"
                }
                src={`${img_base_url}${
                  props.isOriginal ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            );
          })}
        </div>
        {trailerURL && <YouTube videoId={trailerURL} opts={opts} />}
      </div>
    </>
  );
}
