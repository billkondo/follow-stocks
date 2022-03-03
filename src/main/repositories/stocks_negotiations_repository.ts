import Stock from 'domain/stock';
import StockNegotiation from 'domain/stock_negotiation';
import StockType from 'domain/stock_type';

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

  findStocksThatHaveAnyNegotiation: (type: StockType) => Promise<Stock[]>;
}

export default StocksNegotiationsRepository;
