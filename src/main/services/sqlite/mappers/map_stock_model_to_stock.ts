import StockSqliteModel from '@sqlite/models/stock_sqlite_model';
import Stock from 'domain/stock';

const mapStockModelToStock = (stock: StockSqliteModel): Stock => {
  const { name, ticker, type } = stock;

  return {
    name,
    ticker,
    type,
  };
};

export default mapStockModelToStock;
