import { Database, Statement, Transaction } from 'better-sqlite3';
import Stock from 'domain/stock';
import StockType from 'domain/stock_type';
import StocksStorage from 'main/storage/stocks_storage';
import mapStockModelToStock from './mappers/map_stock_model_to_stock';
import SqliteStockModel from './models/sqlite_stock_model';

class SqliteStocksStorage implements StocksStorage {
  insertStockStatement: Statement;
  insertManyStocksStatement: Transaction;

  findStocksByTypeStatement: Statement;
  findStockByTickerStatement: Statement;

  searchStocksByTickerAndTypeStatement: Statement;

  countStocksByTypeStatement: Statement;

  constructor(db: Database) {
    this.insertStockStatement = db.prepare(
      `
        INSERT INTO stocks (ticker, name, type)
        VALUES (@ticker, @name, @type)
      `,
    );

    this.insertManyStocksStatement = db.transaction(
      (stocks: SqliteStockModel[]) => {
        for (const stock of stocks) this.insertStockStatement.run(stock);
      },
    );

    this.findStocksByTypeStatement = db.prepare(
      `
        SELECT ticker, name, type from stocks
        WHERE type=@type
      `,
    );

    this.searchStocksByTickerAndTypeStatement = db.prepare(
      `
        SELECT ticker, name, type from stocks 
        WHERE ticker LIKE :tickerText
        AND type=@type
        LIMIT 10
      `,
    );

    this.findStockByTickerStatement = db.prepare(
      `
        SELECT name, ticker, type from stocks
        WHERE ticker=@ticker
      `,
    );

    this.countStocksByTypeStatement = db.prepare(
      `
        SELECT COUNT(name) as count
        FROM stocks
        WHERE type=@type
      `,
    );
  }

  static createStocksTable(db: Database) {
    db.prepare(
      `
        CREATE TABLE IF NOT EXISTS stocks (
          ticker VARCHAR PRIMARY KEY,
          name VARCHAR,
          type VARCHAR
        )
      `,
    ).run();
  }

  async searchByTickerAndType(
    tickerText: string,
    type: StockType,
  ): Promise<Stock[]> {
    const docs: SqliteStockModel[] =
      this.searchStocksByTickerAndTypeStatement.all({
        tickerText: `%${tickerText.toUpperCase()}%`,
        type,
      });

    return docs.map(mapStockModelToStock);
  }

  async exists(stock: Stock): Promise<boolean> {
    const { ticker } = stock;
    const docs = this.findStockByTickerStatement.all({
      ticker,
    });

    return docs.length > 0;
  }

  async countByType(type: StockType): Promise<number> {
    const { count }: { count: number } = this.countStocksByTypeStatement.get({
      type,
    });

    return count;
  }

  async save(stocks: Stock[]) {
    const models = stocks.map(mapStockModelToStock);

    await this.insertManyStocksStatement(models);
  }

  async findAllByType(type: 'FII'): Promise<Stock[]> {
    const docs = this.findStocksByTypeStatement.all({ type });

    return docs.map(mapStockModelToStock);
  }
}

export default SqliteStocksStorage;
