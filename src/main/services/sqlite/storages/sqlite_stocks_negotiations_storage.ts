import Stock from '@entities/stock/stock';
import StockType from '@entities/stock/stock_type';
import StockNegotiation from '@entities/stock_negotiation/stock_negotiation';
import SqliteStockMapper from '@sqlite/mappers/sqlite_stock_mapper';
import SqliteStockNegotiationMapper from '@sqlite/mappers/sqlite_stock_negotiation_mapper';
import SqliteStockNegotiationModel from '@sqlite/models/sqlite_stock_negotiation_model';
import { Database, Statement, Transaction } from 'better-sqlite3';
import StocksNegotiationsStorage from 'main/storage/stocks_negotiations_storage';

class SqliteStocksNegotiationsStorage implements StocksNegotiationsStorage {
  insertStockNegotiationStatement: Statement;
  insertManyStockNegotiationsStatement: Transaction;

  deleteStockNegotiationsStatement: Statement;

  updateStockNegotiationsStatement: Transaction;

  findStockNegotiationsByDateStatement: Statement;
  findStockNegotiationsByStockStatement: Statement;
  findStocksThatHaveAnyNegotiationStatement: Statement;

  constructor(db: Database) {
    this.insertStockNegotiationStatement = db.prepare(
      `
        INSERT INTO stocks_negotiations (quantity, date, type, price_value, price_code, stock_ticker)
        VALUES (@quantity, @date, @type, @price_value, @price_code, @stock_ticker)
      `,
    );

    this.insertManyStockNegotiationsStatement = db.transaction(
      (stocksNegotiations: SqliteStockNegotiationModel[]) => {
        for (const stockNegotiation of stocksNegotiations)
          this.insertStockNegotiationStatement.run(stockNegotiation);
      },
    );

    this.deleteStockNegotiationsStatement = db.prepare(
      `
        DELETE FROM stocks_negotiations
        WHERE stock_ticker=@stock_ticker
      `,
    );

    this.updateStockNegotiationsStatement = db.transaction(
      (stock: Stock, stockNegotiations: SqliteStockNegotiationModel[]) => {
        const { ticker } = stock;
        this.deleteStockNegotiationsStatement.run({ stock_ticker: ticker });
        this.insertManyStockNegotiationsStatement(stockNegotiations);
      },
    );

    const findStockNegotiationsByStatement = (whereClause: string) =>
      `
        SELECT stocks_negotiations.*, stocks.name as stock_name, stocks.type as stock_type 
        FROM stocks_negotiations 
        LEFT JOIN stocks 
        ON stocks.ticker=stocks_negotiations.stock_ticker
        WHERE ${whereClause}
      `;

    this.findStockNegotiationsByDateStatement = db.prepare(
      findStockNegotiationsByStatement(
        `
            date=@date 
            AND stock_ticker=@stock_ticker
          `,
      ),
    );

    this.findStockNegotiationsByStockStatement = db.prepare(
      findStockNegotiationsByStatement(
        `
            stock_ticker=@stock_ticker
          `,
      ),
    );

    this.findStocksThatHaveAnyNegotiationStatement = db.prepare(
      `
        SELECT stocks.name as name, stocks.ticker as ticker, stocks.type as type
        FROM stocks
        INNER JOIN stocks_negotiations
        ON stocks_negotiations.stock_ticker=stocks.ticker
        WHERE stocks.type=@type
        GROUP BY name, ticker
      `,
    );
  }

  static createStocksNegotiationsTable(db: Database) {
    db.prepare(
      `
        CREATE TABLE IF NOT EXISTS stocks_negotiations (
          quantity DECIMAL, 
          date DATE, 
          type CHAR, 
          price_value DECIMAL, 
          price_code CHAR,
          stock_ticker VARCHAR,
          FOREIGN KEY (stock_ticker) REFERENCES stocks (ticker) ON UPDATE CASCADE
        )
      `,
    ).run();
  }

  async saveStockNegotiations(
    stock: Stock,
    stockNegotiations: StockNegotiation[],
  ) {
    const models = stockNegotiations.map(SqliteStockNegotiationMapper.toModel);

    return this.updateStockNegotiationsStatement(stock, models);
  }

  async findStockNegotiationsByDate(
    stock: Stock,
    date: Date,
  ): Promise<StockNegotiation[]> {
    const { ticker } = stock;
    const docs: SqliteStockNegotiationModel[] =
      this.findStockNegotiationsByDateStatement.all({
        date: date.toISOString(),
        stock_ticker: ticker,
      });

    return docs.map(SqliteStockNegotiationMapper.fromModel);
  }

  async findStockNegotiationsByStock(
    stock: Stock,
  ): Promise<StockNegotiation[]> {
    const { ticker } = stock;
    const docs: SqliteStockNegotiationModel[] =
      this.findStockNegotiationsByStockStatement.all({ stock_ticker: ticker });

    return docs.map(SqliteStockNegotiationMapper.fromModel);
  }

  async findStocksThatHaveAnyNegotiation(type: StockType): Promise<Stock[]> {
    const docs = this.findStocksThatHaveAnyNegotiationStatement.all({ type });

    return docs.map(SqliteStockMapper.fromModel);
  }
}

export default SqliteStocksNegotiationsStorage;
