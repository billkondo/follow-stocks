import DashboardPage from '@components/dashboard/DashboardPage';
import HomePage from '@components/HomePage';
import Loadable from '@components/loadable/Loadable';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { lazy } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import StocksProvider from './stocks/stocks_provider';

const StocksInvestedByTypePage = Loadable(
  lazy(() => import('@components/stocks_invested/StocksInvestedByTypePage')),
);
const NegotiationsHistoricalPage = Loadable(
  lazy(
    () =>
      import('@components/negotiations_historical/NegotiationsHistoricalPage'),
  ),
);
const NegotiationsNewOnesPage = Loadable(
  lazy(
    () => import('@components/negotiations_new_ones/NegotiationsNewOnesPage'),
  ),
);

const App = () => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StocksProvider type="FII">
          <HashRouter>
            <Routes>
              <Route path="/" element={<DashboardPage />}>
                <Route index element={<HomePage />} />
                <Route
                  path="/stocks/fiis"
                  element={<StocksInvestedByTypePage type="FII" />}
                />
                <Route
                  path="/negotiations/historical"
                  element={<NegotiationsHistoricalPage />}
                />
                <Route
                  path="/negotiations/new_one"
                  element={<NegotiationsNewOnesPage />}
                />
              </Route>
            </Routes>
          </HashRouter>
        </StocksProvider>
      </LocalizationProvider>
    </>
  );
};

export default App;
