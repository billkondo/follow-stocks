import Stock from 'domain/stock';
import StockNegotiation from 'domain/stock_negotiation';

interface StocksNegotiationsRepository {
  saveStockNegotiations: (
    stock: Stock,
    stockNegotiations: StockNegotiation[],
  ) => Promise<void>;

  findNegotiationsFromStock: (stock: Stock) => Promise<StockNegotiation[]>;

  findStockNegotiationsByDate: (
    stock: Stock,
    date: Date,
  ) => Promise<StockNegotiation[]>;

  findStocksThatHaveAnyNegotiation: () => Promise<Stock[]>;
}

export default StocksNegotiationsRepository;
