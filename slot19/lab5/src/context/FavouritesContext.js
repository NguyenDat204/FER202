import React, { createContext, useReducer, useMemo } from "react";

export const FavouritesContext = createContext();

const initialState = {
  items: []
};

function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAV":
      return state.items.includes(action.payload)
        ? { ...state, items: state.items.filter((id) => id !== action.payload) }
        : { ...state, items: [...state.items, action.payload] };

    case "CLEAR_FAV":
      return { ...state, items: [] };

    default:
      return state;
  }
}

export const FavouritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favouritesReducer, initialState);

  const toggleFavourite = (id) => {
    dispatch({ type: "TOGGLE_FAV", payload: id });
  };

  const clearFavourites = () => {
    dispatch({ type: "CLEAR_FAV" });
  };

  const value = useMemo(
    () => ({
      favourites: state.items || [],
      toggleFavourite,
      clearFavourites,
    }),
    [state.items]
  );

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};
