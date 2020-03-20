import React, {useState, useEffect, useReducer} from 'react';
import { Redirect, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useStore } from 'store';

const getCurrentCompanyId = pathname => {
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];
  return Number(id);
}

const getCompanyDetais = (companiesInformations, pathname) => {
  if(!companiesInformations) return
  const currenCompanytId = getCurrentCompanyId(pathname);
  const companyDetails = companiesInformations.flat().find(companyInformation => companyInformation.id === currenCompanytId);
  return companyDetails
}

const getLatestsDate = allIncomes => {
  const extractYearAndMonth = lastMonth => ({year: lastMonth.getFullYear(), month: lastMonth.getMonth()});

  const latestsDate = new Date(Math.max.apply(null, allIncomes.map(e => new Date(e.date))));
  const extractedLatestsDate = extractYearAndMonth(latestsDate)

  return extractedLatestsDate;
}

const getSameLatestsDate = (allIncomes, year, month) => allIncomes.filter(income => {
  const incomeDate = new Date(income.date)
  if (incomeDate.getFullYear() === year  && incomeDate.getMonth() === month) return income;
})

const summarizeAllValues = incomes => {
  if(!incomes.length) return 0;
  return incomes.reduce((acc, currentValue) => acc + Number(currentValue.value), 0);
}

const handleLastMonthIncome = (companyDetails, setLastMonthIncome) => {
  if(!companyDetails) return;
  const { allIncomes } = companyDetails;

  const {year, month} = getLatestsDate(allIncomes);
  const latesDates = getSameLatestsDate(allIncomes, year, month);
  const summarizedLatestsDateIncomes = summarizeAllValues(latesDates);

  setLastMonthIncome(summarizedLatestsDateIncomes);
}

const validateTotalAndAvarageIncome = dateRange => Object.values(dateRange).every(date => date !== null && date !== "")

const filterIncomesByDateRange = (allIncomes, timeStart, timeEnd) => allIncomes.filter(income => new Date(income.date).getTime() >= timeStart && new Date(income.date).getTime() <= timeEnd);

const summarizeAvarageValue = incomes => {
  if(!incomes.length) return 0;
  return incomes.reduce((acc, currentValue) => (acc + Number(currentValue.value)), 0) / incomes.length;
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

const CompanyDetails = ({location}) => {
  const { state } = useStore();

  const [companyDetails, setCompanyDetails] = useState(getCompanyDetais(state.companiesInformations, location.pathname));
  const [lastMonthIncome, setLastMonthIncome] = useState(0);
  const [totalAndAvarageIncome, setTotalAndAvarageIncome] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      avarageIncome: null,
      totalIncome: null
    }
  );
  const [dateRange, setDateRange] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      startDate: null,
      endDate: null
    }
  );
  const handleInputDateRangeChange = event => {
    setDateRange({
      [event.target.name]: event.target.value
    })
  }
  useEffect(() => handleLastMonthIncome(companyDetails, setLastMonthIncome), []);

  if(!state.companiesInformations) return <Redirect to="/companiesData" />
  return (
    <>
      <div>
        <div>id: {companyDetails.id}</div>
        <div>name: {companyDetails.name}</div>
        <div>city: {companyDetails.city}</div>
        <div>last month income: {lastMonthIncome}</div>
      </div>
      <div>
        <div>totalIncome: {totalAndAvarageIncome.totalIncome || "choose range"}</div>
        <div>avarageIncome: {totalAndAvarageIncome.avarageIncome || "choose range"}</div>
      </div> 
      <div>
        <div>from <input type="date" name="startDate" onChange={handleInputDateRangeChange}/></div>
        <div>to <input type="date" name="endDate" onChange={handleInputDateRangeChange}/></div>
        <button onClick={() => calculateTotalAndAvarageIncome(companyDetails, setTotalAndAvarageIncome, dateRange)}>count</button>
      </div>
      <button><Link to="/companiesData">BACK</Link></button>
    </>
  )
};

export default withRouter(CompanyDetails);

//<div>totalIncome ( old ): {companyDetails.totalIncome}</div>