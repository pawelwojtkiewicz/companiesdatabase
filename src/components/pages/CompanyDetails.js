import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useStore } from 'store';
import MainTemplate from 'components/templates/MainTemplate'
import CompanyBasicDetails from 'components/molecules/CompanyBasicDetails';
import CompanyAdvancedDetails from 'components/organisms/CompanyAdvancedDetails';
import Button from 'components/atoms/Button';

const getCurrentCompanyId = pathname => {
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];
  return Number(id);
}

const getCompanyDetais = (companiesInformations, pathname) => {
  if(!companiesInformations) return
  const currenCompanytId = getCurrentCompanyId(pathname);
  const companyDetails = companiesInformations.flat().find(companyInformation => companyInformation.id === currenCompanytId);
  return companyDetails
}

const segregateDescendingIncomes = allIncomes => allIncomes.sort((a, b) => -1 * (new Date(a.date) - new Date(b.date)));

const getYearAndMonth = allIncomes => allIncomes.map(income => income.newDate = income.date.slice(0, 7));

const segregateByMonths = allIncomes => allIncomes.reduce((acc, element) => {
  acc.find(el => el.newDate === element.newDate) 
  ? acc.find(el => el.newDate === element.newDate).value += Number(element.value) 
  : acc.push({newDate: element.newDate, value: Number(element.value)
}); return acc}, []);

const CompanyDetails = ({location}) => {
  const { state } = useStore();
  const [companyDetails, setCompanyDetails] = useState(getCompanyDetais(state.companiesInformations, location.pathname));
  const [segregatedCompanyDetails, setSegregatedCompanyDetails] = useState();
  const [lastMonthIncome, setLastMonthIncome] = useState(0);
  
  const handleSegregationIncomes = () => {
    if(!companyDetails) return;
    const copyCompanyDetails = {...companyDetails};
    const {allIncomes} = companyDetails
    segregateDescendingIncomes(allIncomes);
    getYearAndMonth(allIncomes);
    const segregatedIncomes = segregateByMonths(allIncomes);
    copyCompanyDetails.allIncomes = segregatedIncomes;
    setSegregatedCompanyDetails(copyCompanyDetails);
    setLastMonthIncome(copyCompanyDetails.allIncomes[0].value);
  } 

  useEffect(() => {handleSegregationIncomes()}, []);

  if(!state.companiesInformations) return <Redirect to="/companiesData" />
  if(segregatedCompanyDetails) return (
    <MainTemplate>
      <Button goBack bgColor={"#e686a1"}><Link to="/companiesData">BACK</Link></Button>
      <CompanyBasicDetails segregatedCompanyDetails={segregatedCompanyDetails} lastMonthIncome={lastMonthIncome}/>
      <CompanyAdvancedDetails segregatedCompanyDetails={segregatedCompanyDetails}/>
    </MainTemplate>
  )
  else return <></>
};

CompanyDetails.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default withRouter(CompanyDetails);