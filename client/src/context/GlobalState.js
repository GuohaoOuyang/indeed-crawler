import React, { createContext, useReducer } from "react";
import reducer from "./AppReducer";

const GlobalContext = createContext();

const initialState = {
  loading: false,
  error: null,
  tags: [],
  jobs: [],
  searchTerm: "",
};

const GlobalState = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        dispatch,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalState };
