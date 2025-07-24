import { useState, useEffect } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieModal from "../MovieModal/MovieModal";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("batman");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  useEffect(() => {
    if (!query) return;
    const load = async () => {
      try {
        setLoading(true);
        setError(false);
        const result = await fetchMovies(query);
        if (result.length === 0) {
          toast("There was an error, please try again");
        }
        setMovies(result);
      } catch (err) {
        console.log(err);
        toast(`Failed to fetch ${query}`);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [query]);
  
  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const handelClosedModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar
        action={async (formData) => {
          const query = (formData.get("query") as string).trim();
          if (query) {
            setQuery(query);
          }
        }}
      />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handelClosedModal} />
      )}
    </>
  );
}

export default App;
