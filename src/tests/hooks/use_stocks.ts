import StocksNegotiationsStorageSqlite from '@sqlite/stocks_negotiations_storage_sqlite';
import StocksStorageSqlite from '@sqlite/stocks_storage_sqlite';
import FIIsNegotiationsService from 'main/services/fiis/fiis_negotiations_service';
import FIIsService from 'main/services/fiis_service';
import SqliteConnection from 'main/services/sqlite/sqlite_connection';

const useStocks = () => {
  const stocksServiceFactory = () => {
    const sqliteConnection = SqliteConnection.connect();
    const stocksStorage = new StocksStorageSqlite(sqliteConnection);
    const stocksService = new FIIsService(stocksStorage);

    return stocksService;
  };

  const stocksNegotiationsServiceFactory = () => {
    const sqliteConnection = SqliteConnection.connect();
    const stocksNegotiationsStorage = new StocksNegotiationsStorageSqlite(
      sqliteConnection,
    );
    const stocksNegotiationsService = new FIIsNegotiationsService(
      stocksNegotiationsStorage,
    );

    return stocksNegotiationsService;
  };

  return { stocksServiceFactory, stocksNegotiationsServiceFactory };
};

export default useStocks;
