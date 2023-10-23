import "./index";
import Header from "./UI/Header";
import Footer from "./UI/Footer";
import { useContext } from "react";
import ResultsView from "./UI/ResultsView";
import SliderView from "./UI/SliderView";
import MovieModal from "./UI/MovieModal";
import Backdrop from "./UI/Backdrop";
import AppContext from "./context/appContext";

function App() {
  const { showModal, isSearching, moviesHomeList, favoriteState } =
    useContext(AppContext);

  return (
    <>
      <Header />
      {showModal && (
        <>
          <Backdrop />
          <MovieModal />
        </>
      )}
      {isSearching && (
        <div>
          <ResultsView />
        </div>
      )}
      {favoriteState.isFavorite && (
        <div>
          <ResultsView />
        </div>
      )}
      {!isSearching && !favoriteState.isFavorite && (
        <div>
          {moviesHomeList.map((mov) => (
            <SliderView title={mov.title} query={mov.Query} key={mov.id} />
          ))}
        </div>
      )}
      <Footer />
    </>
  );
}

export default App;
