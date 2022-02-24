import BetterSqlite3, { Database } from 'better-sqlite3';
import sqliteConfig from 'config/sqlite_config';

class SqliteConnection {
  static db: Database;

  static connect() {
    if (!SqliteConnection.db)
      SqliteConnection.db = new BetterSqlite3(sqliteConfig.DB_NAME);

    return SqliteConnection.db;
  }

  static close() {
    if (SqliteConnection.db) SqliteConnection.db.close();

    SqliteConnection.db = null;
  }
}

export default SqliteConnection;
