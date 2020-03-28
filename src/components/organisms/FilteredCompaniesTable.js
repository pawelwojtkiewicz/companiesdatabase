import React from 'react';
import { useStore } from 'store';
import CompanyTableElement from 'components/organisms/CompanyTableElement';
import Pagination from 'services/Pagination';

const FilteredCompaniesTable = () => {
    const { state } = useStore();
    const {companiesFilteredInformations, companiesFilteredPaginationPage} = state;
    const setCurrentPageAction = `SET_FILTERED_COMPANIES_INFORMATIONS_CURRENT_PAGE`;

    return (
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