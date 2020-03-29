import React, { useState } from 'react';
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

const SearchBar = ({companiesInformations}) => {
    const { dispatch } = useStore();
    const [searchValue, setSearchValue] = useState("");

    const filterCompanies = companiesInformations => {
        if(searchValue === "") return;
        const companiesFiltered = companiesInformations.filter(companyData => companyData.name.toLowerCase().includes(searchValue.toLowerCase())).map(companyData => companyData);
        dispatch({ type: 'SET_FILTERED_COMPANIES_INFORMATIONS_RESULT', payload: companiesFiltered });
    }
    
    const clearfilterCompanies = () => {
        setSearchValue("");
        dispatch({ type: 'RESET_FILTERED_COMPANIES_INFORMATIONS_RESULT'});
    }

    return (
        <StyledWrapper>
            <InputText
                searcher
                placeholder={"search by name"}
                value={searchValue}
                onChange={event => setSearchValue(event.target.value)}
                onKeyDown={event => event.key === 'Enter' && filterCompanies(companiesInformations)}
            />
            <ButtonsContainer>
                <Button searcher bgColor={"#7cc17c"} onClick={() => filterCompanies(companiesInformations)}>find</Button>
                <Button searcher bgColor={"#ef5858"} onClick={clearfilterCompanies}>clear</Button>
            </ButtonsContainer>
        </StyledWrapper>
    )
}

export default SearchBar;