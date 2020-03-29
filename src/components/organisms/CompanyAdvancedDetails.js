import React, {useReducer} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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

const LineName = styled.div`
    width: 120px;
`;

const Line0 = styled.div`
    display: flex;
    align-items: center;
    height: 40px;
`;

const LineValue = styled.div`
 
`;

const summarizeAllValues = incomes => {
    if(!incomes.length) return 0;
    return incomes.reduce((acc, currentValue) => acc + Number(currentValue.value), 0);
}

const validateTotalAndAvarageIncome = dateRange => Object.values(dateRange).every(date => date !== null && date !== "")

const filterIncomesByDateRange = (allIncomes, timeStart, timeEnd) => allIncomes.filter(income => income.newDate >= timeStart && income.newDate <= timeEnd)
  
const summarizeAvarageValue = incomes => {
    if(!incomes.length) return 0;
    return incomes.reduce((acc, currentValue) => (acc + Number(currentValue.value)), 0) / incomes.length;
}

const calculateTotalAndAvarageIncome = (companyDetails, setTotalAndAvarageIncome, dateRange) => {
    const validationResult = validateTotalAndAvarageIncome(dateRange);
    if (!validationResult) return setTotalAndAvarageIncome({avarageIncome: null, totalIncome: null});
    const {allIncomes} = companyDetails;
    const {startDate, endDate} = dateRange
    const timeStart = startDate.slice(0, 7);
    const timeEnd = endDate.slice(0, 7);
    console.log(allIncomes, timeStart, timeEnd);
    const filteredIncomes = filterIncomesByDateRange(allIncomes, timeStart, timeEnd);
    console.log(filteredIncomes)
    const avarageIncome = summarizeAvarageValue(filteredIncomes).toFixed(2)
    const totalIncome = summarizeAllValues(filteredIncomes).toFixed(2)
    setTotalAndAvarageIncome({avarageIncome, totalIncome});
}

const CompanyAdvancedDetails = ({companyDetails}) => {
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

    const grapthData = companyDetails.allIncomes.map(income => ({name: income.newDate, uv: income.value, pv: 2400, amt: 2400}));

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



            <Line0>
                <LineName>
                    totalIncome:
                </LineName>
                <LineValue>
                    {totalAndAvarageIncome.totalIncome}
                </LineValue>
            </Line0>
            <Line0>
                <LineName>
                    avarageIncome:
                </LineName>
                <LineValue>
                    {totalAndAvarageIncome.avarageIncome}
                </LineValue>
            </Line0>
            <Line0>
                <LineName>
                    from:
                </LineName>
                <LineValue>
                    <input type="date" name="startDate" onChange={handleInputDateRangeChange}/>
                </LineValue>
            </Line0>
            <Line0>
                <LineName>
                    to:
                </LineName>
                <LineValue>
                    <input type="date" name="endDate" onChange={handleInputDateRangeChange}/>
                </LineValue>
            </Line0>
            <Button countRange bgColor={"#daa96c"} onClick={() => calculateTotalAndAvarageIncome(companyDetails, setTotalAndAvarageIncome, dateRange)}>
                count
            </Button>
        </StyledWrapper>
    )
}

CompanyAdvancedDetails.propTypes = {
    companyDetails: PropTypes.shape({
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