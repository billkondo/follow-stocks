import StockType from './stock_type';

interface Stock {
  ticker: string;
  name: string;
  type: StockType;
}

export default Stock;
