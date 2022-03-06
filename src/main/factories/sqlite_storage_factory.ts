import SqliteStocksNegotiationsStorage from '@sqlite/sqlite_stocks_negotiations_storage';
import SqliteStocksStorage from '@sqlite/sqlite_stocks_storage';
import { Database } from 'better-sqlite3';
import Storage from 'main/storage/storage';

const sqliteStorageFactory = (db: Database): Storage => {
  return {
    stocks: new SqliteStocksStorage(db),
    stocksNegotiations: new SqliteStocksNegotiationsStorage(db),
  };
};

export default sqliteStorageFactory;
