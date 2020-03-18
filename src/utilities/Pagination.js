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

const chosenEqualsMinPagination = (paginationType, dispatch, clickedPage) => {
    dispatch({ type: `SET_CURRENT_PAGE_COMPANIES_${paginationType}`, payload: clickedPage});
    dispatch({ type: `SET_PAGINATION_PAGE_RANGE_COMPANIES_${paginationType}`, payload: {min: clickedPage - 3, max: clickedPage + 1}});
}

const chosenEqualsMaxPagination = (paginationType, dispatch, clickedPage, maxGlobalPage) => {
    dispatch({ type: `SET_CURRENT_PAGE_COMPANIES_${paginationType}`, payload: clickedPage});
    if (clickedPage + 3 > maxGlobalPage) dispatch({ type: `SET_PAGINATION_PAGE_RANGE_COMPANIES_${paginationType}`, payload: {min: clickedPage - 1, max: maxGlobalPage}});
    else dispatch({ type: `SET_PAGINATION_PAGE_RANGE_COMPANIES_${paginationType}`, payload: {min: clickedPage - 1, max: clickedPage + 3}});
}

const handlePagination = (event, paginationParameters, paginationType, dispatch) => {
    if(event.target.tagName !== "BUTTON") return;
    const clickedPage = Number(event.target.dataset.page);
    const {currentPage, maxGlobalPage, paginationRange} = paginationParameters;
    
    switch(clickedPage){
        case currentPage: return;
        case 0:
        case maxGlobalPage: return dispatch({ type: `SET_CURRENT_PAGE_COMPANIES_${paginationType}`, payload: clickedPage});
        case paginationRange.min: return chosenEqualsMinPagination(paginationType, dispatch, clickedPage);
        case paginationRange.max: return chosenEqualsMaxPagination(paginationType, dispatch, clickedPage, maxGlobalPage);
        default: return dispatch({ type: `SET_CURRENT_PAGE_COMPANIES_${paginationType}`, payload: clickedPage});
    }
};

const Pagination = ({paginationParameters, paginationType}) => {
    const {currentPage} = paginationParameters;
    const { dispatch } = useStore();
    const pages = createPaginationPages(paginationParameters);
    return (
        <div onClick={event => handlePagination(event, paginationParameters, paginationType, dispatch)}>
            {pages.map(page => page === currentPage ? <button data-page={page}><strong>{page + 1}</strong></button> : <button data-page={page}>{page + 1}</button>)}
        </div>
    ) 
}

export default Pagination;