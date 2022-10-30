import Stock from '@entities/stocks/stock';
import SqliteStockModel from '@sqlite/models/sqlite_stock_model';

class SqliteStockMapper {
  static toModel(stock: Stock): SqliteStockModel {
    const { name, ticker, type } = stock;

    return {
      name,
      ticker,
      type,
    };
  }

  static fromModel(stock: SqliteStockModel): Stock {
    const { name, ticker, type } = stock;

    return {
      name,
      ticker,
      type,
    };
  }
}

export default SqliteStockMapper;
