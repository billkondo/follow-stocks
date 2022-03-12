import SqliteStockQuotationMapper from '@sqlite/mappers/sqlite_stock_quotation_mapper';
import SqliteStockQuotationModel from '@sqlite/models/sqlite_stock_quotation_model';
import { Database, Statement } from 'better-sqlite3';
import StockQuotation from 'domain/stock_quotation';
import StocksQuotationsStorage from 'main/storage/stocks_quotations_storage';

class SqliteStocksQuotationsStorage implements StocksQuotationsStorage {
  insertStockQuotationStatement: Statement;

  findAllStocksQuotationsStatement: Statement;

  constructor(db: Database) {
    this.insertStockQuotationStatement = db.prepare(
      `
        INSERT INTO stocks_quotations (stock_ticker, quotation_value, quotation_code)
        VALUES (@stock_ticker, @quotation_value, @quotation_code)
        ON CONFLICT(stock_ticker) DO UPDATE SET
          quotation_value=excluded.quotation_value,
          quotation_code=excluded.quotation_code
      `,
    );

    this.findAllStocksQuotationsStatement = db.prepare(
      `
        SELECT stocks_quotations.*, stocks.name as stock_name, stocks.type as stock_type
        FROM stocks_quotations
        LEFT JOIN stocks 
        ON stocks.ticker=stocks_quotations.stock_ticker
      `,
    );
  }

  static createStocksQuotationsTable(db: Database) {
    db.prepare(
      `
        CREATE TABLE IF NOT EXISTS stocks_quotations (
          quotation_value DECIMAL, 
          quotation_code DECIMAL,
          stock_ticker VARCHAR UNIQUE,
          FOREIGN KEY (stock_ticker) REFERENCES stocks (ticker) ON UPDATE CASCADE
        )
      `,
    ).run();
  }

  async save(stockQuotation: StockQuotation) {
    this.insertStockQuotationStatement.run(
      SqliteStockQuotationMapper.toModel(stockQuotation),
    );
  }

  async findAll(): Promise<StockQuotation[]> {
    const docs: SqliteStockQuotationModel[] =
      this.findAllStocksQuotationsStatement.all();

    return docs.map(SqliteStockQuotationMapper.fromModel);
  }
}

export default SqliteStocksQuotationsStorage;
