import StockType from 'domain/stock_type';

interface SqliteStockModel {
  name: string;
  ticker: string;
  type: StockType;
}

export default SqliteStockModel;
