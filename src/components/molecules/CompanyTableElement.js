import React from 'react';

const CompaniesTable = ({company}) => {
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
            <br />
        </div>
    )
}

export default CompaniesTable;