import { Database, Statement, Transaction } from 'better-sqlite3';
import PriceCode from 'domain/price_code';
import Stock from 'domain/stock';
import StockNegotiation from 'domain/stock_negotiation';
import StockNegotiationType from 'domain/stock_negotiation_type';
import StocksNegotiationsStorage from 'main/repositories/stocks_negotiations_storage';

interface FIINegotiationModel {
  date: string;
  quantity: number;
  price_value: number;
  price_code: PriceCode;
  stock_ticker: string;
  stock_name: string;
  type: StockNegotiationType;
}

class FIIsNegotiationsStorageSqlite implements StocksNegotiationsStorage {
  insertFIINegotiationStatement: Statement;
  deleteFIINegotiationsStatement: Statement;
  insertManyFIINegotiationStatement: Transaction;
  updateFIINegotiationsStatement: Transaction;
  findFIINegotiationsByDateStatement: Statement;
  findFIINegotiationsByStockStatement: Statement;

  constructor(db: Database) {
    this.insertFIINegotiationStatement = db.prepare(
      `
        INSERT INTO fiis_negotiations (quantity, date, type, price_value, price_code, stock_ticker)
        VALUES (@quantity, @date, @type, @price_value, @price_code, @stock_ticker)
      `,
    );

    this.deleteFIINegotiationsStatement = db.prepare(
      `
        DELETE FROM fiis_negotiations
        WHERE stock_ticker=@stock_ticker
      `,
    );

    this.insertManyFIINegotiationStatement = db.transaction(
      (fiiNegotiations: FIINegotiationModel[]) => {
        for (const fiiNegotiation of fiiNegotiations)
          this.insertFIINegotiationStatement.run(fiiNegotiation);
      },
    );

    this.updateFIINegotiationsStatement = db.transaction(
      (stock: Stock, fiiNegotiations: FIINegotiationModel[]) => {
        this.deleteFIINegotiationsStatement.run({ stock_ticker: stock.ticker });
        this.insertManyFIINegotiationStatement(fiiNegotiations);
      },
    );

    const findFIINegotiationsByStatement = (whereClause: string) =>
      `
        SELECT fiis_negotiations.*, fiis.name as stock_name 
        FROM fiis_negotiations 
        LEFT JOIN fiis 
        ON fiis.ticker=fiis_negotiations.stock_ticker
        WHERE ${whereClause}
      `;

    this.findFIINegotiationsByDateStatement = db.prepare(
      findFIINegotiationsByStatement(
        `
          date=@date 
          AND stock_ticker=@stock_ticker
        `,
      ),
    );

    this.findFIINegotiationsByStockStatement = db.prepare(
      findFIINegotiationsByStatement(
        `
          stock_ticker=@stock_ticker
        `,
      ),
    );
  }

  static createFIIsNegotiationsTable(db: Database) {
    db.prepare(
      `
        CREATE TABLE IF NOT EXISTS fiis_negotiations (
          quantity INT, 
          date DATE, 
          type CHAR, 
          price_value INT, 
          price_code CHAR,
          stock_ticker VARCHAR,
          FOREIGN KEY (stock_ticker) REFERENCES fiis (ticker) ON UPDATE CASCADE
        )
      `,
    ).run();
  }

  async saveStockNegotiations(
    stock: Stock,
    stockNegotiations: StockNegotiation[],
  ) {
    const models = stockNegotiations.map(
      this.mapStockNegotiationToFIINegotiationModel,
    );

    this.updateFIINegotiationsStatement(stock, models);
  }

  async findStockNegotiationsByDate(stock: Stock, date: Date) {
    const docs: FIINegotiationModel[] =
      this.findFIINegotiationsByDateStatement.all({
        date: date.toISOString(),
        stock_ticker: stock.ticker,
      });

    return docs.map(this.mapFIINegotiationModelToStockNegotiation);
  }

  async findStockNegotiationsByStock(
    stock: Stock,
  ): Promise<StockNegotiation[]> {
    const docs: FIINegotiationModel[] =
      this.findFIINegotiationsByStockStatement.all({
        stock_ticker: stock.ticker,
      });

    return docs.map(this.mapFIINegotiationModelToStockNegotiation);
  }

  mapStockNegotiationToFIINegotiationModel(
    stockNegotiation: StockNegotiation,
  ): FIINegotiationModel {
    const { price, date, quantity, stock, type } = stockNegotiation;

    return {
      date: date.toISOString(),
      quantity,
      price_value: price.value,
      price_code: price.code,
      stock_name: stock.name,
      stock_ticker: stock.ticker,
      type,
    };
  }

  mapFIINegotiationModelToStockNegotiation(
    fiiNegotiationModel: FIINegotiationModel,
  ): StockNegotiation {
    const {
      date,
      price_code,
      price_value,
      quantity,
      stock_name,
      stock_ticker,
      type,
    } = fiiNegotiationModel;

    return {
      date: new Date(date),
      price: {
        code: price_code,
        value: price_value,
      },
      quantity,
      stock: {
        name: stock_name,
        ticker: stock_ticker,
      },
      type,
    };
  }
}

export default FIIsNegotiationsStorageSqlite;
