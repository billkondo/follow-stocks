import { Database, Statement, Transaction } from 'better-sqlite3';
import FII from 'domain/fii';
import FIIsStorage from 'main/repositories/fiis_storage';

class FIIsStorageSqlite implements FIIsStorage {
  insertFIIStatement: Statement;
  insertManyFIIStatement: Transaction;
  findAllFIIsStatement: Statement;

  constructor(db: Database) {
    this.insertFIIStatement = db.prepare(
      'INSERT INTO fiis (ticker, name) VALUES (@ticker, @name)',
    );

    this.insertManyFIIStatement = db.transaction((fiis: FII[]) => {
      for (const fii of fiis)
        this.insertFIIStatement.run({ ticker: fii.ticker, name: fii.name });
    });

    this.findAllFIIsStatement = db.prepare('SELECT ticker, name from fiis');
  }

  static createFIIsTable(db: Database) {
    db.prepare(
      'CREATE TABLE IF NOT EXISTS fiis (ticker VARCHAR, name VARCHAR)',
    ).run();
  }

  async saveFIIs(fiis: FII[]) {
    this.insertManyFIIStatement(fiis);
  }

  async findAllFIIs(): Promise<FII[]> {
    const docs = this.findAllFIIsStatement.all();

    return docs.map((doc) => ({ name: doc.name, ticker: doc.ticker } as FII));
  }
}

export default FIIsStorageSqlite;
