import { useState } from "react";

const useMoviesData = () => {
  const [movieData, setMovieData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchMovies = async (parameter, query, isFavorite) => {
    const response = await fetch(
      `http://www.omdbapi.com/?${parameter}=${query}&apikey=fd47b721`
    );

    const data = await response.json();
    if (parameter === "s") {
      setMovieData(data.Search);
      setIsLoaded(true);
    }

    if (parameter === "i") {
      setMovieData(data);
      setIsLoaded(true);
    }
  };

  const addToFavoriteHandler = async (id) => {
    const response = await fetch(
      "https://netflix-clone-a2820-default-rtdb.firebaseio.com/favorites.json",
      {
        method: "POST",
        body: JSON.stringify(id),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return {
    movieData,
    isLoaded,
    fetchMovies,
    addToFavoriteHandler,
  };
};

export default useMoviesData;
