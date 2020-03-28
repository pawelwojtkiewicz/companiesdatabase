import React from 'react';
import { useStore } from 'store';
import styled from 'styled-components';
import Button from 'components/atoms/Button';

const StyledWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const countTotalPages = (tableWithAllElements, pageSize) => Math.ceil(tableWithAllElements.length / pageSize);

const countPagesRange = (actuallyPage, totalPages) => {
    if(totalPages <= 6) return {startPage: 1, endPage: totalPages};
    else {
        if (actuallyPage <= 4) return { startPage: 1, endPage: 6};
        else if (actuallyPage + 2 >= totalPages) return { startPage: totalPages - 5, endPage: totalPages};
        else return {startPage: actuallyPage - 3, endPage: actuallyPage + 2};
    }
}  

const countPages = ({startPage, endPage}) => [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

const getPageElements = (tableWithAllElements, pageSize, actuallyPage) => tableWithAllElements.slice((actuallyPage - 1) * pageSize, actuallyPage * pageSize);

const Pagination = ({tableWithAllElements, actuallyPage, setCurrentPageAction, pageSize = 10, render}) => {
    const { dispatch } = useStore();
    const handlePagination = event => {
        if(event.target.tagName !== "BUTTON") return;
        const clickedPage = Number(event.target.dataset.page);
        dispatch({ type: setCurrentPageAction, payload: clickedPage});
    }
    
    const totalPages = countTotalPages(tableWithAllElements, pageSize);
    const pagesRange = countPagesRange(actuallyPage, totalPages);
    const pages = countPages(pagesRange);
    const pageElements = getPageElements(tableWithAllElements, pageSize, actuallyPage);

    return(
        <>
            {render(pageElements)}
            <StyledWrapper onClick={event => handlePagination(event, setCurrentPageAction)}>
                {pages.map(page => <Button data-page={page} activePagination={page === actuallyPage} pagination key={page}>{page}</Button>)}
            </StyledWrapper>
        </>
    )
}

export default Pagination;