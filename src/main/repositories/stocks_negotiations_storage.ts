import Stock from 'domain/stock';
import StockNegotiation from 'domain/stock_negotiation';

interface StocksNegotiationsStorage {
  saveStockNegotiations: (
    stock: Stock,
    stockNegotiations: StockNegotiation[],
  ) => Promise<void>;

  findStockNegotiationsByDate: (
    stock: Stock,
    date: Date,
  ) => Promise<StockNegotiation[]>;
}

export default StocksNegotiationsStorage;
