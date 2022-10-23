import Stock from 'domain/entities/stock/stock';
import StockType from 'domain/entities/stock/stock_type';
import StockNegotiation from 'domain/entities/stock_negotiation/stock_negotiation';

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
