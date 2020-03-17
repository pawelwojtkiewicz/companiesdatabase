import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';

const CompanyDetails = () => {
  const [redirect, setRedirect] = useState(false);
  const handleCompanyDetails = () => setRedirect(true);

  if(redirect) return <Redirect to="/companiesData" />
  return (
    <>
      CompanyDetails
      <div onClick={handleCompanyDetails}>BACK</div>
    </>
  )
};

export default CompanyDetails;