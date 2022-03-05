import StocksNegotiationsService from '@services/stocks/stocks_negotiations_service';
import StocksService from '@services/stocks/stocks_service';
import SqliteStocksNegotiationsStorage from '@sqlite/sqlite_stocks_negotiations_storage';
import SqliteStocksStorage from '@sqlite/sqlite_stocks_storage';
import SqliteConnection from 'main/services/sqlite/sqlite_connection';

const useStocks = () => {
  const stocksServiceFactory = () => {
    const sqliteConnection = SqliteConnection.connect();
    const stocksStorage = new SqliteStocksStorage(sqliteConnection);
    const stocksService = new StocksService(stocksStorage);

    return stocksService;
  };

  const stocksNegotiationsServiceFactory = () => {
    const sqliteConnection = SqliteConnection.connect();
    const stocksNegotiationsStorage = new SqliteStocksNegotiationsStorage(
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
