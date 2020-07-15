import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
    console.log("movies: ", movies);
  return (
    <div className="movie-list">
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }
      <Link className="addMovieButton" to="/add-movie">Add Movie</Link>
    </div>
  );
}

export default MovieList;
