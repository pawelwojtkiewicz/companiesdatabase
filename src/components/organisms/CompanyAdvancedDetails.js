import React, {useReducer} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'components/atoms/Button';

const StyledWrapper = styled.div`
    margin: 20px 0 0 0;
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
    
    const avarageIncome = summarizeAvarageValue(filteredIncomes).toFixed(2)
    const totalIncome = summarizeAllValues(filteredIncomes).toFixed(2)
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
    
    return (
        <StyledWrapper>
            <Line>
                <LineName>
                    totalIncome:
                </LineName>
                <LineValue>
                    {totalAndAvarageIncome.totalIncome}
                </LineValue>
            </Line>
            <Line>
                <LineName>
                    avarageIncome:
                </LineName>
                <LineValue>
                    {totalAndAvarageIncome.avarageIncome}
                </LineValue>
            </Line>
            <Line>
                <LineName>
                    from:
                </LineName>
                <LineValue>
                    <input type="date" name="startDate" onChange={handleInputDateRangeChange}/>
                </LineValue>
            </Line>
            <Line>
                <LineName>
                    to:
                </LineName>
                <LineValue>
                    <input type="date" name="endDate" onChange={handleInputDateRangeChange}/>
                </LineValue>
            </Line>
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
            value: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired
        })).isRequired,
        totalIncome: PropTypes.number.isRequired
    })
};

export default CompanyAdvancedDetails;