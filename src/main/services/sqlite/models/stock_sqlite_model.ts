import StockType from 'domain/stock_type';

interface StockSqliteModel {
  name: string;
  ticker: string;
  type: StockType;
}

export default StockSqliteModel;
