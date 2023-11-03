import { createContext, useState, useEffect, useReducer } from "react";

const initialFavorites = {
  idArray: [],
  refArray: [],
};

const dataContext = createContext({
  addToFavoriteHandler: () => {},
  removeFavoriteHandler: () => {},
  moviesHomeList: [],
  errorNotification: false,
  hideNotificationHandler: () => {},
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
  if (action.type === "error") {
    return {
      idArray: action.favArray,
      refArray: action.refArray,
    };
  }
};

export const DataContextProvider = (props) => {
  const [moviesHomeList, setMoviesHomeList] = useState([]);
  const [errorNotification, setErrorNotification] = useState(false);
  const [favoriteState, dispatchFavoriteState] = useReducer(
    favoriteReducer,
    initialFavorites
  );

  useEffect(() => {
    let moviesArray = [];
    fetch(
      "https://netflix-clone-a2820-default-rtdb.firebaseio.com/HomeSection.json"
    )
      .then((data) => {
        if (!data.ok) {
          throw Error("Failed to fetch the data");
        } else {
          return data.json();
        }
      })
      .then((data) => {
        for (const key in data) {
          moviesArray.push({
            id: key,
            ...data[key],
          });
        }
        setMoviesHomeList(moviesArray);
      })
      .catch((error) => {
        console.log(error);
        setMoviesHomeList(undefined);
      });

    let moviesID = [];
    let refsID = [];
    fetch(
      "https://netflix-clone-a2820-default-rtdb.firebaseio.com/favorites.json"
    )
      .then((data) => {
        if (!data.ok) {
          throw Error("Failed to fetch the data");
        } else {
          return data.json();
        }
      })
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
      })
      .catch((error) => {
        console.log(error);
        dispatchFavoriteState({
          type: "error",
          favArray: undefined,
          refArray: undefined,
        });
      });
  }, []);

  const addToFavoriteHandler = async (id) => {
    try {
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
      if (!response.ok) {
        throw new Error("Connection failed");
      }
      const data = await response.json();

      const ref = data.name;

      dispatchFavoriteState({ type: "addFavorite", id: id, ref: ref });
    } catch (error) {
      setErrorNotification(true);
    }
  };

  const removeFavoriteHandler = async (id) => {
    setErrorNotification(false);
    const movieIndex = favoriteState.idArray.indexOf(id);
    const removedRef = favoriteState.refArray[movieIndex];

    fetch(
      `https://netflix-clone-a2820-default-rtdb.firebaseio.com/favorites/${removedRef}.json`,
      { method: "DELETE" }
    )
      .then((data) => {
        if (!data.ok) {
          throw new Error("Failed to fetch the data");
        } else {
          dispatchFavoriteState({
            type: "deleteFavorites",
            id: id,
            ref: removedRef,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorNotification(true);
      });
  };

  const hideNotificationHandler = () => {
    setErrorNotification(false);
  };

  const context = {
    removeFavoriteHandler,
    moviesHomeList,
    addToFavoriteHandler,
    idArray: favoriteState.idArray,
    errorNotification,
    hideNotificationHandler,
  };

  return (
    <dataContext.Provider value={context}>
      {props.children}
    </dataContext.Provider>
  );
};

export default dataContext;
