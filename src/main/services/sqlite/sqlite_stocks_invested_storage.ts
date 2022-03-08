import { Database, Statement } from 'better-sqlite3';
import StockInvested from 'domain/stock_invested';
import StocksInvestedStorage from 'main/storage/stocks_invested_storage';
import SqliteStockInvestedMapper from './mappers/sqlite_stock_invested_mapper';
import SqliteStockInvestedModel from './models/sqlite_stock_invested_model';

class SqliteStocksInvestedStorage implements StocksInvestedStorage {
  insertStatement: Statement;

  findAllStatement: Statement;
  findByStockTickerStatement: Statement;

  constructor(db: Database) {
    this.insertStatement = db.prepare(
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

    this.findAllStatement = db.prepare(findStatement());

    this.findByStockTickerStatement = db.prepare(
      findStatement('WHERE stock_ticker=@stock_ticker'),
    );
  }

  static createStocksInvestedTable(db: Database) {
    db.prepare(
      `
        CREATE TABLE IF NOT EXISTS stocks_invested (
          quantity INT,
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

    this.insertStatement.run(model);
  }

  async findStockInvestedByStockTicker(ticker: string): Promise<StockInvested> {
    const model: SqliteStockInvestedModel = this.findByStockTickerStatement.get(
      {
        stock_ticker: ticker,
      },
    );

    if (!model) return null;

    return SqliteStockInvestedMapper.fromModel(model);
  }

  async findAllStocksInvested(): Promise<StockInvested[]> {
    const docs: SqliteStockInvestedModel[] = this.findAllStatement.all();

    return docs.map(SqliteStockInvestedMapper.fromModel);
  }
}

export default SqliteStocksInvestedStorage;
