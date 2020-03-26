import React from 'react';
import { useStore } from 'store';
import CompanyTableElement from 'components/organisms/CompanyTableElement';
import Pagination from 'components/organisms/Pagination';

const FilteredCompaniesTable = () => {
    const { state, dispatch } = useStore();
    const {companiesFiltered, companiesFilteredPagination} = state;
    const {currentPage} = companiesFilteredPagination;

    return (
        <>
            {companiesFiltered[currentPage - 1].map(company => <CompanyTableElement company={company} key={company.id}/>)}
            <Pagination paginationParameters={companiesFilteredPagination} paginationType={"FILTERED"}/>          
        </>
    )
}

export default FilteredCompaniesTable;