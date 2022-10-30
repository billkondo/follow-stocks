import StockInvested from '@entities/stock_invested/stock_invested';
import SqliteStockInvestedMapper from '@sqlite/mappers/sqlite_stock_invested_mapper';
import SqliteStockInvestedModel from '@sqlite/models/sqlite_stock_invested_model';
import { Database, Statement } from 'better-sqlite3';
import StocksInvestedStorage from 'main/storage/stocks_invested_storage';

class SqliteStocksInvestedStorage implements StocksInvestedStorage {
  insertStockInvestedStatement: Statement;

  findAllStocksInvestedStatement: Statement;
  findStockInvestedByTickerStatement: Statement;

  constructor(db: Database) {
    this.insertStockInvestedStatement = db.prepare(
      `
        INSERT INTO stocks_invested (quantity, total_invested, average_price, price_code, stock_ticker)
        VALUES (@quantity, @total_invested, @average_price, @price_code, @stock_ticker)
        ON CONFLICT(stock_ticker) DO UPDATE SET
          quantity=excluded.quantity,
          total_invested=excluded.total_invested,
          average_price=excluded.average_price,
          price_code=excluded.price_code
      `,
    );

    const findStatement = (whereClause = '') => `
        SELECT stocks_invested.*, stocks.name as stock_name, stocks.type as stock_type 
        FROM stocks_invested
        LEFT JOIN stocks 
        ON stocks.ticker=stocks_invested.stock_ticker
        ${whereClause}
    `;

    this.findAllStocksInvestedStatement = db.prepare(findStatement());

    this.findStockInvestedByTickerStatement = db.prepare(
      findStatement('WHERE stock_ticker=@stock_ticker'),
    );
  }

  static createStocksInvestedTable(db: Database) {
    db.prepare(
      `
        CREATE TABLE IF NOT EXISTS stocks_invested (
          quantity DECIMAL,
          total_invested DECIMAL,
          average_price DECIMAL, 
          price_code CHAR,
          stock_ticker VARCHAR UNIQUE,
          FOREIGN KEY (stock_ticker) REFERENCES stocks (ticker) ON UPDATE CASCADE
        )
      `,
    ).run();
  }

  async saveStockInvested(stockInvested: StockInvested) {
    const model = SqliteStockInvestedMapper.toModel(stockInvested);

    this.insertStockInvestedStatement.run(model);
  }

  async findStockInvestedByStockTicker(ticker: string): Promise<StockInvested> {
    const model: SqliteStockInvestedModel =
      this.findStockInvestedByTickerStatement.get({
        stock_ticker: ticker,
      });

    if (!model) return null;

    return SqliteStockInvestedMapper.fromModel(model);
  }

  async findAllStocksInvested(): Promise<StockInvested[]> {
    const docs: SqliteStockInvestedModel[] =
      this.findAllStocksInvestedStatement.all();

    return docs.map(SqliteStockInvestedMapper.fromModel);
  }
}

export default SqliteStocksInvestedStorage;
