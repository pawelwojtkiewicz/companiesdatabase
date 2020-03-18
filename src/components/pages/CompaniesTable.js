import React, { useEffect } from 'react';
import { useStore } from 'store';
import CompanyTableElement from 'components/organisms/CompanyTableElement.js';
import Pagination from 'utilities/Pagination';

const getBasicCompaniesData = basicCompaniesDataURL => {
    return fetch(basicCompaniesDataURL)
        .then(response => {
            if (response.ok) return response.json();
            else return "error";
        })
        .catch(error => error);
};

const getIncomesFromCompany = (companyIncomesURL, companyId) => {
    return fetch(companyIncomesURL + companyId)
        .then(response => {
            if (response.ok) return response.json();
            else return "error";
        })
        .then(responce => responce.incomes)
        .catch(error => error);
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

const getCompaniesData = async (companiesInformations, dispatch) => {
    if(companiesInformations) return;

    const basicCompaniesDataURL = `https://recruitment.hal.skygate.io/companies`;
    const companyIncomesURL = `https://recruitment.hal.skygate.io/incomes/`;

    const basicCompaniesData = await getBasicCompaniesData(basicCompaniesDataURL);
    const companiesData = await addIncomesForEveryCompany(basicCompaniesData, companyIncomesURL);
    const sortedCompaniesData = sortCompaniesListDescending(companiesData);
    const splitedCompaniesData = splitResultIntoGroups(sortedCompaniesData);
    
    dispatch({ type: 'SET_MAX_PAGES', payload: splitedCompaniesData.length });
    dispatch({ type: 'SET_COMPANIES_INFORMATIONS', payload: splitedCompaniesData });
}

const CompaniesTable = () => {
    const { state, dispatch } = useStore();
    const {companiesInformations} = state;
    useEffect(() => {getCompaniesData(companiesInformations, dispatch)}, []);
    
    if (companiesInformations){
        const {currentPage, minPaginationPage, maxPaginationPage, maxGlobalPage} = state.companiesPagination;
        return (
            <>
                <Pagination 
                    currentPage={currentPage} 
                    maxGlobalPage={maxGlobalPage} 
                    maxPaginationPages={5} 
                    minPaginationPage={minPaginationPage} 
                    maxPaginationPage={maxPaginationPage} 
                />
                {companiesInformations[(currentPage - 1)].map(company => <CompanyTableElement company={company}/>)}
            </>
        )
    } else return (
        <>
            <div>Loading...</div> 
        </>   
    )
}

export default CompaniesTable;