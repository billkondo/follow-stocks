import { Mutex } from 'async-mutex';
import { Database, Statement } from 'better-sqlite3';
import UnitOfWorkRepository from 'main/repositories/unit_of_work_repository';

class SqliteUnitOfWorkService implements UnitOfWorkRepository {
  db: Database;
  begin: Statement;
  commit: Statement;
  rollback: Statement;
  mutex: Mutex;

  constructor(db: Database) {
    this.db = db;

    this.begin = db.prepare('BEGIN');
    this.commit = db.prepare('COMMIT');
    this.rollback = db.prepare('ROLLBACK');

    this.mutex = new Mutex();
  }

  async work<T>(callback: () => Promise<T>): Promise<T> {
    return this.mutex.runExclusive(async () => {
      this.begin.run();

      try {
        const output = await callback();

        this.commit.run();

        return output;
      } catch (error) {
        if (this.db.inTransaction) this.rollback.run();

        throw error;
      }
    });
  }
}

export default SqliteUnitOfWorkService;
