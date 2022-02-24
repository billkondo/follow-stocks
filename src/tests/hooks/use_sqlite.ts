import SqliteConnection from 'main/services/sqlite/sqlite_connection';
import SqliteTables from 'main/services/sqlite/sqlite_tables';

const useSqlite = () => {
  beforeEach(() => {
    const sqliteConnection = SqliteConnection.connect();
    SqliteTables.createTables(sqliteConnection);
  });

  afterEach(() => {
    SqliteConnection.close();
  });
};

export default useSqlite;
