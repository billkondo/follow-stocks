import SqliteStockModel from '@sqlite/models/sqlite_stock_model';
import Stock from 'domain/stock';

const mapStockToStockModel = (stock: Stock): SqliteStockModel => {
  const { name, ticker, type } = stock;

  return {
    name,
    ticker,
    type,
  };
};

export default mapStockToStockModel;
