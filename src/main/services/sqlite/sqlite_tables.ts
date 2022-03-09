import { Database } from 'better-sqlite3';
import SqliteStocksInvestedStorage from './storages/sqlite_stocks_invested_storage';
import SqliteStocksNegotiationsStorage from './storages/sqlite_stocks_negotiations_storage';
import SqliteStocksStorage from './storages/sqlite_stocks_storage';

class SqliteTables {
  static createTables(db: Database) {
    SqliteStocksStorage.createStocksTable(db);
    SqliteStocksInvestedStorage.createStocksInvestedTable(db);
    SqliteStocksNegotiationsStorage.createStocksNegotiationsTable(db);
  }
}

export default SqliteTables;
