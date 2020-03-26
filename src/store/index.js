import React, { createContext, useReducer, useContext } from 'react';

const defaultState = {
  companiesInformations: null,
  companiesPagination: {
    currentPage: 1,
    paginationRange: {min: 1, max: 5},
    maxGlobalPage: null,
  },
  companiesFiltered: null,
  companiesFilteredPagination: {
    currentPage: 1,
    paginationRange: {min: 1, max: 5},
    maxGlobalPage: null,
  }
};

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'SET_COMPANIES_INFORMATIONS_RESULT':
      return { ...state, companiesInformations: action.payload};



    case 'SET_CURRENT_PAGE_COMPANIES_INFORMATIONS':
      return { 
        ...state, 
        companiesPagination: {
          ...state.companiesPagination,
          currentPage: action.payload
        }
      };
    case 'SET_PAGINATION_PAGE_RANGE_COMPANIES_INFORMATIONS':
      return { 
        ...state, 
        companiesPagination: {
          ...state.companiesPagination,
          paginationRange: action.payload
        }
      };
    case 'SET_MAX_PAGES_COMPANIES_INFORMATIONS':
      return { 
        ...state, 
        companiesPagination: {
          ...state.companiesPagination,
          maxGlobalPage: action.payload
        }
      };
      case 'SET_COMPANIES_FILTERED':
        return { ...state, companiesFiltered: action.payload };
      case 'SET_CURRENT_PAGE_COMPANIES_FILTERED':
        return { 
          ...state, 
          companiesFilteredPagination: {
            ...state.companiesFilteredPagination,
            currentPage: action.payload
          }
        };
      case 'SET_PAGINATION_PAGE_RANGE_COMPANIES_FILTERED':
        return { 
          ...state, 
          companiesFilteredPagination: {
            ...state.companiesFilteredPagination,
            paginationRange: action.payload
          }
        };
      case 'SET_MAX_PAGES_COMPANIES_FILTERED':
        return { 
          ...state, 
          companiesFilteredPagination: {
            ...state.companiesFilteredPagination,
            maxGlobalPage: action.payload
          }
        };
      case 'RESET_MAX_PAGES_COMPANIES_FILTERED':
        return { 
          ...state,
          companiesFiltered: null,
          companiesFilteredPagination: {
            ...state.companiesFilteredPagination,
            currentPage: 1,
            paginationRange: {min: 1, max: 5},
            maxGlobalPage: null,
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