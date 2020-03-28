import React, { useEffect, useState } from 'react';
import { useStore } from 'store';
import MainTemplate from 'components/templates/MainTemplate'
import SearchBar from 'components/organisms/SearchBar';
import FilteredCompaniesTable from 'components/molecules/FilteredCompaniesTable';
import AllCompaniesTable from 'components/molecules/AllCompaniesTable';
import AlertContainer from 'components/atoms/AlertContainer';
import Loader from 'components/atoms/Loader';

const getBasicCompaniesData = basicCompaniesDataURL => {
    return fetch(basicCompaniesDataURL)
        .then(response => {
            if (response.ok) return response.json();
            else return {error: "Can't get data, please refresh"};
        })
        .catch(err => {
            console.log("get companies data error");
            return {error: "Can't get data, please check the Interner connection and refresh"}
        });
};

const getIncomesFromCompany = (companyIncomesURL, companyId) => {
    return fetch(companyIncomesURL + companyId)
        .then(response => {
            if (response.ok) return response.json();
            else return {error: "Can't get data, please refresh"};
        })
        .then(responce => responce.incomes)
        .catch(error => {
            console.log("get company income error");
            return {error: "Can't get data, please check the Interner connection and refresh"}
        });
};

const submitCompanyIncome = incomes => {
    return incomes.reduce((acc, income) => {                            
        return acc + Number(income.value);
    }, 0);
};

const sortCompaniesListDescending = companiesData => companiesData.sort((a, b) => b.totalIncome - a.totalIncome);

const addIncomesForEveryCompany = (basicCompaniesData, companyIncomesURL, setStatusAllCompaniesDataLoaded) => {
    const companyDataWithIncomes = basicCompaniesData.map(basicCompanyData => { 
        const companyId = basicCompanyData.id;
        return getIncomesFromCompany(companyIncomesURL, companyId)
            .then(allIncomes => {
                const totalIncome = submitCompanyIncome(allIncomes);
                return {...basicCompanyData, allIncomes, totalIncome};
            })
            .catch(() => {
                setStatusAllCompaniesDataLoaded(true);
                return [];
            })
    })
    return Promise.all(companyDataWithIncomes);
}

const CompaniesTable = () => {
    const { state, dispatch } = useStore();
    const [isAllCompaniesDataLoaded, setStatusAllCompaniesDataLoaded] = useState(false);
    const [companiesDataError, setCompaniesDataError] = useState(false);
    const {companiesInformations, companiesFilteredInformations} = state;

    const getCompaniesData = async companiesInformations => {
        if(companiesInformations) return;
        const basicCompaniesDataURL = `https://recruitment.hal.skygate.io/companies`;
        const companyIncomesURL = `https://recruitment.hal.skygate.io/incomes/`;
    
        const basicCompaniesData = await getBasicCompaniesData(basicCompaniesDataURL);
        if(basicCompaniesData.error) return setCompaniesDataError(basicCompaniesData.error);
        const companiesData = await addIncomesForEveryCompany(basicCompaniesData, companyIncomesURL, setStatusAllCompaniesDataLoaded);
        if(companiesData.error) return setCompaniesDataError(companiesData.error);
        const sortedCompaniesData = sortCompaniesListDescending(companiesData);


        dispatch({ type: 'SET_COMPANIES_INFORMATIONS_RESULT', payload: sortedCompaniesData });
    }

    useEffect(() => {
        getCompaniesData(companiesInformations);
    }, []);

    const MainTable = () => (
        companiesFilteredInformations
            ? <FilteredCompaniesTable></FilteredCompaniesTable>
            : <AllCompaniesTable></AllCompaniesTable>
    )

    const ErrorMessage = () => (
        <AlertContainer>
            {companiesDataError}
        </AlertContainer>
    )

    const AllCompaniesDataNotLoaded = () => (
        <AlertContainer>
            Not all companies data are loaded, for more accurate data please refresh
        </AlertContainer>
    )

    if(companiesDataError) return <ErrorMessage />
    else if(companiesInformations) return (
        <MainTemplate>
            <SearchBar companiesInformations={companiesInformations} />
            {isAllCompaniesDataLoaded && <AllCompaniesDataNotLoaded />}
            <MainTable />
        </MainTemplate>
    ) 
    else return (
        <MainTemplate>
            <Loader />
        </MainTemplate>
    );
}; 

export default CompaniesTable;