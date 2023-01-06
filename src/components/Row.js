import React, { useState, useEffect } from "react";
import axios from "../axios";
import "../css/Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_img_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    //if [], run once when raw loads
    async function fetchData() {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
      return response;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          console.log("url");
          console.log(url);
          const UrlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(UrlParams.get("v"));
          console.log(UrlParams);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h1>{title}</h1>

      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_img_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.title}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
