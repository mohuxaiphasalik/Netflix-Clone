import React from "react";
import base_url from "../axios";
import axios from "../axios";
export default function Row(props) {
  const [movies, setMovies] = React.useState([]);
  React.useEffect(() => {
    axios.get(props.fetch).then((res) => setMovies(res.data.results));
  }, [props.fetch]);
  const img_base_url = "https://image.tmdb.org/t/p/original";
  return (
    <>
      <div className="row">
        <h1 className="row-title">{props.title}</h1>
        <div className="row-posters">
          {movies.map((movie) => {
            return (
              <img
                key={movie.id}
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
      </div>
    </>
  );
}
