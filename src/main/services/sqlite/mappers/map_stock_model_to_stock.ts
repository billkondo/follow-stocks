import SqliteStockModel from '@sqlite/models/sqlite_stock_model';
import Stock from 'domain/stock';

const mapStockModelToStock = (stock: SqliteStockModel): Stock => {
  const { name, ticker, type } = stock;

  return {
    name,
    ticker,
    type,
  };
};

export default mapStockModelToStock;
