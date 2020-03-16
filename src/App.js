import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { routes } from 'routes';
import CompaniesTable from 'components/pages/CompaniesTable';
import CompanyDetails from 'components/pages/CompanyDetails';

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path={routes.home} render={() => <Redirect to="/companiesData" />} />
            <Route exact path={routes.companiesTable} component={CompaniesTable} />
            <Route path={routes.companyDetails} component={CompanyDetails} />
        </Switch>
    </BrowserRouter>
  );
  
  export default App;