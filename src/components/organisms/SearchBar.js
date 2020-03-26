import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useStore } from 'store';
import InputText from 'components/atoms/InputText';
import Button from 'components/atoms/Button';

const StyledWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 0 20px 0;

    @media (max-width: 520px) {
        & {
            justify-content: center;
        }
    }
`;

const ButtonsContainer = styled.div`
    display: flex;
    
    @media (max-width: 520px) {
        & {
            justify-content: center;
            width: 100%;
            margin: 20px 0;
        }
    }
`;
const splitResultIntoGroups = (array, cache = []) => {
    while (array.length) cache.push(array.splice(0, 10));
    return cache;
}

const filterCompanies = (searchInput, companiesInformations, dispatch) => {
    if(searchInput.current.value === "") return;

    const companiesFiltered = companiesInformations.flat().filter(companyData => companyData.name.toLowerCase().includes
    (searchInput.current.value.toLowerCase())).map(companyData => companyData);
    
    const companiesFilteredSplited = splitResultIntoGroups(companiesFiltered)
    dispatch({ type: 'SET_MAX_PAGES_COMPANIES_FILTERED', payload: companiesFilteredSplited.length });
    dispatch({ type: 'SET_COMPANIES_FILTERED', payload: companiesFilteredSplited.length ? companiesFilteredSplited : null });
}

const clearfilterCompanies = (searchInput, dispatch) => {
    if(searchInput.current.value === "") return;
    searchInput.current.value = "";

    dispatch({ type: 'RESET_MAX_PAGES_COMPANIES_FILTERED'});
}

const SearchBar = ({children, companiesInformations}) => {
    const { dispatch } = useStore();
    const searchInput = useRef(null);

    return (
        <>
            <StyledWrapper>
                <InputText searcher ref={searchInput} />
                <ButtonsContainer>
                    <Button searcher bgColor={"#7cc17c"} onClick={() => filterCompanies(searchInput, companiesInformations, dispatch)}>find</Button>
                    <Button searcher bgColor={"#ef5858"} onClick={() => clearfilterCompanies(searchInput, dispatch)}>clear</Button>
                </ButtonsContainer>
            </StyledWrapper>
            {children}
        </>
    )
}

export default SearchBar;