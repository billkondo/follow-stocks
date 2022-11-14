import Repositories from '@repositories/repositories';
import { BrowserWindow, ipcMain } from 'electron';
import EventsHandler from './handlers/EventsHandler';
import StocksHandlers from './handlers/stocks_handlers';

const afterStartup = (
  browserWindow: BrowserWindow,
  repositories: Repositories,
) => {
  const eventsHandler = EventsHandler(browserWindow, repositories);
  ipcMain.handle('events:saveB3Events', eventsHandler.saveB3Events);
  ipcMain.handle(
    'events:uploadB3SpreadSheet',
    eventsHandler.uploadB3SpreadSheet,
  );

  const stocksHandlers = StocksHandlers(browserWindow, repositories);
  ipcMain.handle('stocks:load', stocksHandlers.load);
  ipcMain.handle('stocks:listInvested', stocksHandlers.listInvested);
  ipcMain.handle(
    'stocks:listStockNegotiationsAtDate',
    stocksHandlers.listStockNegotiationsAtDate,
  );
  ipcMain.handle(
    'stocks:searchStocksByTicker',
    stocksHandlers.searchStocksByTicker,
  );
};

export default afterStartup;
