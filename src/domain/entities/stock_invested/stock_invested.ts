import Stock from '@entities/stocks/Stock';

type StockInvested = {
  stock: Stock;
  quantity: number;
  totalInvested: number;
  averagePrice: number;
};

export default StockInvested;
