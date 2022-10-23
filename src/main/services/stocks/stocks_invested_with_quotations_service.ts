import StockInvestedWithQuotation from '@entities/stock_invested/stock_invested_with_quotation';
import StocksInvestedWithQuotationsRepository from '@repositories/stocks_invested_wtih_quotations_repository';
import SqliteStockInvestedMapper from '@sqlite/mappers/sqlite_stock_invested_mapper';
import SqliteStockQuotationMapper from '@sqlite/mappers/sqlite_stock_quotation_mapper';
import SqliteStockInvestedModel from '@sqlite/models/sqlite_stock_invested_model';
import SqliteStockQuotationModel from '@sqlite/models/sqlite_stock_quotation_model';
import { Database, Statement } from 'better-sqlite3';

type SqliteStockInvestedWithQuotationModel = SqliteStockInvestedModel &
  SqliteStockQuotationModel;

class StocksInvestedWithQuotationsService
  implements StocksInvestedWithQuotationsRepository
{
  findStocksInvestedWithQuotationsStatement: Statement;

  constructor(db: Database) {
    this.findStocksInvestedWithQuotationsStatement = db.prepare(
      `
        SELECT 
          stocks_quotations.*, 
          stocks_invested.*, 
          stocks.name as stock_name, 
          stocks.ticker as stock_ticker,
          stocks.type as stock_type
        FROM stocks_invested
        LEFT JOIN stocks_quotations
        ON stocks_invested.stock_ticker=stocks_quotations.stock_ticker
        LEFT JOIN stocks
        ON stocks.ticker=stocks_invested.stock_ticker
      `,
    );
  }

  async listStocksInvestedWithQuotations(): Promise<
    StockInvestedWithQuotation[]
  > {
    const docs: SqliteStockInvestedWithQuotationModel[] =
      this.findStocksInvestedWithQuotationsStatement.all();

    return docs.map((stockInvestedWithQuotationModel) => {
      const stockInvested = SqliteStockInvestedMapper.fromModel(
        stockInvestedWithQuotationModel as SqliteStockInvestedModel,
      );
      const stockInvestedWithQuotation: StockInvestedWithQuotation = {
        ...stockInvested,
      };

      if (stockInvestedWithQuotationModel.quotation_code)
        stockInvestedWithQuotation.quotation =
          SqliteStockQuotationMapper.fromModel(
            stockInvestedWithQuotationModel as SqliteStockQuotationModel,
          ).quotation;

      return stockInvestedWithQuotation;
    });
  }
}

export default StocksInvestedWithQuotationsService;
