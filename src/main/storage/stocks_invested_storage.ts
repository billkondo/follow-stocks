import StockInvested from 'domain/stock_invested';

interface StocksInvestedStorage {
  saveStockInvested: (stockInvested: StockInvested) => Promise<void>;

  findStockInvestedByStockTicker: (ticker: string) => Promise<StockInvested>;
}

export default StocksInvestedStorage;
