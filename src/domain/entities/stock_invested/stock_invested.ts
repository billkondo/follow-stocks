import Price from '../price/price';
import Stock from '../stock/stock';

type StockInvested = {
  stock: Stock;
  quantity: number;
  totalInvested: Price;
  averagePrice: Price;
};

export default StockInvested;
