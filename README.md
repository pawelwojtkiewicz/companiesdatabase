# Companies database

# Technologies
- React
- styled-components
- hooks
- render props
- Provider
- PropTypes
- AtomDesign

# API
- for basic companies informations: https://recruitment.hal.skygate.io/companies
- for companany income: https://recruitment.hal.skygate.io/incomes/:id

# Outside packages
- Recharts: https://github.com/recharts/recharts

# Additional information
- added jsconfig.json for path changes. The source folder is /src

# Application description
The application provides us table with fetched companies data which include basic informations as a id, name city and total income.
You can search company by name. When searcher find something it return paginated result, if find nothing return `The given phrase has not been found.` message.
Search on `enter` works also.
Button `clear` clear searcher and show main view
Application remember last watched page before use searcher.
By clicking on details the application show more specific company informations as a latest month income or total and avarage income selected by user by date range, also there is graph of monthly company incomes.

# To run application for working on it:
`npm install`<br>
`npm run start`

# To run application for build:
`npm run install`<br>
`npm run build`
