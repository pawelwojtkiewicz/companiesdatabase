import React from 'react';
import styled from 'styled-components';
import { useStore } from 'store';
import CompanyTableElement from 'components/organisms/CompanyTableElement';
import Pagination from 'services/Pagination';

const StyledElementNotFound = styled.div`
    font-size: 20px;
    text-align: center;
    padding: 30px 0 0 0px;
`;

const ElementNotFound = () => (
    <StyledElementNotFound>
        The given phrase has not been found.
    </StyledElementNotFound>
)

const FilteredCompaniesTable = () => {
    const { state } = useStore();
    const {companiesFilteredInformations, companiesFilteredPaginationPage} = state;
    const setCurrentPageAction = `SET_FILTERED_COMPANIES_INFORMATIONS_CURRENT_PAGE`;

    if(companiesFilteredInformations.length === 0) return <ElementNotFound />
    else return (
        <Pagination
            tableWithAllElements={companiesFilteredInformations}
            actuallyPage={companiesFilteredPaginationPage}
            setCurrentPageAction={setCurrentPageAction}
            render={paginationData => (
            paginationData.map(company => <CompanyTableElement company={company} key={company.id}/>)
        )} />
    )
}

export default FilteredCompaniesTable;