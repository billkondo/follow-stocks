import DashboardPage from '@components/dashboard/DashboardPage';
import HomePage from '@components/HomePage';
import { HashRouter, Route, Routes } from 'react-router-dom';
import StocksProvider from './stocks/stocks_provider';

const App = () => {
  return (
    <>
      <StocksProvider type="FII">
        <HashRouter>
          <Routes>
            <Route path="/" element={<DashboardPage />}>
              <Route index element={<HomePage />} />
            </Route>
          </Routes>
        </HashRouter>
      </StocksProvider>
    </>
  );
};

export default App;
