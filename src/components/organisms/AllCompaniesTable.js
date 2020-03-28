import React from 'react';
import { useStore } from 'store';
import CompanyTableElement from 'components/organisms/CompanyTableElement';
import Pagination from 'services/Pagination';

const AllCompaniesTable = () => {
    const { state } = useStore();
    const {companiesInformations, companiesPaginationPage} = state;
    const setCurrentPageAction = `SET_COMPANIES_INFORMATIONS_CURRENT_PAGE`;

    return (
        <Pagination
            tableWithAllElements={companiesInformations}
            actuallyPage={companiesPaginationPage}
            setCurrentPageAction={setCurrentPageAction}
            render={paginationData => (
            paginationData.map(company => <CompanyTableElement company={company} key={company.id}/>)
        )} />
    )
    // return (
    //     // <>
    //     //     {companiesInformations[currentPage - 1].map(company => <CompanyTableElement company={company} key={company.id}/>)}
    //     //     <Pagination paginationParameters={companiesPagination} paginationType={"INFORMATIONS"}/>
    //     // </>
    //     <>
    //         <Pagination render={({currentPageElements}) => (
    //             currentPageElements.map(companyInformations => <div>Firma</div>)
    //         )} />
    //     </>
    // )
}

export default AllCompaniesTable;