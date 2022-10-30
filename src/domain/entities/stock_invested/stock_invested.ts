import Price from '@entities/price/price';
import Stock from '@entities/stocks/stock';

type StockInvested = {
  stock: Stock;
  quantity: number;
  totalInvested: Price;
  averagePrice: Price;
};

export default StockInvested;
