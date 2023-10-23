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

const initialState = {
  isFavorite: false,
  idArray: [],
};

const reducer = (state, action) => {
  if (action.type === "initFavorites") {
    return {
      isFavorite: false,
      idArray: action.favArray,
    };
  }
  if (action.type === "showFavorites") {
    return {
      isFavorite: true,
      idArray: state.idArray,
    };
  }
  if (action.type === "hideFavorites") {
    return {
      isFavorite: false,
      idArray: state.idArray,
    };
  }
};

export const AppContextProvider = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [movieID, setmovieID] = useState();
  const [query, setQuery] = useState("");
  const [moviesHomeList, setMoviesHomeList] = useState([]);
  const [favoriteState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let moviesArray = [];
    fetch(
      "https://netflix-clone-a2820-default-rtdb.firebaseio.com/HomeSection.json"
    )
      .then((data) => data.json())
      .then((data) => {
        for (const key in data) {
          moviesArray.push({
            id: key,
            ...data[key],
          });
        }
        setMoviesHomeList(moviesArray);
      });

    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    let moviesID = [];
    fetch(
      "https://netflix-clone-a2820-default-rtdb.firebaseio.com/favorites.json"
    )
      .then((data) => data.json())
      .then((data) => {
        for (const key in data) {
          moviesID.push(data[key]);
        }
        dispatch({ type: "initFavorites", favArray: moviesID });
      });
  }, [showModal]);

  const openModalHandler = (id) => {
    setShowModal(true);
    setmovieID(id);
  };
  const closeModalHandler = () => {
    setShowModal(false);
  };

  const resultsViewHandler = (input) => {
    dispatch({ type: "hideFavorites" });
    setIsSearching(true);
    setQuery(input);
  };

  const homeViewHandler = () => {
    setIsSearching(false);
    dispatch({ type: "hideFavorites" });
  };

  const showFavoritesHandler = async () => {
    dispatch({ type: "showFavorites" });
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
