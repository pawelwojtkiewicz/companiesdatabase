import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useStore } from 'store';

const getCurrentCompanyId = pathname => {
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];
  return Number(id);
}

const getCompanyDetais = (companiesInformations, setCompanyDetails, pathname) => {
  if(!companiesInformations) return

  const currenCompanytId = getCurrentCompanyId(pathname);
  const companyDetails = companiesInformations.find(companyInformation => companyInformation.id === currenCompanytId);
  setCompanyDetails(companyDetails)
}

const CompanyDetails = ({location}) => {
  const [redirect, setRedirect] = useState(false);
  const handleCompanyDetails = () => setRedirect(true);
  const { state } = useStore();
  const [companyDetails, setCompanyDetails] = useState(state);
  useEffect(() => getCompanyDetais(state.companiesInformations, setCompanyDetails, location.pathname), [])

  if(!state.companiesInformations || redirect) return <Redirect to="/companiesData" />
  return (
    <div>
      <div>{companyDetails.id}</div>
      <div>{companyDetails.name}</div>
      <div>{companyDetails.city}</div>
      <div>{companyDetails.totalIncome}</div>
      <button onClick={handleCompanyDetails}>BACK</button>
    </div>
  )
};

export default withRouter(CompanyDetails);