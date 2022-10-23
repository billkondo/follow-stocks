import Stock from '@entities/stock/stock';
import StockType from '@entities/stock/stock_type';
import StockNegotiation from '@entities/stock_negotiation/stock_negotiation';

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
