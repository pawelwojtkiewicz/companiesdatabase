import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.div`
 
`;

const Line = styled.div`
    display: flex;
    align-items: center;
    height: 40px;
`;

const LineName = styled.div`
    width: 120px;
`;

const LineValue = styled.div`
 
`;

const CompanyBasicDetails = ({companyDetails, lastMonthIncome}) => (
    <StyledWrapper>
        <Line>
            <LineName>
                id:
            </LineName>
            <LineValue>
                {companyDetails.id}
            </LineValue>
        </Line>
        <Line>
            <LineName>
                name:
            </LineName>
            <LineValue>
                {companyDetails.name}
            </LineValue>
        </Line>
        <Line>
            <LineName>
                city:
            </LineName>
            <LineValue>
                {companyDetails.city}
            </LineValue>
        </Line>
        <Line>
            <LineName>
                last month income:
            </LineName>
            <LineValue>
                {lastMonthIncome}
            </LineValue>
        </Line>
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