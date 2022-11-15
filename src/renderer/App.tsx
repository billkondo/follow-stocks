import DashboardPage from '@components/dashboard/DashboardPage';
import HomePage from '@components/HomePage';
import Loadable from '@components/loadable/Loadable';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { lazy } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './config/app_routes';
import StocksProvider from './stocks/stocks_provider';

const StocksInvestedByTypePage = Loadable(
  lazy(() => import('@components/stocks_invested/StocksInvestedByTypePage')),
);
const EventsTrackRecordPage = Loadable(
  lazy(() => import('@pages/EventsTrackRecordPage')),
);
const NegotiationsNewOnesPage = Loadable(
  lazy(
    () => import('@components/negotiations_new_ones/NegotiationsNewOnesPage'),
  ),
);
const EventsUploadFilePage = Loadable(
  lazy(
    () => import('@components/events/upload_file_page/EventsUploadFilePage'),
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
                  element={<EventsTrackRecordPage />}
                />
                <Route
                  path="/negotiations/new_one"
                  element={<NegotiationsNewOnesPage />}
                />
                <Route
                  path={AppRoutes.EVENTS_UPLOAD_FILE}
                  element={<EventsUploadFilePage />}
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
