import React, {useReducer} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.div`
 
`;

const summarizeAllValues = incomes => {
    if(!incomes.length) return 0;
    return incomes.reduce((acc, currentValue) => acc + Number(currentValue.value), 0);
}

const calculateTotalAndAvarageIncome = (companyDetails, setTotalAndAvarageIncome, dateRange) => {
    const validationResult = validateTotalAndAvarageIncome(dateRange);
    if (!validationResult) return setTotalAndAvarageIncome({avarageIncome: null, totalIncome: null});
    const {allIncomes} = companyDetails;
    const {startDate, endDate} = dateRange
    const timeStart = new Date(startDate).getTime();
    const timeEnd = new Date(endDate).getTime();
    const filteredIncomes = filterIncomesByDateRange(allIncomes, timeStart, timeEnd);
    
    const avarageIncome = summarizeAvarageValue(filteredIncomes);
    const totalIncome = summarizeAllValues(filteredIncomes);
    setTotalAndAvarageIncome({avarageIncome, totalIncome});
}

  const validateTotalAndAvarageIncome = dateRange => Object.values(dateRange).every(date => date !== null && date !== "")

  const filterIncomesByDateRange = (allIncomes, timeStart, timeEnd) => allIncomes.filter(income => new Date(income.date).getTime() >= timeStart && new Date(income.date).getTime() <= timeEnd);
  
  const summarizeAvarageValue = incomes => {
    if(!incomes.length) return 0;
    return incomes.reduce((acc, currentValue) => (acc + Number(currentValue.value)), 0) / incomes.length;
}

const CompanyAdvancedDetails = ({companyDetails}) => {
    const [totalAndAvarageIncome, setTotalAndAvarageIncome] = useReducer((state, newState) => ({...state, ...newState}),
        {
          avarageIncome: null,
          totalIncome: null
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
    
    return (
        <StyledWrapper>
            <div>
                <div>totalIncome: {totalAndAvarageIncome.totalIncome || "choose range"}</div>
                <div>avarageIncome: {totalAndAvarageIncome.avarageIncome || "choose range"}</div>
            </div> 
            <div>
                <div>from <input type="date" name="startDate" onChange={handleInputDateRangeChange}/></div>
                <div>to <input type="date" name="endDate" onChange={handleInputDateRangeChange}/></div>
                <button onClick={() => calculateTotalAndAvarageIncome(companyDetails, setTotalAndAvarageIncome, dateRange)}>count</button>
            </div>
        </StyledWrapper>
    )
}

CompanyAdvancedDetails.propTypes = {
    companyDetails: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        allIncomes: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired
        })).isRequired,
        totalIncome: PropTypes.number.isRequired
    })
};

export default CompanyAdvancedDetails;