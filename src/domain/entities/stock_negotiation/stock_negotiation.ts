import Price from 'domain/entities/price/price';
import Stock from 'domain/entities/stock/stock';
import StockNegotiationType from './stock_negotiation_type';

interface StockNegotiation {
  date: Date;
  type: StockNegotiationType;
  stock: Stock;
  price: Price;
  quantity: number;
}

export default StockNegotiation;
