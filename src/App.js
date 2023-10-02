import "./index";
import Header from "./UI/Header";
import Footer from "./UI/Footer";
import { useState } from "react";
import ResultsView from "./UI/ResultsView";
import SliderView from "./UI/SliderView";
import MovieModal from "./UI/MovieModal";
import Backdrop from "./UI/Backdrop";

const section = [
  { title: "Marvel", Query: "Marvel" },
  { title: "Spider-Man", Query: "Spider-Man" },
  { title: "Filmy docenione przez krytyków", Query: "Love" },
  { title: "Filmy sensacyjne", Query: "Kill" },
];

function App() {
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [movieID, setmovieID] = useState();

  const mainViewHandler = (input) => {
    setIsSearching(true);
    setQuery(input);
  };

  const ModalHandler = (id) => {
    setShowModal(true);
    setmovieID(id);
  };
  const closeModalHandler = () => {
    setShowModal(false);
  };

  const returnHomeHandler = () => {
    setIsSearching(false);
  };

  return (
    <>
      <Header
        mainViewHandler={mainViewHandler}
        returnHomeHandler={returnHomeHandler}
      />
      {showModal && (
        <>
          <Backdrop closeModalHandler={closeModalHandler}/>
          <MovieModal id={movieID} closeModalHandler={closeModalHandler} />
        </>
      )}
      {isSearching ? (
        <ResultsView onActionHandler={ModalHandler} query={query} />
      ) : (
        section.map((mov) => (
          <SliderView
            onActionHandler={ModalHandler}
            title={mov.title}
            query={mov.Query}
          />
        ))
      )}
      <Footer />
    </>
  );
}

export default App;
