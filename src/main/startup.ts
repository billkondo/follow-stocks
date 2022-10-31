import SqliteConnection from '@sqlite/sqlite_connection';
import SqliteTables from '@sqlite/sqlite_tables';
import { ipcMain } from 'electron';
import serviceRepositoriesFactory from './factories/service_repositories_factory';
import sqliteStorageFactory from './factories/sqlite_storage_factory';
import StocksHandlers from './handlers/stocks_handlers';

const startup = () => {
  const sqliteConnection = SqliteConnection.connect();
  SqliteTables.createTables(sqliteConnection);

  const storage = sqliteStorageFactory(sqliteConnection);
  const repositories = serviceRepositoriesFactory(storage);

  const { stocks, events, stocksInvestedWithQuotations } = repositories;
  const stocksHandlers = StocksHandlers({
    stocksRepository: stocks,
    stocksNegotiationsRepository: events,
    stocksInvestedWithQuotationsRepository: stocksInvestedWithQuotations,
  });

  ipcMain.handle('stocks:load', stocksHandlers.load);
  ipcMain.handle('stocks:listInvested', stocksHandlers.listInvested);
  ipcMain.handle(
    'stocks:searchStocksByTicker',
    stocksHandlers.searchStocksByTicker,
  );
  ipcMain.handle(
    'stocks:listStockNegotiationsAtDate',
    stocksHandlers.listStockNegotiationsAtDate,
  );
};

export default startup;
