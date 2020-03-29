import React, { useState, useReducer} from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Button from 'components/atoms/Button';

const StyledWrapper = styled.div`
    margin: 20px 0 0 0;
`;

const GraphContainer = styled.div`
    height: 400px;
    padding: 0 0 0 10px;
`;

const SectionHeader = styled.div`
    font-size: 20px;
    margin: 15px 0;
`;

const CalculatingContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const CalculatingRow = styled.div`
    display: flex;
    width: 100%;

    @media (max-width: 750px) {
        & {
            width: 100%
        }
    }
`;

const CalculationColumn = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 0 0 0 10px;

    &:nth-child(odd) {
        background-color: #f5f5f5;
    }

`;

const CalculatingError = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    margin: 20px 0 0 0;
    background-color: #ffabab;
    font-weight: 600;
`;

const summarizeAllValues = incomes => {
    if(!incomes.length) return 0;
    return incomes.reduce((acc, currentValue) => acc + Number(currentValue.value), 0);
}

const validateTotalAndAvarageIncome = dateRange => Object.values(dateRange).some(date => date === null || date === "")

const filterIncomesByDateRange = (allIncomes, timeStart, timeEnd) => allIncomes.filter(income => income.newDate >= timeStart && income.newDate <= timeEnd)
  
const summarizeAvarageValue = incomes => {
    if(!incomes.length) return 0;
    return incomes.reduce((acc, currentValue) => (acc + Number(currentValue.value)), 0) / incomes.length;
}

const calculateTotalAndAvarageIncome = (companyDetails, dateRange) => {
    const {allIncomes} = companyDetails;
    const {startDate, endDate} = dateRange;
    const timeStart = startDate.slice(0, 7);
    const timeEnd = endDate.slice(0, 7);
    const filteredIncomes = filterIncomesByDateRange(allIncomes, timeStart, timeEnd);
    const avarageIncome = summarizeAvarageValue(filteredIncomes).toFixed(2);
    const totalIncome = summarizeAllValues(filteredIncomes).toFixed(2);
    return {avarageIncome, totalIncome};
}

const CompanyAdvancedDetails = ({segregatedCompanyDetails}) => {
    const [totalAndAvarageIncome, setTotalAndAvarageIncome] = useReducer((state, newState) => ({...state, ...newState}),
        {
          avarageIncome: "choose range",
          totalIncome: "choose range"
        }
    );
    const [dateRange, setDateRange] = useReducer((state, newState) => ({...state, ...newState}),
    {
        startDate: null,
        endDate: null
    }
    );
    const handleInputDateRangeChange = event => setDateRange({
        [event.target.name]: event.target.value
    });
    const [isError, setError] = useState(false);

    const grapthData = segregatedCompanyDetails.allIncomes.map(income => ({name: income.newDate, uv: income.value, pv: 2400, amt: 2400}));

    const handleCalculateTotalAndAvarageIncome = () => {
        const validationResult = validateTotalAndAvarageIncome(dateRange);
        setError(validationResult);
        if (validationResult) return setTotalAndAvarageIncome({avarageIncome: null, totalIncome: null});
        const {avarageIncome, totalIncome} = calculateTotalAndAvarageIncome(segregatedCompanyDetails, dateRange);
        setTotalAndAvarageIncome({avarageIncome, totalIncome});
    }

    return (
        <StyledWrapper>
            <SectionHeader>
                All company income graph
            </SectionHeader>
            <GraphContainer>
                <ResponsiveContainer>
                    <AreaChart data={grapthData}
                        margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Area type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8' />
                    </AreaChart>
                </ResponsiveContainer>
            </GraphContainer>
            <SectionHeader>
                Custom calculate
            </SectionHeader>
            <CalculatingContainer>
                <CalculatingRow>
                    <CalculationColumn>
                        total income
                    </CalculationColumn>
                    <CalculationColumn>
                        {typeof totalAndAvarageIncome.totalIncome === "number"
                            ? totalAndAvarageIncome.totalIncome.toFixed(2)
                            : totalAndAvarageIncome.totalIncome}
                    </CalculationColumn>
                </CalculatingRow>
                <CalculatingRow>
                    <CalculationColumn>
                        avarage income
                    </CalculationColumn>
                    <CalculationColumn>
                        {totalAndAvarageIncome.avarageIncome}
                    </CalculationColumn>
                </CalculatingRow>
                <CalculatingRow>
                    <CalculationColumn>
                        date start
                    </CalculationColumn>
                    <CalculationColumn>
                        <input type="date" name="startDate" onChange={handleInputDateRangeChange}/>
                    </CalculationColumn>
                </CalculatingRow>
                <CalculatingRow>
                    <CalculationColumn>
                        date end
                    </CalculationColumn>
                    <CalculationColumn>
                        <input type="date" name="endDate" onChange={handleInputDateRangeChange}/>
                    </CalculationColumn>
                </CalculatingRow>
                {isError && <CalculatingError>
                    one of necessary parameter is empty
                </CalculatingError>}
                <CalculatingRow>
                    <Button countRange bgColor={"#daa96c"} onClick={handleCalculateTotalAndAvarageIncome}>
                        count
                    </Button>
                </CalculatingRow>
            </CalculatingContainer>
        </StyledWrapper>
    )
}

CompanyAdvancedDetails.propTypes = {
    segregatedCompanyDetails: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        allIncomes: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.isRequired,
            date: PropTypes.isRequired
        })).isRequired,
        totalIncome: PropTypes.number.isRequired
    }).isRequired
};

export default CompanyAdvancedDetails;