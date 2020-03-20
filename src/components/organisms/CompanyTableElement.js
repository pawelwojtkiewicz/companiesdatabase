import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Button from 'components/atoms/Button';

const StyledWrapper = styled.div`
    display: flex;
`;

const Column = styled.div`
    display: flex;
    width: 20%;
`;

const CompaniesTable = ({company}) => {
    const [redirect, setRedirect] = useState(false);
    const handleCompanyDetails = () => setRedirect(true);
    
    if(redirect) return <Redirect to={`/companiesData/details/${company.id}`} />
    return (
        <StyledWrapper>
            <Column>
                {company.id}
            </Column>
            <Column>
                {company.name}
            </Column>
            <Column>
                {company.city}
            </Column>
            <Column>
                {company.totalIncome.toFixed(2)} €
            </Column>
            <Column>
                <Button onClick={handleCompanyDetails}>GO</Button>
            </Column>
        </StyledWrapper>
    )
}

CompaniesTable.propTypes = {
    company: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        allIncomes: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired
          })).isRequired,
        totalIncome: PropTypes.number.isRequired
    }).isRequired
};

export default CompaniesTable;