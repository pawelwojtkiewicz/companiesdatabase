import React from 'react';
import { useStore } from 'store';

const createPaginationPages = (paginationParameters, pages = []) => {
    const {paginationRange, maxGlobalPage} = paginationParameters;
    for(let i = 0; i < 5; i++){
        if ((paginationRange.min + i) > maxGlobalPage) break;
        pages.push(paginationRange.min + i);
    }
    return pages;
}

const chosenEqualsMinPagination = (dispatch, clickedPage) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: clickedPage});
    dispatch({ type: 'SET_PAGINATION_PAGE_RANGE', payload: {min: clickedPage - 3, max: clickedPage + 1}});
}

const chosenEqualsMaxPagination = (dispatch, clickedPage, maxGlobalPage) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: clickedPage});
    if (clickedPage + 3 > maxGlobalPage) dispatch({ type: 'SET_PAGINATION_PAGE_RANGE', payload: {min: clickedPage - 1, max: maxGlobalPage}});
    else dispatch({ type: 'SET_PAGINATION_PAGE_RANGE', payload: {min: clickedPage - 1, max: clickedPage + 3}});
}

const handlePagination = (event, paginationParameters, dispatch) => {
    if(event.target.tagName !== "BUTTON") return;
    const clickedPage = Number(event.target.dataset.page);
    const {currentPage, maxGlobalPage, paginationRange} = paginationParameters;
    
    switch(clickedPage){
        case currentPage: return;
        case 0:
        case maxGlobalPage: return dispatch({ type: 'SET_CURRENT_PAGE', payload: clickedPage});
        case paginationRange.min: return chosenEqualsMinPagination(dispatch, clickedPage);
        case paginationRange.max: return chosenEqualsMaxPagination(dispatch, clickedPage, maxGlobalPage);
        default: return dispatch({ type: 'SET_CURRENT_PAGE', payload: clickedPage});
    }
};

const Pagination = ({paginationParameters}) => {
    const {currentPage} = paginationParameters;
    const { dispatch } = useStore();
    const pages = createPaginationPages(paginationParameters);
    return (
        <div onClick={event => handlePagination(event, paginationParameters, dispatch)}>
            {pages.map(page => page === currentPage ? <button data-page={page}><strong>{page + 1}</strong></button> : <button data-page={page}>{page + 1}</button>)}
        </div>
    ) 
}

export default Pagination;