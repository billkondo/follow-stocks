import StockQuotation from '@entities/stock_quotation';
import SqliteStockQuotationModel from '@sqlite/models/sqlite_stock_quotation_model';

class SqliteStockQuotationMapper {
  static toModel(stockQuotation: StockQuotation): SqliteStockQuotationModel {
    const { quotation, stock, updatedAt } = stockQuotation;

    return {
      quotation: quotation,
      stock_name: stock.name,
      stock_ticker: stock.ticker,
      stock_type: stock.type,
      stock_currency_code: stock.currencyCode,
      updated_at: updatedAt.toISOString(),
    };
  }

  static fromModel(stockQuotation: SqliteStockQuotationModel): StockQuotation {
    const {
      quotation,
      stock_name,
      stock_ticker,
      stock_type,
      stock_currency_code,
      updated_at,
    } = stockQuotation;

    return {
      quotation,
      stock: {
        name: stock_name,
        ticker: stock_ticker,
        type: stock_type,
        currencyCode: stock_currency_code,
      },
      updatedAt: new Date(updated_at),
    };
  }
}

export default SqliteStockQuotationMapper;
