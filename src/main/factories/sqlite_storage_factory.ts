import SqliteEventsStorage from '@services/sqlite/storages/SqliteEventsStorage';
import SqliteStocksStorage from '@services/sqlite/storages/SqliteStocksStorage';
import { Database } from 'better-sqlite3';
import Storage from 'main/storage/storage';

const sqliteStorageFactory = (db: Database): Storage => {
  return {
    stocks: new SqliteStocksStorage(db),
    events: new SqliteEventsStorage(db),
  };
};

export default sqliteStorageFactory;
