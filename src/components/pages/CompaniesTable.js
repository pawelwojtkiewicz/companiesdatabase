import React, { useEffect, useState } from 'react';
import { useStore } from 'store';
import MainTemplate from 'components/templates/MainTemplate'
import SearchBar from 'components/organisms/SearchBar';
import FilteredCompaniesTable from 'components/organisms/FilteredCompaniesTable';
import AllCompaniesTable from 'components/organisms/AllCompaniesTable';

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

const handleError = (error, dispatch) => {
    dispatch({ type: 'SET_COMPANIES_INFORMATIONS', payload: error });
}

const getCompaniesData = async (companiesInformations, dispatch) => {
    if(companiesInformations) return;

    const basicCompaniesDataURL = `https://recruitment.hal.skygate.io/companies`;
    const companyIncomesURL = `https://recruitment.hal.skygate.io/incomes/`;

    const basicCompaniesData = await getBasicCompaniesData(basicCompaniesDataURL);
    if(basicCompaniesData.error) return handleError(basicCompaniesData, dispatch)
    const companiesData = await addIncomesForEveryCompany(basicCompaniesData, companyIncomesURL);
    if(companiesData.error) return handleError(companiesData, dispatch);
    const sortedCompaniesData = sortCompaniesListDescending(companiesData);

    dispatch({ type: 'SET_MAX_PAGES_COMPANIES_INFORMATIONS', payload: sortedCompaniesData.length });
    dispatch({ type: 'SET_COMPANIES_INFORMATIONS_RESULT', payload: sortedCompaniesData });
}

const CompaniesTable = () => {
    const { state, dispatch } = useStore();
    const [companiesDataError, setCompaniesDataError] = useState();
    const {companiesInformations, companiesFilteredInformations} = state;

    useEffect(() => {
        getCompaniesData(companiesInformations, dispatch);
    }, []);

    const ErrorMessage = () => (<div>Fail to download date, please try again</div>)
    const Loading = () => (<div>Ładowanie</div>)

    const MainTable = () => (
        companiesFilteredInformations
            ? <FilteredCompaniesTable></FilteredCompaniesTable>
            : <AllCompaniesTable></AllCompaniesTable>
    )

    if(companiesInformations) return (
        <MainTemplate>
            {companiesDataError
                ? <ErrorMessage></ErrorMessage>
                : <SearchBar companiesInformations={companiesInformations}><MainTable /></SearchBar>
            }
        </MainTemplate>
    ) 
    else return (
        <MainTemplate>
            <Loading />
        </MainTemplate>
    );
}; 

export default CompaniesTable;