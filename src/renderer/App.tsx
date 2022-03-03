import DashboardPage from '@components/dashboard/DashboardPage';
import HomePage from '@components/HomePage';
import { HashRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;
