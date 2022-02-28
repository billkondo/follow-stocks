import { Database } from 'better-sqlite3';
import FIIsNegotiationsStorageSqlite from './fiis_negotiations_storage_sqlite';
import FIIsStorageSqlite from './fiis_storage_sqlite';

class SqliteTables {
  static createTables(db: Database) {
    FIIsStorageSqlite.createFIIsTable(db);
    FIIsNegotiationsStorageSqlite.createFIIsNegotiationsTable(db);
  }
}

export default SqliteTables;
