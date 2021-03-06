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

  const { stocks, stocksInvestedWithQuotations } = repositories;
  const stocksHandlers = StocksHandlers({
    stocksRepository: stocks,
    stocksInvestedWithQuotationsRepository: stocksInvestedWithQuotations,
  });

  ipcMain.handle('stocks:load', stocksHandlers.load);
  ipcMain.handle('stocks:listInvested', stocksHandlers.listInvested);
};

export default startup;
