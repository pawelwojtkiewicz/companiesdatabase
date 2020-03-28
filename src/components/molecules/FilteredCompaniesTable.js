import React from 'react';
import { useStore } from 'store';
import CompanyTableElement from 'components/organisms/CompanyTableElement';
import Pagination from 'services/Pagination';
import AlertContainer from 'components/atoms/AlertContainer';

const ElementNotFound = () => (
    <AlertContainer>
        The given phrase has not been found.
    </AlertContainer>
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