import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FilteredCompaniesTable from 'components/molecules/FilteredCompaniesTable';
import AllCompaniesTable from 'components/molecules/AllCompaniesTable';

const StyledWrapper = styled.div`
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

const Column = styled.div`
    display: flex;
    width: 20%;
`;

const CompaniesTableContent = ({companiesFilteredInformations}) => (
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
            <Column></Column>
        </TableHeader>
        {companiesFilteredInformations
            ? <FilteredCompaniesTable />
            : <AllCompaniesTable />}
    </StyledWrapper>
)

CompaniesTableContent.propTypes = {
    companiesFilteredInformations: PropTypes.array
};

export default CompaniesTableContent;