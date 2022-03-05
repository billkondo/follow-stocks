import Stock from 'domain/stock';
import StockNegotiation from 'domain/stock_negotiation';
import StockType from 'domain/stock_type';

interface StocksNegotiationsStorage {
  saveStockNegotiations: (
    stock: Stock,
    stockNegotiations: StockNegotiation[],
  ) => Promise<void>;

  findStockNegotiationsByDate: (
    stock: Stock,
    date: Date,
  ) => Promise<StockNegotiation[]>;

  findStockNegotiationsByStock: (stock: Stock) => Promise<StockNegotiation[]>;

  findStocksThatHaveAnyNegotiation: (type: StockType) => Promise<Stock[]>;
}

export default StocksNegotiationsStorage;
