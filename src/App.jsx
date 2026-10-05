import { useState } from "react";
import "./App.css";

function App() {
  const [movieName, setMovieName] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "45087a0a";

  const searchMovies = async () => {
    if (movieName === "") {
      setError("Please enter a movie name");
      return;
    }

    setLoading(true);
    setError("");
    setMovies([]);
    setSelectedMovie(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`
      );

      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError("Movie not found");
      }
    } catch {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  const showDetails = async (id) => {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`
    );

    const data = await response.json();
    setSelectedMovie(data);
  };

  return (
    <div className="app">
      <h1>Movie Explorer</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Enter movie name"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />

        <button onClick={searchMovies}>Search</button>
      </div>

      {loading && <p className="loading">Loading movies...</p>}

      {error && <p className="error">{error}</p>}

      <div className="movies">
        {movies.map((movie) => (
          <div className="card" key={movie.imdbID}>
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/200x260?text=No+Poster"
              }
              alt={movie.Title}
            />

            <h3>{movie.Title}</h3>

            <p>Year: {movie.Year}</p>

            <button onClick={() => showDetails(movie.imdbID)}>
              View Details
            </button>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="details">
          <h2>{selectedMovie.Title}</h2>

          <p>Year: {selectedMovie.Year}</p>

          <p>Genre: {selectedMovie.Genre}</p>

          <p>⭐ Rating: {selectedMovie.imdbRating}</p>

          <p>{selectedMovie.Plot}</p>
        </div>
      )}
    </div>
  );
}

export default App;