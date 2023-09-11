import "./index";
import Header from "./components/Header";
import HomeSection from "./components/HomeSection";
import Footer from "./components/Footer";
import { useState } from "react";
import Results from "./components/Results";
import MovieModal from "./components/MovieModal";

function App() {
  const [changeView, setChangeView] = useState(false);
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  const mainViewHandler = (input) => {
    setChangeView(true);
    setQuery(input);
  };

  return (
    <>
      <Header mainViewHandler={mainViewHandler} />
      <MovieModal />
      {!changeView ? <HomeSection /> : <Results query={query} />}

      <Footer />
    </>
  );
}

export default App;
