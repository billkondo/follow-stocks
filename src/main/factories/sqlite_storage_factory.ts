import SqliteEventsStorage from '@services/sqlite/storages/sqlite_events_storage';
import SqliteStocksStorage from '@sqlite/storages/sqlite_stocks_storage';
import { Database } from 'better-sqlite3';
import Storage from 'main/storage/storage';

const sqliteStorageFactory = (db: Database): Storage => {
  return {
    stocks: new SqliteStocksStorage(db),
    events: new SqliteEventsStorage(db),
  };
};

export default sqliteStorageFactory;
