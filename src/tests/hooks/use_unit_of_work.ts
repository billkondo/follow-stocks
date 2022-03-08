import SqliteConnection from '@sqlite/sqlite_connection';
import SqliteUnitOfWorkService from '@sqlite/sqlite_unit_of_work_service';

const useUnitOfWork = () => {
  const unitOfWorkServiceFactory = () => {
    const sqliteConnection = SqliteConnection.connect();
    const unitOfWorkService = new SqliteUnitOfWorkService(sqliteConnection);

    return unitOfWorkService;
  };

  return { unitOfWorkServiceFactory };
};

export default useUnitOfWork;
