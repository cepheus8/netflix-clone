import { createContext, useState, useReducer } from "react";

const initialView = {
  mainView: true,
  searchView: false,
  favoritesView: false,
};

const AppContext = createContext({
  showModal: false,
  id: "",
  query: "",
  openModalHandler: (id) => {},
  closeModalHandler: () => {},
  homeViewHandler: () => {},
  resultsViewHandler: (input) => {},
  showFavoritesHandler: () => {},

  mainView: initialView.mainView,
  searchView: initialView.searchView,
  favoritesView: initialView.searchView,
});

const viewReducer = (state, action) => {
  if (action.type === "sliderView") {
    return {
      mainView: true,
      searchView: false,
      favoritesView: false,
    };
  }
  if (action.type === "resultsView") {
    return {
      mainView: false,
      searchView: true,
      favoritesView: false,
    };
  }

  if (action.type === "favoriteView") {
    return {
      mainView: false,
      searchView: false,
      favoritesView: true,
    };
  }
};

export const AppContextProvider = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [movieID, setmovieID] = useState("");
  const [query, setQuery] = useState("");

  const [viewState, dispatchViewState] = useReducer(viewReducer, initialView);

  const openModalHandler = (id) => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
    setmovieID(id);
  };
  const closeModalHandler = () => {
    setShowModal(false);
    document.body.style.overflow = "visible";
  };

  const resultsViewHandler = (input) => {
    dispatchViewState({ type: "resultsView" });
    setQuery(input);
  };

  const homeViewHandler = () => {
    dispatchViewState({ type: "sliderView" });
  };

  const showFavoritesHandler = () => {
    dispatchViewState({ type: "favoriteView" });
  };

  const context = {
    showModal,
    id: movieID,
    query,
    openModalHandler,
    closeModalHandler,
    homeViewHandler,
    resultsViewHandler,
    showFavoritesHandler,
    mainView: viewState.mainView,
    searchView: viewState.searchView,
    favoritesView: viewState.favoritesView,
  };

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
};

export default AppContext;
