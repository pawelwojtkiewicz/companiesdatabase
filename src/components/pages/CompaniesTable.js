import React, { useEffect, useState } from 'react';
import CompanyTableElement from 'components/molecules/CompanyTableElement.js';

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
        .then(response => {
            const filterCompanyIncomes = response => response.incomes;
            const companyIncomes = filterCompanyIncomes(response);
            return companyIncomes;
        })
        .catch(error => error);
}

const submitCompanyIncome = incomes => {
    return incomes.reduce((acc, income) => {                            
        return acc + Number(income.value)
    }, 0);
};

const sortCompaniesListDescending = companiesData => {
    return companiesData.sort(function(a, b) {
        return b.totalIncome - a.totalIncome;
    });
}

const addIncomesForEveryCompany = (basicCompaniesData, companyIncomesURL) => {
    const companyDataWithIncomes = basicCompaniesData.map(basicCompanyData =>{ 
        const companyId = basicCompanyData.id;
        return getIncomesFromCompany(companyIncomesURL, companyId)
            .then(allIncomes => {
                const totalIncome = Math.round(submitCompanyIncome(allIncomes));
                return {...basicCompanyData, allIncomes, totalIncome};
            });
    });
    return Promise.all(companyDataWithIncomes);
}

const getCompaniesData = async setCompaniesList => {
    const basicCompaniesDataURL = `https://recruitment.hal.skygate.io/companies`;
    const companyIncomesURL = `https://recruitment.hal.skygate.io/incomes/`;

    const basicCompaniesData = await getBasicCompaniesData(basicCompaniesDataURL);
    const companiesData = await addIncomesForEveryCompany(basicCompaniesData, companyIncomesURL);
    const sortedCompaniesData = sortCompaniesListDescending(companiesData);
    setCompaniesList(sortedCompaniesData);
}

const CompaniesTable = () => {
    const [companiesList, setCompaniesList] = useState(null);
    useEffect(() => {getCompaniesData(setCompaniesList)}, []);

    if(companiesList) return companiesList.map(company => <CompanyTableElement company={company}/>)
    else return <div>Loading</div>
}

export default CompaniesTable;