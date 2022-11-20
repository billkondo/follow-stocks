import Stock from '@entities/stocks/Stock';
import SqliteStockModel from '@sqlite/models/sqlite_stock_model';

class SqliteStockMapper {
  static toModel(stock: Stock): SqliteStockModel {
    const { currencyCode, name, ticker, type } = stock;

    return {
      currency_code: currencyCode,
      name,
      ticker,
      type,
    };
  }

  static fromModel(stock: SqliteStockModel): Stock {
    const { currency_code, name, ticker, type } = stock;

    return {
      currencyCode: currency_code,
      name,
      ticker,
      type,
    };
  }
}

export default SqliteStockMapper;
