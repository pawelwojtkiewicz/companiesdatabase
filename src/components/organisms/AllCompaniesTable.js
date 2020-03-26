import React from 'react';
import { useStore } from 'store';
import CompanyTableElement from 'components/organisms/CompanyTableElement';
import Pagination from 'components/organisms/Pagination';

const AllCompaniesTable = () => {
    const { state, dispatch } = useStore();
    const {companiesInformations, companiesPagination} = state;
    const {currentPage} = companiesPagination;

    return (
        <>
            {companiesInformations[currentPage - 1].map(company => <CompanyTableElement company={company} key={company.id}/>)}
            <Pagination paginationParameters={companiesPagination} paginationType={"INFORMATIONS"}/>
        </>
    )
}

export default AllCompaniesTable;