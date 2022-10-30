import Stock from '@entities/stocks/stock';
import StockInvested from '@entities/stock_invested/stock_invested';

interface StocksInvestedRepository {
  saveStockInvested: (stockInvested: StockInvested) => Promise<void>;

  findStockInvestedByStockTicker: (ticker: string) => Promise<StockInvested>;

  findStocksInvested: () => Promise<Stock[]>;
}

export default StocksInvestedRepository;
