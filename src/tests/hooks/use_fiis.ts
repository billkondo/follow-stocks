import FIIsService from 'main/services/fiis_service';
import FIIsStorageSqlite from 'main/services/sqlite/fiis_storage_sqlite';
import SqliteConnection from 'main/services/sqlite/sqlite_connection';

const useFIIs = () => {
  const fiisServiceFactory = () => {
    const sqliteConnection = SqliteConnection.connect();
    const fiisStorage = new FIIsStorageSqlite(sqliteConnection);
    const fiisService = new FIIsService(fiisStorage);

    return fiisService;
  };

  return { fiisServiceFactory };
};

export default useFIIs;
