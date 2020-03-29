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

    @media (max-width: 750px) {
        & {
           display: none;
        }
    }
`;

const TableBody = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    height: 40px;
    padding: 0 10px;

    @media (max-width: 750px) {
        & {
            height: unset;
            padding: 0;
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
            <PreColumn>
                ID
            </PreColumn>
            <Column>
                {companyDetails.id}
            </Column>
            <PreColumn>
                NAME
            </PreColumn>
            <Column>
                {companyDetails.name}
            </Column>
            <PreColumn>
                CITY
            </PreColumn>
            <Column>
                {companyDetails.city}
            </Column>
            <PreColumn>
                TOTAL INCOME
            </PreColumn>
            <Column>
                {companyDetails.totalIncome.toFixed(2)} €
            </Column>
            <PreColumn>
                LAST MONTH INCOME
            </PreColumn>
            <Column>
                {lastMonthIncome.toFixed(2)} €
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
            value: PropTypes.isRequired,
            newDate: PropTypes.isRequired
          })).isRequired,
        totalIncome: PropTypes.number.isRequired
    }).isRequired,
    lastMonthIncome: PropTypes.number.isRequired
};

export default CompanyBasicDetails;