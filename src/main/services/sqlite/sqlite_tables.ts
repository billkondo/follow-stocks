import { Database } from 'better-sqlite3';
import SqliteEventsStorage from './storages/SqliteEventsStorage';
import SqliteStocksStorage from './storages/SqliteStocksStorage';
import SqliteStocksInvestedStorage from './storages/sqlite_stocks_invested_storage';
import SqliteStocksQuotationsStorage from './storages/sqlite_stocks_quotations_storage';

class SqliteTables {
  static createTables(db: Database) {
    SqliteStocksStorage.createStocksTable(db);
    SqliteStocksQuotationsStorage.createStocksQuotationsTable(db);
    SqliteStocksInvestedStorage.createStocksInvestedTable(db);
    SqliteEventsStorage.createEventsTable(db);
  }
}

export default SqliteTables;
