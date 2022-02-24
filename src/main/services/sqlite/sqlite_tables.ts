import { Database } from 'better-sqlite3';
import FIIsStorageSqlite from './fiis_storage_sqlite';

class SqliteTables {
  static createTables(db: Database) {
    FIIsStorageSqlite.createFIIsTable(db);
  }
}

export default SqliteTables;
