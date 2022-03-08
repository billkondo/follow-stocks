import Price from './price';
import Stock from './stock';

type StockInvested = {
  stock: Stock;
  quantity: number;
  totalInvested: Price;
  averagePrice: Price;
};

export default StockInvested;
