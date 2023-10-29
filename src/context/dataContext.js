import { createContext, useState, useEffect, useReducer } from "react";

const initialFavorites = {
  idArray: [],
  refArray: [],
};

const dataContext = createContext({
  addToFavoriteHandler: () => {},
  removeFavoriteHandler: () => {},
  moviesHomeList: [],
});

const favoriteReducer = (state, action) => {
  if (action.type === "initFavorites") {
    return {
      idArray: action.favArray,
      refArray: action.refArray,
    };
  }
  if (action.type === "addFavorite") {
    return {
      idArray: [...state.idArray, action.id],
      refArray: [...state.refArray, action.ref],
    };
  }

  if (action.type === "deleteFavorites") {
    return {
      idArray: state.idArray.filter((id) => id !== action.id),
      refArray: state.refArray.filter((ref) => ref !== action.ref),
    };
  }
};

export const DataContextProvider = (props) => {
  const [moviesHomeList, setMoviesHomeList] = useState([]);
  const [favoriteState, dispatchFavoriteState] = useReducer(
    favoriteReducer,
    initialFavorites
  );

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

    let moviesID = [];
    let refsID = [];
    fetch(
      "https://netflix-clone-a2820-default-rtdb.firebaseio.com/favorites.json"
    )
      .then((data) => data.json())
      .then((data) => {
        for (const key in data) {
          moviesID.push(data[key]);
          refsID.push(key);
        }

        dispatchFavoriteState({
          type: "initFavorites",
          favArray: moviesID,
          refArray: refsID,
        });
      });
  }, []);

  const addToFavoriteHandler = async (id) => {
    const response = await fetch(
      "https://netflix-clone-a2820-default-rtdb.firebaseio.com/favorites.json",
      {
        method: "POST",
        body: JSON.stringify(id),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    const ref = data.name;
    console.log(ref);

    dispatchFavoriteState({ type: "addFavorite", id: id, ref: ref });
  };

  const removeFavoriteHandler = async (id) => {
    const movieIndex = favoriteState.idArray.indexOf(id);
    const removedRef = favoriteState.refArray[movieIndex];

    fetch(
      `https://netflix-clone-a2820-default-rtdb.firebaseio.com/favorites/${removedRef}.json`,
      { method: "DELETE" }
    ).then((data) => {
      console.log(data);
    });

    dispatchFavoriteState({
      type: "deleteFavorites",
      id: id,
      ref: removedRef,
    });
  };

  const context = {
    removeFavoriteHandler,
    moviesHomeList,
    addToFavoriteHandler,
    idArray: favoriteState.idArray,
  };

  return (
    <dataContext.Provider value={context}>
      {props.children}
    </dataContext.Provider>
  );
};

export default dataContext;
