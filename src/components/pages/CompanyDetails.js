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

const getLatestsDate = allIncomes => {
  const extractYearAndMonth = lastMonth => ({year: lastMonth.getFullYear(), month: lastMonth.getMonth()});

  const latestsDate = new Date(Math.max.apply(null, allIncomes.map(e => new Date(e.date))));
  const extractedLatestsDate = extractYearAndMonth(latestsDate)

  return extractedLatestsDate;
}

const getSameLatestsDate = (allIncomes, year, month) => allIncomes.filter(income => {
  const incomeDate = new Date(income.date)
  if (incomeDate.getFullYear() === year  && incomeDate.getMonth() === month) return income;
})

const summarizeAllValues = incomes => {
  if(!incomes.length) return 0;
  return incomes.reduce((acc, currentValue) => acc + Number(currentValue.value), 0);
}

const handleLastMonthIncome = (companyDetails, setLastMonthIncome) => {
  if(!companyDetails) return;
  const { allIncomes } = companyDetails;

  const {year, month} = getLatestsDate(allIncomes);
  const latesDates = getSameLatestsDate(allIncomes, year, month);
  const summarizedLatestsDateIncomes = summarizeAllValues(latesDates);

  setLastMonthIncome(summarizedLatestsDateIncomes);
}

const CompanyDetails = ({location}) => {
  const { state } = useStore();
  const [companyDetails, setCompanyDetails] = useState(getCompanyDetais(state.companiesInformations, location.pathname));
  const [lastMonthIncome, setLastMonthIncome] = useState(0);
  useEffect(() => handleLastMonthIncome(companyDetails, setLastMonthIncome), []);

  if(!state.companiesInformations) return <Redirect to="/companiesData" />
  return (
    <MainTemplate>
      <CompanyBasicDetails companyDetails={companyDetails} lastMonthIncome={lastMonthIncome}/>
      <CompanyAdvancedDetails companyDetails={companyDetails}/>
      <Button goBack bgColor={"#e686a1"}><Link to="/companiesData">BACK</Link></Button>
    </MainTemplate>
  )
};

CompanyDetails.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default withRouter(CompanyDetails);