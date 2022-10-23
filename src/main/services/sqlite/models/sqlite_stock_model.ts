import StockType from '@entities/stock/stock_type';

interface SqliteStockModel {
  name: string;
  ticker: string;
  type: StockType;
}

export default SqliteStockModel;
