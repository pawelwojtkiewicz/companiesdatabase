import React, { createContext, useReducer, useContext } from 'react';

const defaultState = {
  companiesInformations: null,
  companiesPagination: {
    currentPage: 1,
    minPaginationPage: 1,
    maxPaginationPage: 5,
    maxGlobalPage: null,
  }
};

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'SET_COMPANIES_INFORMATIONS':
      return { ...state, companiesInformations: action.payload };
    case 'SET_CURRENT_PAGE':
      return { 
        ...state, 
        companiesPagination: {
          ...state.companiesPagination,
          currentPage: action.payload
        }
      };
    case 'NEXT_CURRENT_PAGE':
      return { 
        ...state, 
        companiesPagination: {
          ...state.companiesPagination,
          currentPage: state.currentPage++
        }
      };
    case 'PREV_CURRENT_PAGE':
       return { 
        ...state, 
        companiesPagination: {
          ...state.companiesPagination,
          currentPage: state.currentPage--
        }
      };
    case 'SET_MIN_PAGINATION_PAGE':
       return { 
        ...state, 
        companiesPagination: {
          ...state.companiesPagination,
          minPaginationPage: action.payload
        }
      };
    case 'SET_MAX_PAGINATION_PAGE':
       return { 
        ...state, 
        companiesPagination: {
          ...state.companiesPagination,
          maxPaginationPage: action.payload
        }
      };
    case 'SET_MAX_PAGES':
       return { 
        ...state, 
        companiesPagination: {
          ...state.companiesPagination,
          maxGlobalPage: action.payload
        }
      };
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