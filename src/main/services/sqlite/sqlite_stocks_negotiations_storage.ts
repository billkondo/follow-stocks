import { Database, Statement, Transaction } from 'better-sqlite3';
import Stock from 'domain/stock';
import StockNegotiation from 'domain/stock_negotiation';
import StockType from 'domain/stock_type';
import StocksNegotiationsStorage from 'main/storage/stocks_negotiations_storage';
import mapStockModelToStock from './mappers/map_stock_model_to_stock';
import mapStockNegotiationModelToStockNegotiation from './mappers/map_stock_negotiation_model_to_stock_negotiation';
import mapStockNegotiationToStockNegotiationModel from './mappers/map_stock_negotiation_to_stock_negotiation_model';
import SqliteStockNegotiationModel from './models/sqlite_stock_negotiation_model';

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
          quantity INT, 
          date DATE, 
          type CHAR, 
          price_value INT, 
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
    const models = stockNegotiations.map(
      mapStockNegotiationToStockNegotiationModel,
    );

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

    return docs.map(mapStockNegotiationModelToStockNegotiation);
  }

  async findStockNegotiationsByStock(
    stock: Stock,
  ): Promise<StockNegotiation[]> {
    const { ticker } = stock;
    const docs: SqliteStockNegotiationModel[] =
      this.findStockNegotiationsByStockStatement.all({ stock_ticker: ticker });

    return docs.map(mapStockNegotiationModelToStockNegotiation);
  }

  async findStocksThatHaveAnyNegotiation(type: StockType): Promise<Stock[]> {
    const docs = this.findStocksThatHaveAnyNegotiationStatement.all({ type });

    return docs.map(mapStockModelToStock);
  }
}

export default SqliteStocksNegotiationsStorage;
