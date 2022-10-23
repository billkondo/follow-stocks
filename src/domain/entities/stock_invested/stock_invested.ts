import Price from '@entities/price/price';
import Stock from '@entities/stock/stock';

type StockInvested = {
  stock: Stock;
  quantity: number;
  totalInvested: Price;
  averagePrice: Price;
};

export default StockInvested;
