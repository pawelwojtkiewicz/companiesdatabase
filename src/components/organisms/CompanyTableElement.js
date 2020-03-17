import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';

const CompaniesTable = ({company}) => {
    const [redirect, setRedirect] = useState(false);
    const handleCompanyDetails = () => setRedirect(true);
    
    if(redirect) return <Redirect to={`/companiesData/details/${company.id}`} />
    return (
        <div>
            <br />
            <div>
                {company.id}
            </div>
            <div>
                {company.name}
            </div>
            <div>
                {company.city}
            </div>
            <div>
                {company.totalIncome}
            </div>
            <button onClick={handleCompanyDetails}>GO</button>
            <br />
        </div>
    )
}

export default CompaniesTable;