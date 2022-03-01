import { Database } from 'better-sqlite3';
import StocksNegotiationsStorageSqlite from './stocks_negotiations_storage_sqlite';
import StocksStorageSqlite from './stocks_storage_sqlite';

class SqliteTables {
  static createTables(db: Database) {
    StocksStorageSqlite.createStocksTable(db);
    StocksNegotiationsStorageSqlite.createStocksNegotiationsTable(db);
  }
}

export default SqliteTables;
