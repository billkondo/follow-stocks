import FIIsNegotiationsService from 'main/services/fiis/fiis_negotiations_service';
import FIIsService from 'main/services/fiis_service';
import FIIsNegotiationsStorageSqlite from 'main/services/sqlite/fiis_negotiations_storage_sqlite';
import FIIsStorageSqlite from 'main/services/sqlite/fiis_storage_sqlite';
import SqliteConnection from 'main/services/sqlite/sqlite_connection';

const useFIIs = () => {
  const fiisServiceFactory = () => {
    const sqliteConnection = SqliteConnection.connect();
    const fiisStorage = new FIIsStorageSqlite(sqliteConnection);
    const fiisService = new FIIsService(fiisStorage);

    return fiisService;
  };

  const fiisNegotiationsServiceFactory = () => {
    const sqliteConnection = SqliteConnection.connect();
    const fiisNegotiationsStorage = new FIIsNegotiationsStorageSqlite(
      sqliteConnection,
    );
    const fiisNegotiationsService = new FIIsNegotiationsService(
      fiisNegotiationsStorage,
    );

    return fiisNegotiationsService;
  };

  return { fiisServiceFactory, fiisNegotiationsServiceFactory };
};

export default useFIIs;
