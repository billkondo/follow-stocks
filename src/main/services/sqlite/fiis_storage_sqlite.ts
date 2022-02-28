import { Database, Statement, Transaction } from 'better-sqlite3';
import FII from 'domain/fii';
import Stock from 'domain/stock';
import FIIsStorage from 'main/repositories/fiis_storage';

interface FIIModel {
  name: string;
  ticker: string;
}

class FIIsStorageSqlite implements FIIsStorage {
  insertFIIStatement: Statement;
  insertManyFIIStatement: Transaction;
  findAllFIIsStatement: Statement;
  searchFIIsByTickerStatement: Statement;
  findFIIByTickerStatement: Statement;

  constructor(db: Database) {
    this.insertFIIStatement = db.prepare(
      'INSERT INTO fiis (ticker, name) VALUES (@ticker, @name)',
    );

    this.insertManyFIIStatement = db.transaction((fiis: FII[]) => {
      for (const fii of fiis)
        this.insertFIIStatement.run({ ticker: fii.ticker, name: fii.name });
    });

    this.findAllFIIsStatement = db.prepare('SELECT ticker, name from fiis');

    this.searchFIIsByTickerStatement = db.prepare(
      `
        SELECT ticker, name from fiis 
        WHERE ticker LIKE :tickerText 
        LIMIT 10
      `,
    );

    this.findFIIByTickerStatement = db.prepare(
      `
        SELECT name, ticker from fiis
        WHERE ticker=@ticker
      `,
    );
  }

  static createFIIsTable(db: Database) {
    db.prepare(
      `
        CREATE TABLE IF NOT EXISTS fiis (
          ticker VARCHAR PRIMARY KEY, 
          name VARCHAR
        )
      `,
    ).run();
  }

  async saveFIIs(fiis: FII[]) {
    this.insertManyFIIStatement(fiis);
  }

  async findAllFIIs(): Promise<FII[]> {
    const docs = this.findAllFIIsStatement.all();

    return docs.map((doc) => ({ name: doc.name, ticker: doc.ticker } as FII));
  }

  async searchByTicker(tickerText: string) {
    const docs = this.searchFIIsByTickerStatement.all({
      tickerText: `%${tickerText.toUpperCase()}%`,
    }) as FIIModel[];

    return this.mapFIIsModelsToFIIs(docs);
  }

  async exists(stock: Stock): Promise<boolean> {
    const docs = this.findFIIByTickerStatement.all({
      ticker: stock.ticker,
    });

    return docs.length > 0;
  }

  mapFIIsModelsToFIIs(docs: FIIModel[]) {
    return docs.map((doc) => ({ name: doc.name, ticker: doc.ticker } as FII));
  }
}

export default FIIsStorageSqlite;
