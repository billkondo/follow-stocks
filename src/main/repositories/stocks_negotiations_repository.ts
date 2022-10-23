import Stock from '@entities/stock/stock';
import StockType from '@entities/stock/stock_type';
import StockNegotiation from '@entities/stock_negotiation/stock_negotiation';

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
