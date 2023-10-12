import "./index";
import Header from "./UI/Header";
import Footer from "./UI/Footer";
import { useState, useEffect } from "react";
import ResultsView from "./UI/ResultsView";
import SliderView from "./UI/SliderView";
import MovieModal from "./UI/MovieModal";
import Backdrop from "./UI/Backdrop";

function App() {
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [movieID, setmovieID] = useState();
  const [moviesSlider, setMoviesSlider] = useState([]);

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
        setMoviesSlider(moviesArray);
      });

    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [showModal]);

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
          <Backdrop closeModalHandler={closeModalHandler} />
          <MovieModal id={movieID} closeModalHandler={closeModalHandler} />
        </>
      )}
      {isSearching ? (
        <div>
          <ResultsView onActionHandler={ModalHandler} query={query} />
        </div>
      ) : (
        <div>
          {moviesSlider.map((mov) => (
            <SliderView
              onActionHandler={ModalHandler}
              title={mov.title}
              query={mov.Query}
              key={mov.id}
            />
          ))}
        </div>
      )}
      <Footer />
    </>
  );
}

export default App;
