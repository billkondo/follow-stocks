import Stock from 'domain/stock';
import StockNegotiation from 'domain/stock_negotiation';

interface StocksNegotiationsRepository {
  saveNegotiations: (stocksNegotiations: StockNegotiation[]) => Promise<void>;
  findNegotiationsFromStock: (stock: Stock) => Promise<StockNegotiation[]>;
}

export default StocksNegotiationsRepository;
