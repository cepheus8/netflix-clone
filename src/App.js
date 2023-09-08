import "./index";
import Header from "./components/Header";
import HomeSection from "./components/HomeSection";
import Footer from "./components/Footer";
import { useState } from "react";
import Results from "./components/Results";

function App() {
  const [changeView, setChangeView] = useState(false);
  const [query, setQuery] = useState("");
  const mainViewHandler = (input) => {
    setChangeView(true);
    setQuery(input);
  };

  return (
    <>
      <Header mainViewHandler={mainViewHandler} />
      {!changeView ? <HomeSection /> : <Results query={query} />}
      <Footer />
    </>
  );
}

export default App;
