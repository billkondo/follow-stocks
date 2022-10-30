import Stock from '@entities/stocks/stock';
import StockQuotation from '@entities/stock_quotation';
import SqliteStockQuotationMapper from '@sqlite/mappers/sqlite_stock_quotation_mapper';
import SqliteStockQuotationModel from '@sqlite/models/sqlite_stock_quotation_model';
import { Database, Statement } from 'better-sqlite3';
import StocksQuotationsStorage from 'main/storage/stocks_quotations_storage';

class SqliteStocksQuotationsStorage implements StocksQuotationsStorage {
  insertStockQuotationStatement: Statement;

  findAllStocksQuotationsStatement: Statement;
  findStockQuotationByStockStatement: Statement;

  constructor(db: Database) {
    this.insertStockQuotationStatement = db.prepare(
      `
        INSERT INTO stocks_quotations (stock_ticker, quotation_value, quotation_code, updated_at)
        VALUES (@stock_ticker, @quotation_value, @quotation_code, @updated_at)
        ON CONFLICT(stock_ticker) DO UPDATE SET
          quotation_value=excluded.quotation_value,
          quotation_code=excluded.quotation_code,
          updated_at=excluded.updated_at
      `,
    );

    const findStatement = (whereClause = '') => {
      const WHERE = whereClause ? `WHERE ${whereClause}` : '';

      return `
        SELECT stocks_quotations.*, stocks.name as stock_name, stocks.type as stock_type
        FROM stocks_quotations
        LEFT JOIN stocks 
        ON stocks.ticker=stocks_quotations.stock_ticker
        ${WHERE}
      `;
    };

    this.findAllStocksQuotationsStatement = db.prepare(findStatement());

    this.findStockQuotationByStockStatement = db.prepare(
      findStatement('stock_ticker=@stock_ticker'),
    );
  }

  static createStocksQuotationsTable(db: Database) {
    db.prepare(
      `
        CREATE TABLE IF NOT EXISTS stocks_quotations (
          quotation_value DECIMAL, 
          quotation_code DECIMAL,
          updated_at DATE,
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

  async find(stock: Stock): Promise<StockQuotation> {
    const doc: SqliteStockQuotationModel =
      this.findStockQuotationByStockStatement.get({
        stock_ticker: stock.ticker,
      });

    if (!doc) return null;

    return SqliteStockQuotationMapper.fromModel(doc);
  }
}

export default SqliteStocksQuotationsStorage;
