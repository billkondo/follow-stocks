import StocksNegotiationsService from '@services/stocks/stocks_negotiations_service';
import StocksService from '@services/stocks/stocks_service';
import StocksNegotiationsStorageSqlite from '@sqlite/stocks_negotiations_storage_sqlite';
import StocksStorageSqlite from '@sqlite/stocks_storage_sqlite';
import SqliteConnection from 'main/services/sqlite/sqlite_connection';

const useStocks = () => {
  const stocksServiceFactory = () => {
    const sqliteConnection = SqliteConnection.connect();
    const stocksStorage = new StocksStorageSqlite(sqliteConnection);
    const stocksService = new StocksService(stocksStorage);

    return stocksService;
  };

  const stocksNegotiationsServiceFactory = () => {
    const sqliteConnection = SqliteConnection.connect();
    const stocksNegotiationsStorage = new StocksNegotiationsStorageSqlite(
      sqliteConnection,
    );
    const stocksNegotiationsService = new StocksNegotiationsService(
      stocksNegotiationsStorage,
    );

    return stocksNegotiationsService;
  };

  return { stocksServiceFactory, stocksNegotiationsServiceFactory };
};

export default useStocks;
