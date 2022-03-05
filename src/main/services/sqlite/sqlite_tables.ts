import { Database } from 'better-sqlite3';
import SqliteStocksNegotiationsStorage from './sqlite_stocks_negotiations_storage';
import SqliteStocksStorage from './sqlite_stocks_storage';

class SqliteTables {
  static createTables(db: Database) {
    SqliteStocksStorage.createStocksTable(db);
    SqliteStocksNegotiationsStorage.createStocksNegotiationsTable(db);
  }
}

export default SqliteTables;
