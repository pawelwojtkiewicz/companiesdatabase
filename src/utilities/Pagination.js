import React from 'react';
import { useStore } from 'store';

const createPaginationPages = (paginationParameters, pages = []) => {
    const {minPaginationPage, maxPaginationPages, maxGlobalPage} = paginationParameters;
    for(let i = 0; i < maxPaginationPages; i++){
        if ((minPaginationPage + i) > maxGlobalPage) break;
        pages.push(minPaginationPage + i);
    }
    return pages;
}

const chosenEqualsMinPagination = (dispatch, clickedPage) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: clickedPage});
    dispatch({ type: 'SET_MIN_PAGINATION_PAGE', payload: clickedPage - 3 });
    dispatch({ type: 'SET_MAX_PAGINATION_PAGE', payload: clickedPage + 1 });
}

const chosenEqualsMaxPagination = (dispatch, clickedPage, maxGlobalPage) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: clickedPage});
    dispatch({ type: 'SET_MIN_PAGINATION_PAGE', payload: clickedPage - 1});
    if(clickedPage + 3 > maxGlobalPage){
        dispatch({ type: 'SET_MAX_PAGINATION_PAGE', payload: maxGlobalPage });   
    } else dispatch({ type: 'SET_MAX_PAGINATION_PAGE', payload: clickedPage + 3 });   
}

const handlePagination = (event, paginationParameters, dispatch) => {
    if(event.target.tagName !== "BUTTON") return;
    const clickedPage = Number(event.target.innerText);
    const {currentPage, maxGlobalPage, minPaginationPage, maxPaginationPage} = paginationParameters;
    
    switch(clickedPage){
        case currentPage: return;
        case 1:
        case maxGlobalPage: return dispatch({ type: 'SET_CURRENT_PAGE', payload: clickedPage});
        case minPaginationPage: return chosenEqualsMinPagination(dispatch, clickedPage);
        case maxPaginationPage: return chosenEqualsMaxPagination(dispatch, clickedPage, maxGlobalPage);
        default: return dispatch({ type: 'SET_CURRENT_PAGE', payload: clickedPage});
    }
};

const Pagination = paginationParameters => {
    const {currentPage} = paginationParameters;
    const { dispatch } = useStore();
    const pages = createPaginationPages(paginationParameters);
    return (
        <div onClick={event => handlePagination(event, paginationParameters, dispatch)}>
            <div>
                prev
            </div>
                {pages.map(page => page === currentPage ? <button><strong>{page}</strong></button> : <button>{page}</button>)}
            <div>
                next
            </div>
        </div>
    ) 
}

export default Pagination;