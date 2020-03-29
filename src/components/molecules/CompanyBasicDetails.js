import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.div`
    margin: 15px 0 0 0;
`;

const TableHeader = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    height: 40px;
    padding: 0 10px;
    background-color: #f5f5f5;
`;

const TableBody = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    height: 40px;
    padding: 0 10px;
`;

const Column = styled.div`
    display: flex;
    width: 20%;
`;

const CompanyBasicDetails = ({companyDetails, lastMonthIncome}) => (
    <StyledWrapper>
        <TableHeader>
            <Column>
                ID
            </Column>
            <Column>
                NAME
            </Column>
            <Column>
                CITY
            </Column>
            <Column>
                TOTAL INCOME
            </Column>
            <Column>
                LAST MONTH INCOME
            </Column>
        </TableHeader>
        <TableBody>
            <Column>
                {companyDetails.id}
            </Column>
            <Column>
                {companyDetails.name}
            </Column>
            <Column>
                {companyDetails.city}
            </Column>
            <Column>
                {companyDetails.totalIncome.toFixed(2)} €
            </Column>
            <Column>
                {lastMonthIncome}
            </Column>
        </TableBody>
    </StyledWrapper>
)

CompanyBasicDetails.propTypes = {
    companyDetails: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        allIncomes: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired
          })).isRequired,
        totalIncome: PropTypes.number.isRequired
    }).isRequired,
    lastMonthIncome: PropTypes.number.isRequired
};

export default CompanyBasicDetails;