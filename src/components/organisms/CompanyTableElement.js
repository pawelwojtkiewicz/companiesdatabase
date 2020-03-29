import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Button from 'components/atoms/Button';

const StyledWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    height: 40px;
    padding: 0 10px;
    
    @media (max-width: 750px) {
        & {
            justify-content: center;
            height: unset;
            margin: 0 0 20px 0;
        }
    }
`;

const Column = styled.div`
    display: flex;
    width: 20%;

    @media (max-width: 750px) {
        & {
            width: calc(100% - 160px);
            align-items: center;
            justify-content: flex-start;
            padding: 0 0 0 10px;
        }

        &:last-child {
            width: 100%;
            padding: 0;
            justify-content: center;
            margin: 10px 0;
        }
    }
`;

const PreColumn = styled.div`
    display: none;

    @media (max-width: 750px) {
        & {
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 140px;
            padding: 0 0 0 10px;
            background-color: #f5f5f5;
        }
    }
`;

const CompaniesTable = ({company}) => {
    const [redirect, setRedirect] = useState(false);
    const handleCompanyDetails = () => setRedirect(true);
    
    if(redirect) return <Redirect to={`/companiesData/details/${company.id}`} />
    return (
        <StyledWrapper>
            <PreColumn>
                ID
            </PreColumn>
            <Column>
                {company.id}
            </Column>
            <PreColumn>
                NAME
            </PreColumn>
            <Column>
                {company.name}
            </Column>
            <PreColumn>
                CITY
            </PreColumn>
            <Column>
                {company.city}
            </Column>
            <PreColumn>
                TOTAL INCOME
            </PreColumn>
            <Column>
                {company.totalIncome.toFixed(2)} €
            </Column>
            <Column>
                <Button moreDetails bgColor={"#daa96c"} onClick={handleCompanyDetails}>DETAILS</Button>
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