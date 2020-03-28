import React, { createContext, useReducer, useContext } from 'react';

const defaultState = {
  companiesInformations: null,
  companiesPaginationPage: 1,
  companiesFilteredInformations: null,
  companiesFilteredPaginationPage: 1,
};

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'SET_COMPANIES_INFORMATIONS_RESULT':
      return { ...state, companiesInformations: action.payload};
    case 'SET_COMPANIES_INFORMATIONS_CURRENT_PAGE':
      return { ...state, companiesPaginationPage: action.payload};
    case 'SET_FILTERED_COMPANIES_INFORMATIONS_RESULT':
      return { ...state, companiesFilteredInformations: action.payload};
    case 'RESET_FILTERED_COMPANIES_INFORMATIONS_RESULT':
      return { ...state, companiesFilteredInformations: null};
    case 'SET_FILTERED_COMPANIES_INFORMATIONS_CURRENT_PAGE':
      return { ...state, companiesFilteredPaginationPage: action.payload};
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