import { useState } from "react";
import { useCallback } from "react";

const useMoviesData = () => {
  const [movieData, setMovieData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchMovies = useCallback(
    async (parameter, query, favoritesArray, isFavorite) => {
      if (isFavorite) {
        let favoritesMovies = [];
        for await (const favorite of favoritesArray) {
          const response = await fetch(
            `http://www.omdbapi.com/?i=${favorite}&apikey=fd47b721`
          );
          const data = await response.json();
          favoritesMovies.push(data);
        }
        console.log(favoritesMovies);
        setMovieData(favoritesMovies);
      }

      if (!favoritesArray) {
        const response = await fetch(
          `http://www.omdbapi.com/?${parameter}=${query}&apikey=fd47b721`
        );

        const data = await response.json();
        // if (parameter === "s") {
        setMovieData(data.Search);
        console.log(data);
        setIsLoaded(true);
      }
      if (favoritesArray && !isFavorite) {
        const response = await fetch(
          `http://www.omdbapi.com/?${parameter}=${query}&apikey=fd47b721`
        );
        // if (parameter === "i") {
        const data = await response.json();
        const isfavoriteMovie = favoritesArray.includes(query);
        const validData = !isfavoriteMovie
          ? data
          : { ...data, isFavorite: true };

        setMovieData(validData);
        console.log(validData);
        setIsLoaded(true);
      }
    },
    []
  );

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
