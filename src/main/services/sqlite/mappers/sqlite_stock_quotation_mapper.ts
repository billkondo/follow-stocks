import StockQuotation from '@entities/stock_quotation';
import SqliteStockQuotationModel from '@sqlite/models/sqlite_stock_quotation_model';

class SqliteStockQuotationMapper {
  static toModel(stockQuotation: StockQuotation): SqliteStockQuotationModel {
    const { quotation, stock, updatedAt } = stockQuotation;

    return {
      quotation_code: quotation.code,
      quotation_value: quotation.value,
      stock_name: stock.name,
      stock_ticker: stock.ticker,
      stock_type: stock.type,
      updated_at: updatedAt.toISOString(),
    };
  }

  static fromModel(stockQuotation: SqliteStockQuotationModel): StockQuotation {
    const {
      quotation_code,
      quotation_value,
      stock_name,
      stock_ticker,
      stock_type,
      updated_at,
    } = stockQuotation;

    return {
      quotation: {
        code: quotation_code,
        value: quotation_value,
      },
      stock: {
        name: stock_name,
        ticker: stock_ticker,
        type: stock_type,
      },
      updatedAt: new Date(updated_at),
    };
  }
}

export default SqliteStockQuotationMapper;
