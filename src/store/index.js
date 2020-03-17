import React, { createContext, useReducer, useContext } from 'react';

const defaultState = {
  companiesInformations: null
};

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'SET_COMPANIES_INFORMATIONS':
      return { ...state, companiesInformations: action.payload };
    default:
      return state;
  }
}

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const value = { state, dispatch };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);