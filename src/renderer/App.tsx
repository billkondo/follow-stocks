import DashboardPage from '@components/dashboard/DashboardPage';
import HomePage from '@components/HomePage';
import Loadable from '@components/loadable/Loadable';
import { lazy } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import StocksProvider from './stocks/stocks_provider';

const StocksInvestedByTypePage = Loadable(
  lazy(() => import('@components/stocks_invested/StocksInvestedByTypePage')),
);

const App = () => {
  return (
    <>
      <StocksProvider type="FII">
        <HashRouter>
          <Routes>
            <Route path="/" element={<DashboardPage />}>
              <Route index element={<HomePage />} />
              <Route
                path="/stocks/fiis"
                element={<StocksInvestedByTypePage type="FII" />}
              />
            </Route>
          </Routes>
        </HashRouter>
      </StocksProvider>
    </>
  );
};

export default App;
