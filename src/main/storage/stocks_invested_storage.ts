import StockInvested from '@entities/stock_invested/stock_invested';

interface StocksInvestedStorage {
  saveStockInvested: (stockInvested: StockInvested) => Promise<void>;

  findStockInvestedByStockTicker: (ticker: string) => Promise<StockInvested>;

  findAllStocksInvested: () => Promise<StockInvested[]>;
}

export default StocksInvestedStorage;
