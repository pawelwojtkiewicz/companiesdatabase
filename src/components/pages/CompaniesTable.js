import React, { useEffect, useState } from 'react';
import CompanyTableElement from 'components/molecules/CompanyTableElement.js';

import { useStore } from 'store';

const getBasicCompaniesData = basicCompaniesDataURL => {
    return fetch(basicCompaniesDataURL)
        .then(response => {
            if (response.ok) return response.json();
            else return "error";
        })
        .catch(error => error);
}

const getIncomesFromCompany = (companyIncomesURL, companyId) => {
    return fetch(companyIncomesURL + companyId)
        .then(response => {
            if (response.ok) return response.json();
            else return "error";
        })
        .then(responce => responce.incomes)
        .catch(error => error);
}

const submitCompanyIncome = incomes => {
    return incomes.reduce((acc, income) => {                            
        return acc + Number(income.value)
    }, 0);
};

const sortCompaniesListDescending = companiesData => companiesData.sort((a, b) => b.totalIncome - a.totalIncome);

const addIncomesForEveryCompany = (basicCompaniesData, companyIncomesURL) => {
    const companyDataWithIncomes = basicCompaniesData.map(basicCompanyData =>{ 
        const companyId = basicCompanyData.id;
        return getIncomesFromCompany(companyIncomesURL, companyId)
            .then(allIncomes => {
                const totalIncome = submitCompanyIncome(allIncomes);
                return {...basicCompanyData, allIncomes, totalIncome};
            });
    });
    return Promise.all(companyDataWithIncomes);
}

const getCompaniesData = async (companiesInformations, dispatch) => {
    if(companiesInformations) return

    const basicCompaniesDataURL = `https://recruitment.hal.skygate.io/companies`;
    const companyIncomesURL = `https://recruitment.hal.skygate.io/incomes/`;

    const basicCompaniesData = await getBasicCompaniesData(basicCompaniesDataURL);
    const companiesData = await addIncomesForEveryCompany(basicCompaniesData, companyIncomesURL);
    const sortedCompaniesData = sortCompaniesListDescending(companiesData);
    dispatch({ type: 'SET_COMPANIES_INFORMATIONS', payload: sortedCompaniesData })
}

const CompaniesTable = () => {
    const { state, dispatch } = useStore();
    useEffect(() => {getCompaniesData(state.companiesInformations, dispatch)}, []);

    if (state.companiesInformations) return state.companiesInformations.map(company => <CompanyTableElement company={company}/>)
    else  return <div>Loading...</div>
}

export default CompaniesTable;