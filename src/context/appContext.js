import { createContext, useState, useEffect, useReducer } from "react";

const AppContext = createContext({
  showModal: false,
  isSearching: false,
  id: "",
  query: "",
  openModalHandler: (id) => {},
  closeModalHandler: () => {},
  homeViewHandler: () => {},
  resultsViewHandler: (input) => {},
  moviesHomeList: [],
  showFavoritesHandler: () => {},
});

const reducer = (state, action) => {
  if (action.type === "showFavorites") {
    return {
      isFavorite: true,
      idArray: action.favArray,
    };
  }
  if (action.type === "hideFavorites") {
    return {
      isFavorite: false,
      idArray: [],
    };
  }
};

export const AppContextProvider = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [movieID, setmovieID] = useState();
  const [query, setQuery] = useState("");
  const [moviesHomeList, setMoviesHomeList] = useState([]);
  const [favoriteState, dispatch] = useReducer(reducer, {
    isFavorite: false,
    idArray: [],
  });

  useEffect(() => {
    let moviesArray = [];
    fetch(
      "https://netflix-clone-a2820-default-rtdb.firebaseio.com/HomeSection.json"
    )
      .then((data) => data.json())
      .then((data) => {
        for (const key in data) {
          moviesArray.push({ id: key, ...data[key] });
        }
        setMoviesHomeList(moviesArray);
      });

    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [showModal]);

  const openModalHandler = (id) => {
    setShowModal(true);
    setmovieID(id);
  };
  const closeModalHandler = () => {
    setShowModal(false);
  };

  const resultsViewHandler = (input) => {
    setIsSearching(true);
    setQuery(input);
    dispatch({ type: "hideFavorites" });
  };

  const homeViewHandler = () => {
    setIsSearching(false);
    dispatch({ type: "hideFavorites" });
  };

  const showFavoritesHandler = async () => {
    let moviesID = [];
    fetch(
      "https://netflix-clone-a2820-default-rtdb.firebaseio.com/favorites.json"
    )
      .then((data) => data.json())
      .then((data) => {
        for (const key in data) {
          moviesID.push(data[key]);
        }
        console.log(moviesID);
        dispatch({ type: "showFavorites", favArray: moviesID });
      });
  };

  const context = {
    showModal,
    isSearching,
    id: movieID,
    query,
    openModalHandler,
    closeModalHandler,
    homeViewHandler,
    resultsViewHandler,
    moviesHomeList,
    showFavoritesHandler,
    favoriteState,
  };

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
};

export default AppContext;
