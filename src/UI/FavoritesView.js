// import { useEffect } from "react";

// const FavoritesView = () => {
//   useEffect(() => {
//     const fetchMovie = async () => {
//       const response = await fetch(
//         `http://www.omdbapi.com/?s=${id}&apikey=fd47b721`
//       );

//       const res = await response.json();
//       console.log(res);

//       setMovieData(res.Search);
//     };
//     fetchMovie();
//   }, [id]);

//   return (
//     <div className={classes.resultsList}>
//       {movieData.map((mov) => (
//         <Poster
//           key={mov.imdbID}
//           poster={mov.Poster}
//           id={mov.imdbID}
//           onModal={showModalHandler}
//         />
//       ))}
//     </div>
//   );
// };

// export default FavoritesView;
