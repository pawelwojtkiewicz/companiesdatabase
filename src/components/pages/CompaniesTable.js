import React, { useState, useEffect } from 'react';
import { useStore } from 'store';
import MainTemplate from 'components/templates/MainTemplate'
import CompanyTableElement from 'components/organisms/CompanyTableElement';
import Pagination from 'components/organisms/Pagination';
import SearchBar from 'components/organisms/SearchBar';

const getBasicCompaniesData = basicCompaniesDataURL => {
    return fetch(basicCompaniesDataURL)
        .then(response => {
            if (response.ok) return response.json();
            else return "error";
        })
        .catch(errorDetails => ({error: true, errorDetails}));
};

const getIncomesFromCompany = (companyIncomesURL, companyId) => {
    return fetch(companyIncomesURL + companyId)
        .then(response => {
            if (response.ok) return response.json();
            else return "error";
        })
        .then(responce => responce.incomes)
        .catch(errorDetails => ({error: true, errorDetails}));
};

const submitCompanyIncome = incomes => {
    return incomes.reduce((acc, income) => {                            
        return acc + Number(income.value);
    }, 0);
};

const sortCompaniesListDescending = companiesData => companiesData.sort((a, b) => b.totalIncome - a.totalIncome);

const splitResultIntoGroups = (array, cache = []) => {
    while (array.length) cache.push(array.splice(0, 10));
    return cache;
}

const addIncomesForEveryCompany = (basicCompaniesData, companyIncomesURL) => {
    const companyDataWithIncomes = basicCompaniesData.map(basicCompanyData => { 
        const companyId = basicCompanyData.id;
        return getIncomesFromCompany(companyIncomesURL, companyId)
            .then(allIncomes => {
                const totalIncome = submitCompanyIncome(allIncomes);
                return {...basicCompanyData, allIncomes, totalIncome};
            });
    })
    return Promise.all(companyDataWithIncomes);
}

const handleError = (error, changeLoadingStatus, dispatch) => {
    dispatch({ type: 'SET_COMPANIES_INFORMATIONS', payload: error });
    changeLoadingStatus(false);
}

const getCompaniesData = async (companiesInformations, changeLoadingStatus, dispatch) => {
    if(companiesInformations) return;

    const basicCompaniesDataURL = `https://recruitment.hal.skygate.io/companies`;
    const companyIncomesURL = `https://recruitment.hal.skygate.io/incomes/`;

    const basicCompaniesData = await getBasicCompaniesData(basicCompaniesDataURL);
    if(basicCompaniesData.error) return handleError(basicCompaniesData, changeLoadingStatus, dispatch)
    const companiesData = await addIncomesForEveryCompany(basicCompaniesData, companyIncomesURL);
    if(companiesData.error) return handleError(companiesData, changeLoadingStatus, dispatch);
    const sortedCompaniesData = sortCompaniesListDescending(companiesData);
    const splitedCompaniesData = splitResultIntoGroups(sortedCompaniesData);
    
    dispatch({ type: 'SET_MAX_PAGES_COMPANIES_INFORMATIONS', payload: splitedCompaniesData.length });
    dispatch({ type: 'SET_COMPANIES_INFORMATIONS', payload: splitedCompaniesData });
    changeLoadingStatus(false);
}

const CompaniesTable = () => {
    const [loadingStatus, changeLoadingStatus] = useState(true);
    const { state, dispatch } = useStore();
    const {companiesInformations, companiesPagination, companiesFiltered, companiesFilteredPagination} = state;
    useEffect(() => {getCompaniesData(companiesInformations, changeLoadingStatus, dispatch)}, []);
    
    const Error = () => (<div>Fail to download date, please try again</div>)

    const MainTable = () => {
        const {currentPage} = companiesPagination;
        return (
            <>  
                {companiesInformations[currentPage - 1].map(company => <CompanyTableElement company={company} key={company.id}/>)}
                <Pagination paginationParameters={companiesPagination} paginationType={"INFORMATIONS"}/>
            </>
        )
    }
    const FilteredTable = () => {
        const {currentPage} = companiesFilteredPagination;
        return (
            <>
                {companiesFiltered[currentPage - 1].map(company => <CompanyTableElement company={company} key={company.id}/>)}
                <Pagination paginationParameters={companiesFilteredPagination} paginationType={"FILTERED"}/>          
            </>
        )
    }

    if(loadingStatus){
        return (
            <>
                <div>Loading...</div> 
            </>   
        )
    } else if(!companiesInformations.error){
        return (
            <MainTemplate>
                <SearchBar companiesInformations={companiesInformations}/>
                {companiesFiltered ? <FilteredTable /> : <MainTable />}
            </MainTemplate>
        )
    } else if(companiesInformations){
        return(
            <Error />
        )
    }
}

export default CompaniesTable;