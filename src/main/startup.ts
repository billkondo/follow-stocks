import SqliteConnection from '@sqlite/sqlite_connection';
import SqliteTables from '@sqlite/sqlite_tables';
import serviceRepositoriesFactory from './factories/service_repositories_factory';
import sqliteStorageFactory from './factories/sqlite_storage_factory';

const startup = () => {
  const sqliteConnection = SqliteConnection.connect();
  SqliteTables.createTables(sqliteConnection);

  const storage = sqliteStorageFactory(sqliteConnection);
  const repositories = serviceRepositoriesFactory(storage);

  return repositories;
};

export default startup;
