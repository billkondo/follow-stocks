import SqliteStockModel from '@sqlite/models/sqlite_stock_model';
import Stock from 'domain/entities/stock/stock';

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
