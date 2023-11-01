import "./index";
import Header from "./UI/Header";
import Footer from "./UI/Footer";
import { useContext } from "react";
import ResultsView from "./UI/ResultsView";
import SliderView from "./UI/SliderView";
import MovieModal from "./UI/MovieModal";
import Backdrop from "./UI/Backdrop";
import AppContext from "./context/appContext";
import DataContext from "./context/dataContext";

function App() {
  const { showModal, mainView, searchView, favoritesView } =
    useContext(AppContext);
  const { moviesHomeList } = useContext(DataContext);

  return (
    <>
      <Header />
      <main>
        {showModal && (
          <>
            <Backdrop />
            <MovieModal />
          </>
        )}
        {searchView && <ResultsView />}
        {favoritesView && <ResultsView />}
        {mainView &&
          moviesHomeList.map((mov) => (
            <SliderView title={mov.title} query={mov.Query} key={mov.id} />
          ))}
      </main>
      <Footer />
    </>
  );
}

export default App;
