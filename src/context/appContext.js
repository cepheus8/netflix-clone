import { createContext, useState, useEffect } from "react";

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
});

export const AppContextProvider = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [movieID, setmovieID] = useState();
  const [query, setQuery] = useState("");
  const [moviesHomeList, setMoviesHomeList] = useState([]);

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
  };

  const homeViewHandler = () => {
    setIsSearching(false);
  };

  const context = {
    showModal: showModal,
    isSearching: isSearching,
    id: movieID,
    query: query,
    openModalHandler: openModalHandler,
    closeModalHandler: closeModalHandler,
    homeViewHandler: homeViewHandler,
    resultsViewHandler: resultsViewHandler,
    moviesHomeList: moviesHomeList,
  };

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
};

export default AppContext;
