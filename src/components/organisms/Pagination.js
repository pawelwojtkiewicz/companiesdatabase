import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useStore } from 'store';
import Button from 'components/atoms/Button';

const StyledWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

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

const chosenEqualsMaxPagination = (paginationType, dispatch, clickedPage) => {
    dispatch({ type: `SET_CURRENT_PAGE_COMPANIES_${paginationType}`, payload: clickedPage});
    dispatch({ type: `SET_PAGINATION_PAGE_RANGE_COMPANIES_${paginationType}`, payload: {min: clickedPage - 1, max: clickedPage + 3}});
}

const handlePagination = (event, paginationParameters, paginationType, dispatch) => {
    if(event.target.tagName !== "BUTTON") return;
    const clickedPage = Number(event.target.dataset.page);
    const {currentPage, maxGlobalPage, paginationRange} = paginationParameters;
    
    switch(clickedPage){
        case currentPage: return;
        case 1:
        case maxGlobalPage: return dispatch({ type: `SET_CURRENT_PAGE_COMPANIES_${paginationType}`, payload: clickedPage});
        case paginationRange.min: return chosenEqualsMinPagination(paginationType, dispatch, clickedPage);
        case paginationRange.max: return chosenEqualsMaxPagination(paginationType, dispatch, clickedPage);
        default: return dispatch({ type: `SET_CURRENT_PAGE_COMPANIES_${paginationType}`, payload: clickedPage});
    }
};

const Pagination = ({paginationParameters, paginationType}) => {
    const {currentPage} = paginationParameters;
    const { dispatch } = useStore();
    const pages = createPaginationPages(paginationParameters);
    return (
        <StyledWrapper onClick={event => handlePagination(event, paginationParameters, paginationType, dispatch)}>
            {pages.map(page => <Button data-page={page} activePagination={page === currentPage} pagination key={page}>{page}</Button>)}
        </StyledWrapper>
    ) 
}

Pagination.propTypes = {
    paginationParameters: PropTypes.shape({
        currentPage: PropTypes.number.isRequired,
        paginationRange: PropTypes.shape({
            min: PropTypes.number.isRequired,
            max: PropTypes.number.isRequired,
        }).isRequired,
        maxGlobalPage: PropTypes.number.isRequired,
    }).isRequired,
    paginationType: PropTypes.string.isRequired
};

export default Pagination;